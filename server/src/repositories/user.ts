import newPrisma from "../../prisma/PrismaService";
import { User } from "../models/user"

class UsersTable {
  private prisma = newPrisma;

  public async find(user: User) {
    return await this.prisma.user.findFirst({
      where: { cpf: user.cpf }
    })
  }

  public async insert(user: User) {
    console.log("User do repository", user)
    return await this.prisma.user.create({
      data: {
        name: user.name,
        cpf: user.cpf,
        birthdate: user.birthdate,
        email: user.email
      }
    })
  }
}

export { UsersTable }