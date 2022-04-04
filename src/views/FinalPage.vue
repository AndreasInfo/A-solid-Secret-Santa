<template>
  <div class="columns is-marginless has-text-centered">
    <div class="column">
      <div class="title m-3">Das war's!</div>
      <div class="subtitle m-6">Bis zu nächsten Jahr?</div>

      <button
        class="button is-danger m-3"
        @click="$router.push({ name: 'MainPage' })"
      >
        <span class="icon">
          <i class="fas fa-home fa-lg m-3"></i>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FinalPage",
};
</script>

<style scoped></style>
