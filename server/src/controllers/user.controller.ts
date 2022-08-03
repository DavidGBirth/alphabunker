import { Request, Response } from "express";
import { APIResponse } from "../models/response";
import { UserService } from "../services/user.service";
import { User } from "../models/user";

class UserController {
  private service = new UserService()

  /* public async find(user: User) {
    try {
      const response = await this.service.find(user)
      console.log(response)
      return response
    } catch (err) {
      console.log("Do nothing")
    }
  } */

  public create(user: User) {
    try {
      const response = this.service.create(user)
      return response;
    } catch (err) {
      const [statusCode, messages] = err.message.split(": ")
      if (Number(statusCode)) {
        return ({
          data: {},
          messages: messages.split("|").filter((message: string) => message !== "")
        } as APIResponse)
      } else {
        return ({
          data: {},
          messages: messages.split("|")
        } as APIResponse)
      }
    }
  }
}

export { UserController }