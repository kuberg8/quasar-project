import { defineStore } from 'pinia'
import type { IAccount } from 'src/entities/account'

interface AccountStoreState {
  accounts: IAccount[]
}

export const useAccountStore = defineStore('accountStore', {
  state: (): AccountStoreState => {
    const storedAccounts = localStorage.getItem('accounts')

    let accounts: IAccount[]
    try {
      accounts = storedAccounts ? JSON.parse(storedAccounts) : []
    } catch (error) {
      console.error('Error parsing accounts from localStorage:', error)
      accounts = []
    }

    return {
      accounts,
    }
  },
  actions: {
    addAccount(account: IAccount) {
      this.accounts.push(account)
    },
    setAccounts(accounts: IAccount[]) {
      this.accounts = accounts
      localStorage.setItem('accounts', JSON.stringify(this.accounts))
    },
  },
})
