import {Component, OnInit} from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Observable, of, retry} from 'rxjs';
import {Horse} from 'src/app/dto/horse';
import {Sex} from 'src/app/dto/sex';
import {HorseService} from 'src/app/service/horse.service';
import {Breed} from "../../../dto/breed";
import {BreedService} from "../../../service/breed.service";


export enum HorseCreateEditMode {
  create,
  edit,
}

@Component({
  selector: 'app-horse-create-edit',
  templateUrl: './horse-create-edit.component.html',
  styleUrls: ['./horse-create-edit.component.scss']
})
export class HorseCreateEditComponent implements OnInit {

  mode: HorseCreateEditMode = HorseCreateEditMode.create;
  horse: Horse = {
    name: '',
    sex: Sex.female,
    dateOfBirth: new Date(), // TODO this is bad
    height: 0, // TODO this is bad
    weight: 0, // TODO this is bad
  };

  private heightSet: boolean = false;
  private weightSet: boolean = false;
  private dateOfBirthSet: boolean = false;
  private errorText: string = '';


  get height(): number | null {
    return this.heightSet
      ? this.horse.height
      : null;
  }

  set height(value: number) {
    this.heightSet = true;
    this.horse.height = value;
  }

  get weight(): number | null {
    return this.weightSet
      ? this.horse.weight
      : null;
  }

  set weight(value: number) {
    this.weightSet = true;
    this.horse.weight = value;
  }

  get dateOfBirth(): Date | null {
    return this.dateOfBirthSet
      ? this.horse.dateOfBirth
      : null;
  }

  set dateOfBirth(value: Date) {
    this.dateOfBirthSet = true;
    this.horse.dateOfBirth = value;
  }


  constructor(
    private service: HorseService,
    private breedService: BreedService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: ToastrService,
  ) {
  }

  public get heading(): string {
    switch (this.mode) {
      case HorseCreateEditMode.create:
        return 'Create New Horse';
      default:
        return 'Editing Horse with id';
    }
  }

  public get submitButtonText(): string {
    switch (this.mode) {
      case HorseCreateEditMode.create:
        return 'Create';
      case HorseCreateEditMode.edit:
        return 'Update';
      default:
        return '?';
    }
  }

  get modeIsCreate(): boolean {
    return this.mode === HorseCreateEditMode.create;
  }


  get sex(): string {
    switch (this.horse.sex) {
      case Sex.male: return 'Male';
      case Sex.female: return 'Female';
      default: return '';
    }
  }

  private get modeActionFinished(): string {
    switch (this.mode) {
      case HorseCreateEditMode.create:
        return 'created';
      default:
        return '?';
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      if(data.has('id')) {
        this.mode = HorseCreateEditMode.edit;
        // now we need to load the horse with the provided id
        let id = Number(data.get('id'));
        this.service.getById(id)
        .subscribe({
          next: data => {
            this.horse = data;
            this.heightSet = true;
            this.weightSet = true;
            this.dateOfBirthSet = true;
          },
          error: error => {
            console.log("there was an error loading this horese");
            console.log(error);
            /*
               console.error('Error fetching horses', error);
               this.bannerError = 'Could not fetch horses: ' + error.message;
               const errorMessage = error.status === 0
                 ? 'Is the backend up?'
                 : error.message.message;
                 this.notification.error(errorMessage, 'Could Not Fetch Horses');
                 */
          }
        });
        //
      }else {
        this.mode = HorseCreateEditMode.create;
      }
    });
  }

  public dynamicCssClassesForInput(input: NgModel): any {
    return {
      'is-invalid': !input.valid && !input.pristine,
    };
  }

  public formatBreedName(breed: Breed | null): string {
    return breed?.name ?? '';
  }

  breedSuggestions = (input: string) => (input === '') ? of([]) :  this.breedService.breedsByName(input, 5);

  public onSubmit(form: NgForm): void {
    console.log('is form valid?', form.valid, this.horse);
    if (form.valid) {
      let observable: Observable<Horse>;
      switch (this.mode) {
        case HorseCreateEditMode.create:
          observable = this.service.create(this.horse);
        break;
        case HorseCreateEditMode.edit:
          observable = this.service.update(this.horse);
        break;
        default:
          console.error('Unknown HorseCreateEditMode', this.mode);
        return;
      }
      observable.subscribe({
        next: data => {
          this.notification.success(`Horse ${this.horse.name} successfully ${this.modeActionFinished}.`);
          this.router.navigate(['/horses']);
        },
        error: error => {
          console.error('Error creating horse', error);
          this.errorText = error.message;
          // TODO show an error message to the user. Include and sensibly present the info from the backend!
        }
      });
    }
  }

  public onDelete(): void {
    console.log("trying to delete Horse with id: " + this.horse.id);
    let observable: Observable<Horse>;
    observable = this.service.delete(this.horse);
    observable.subscribe({
      next: data => {
        this.notification.success(`Horse ${this.horse.name} successfully deleted.`);
        this.router.navigate(['/horses']);
      },
      error: error => {
        console.error('Error creating horse', error);
        this.errorText = error.message;
        // TODO show an error message to the user. Include and sensibly present the info from the backend!
      }
    });
  }

}
