export type AccountType = 'LDAP' | 'local'

export interface IAccount {
  login: string
  password: string | null
  type: AccountType
  mark?: string
}
