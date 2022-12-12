<template>
  <h1>{{ slug }} Stats</h1>
</template>

<script setup>
const { slug } = useRoute().params;
useHead({
  titleTemplate: 'Stats | ' + slug,
});
</script>

<style scoped></style>
