<template>
  <div class="modal has-text-left" :class="{ 'is-active': isActive }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ _title }}</p>
        <button
          @click="closeFunction"
          class="delete"
          aria-label="close"
        ></button>
      </header>

      <section class="modal-card-body">
        <p>{{ _body }}</p>
      </section>

      <footer class="modal-card-foot">
        <button class="button is-danger m-3" @click="noFunction">
          <span class="icon">
            <i class="fas fa-thumbs-down fa-lg m-3"></i>
          </span>
        </button>
        <button class="button is-danger m-3" @click="yesFunction">
          <span class="icon">
            <i class="fas fa-thumbs-up fa-lg m-3"></i>
          </span>
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalDialog",

  props: {
    _title: String,
    _body: String,
    isActive: Boolean,
    yesFunction: Function,
    noFunction: Function,
    closeFunction: Function,
  },
};
</script>
<style scoped></style>
