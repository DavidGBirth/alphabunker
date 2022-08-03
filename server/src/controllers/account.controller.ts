import { Request, Response } from "express";
import { APIResponse } from "../models/response";
import { AccountService } from "../services/account.service";


class AccountController {
  private service = new AccountService()
  
  public async create(req: Request, res: Response) {
    try {
      const response = await this.service.create(req.body)
      res.status(201).json(response);
    } catch (err) {
      const [statusCode, messages] = err.message.split(": ")
      if (Number(statusCode)) {
        res.status(statusCode).json({
          data: {},
          messages: messages.split("|").filter((message: string) => message !== "")
        } as APIResponse)
      } else {
        res.status(500).json({
          data: {},
          messages: messages.split("|")
        } as APIResponse)
      }
    }
  }
}

export { AccountController }