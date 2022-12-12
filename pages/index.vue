<template>
  <h1>Shopping List</h1>

  <div class="flex" v-for="product in activePurchase.products">
    <span class="label-text">{{ product.name }}</span>
    <span class="label-text">Unit Price: {{ product.price }} Ft</span>
    <span class="label-text">Price: {{ product.price * product.amount }} Ft</span>
    <input
      type="number"
      placeholder="Amount"
      :value="product.amount"
      class="input input-bordered max-w-xs" />
    <button class="btn btn-warning">Modify</button>
    <button class="btn btn-error">Delete</button>
  </div>

  <form>
    <select class="select select-bordered w-full max-w-xs">
      <option disabled selected>Add New Product</option>
      <option v-for="productType in productTypes" :value="productType.id">
        {{ productType.name }}
      </option>
    </select>
    <input type="number" placeholder="Amount" value="1" class="input input-bordered max-w-xs" />
    <button class="btn btn-primary">Add</button>
  </form>
  <button class="btn btn-primary">Finish Shopping</button>
</template>

<script setup>
useHead({
  titleTemplate: 'Shopping List',
});
const productTypes = await $fetch('/api/getProducts');
const activePurchase = await $fetch('/api/getActivePurchase');
</script>

<style scoped></style>
