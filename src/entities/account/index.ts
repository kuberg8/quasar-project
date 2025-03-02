export type AccountType = 'LDAP' | 'local'

export interface IAccount {
  type: AccountType
  login: string
  password?: string | null
  label?: { text: string }[]
}
