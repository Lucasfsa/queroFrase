<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
  <notifications :speed="100" :duration="1500" />

</template>

<style scoped>

</style>
