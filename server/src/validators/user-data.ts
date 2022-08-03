import { User } from "../models/user"
import { NameValidator } from "./name"

class UserDataValidator {
  public user: Partial<User>
  public errors: string

  private nameValidator = NameValidator

  public constructor(user: User) {
    this.errors = ""
    this.user = this.validate(user)
  }

  private validate(user: User): Partial<User> {
    const validName = new this.nameValidator(user.name)

    this.errors = this.errors.concat(`${validName.errors}`)

    const userData: Partial<User> = {
      name: validName.name,
      email: user.email,
      birthdate: user.birthdate,
      cpf: user.cpf,
      password: user.password
    }

    return userData
  }
}

export { UserDataValidator }