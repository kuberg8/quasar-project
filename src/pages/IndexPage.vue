<template>
  <q-page>
    <div class="q-pa-md">
      <h2>Управление учетными записями</h2>
      <q-btn label="+" @click="addAccount" color="primary" class="q-mb-md" />

      <q-form v-for="(account, index) in accounts" :key="index" class="grid" ref="form">
        <q-input
          v-model="account.label"
          label="Метка"
          hint="Введите текстовые метки через ;"
          outlined
          dense
          @blur="save(account)"
          :error="account.label.length > 50"
          no-error-icon
        />

        <q-select
          v-model="account.type"
          :options="accountTypes"
          option-value="value"
          option-label="label"
          label="Тип записи"
          :error="account.touched.type && hasError(account.type)"
          :error-message="'Поле обязательно'"
          @blur="save(account, 'type')"
          outlined
          dense
          no-error-icon
        />

        <q-input
          v-model="account.login"
          label="Логин"
          :error="account.touched.login && (hasError(account.login) || account.login.length > 100)"
          :error-message="account.login.length > 100 ? 'Максимум 100 символов' : 'Поле обязательно'"
          @blur="save(account, 'login')"
          outlined
          dense
          no-error-icon
          :class="{ 'grid-2': account.type?.value !== 'local' }"
        />

        <q-input
          v-if="account.type?.value === 'local'"
          v-model="account.password"
          type="password"
          label="Пароль"
          :error="
            account.touched.password &&
            (hasError(account.password) || account.password?.length > 100)
          "
          :error-message="
            account.password.length > 100 ? 'Максимум 100 символов' : 'Поле обязательно'
          "
          @blur="save(account, 'password')"
          outlined
          dense
          no-error-icon
        />

        <div>
          <q-btn @click="removeAccount(index)" flat round>
            <q-icon name="delete" />
          </q-btn>
          <q-icon
            :style="{ opacity: account.saved ? 1 : 0, transition: '0.3s' }"
            name="done"
            color="green"
            size="md"
          />
        </div>
      </q-form>
    </div>

    <pre style="margin: 20px">
      RESULT
      {{ JSON.stringify(accountStore.accounts, null, 3) }}
    </pre>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAccountStore } from 'src/stores/useStore'
import type { AccountType } from 'src/entities/account'

const accountStore = useAccountStore()

type AccountFormType = {
  label: string
  value: AccountType
}

interface IAccountForm {
  label: string
  type: AccountFormType | undefined | null
  login: string
  password: string
  saved: boolean
  touched: Record<string, boolean>
}

interface IAccountMaped {
  label: { text: string }[]
  type: AccountType
  login: string
  password?: string
}

const accountTypes: AccountFormType[] = [
  { label: 'LDAP', value: 'LDAP' },
  { label: 'Локальная', value: 'local' },
]

const accounts = ref<IAccountForm[]>(
  accountStore.accounts.map((account) => ({
    label: account.label?.map(({ text }) => text).join('; ') ?? '',
    type: accountTypes.find((type) => type.value === account.type),
    login: account.login,
    password: account.password ?? '',
    saved: true,
    touched: {},
  })),
)

const hasError = (value: unknown) => {
  return !value
}

const addAccount = () => {
  accounts.value.push({
    label: '',
    type: null,
    login: '',
    password: '',
    saved: false,
    touched: {},
  })
}

const removeAccount = (index: number) => {
  accounts.value.splice(index, 1)
  save()
}

const save = (account?: IAccountForm, field?: string) => {
  if (account) {
    if (field) account.touched[field] = true
    if (account.login && (account.type?.value === 'LDAP' || account.password)) {
      account.saved = true
    } else {
      account.saved = false
    }
  }

  accountStore.setAccounts(
    accounts.value
      .filter(
        (account) =>
          account.login && account.type && (account.type.value === 'LDAP' || account.password),
      )
      .map((account) => {
        const accountMaped: IAccountMaped = {
          label: account.label.split(';').map((str) => ({ text: str.trim() })),
          login: account.login,
          type: account.type!.value,
        }

        if (accountMaped.type === 'local') {
          accountMaped.password = account.password
        }

        return accountMaped
      }),
  )
}
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 0.6fr 1fr 1fr auto;
  gap: 1rem;
  max-width: 60vw;
  margin-bottom: 20px;
}

.grid-2 {
  grid-column: 3/5;
}

pre {
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 15px;
  overflow: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
