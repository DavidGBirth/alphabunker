import { APIResponse } from "../models/response";
import { User } from "../models/user";
import { UserDataValidator } from "../validators/user-data";
import { UsersTable } from "../repositories/user";

class UserService {
  private userDataValidator = UserDataValidator
  private usersTable = new UsersTable()
  //private emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  /* public async find(user: User) {
    return new this.usersTable().find(user)
  } */

  public async create(user: User): Promise<APIResponse> {
    /* if (this.emailRegex.test(user.email)) {
      this.errors = this.errors += "email:invalid email|"
    } 

    if(!new Date(user.birthdate).getTime()) {
      this.errors = this.errors += "birthdate:invalid date"
    } */
    console.log("Entrou no service", user)

    const validatedUser = new this.userDataValidator(user)

    if (validatedUser.errors) {
      throw new Error(`400: ${validatedUser.errors}`);
    }

    console.log("Antes de entrar no repository")
    const insertedUser = await this.usersTable.insert(validatedUser.user as User)

    return {
      data: insertedUser,
      messages: []
    } as APIResponse
  }
}

export { UserService }