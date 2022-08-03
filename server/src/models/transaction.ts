interface Transaction {
  accountId: string
  type: string
  value: number
  fee: number
}

export { Transaction }