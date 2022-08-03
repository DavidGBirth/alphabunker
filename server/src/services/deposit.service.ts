import { PrismaClient, Account } from "@prisma/client";
import { Deposit } from "../models/deposit";
import { APIResponse } from "../models/response";
import bcrypt from "bcrypt"
//import { Account } from "../models/account";
import { Transaction } from "../models/transaction";
import { AccountsTable } from "../repositories/account";
import { TransactionsTable } from "../repositories/transaction";

class DepositService {
  private accountsTable = AccountsTable
  private transactionsTable = new TransactionsTable()

  public async execute(deposit: Deposit): Promise<APIResponse> {

    deposit.agencyNumber = Number(deposit.agencyNumber)
    deposit.agencyVerificationCode = Number(deposit.agencyVerificationCode),
    deposit.accountNumber = Number(deposit.accountNumber),
    deposit.accountVerificationCode = Number(deposit.accountVerificationCode)
    
    const x = deposit.agencyNumber
    const w = deposit.agencyVerificationCode
    const y = deposit.accountNumber
    const z = deposit.accountVerificationCode
    //console.log("This is the deposit", deposit)
    
    const info = {
      agencyNumber: x,
      agencyVerificationCode: w,
      accountNumber: y,
      accountVerificationCode: z,
      balance: 0,
      fee: 0
    }

    const account = await new this.accountsTable().find(x, w, y, z)

    if (account) {
      const passwordIsEqual = await bcrypt.compare(deposit.password, account.password)
      
      const value = Number(deposit.value)
      const fee = value * 0.1
      
      if (passwordIsEqual) {
        account.balance += value
        account.balance -= fee
        let check = await new this.accountsTable().update(account)


        const transaction: Transaction = {
          accountId: account.id,
          type: "deposit",
          value,
          fee
        }

        
        await this.transactionsTable.insert(transaction)

        info.balance = account.balance,
        info.fee = fee
      }
    }

    return {
      data: info,
      messages: []
    } as APIResponse
  }
  
}

export { DepositService }