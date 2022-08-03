interface Account {
  id?: string
  agencyNumber: number
  agencyVerificationCode: number
  accountNumber: number
  accountVerificationCode: number
  password: string
  balance: number
  userId: string
}

export { Account }