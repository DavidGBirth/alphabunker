import { Request, Response } from "express";
import { APIResponse } from "../models/response";
import { WithdrawService } from "../services/withdraw.service";

class WithdrawController {
  private service = new WithdrawService()
  
  public async handle(req: Request, res: Response) {
    try {
      const response = await this.service.execute(req.body)
      console.log("Response", response)
      res.status(201).json(response);
    } catch(err) {
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

export { WithdrawController }