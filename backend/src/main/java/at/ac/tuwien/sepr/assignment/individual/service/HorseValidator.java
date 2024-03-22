package at.ac.tuwien.sepr.assignment.individual.service;

import at.ac.tuwien.sepr.assignment.individual.dto.HorseDetailDto;
import at.ac.tuwien.sepr.assignment.individual.exception.ValidationException;
import java.lang.invoke.MethodHandles;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class HorseValidator {
  private static final Logger LOG = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

  public void validateForUpdate(HorseDetailDto horse) throws ValidationException {
	LOG.trace("validateForUpdate({})", horse);
	List<String> validationErrors = new ArrayList<>();

	if (horse.id() == null) {
	  validationErrors.add("No ID given");
	}

	// TODO this is not complete…

	if (!validationErrors.isEmpty()) {
	  throw new ValidationException("Validation of horse for update failed", validationErrors);
	}
  }

  public void validateForCreation(HorseDetailDto horse) throws  ValidationException {
	LOG.trace("validateForCreation({})", horse);
	List<String> validationErrors = new ArrayList<>();

	if (horse.name() == null) {
	  validationErrors.add("No name was spceified!");
	}
	if (horse.sex() == null) {
	  validationErrors.add("The sex of the horse is not specified!");
	}
	if (horse.breed() == null) {
	  validationErrors.add("The breed is not specified");
	}
	if (horse.dateOfBirth() == null) {
	  validationErrors.add("The date of birth is not specified");
	}
	if (horse.height() < 0) {
	  validationErrors.add("The height of the horse can only be a positive value");
	}
	if (horse.weight() < 0) {
	  validationErrors.add("The weight of the horse can only be a positive number");
	}

	if (!validationErrors.isEmpty()) {
	  throw new ValidationException("Validation of horse for creation failed", validationErrors);
	}
  }

}
