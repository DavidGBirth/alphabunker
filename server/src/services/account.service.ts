import { APIResponse } from "../models/response";
import { User } from "../models/user";
import { Account } from "../models/account";
import { UserController } from "../controllers/user.controller";
import bcrypt from 'bcrypt'
import { UsersTable } from "../repositories/user";
import { AccountsTable } from "../repositories/account";
import { UserService } from "./user.service";

const generateNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const generateAccount = (password: string, balance: number, userId: string): Account => {
  return {
    agencyNumber: generateNumber(0, 9999),
    agencyVerificationCode: generateNumber(0, 9),
    accountNumber: generateNumber(0, 999999),
    accountVerificationCode: generateNumber(0, 9),
    password,
    balance,
    userId
  }
}

class AccountService {
  private users = new UserService()
  private usersTable = UsersTable
  private accountsTable = AccountsTable

  public async create(user: User): Promise<APIResponse> {
    const thisUser = await new this.usersTable().find(user)
    const account: Account = generateAccount("", 0.0, "")
    bcrypt.hash(user.password, 10, async (errBcrypt, hash) => {
      if (errBcrypt) {
          return { error: errBcrypt };
      } else {
        if (thisUser) {
          account.password = hash
          account.userId = thisUser.id
          await new this.accountsTable().insert(account)
        } else {
          console.log("Antes de entrar no service")
          const newUser = await this.users.create(user)
          account.password = hash
          account.userId = newUser.data.id
          await new this.accountsTable().insert(account)
        }
      }
    })

    const info = {
      agencyNumber: account.agencyNumber,
      agencyVerificationCode: account.agencyVerificationCode,
      accountNumber: account.accountNumber,
      accountVerificationCode: account.accountVerificationCode,
      balance: account.balance,
    }

    return {
      data: info,
      messages: []
    } as APIResponse
  }
  

}

export { AccountService }