interface Transfer {
  agencyNumber: number
  agencyVerificationCode: number
  accountNumber: number
  accountVerificationCode: number
  newAgencyNumber: number
  newAgencyVerificationCode: number
  newAccountNumber: number
  newAccountVerificationCode: number
  password: string
  value: number
}

export { Transfer }