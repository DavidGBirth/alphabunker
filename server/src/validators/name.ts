class NameValidator {
  public name: string
  public errors: string

  public constructor(name: string) {
    this.name = this.validate(name)
    this.errors = ""
  }

  private validate(name: string): string {
    if (!name) {
      this.errors += "name:field required|"
      return ""
    }

    if(name.length < 3) {
      this.errors += "name:name too short|"
      return ""
    }

    return name
  }
}

export { NameValidator }