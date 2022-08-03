import { PrismaClient } from "@prisma/client";
import { APIResponse } from "../models/response";
import { Withdraw } from "../models/withdraw";
import bcrypt from "bcrypt"
import { Transaction } from "../models/transaction";


class WithdrawService {
  private prisma = new PrismaClient()

  public async execute(withdraw: Withdraw): Promise<APIResponse> {

    withdraw.agencyNumber = Number(withdraw.agencyNumber)
    withdraw.agencyVerificationCode = Number(withdraw.agencyVerificationCode),
    withdraw.accountNumber = Number(withdraw.accountNumber),
    withdraw.accountVerificationCode = Number(withdraw.accountVerificationCode)
    
    const x = withdraw.agencyNumber
    const w = withdraw.agencyVerificationCode
    const y = withdraw.accountNumber
    const z = withdraw.accountVerificationCode
    //console.log("This is the withdraw", withdraw)

    const account: any = await this.prisma.account.findFirst({
      where: {
        agencyNumber: x,
        agencyVerificationCode: w,
        accountNumber: y,
        accountVerificationCode: z
      }
    })
    //console.log("Account", account)

    const passwordIsEqual = await bcrypt.compare(withdraw.password, account.password)

    //console.log("Result: ", passwordIsEqual)
    
    const value = Number(withdraw.value)
    const fee = 4
    
    if (passwordIsEqual) {
      account.balance -= value + fee
      let check = await this.prisma.account.update({
        where: { id: account.id },
        data: account,
      })

      console.log("Check ", check)

      const transaction: Transaction = {
        accountId: account.id,
        type: "withdraw",
        value,
        fee
      }

      
      await this.prisma.transaction.create({
        data: transaction,
      })
    }
    
    const info = {
      agencyNumber: withdraw.agencyNumber,
      agencyVerificationCode: withdraw.agencyVerificationCode,
      accountNumber: withdraw.accountNumber,
      accountVerificationCode: withdraw.accountVerificationCode,
      balance: account.balance,
      fee: fee
    }

    return {
      data: info,
      messages: []
    } as APIResponse
  }
  
}

export { WithdrawService }