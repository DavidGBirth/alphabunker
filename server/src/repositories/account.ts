import newPrisma from '../../prisma/PrismaService'
import { Account } from "../models/account"

class AccountsTable {
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

  public async insert(account: Account) {
    console.log("Entrou aqui ", account)
    return await this.prisma.account.create({ data: account })
  }

  public async update(account: Account) {
    return await this.prisma.account.update({
      where: { id: account.id },
      data: account,
    })
  }
}

export { AccountsTable }