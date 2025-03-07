<template>
  <div class="container">
    <div class="block" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.container {
  display: flex;
  min-height: calc(100vh - 50px);
}

.block {
  margin: auto;
  height: 100px;
  aspect-ratio: 1/1;
  background-color: black;
}
</style>
