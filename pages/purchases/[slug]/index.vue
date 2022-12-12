<template>
  <h1>{{ slug }}</h1>
</template>

<script setup>
const { slug } = useRoute().params;
useHead({
  titleTemplate: 'slug',
});
</script>

<style scoped></style>
