
import newPrisma from "../../prisma/PrismaService"
import { Transaction } from "../models/transaction"

class TransactionsTable {
  private prisma = newPrisma;

  public async find(agencyNumber: number, agencyVerificationCode: number, accountNumber: number, accountVerificationCode: number) {
    return await this.prisma.account.findFirst({
      where: {
        agencyNumber,
        agencyVerificationCode,
        accountNumber,
        accountVerificationCode
      }
    })
  }

  public async insert(transaction: Transaction) {
    return await this.prisma.transaction.create({ data: transaction })
  }
}

export { TransactionsTable }