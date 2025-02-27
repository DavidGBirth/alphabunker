import { PrismaClient } from "@prisma/client";
import { APIResponse } from "../models/response";
import { Transfer } from "../models/transfer";
import bcrypt from "bcrypt"
import { UsersTable } from "../repositories/user";
import { Transaction } from "../models/transaction";


class TransferService {
  private prisma = new PrismaClient()
  private usersTable = UsersTable

  public async execute(transfer: Transfer): Promise<APIResponse> {

    transfer.agencyNumber = Number(transfer.agencyNumber)
    transfer.agencyVerificationCode = Number(transfer.agencyVerificationCode),
    transfer.accountNumber = Number(transfer.accountNumber),
    transfer.accountVerificationCode = Number(transfer.accountVerificationCode)
    
    const x = transfer.agencyNumber
    const w = transfer.agencyVerificationCode
    const y = transfer.accountNumber
    const z = transfer.accountVerificationCode

    transfer.newAgencyNumber = Number(transfer.newAgencyNumber)
    transfer.newAgencyVerificationCode = Number(transfer.newAgencyVerificationCode),
    transfer.newAccountNumber = Number(transfer.newAccountNumber),
    transfer.newAccountVerificationCode = Number(transfer.newAccountVerificationCode)
    
    const a = transfer.newAgencyNumber
    const b = transfer.newAgencyVerificationCode
    const c = transfer.newAccountNumber
    const d = transfer.newAccountVerificationCode

    const account: any = await this.prisma.account.findFirst({
      where: {
        agencyNumber: x,
        agencyVerificationCode: w,
        accountNumber: y,
        accountVerificationCode: z
      }
    })

    const secondAccount: any = await this.prisma.account.findFirst({
      where: {
        agencyNumber: a,
        agencyVerificationCode: b,
        accountNumber: c,
        accountVerificationCode: d
      }
    })
    console.log(secondAccount);
    const targetUser = await new this.usersTable().findById(secondAccount.userId);
    console.log(targetUser);
    
    const passwordIsEqual = await bcrypt.compare(transfer.password, account.password)
    
    const value = Number(transfer.value)
    const fee = 1
    
    if (passwordIsEqual) {
      account.balance -= value + fee
      secondAccount.balance += value
      await this.prisma.account.update({
        where: { id: account.id },
        data: account,
      })
      await this.prisma.account.update({
        where: { id: secondAccount.id },
        data: secondAccount,
      })

      const transaction: Transaction = {
        accountId: account.id,
        type: "transfer",
        value,
        fee
      }

      
      await this.prisma.transaction.create({
        data: transaction,
      })
    }
    
    const info = {
      agencyNumber: account.agencyNumber,
      agencyVerificationCode: account.agencyVerificationCode,
      accountNumber: account.accountNumber,
      accountVerificationCode: account.accountVerificationCode,
      balance: account.balance,
      fee: fee,
      newAgencyNumber: secondAccount.agencyNumber,
      newAgencyVerificationCode: secondAccount.agencyVerificationCode,
      newAccountNumber: secondAccount.accountNumber,
      newAccountVerificationCode: secondAccount.accountVerificationCode,
      secondBalance: secondAccount.balance,
      nameTargetUser: targetUser?.name
    }

    return {
      data: info,
      messages: []
    } as APIResponse
  }
  
}

export { TransferService }