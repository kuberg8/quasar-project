import { defineStore } from 'pinia'
import type { IAccount } from 'src/entities/account'

interface AccountStoreState {
  accounts: IAccount[]
}

export const useAccountStore = defineStore('accountStore', {
  state: (): AccountStoreState => ({
    accounts: [],
  }),
  actions: {
    addAccount(account: IAccount) {
      this.accounts.push(account)
    },
  },
})
