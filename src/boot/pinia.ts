import { boot } from 'quasar/wrappers'
import { createPinia } from 'pinia'

import type { Router } from 'vue-router'

/*
 * When adding new properties to stores, you should also
 * extend the `PiniaCustomProperties` interface.
 * @see https://pinia.vuejs.org/core-concepts/plugins.html#typing-new-store-properties
 */
declare module 'pinia' {
  export interface PiniaCustomProperties {
    readonly router: Router
  }
}

export default boot(({ app }) => {
  const pinia = createPinia()
  app.use(pinia)
})
