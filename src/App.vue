<template>
  <router-view />
</template>

<script setup lang="ts">
import { useAccountStore } from 'src/stores/useStore'

useAccountStore()
</script>
