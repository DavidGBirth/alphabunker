import { PrismaClient } from "@prisma/client"
import { APIResponse } from "../models/response"
import { Extract } from "../models/extract"
import bcrypt from "bcrypt"

class ExtractService {
  private prisma = new PrismaClient()

  public async execute(extract: Extract): Promise<APIResponse> {
    const x = Number(extract.agencyNumber)
    const w = Number(extract.agencyVerificationCode)
    const y = Number(extract.accountNumber)
    const z = Number(extract.accountVerificationCode)

    const account: any = await this.prisma.account.findFirst({
      where: {
        agencyNumber: x,
        agencyVerificationCode: w,
        accountNumber: y,
        accountVerificationCode: z
      }
    })

    const passwordIsEqual = await bcrypt.compare(extract.password, account.password)

    //console.log("Result: ", passwordIsEqual)
    
    const fee = 1
    
    if (passwordIsEqual) {
      account.balance -= fee
      let check = await this.prisma.account.update({
        where: { id: account.id },
        data: account,
      })
    }
    
    const info = await this.prisma.transaction.findMany({
      where: {
        accountId: account.id
      },
      orderBy: [
        {
          date: 'desc',
        },
      ],
      select: {
        date: true,
        type: true,
        value: true,
        fee: true,
      }
    })

    console.log("Extract Test", x)

    return {
      data: info,
      messages: []
    } as APIResponse
  }
  
}

export { ExtractService }