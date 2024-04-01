package at.ac.tuwien.sepr.assignment.individual.entity;

import at.ac.tuwien.sepr.assignment.individual.type.Sex;
import java.time.LocalDate;

/**
 * Represents a horse in the persistent data store.
 */
public class Horse {
  private Long id;
  private String name;
  private Sex sex;
  private LocalDate dateOfBirth;
  private float height;
  private float weight;
  private Long breedId;

  /**
   * Getter fo id
   *
   * @return id
   */
  public Long getId() {
    return id;
  }

  /**
   * Setter for id
   *
   * @param id to be set
   * @return this horse
   */
  public Horse setId(Long id) {
    this.id = id;
    return this;
  }

  /**
   * Getter for name
   * @return name
   */
  public String getName() {
    return name;
  }

  /**
   * Setter for name
   *
   * @param name to be set
   * @return this horse
   */
  public Horse setName(String name) {
    this.name = name;
    return this;
  }

  /**
   * Getter for sex
   *
   * @return this sex
   */
  public Sex getSex() {
    return sex;
  }

  /**
   * Setter for set
   *
   * @param sex to be set
   * @return this horse
   */
  public Horse setSex(Sex sex) {
    this.sex = sex;
    return this;
  }

  /**
   * Getter for DateOfBirth
   *
   * @return DateOfBirth
   */
  public LocalDate getDateOfBirth() {
    return dateOfBirth;
  }

  public Horse setDateOfBirth(LocalDate dateOfBirth) {
    this.dateOfBirth = dateOfBirth;
    return this;
  }

  public float getHeight() {
    return height;
  }

  public Horse setHeight(float height) {
    this.height = height;
    return this;
  }

  public float getWeight() {
    return weight;
  }

  public Horse setWeight(float weight) {
    this.weight = weight;
    return this;
  }

  public Long getBreedId() {
    return breedId;
  }

  /**
   * Seter for BreedId
   *
   * @breedId of horse
   */
  public Horse setBreedId(Long breedId) {
    this.breedId = breedId;
    return this;
  }

  @Override
  public String toString() {
    return "Horse{"
        + "id=" + id
        + ", name='" + name + '\''
        + ", sex=" + sex
        + ", dateOfBirth=" + dateOfBirth
        + ", height=" + height
        + ", weight=" + weight
        + ", breed=" + breedId
        + '}';
  }
}
