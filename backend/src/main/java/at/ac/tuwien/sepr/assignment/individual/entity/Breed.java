package at.ac.tuwien.sepr.assignment.individual.entity;

public class Breed {
  private long id;
  private String name;

  /**
   * Getter for id
   *
   * @return id of horse
   */
  public long getId() {
    return id;
  }

  /**
   * Setter for id
   *
   * @param id for horse
   * @return this
   */
  public Breed setId(long id) {
    this.id = id;
    return this;
  }

  /**
   * Getter for name
   *
   * @return this name
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
  public Breed setName(String name) {
    this.name = name;
    return this;
  }
}
