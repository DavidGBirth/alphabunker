interface Deposit {
  agencyNumber: number
  agencyVerificationCode: number
  accountNumber: number
  accountVerificationCode: number
  password: string
  value: number
}

export { Deposit }