<template>
  <div id="app">
    <!-- background from: https://csshint.com/css-snow-effects/ -->
    <div class="snowflake">❅</div>
    <div class="snowflake">❅</div>
    <div class="snowflake">❅</div>
    <div class="snowflake">❅</div>
    <div class="snowflake">❅</div>
    <div class="snowflake">❅</div>
    <div class="snowflake">❅</div>
    <div class="snowflake">❅</div>
    <div class="snowflake">❅</div>
    <div class="snowflake">❅</div>
    <div class="snowflake">❅</div>
    <div class="snowflake">❅</div>
    <div class="snowflake">❅</div>
    <div class="snowflake">❅</div>
    <div class="snowflake">❅</div>

    <div class="has-text-left p-2">
      <a href="https://handy-solutions.de">
        <img
          :src="require('@/assets/logo_v2.1_small.svg')"
          alt="Official handy-solutions logo"
          style="max-width: 40px; width: 100%; height: auto"
        />
      </a>
    </div>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <ModalDialog
      :_title="this.$store.state.dialog._title"
      :_body="this.$store.state.dialog._body"
      :isActive="this.$store.state.dialog.isActive"
      :yesFunction="this.$store.state.dialog.yesFunction"
      :noFunction="this.$store.state.dialog.noFunction"
      :closeFunction="this.$store.state.dialog.closeFunction"
    />

    <ModalAlert
      :_title="this.$store.state.alert._title"
      :_body="this.$store.state.alert._body"
      :isActive="this.$store.state.alert.isActive"
      :okFunction="this.$store.state.alert.okFunction"
      :closeFunction="this.$store.state.alert.closeFunction"
    />
  </div>
</template>

<script>
import "../node_modules/bulma/css/bulma.css";
import "../node_modules/bulma-calendar/dist/css/bulma-calendar.min.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";

import ModalDialog from "./components/ModalDialog.vue";
import ModalAlert from "./components/ModalAlert";

export default {
  name: "App",

  components: { ModalDialog, ModalAlert },
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

$myGrey: #bfc3c9;
$myWhite: #ffffff;

#app {
  min-height: 100vh;
  background-position: center;
  // background-image: linear-gradient($myGrey, $myWhite);
  background-image: url("~@/assets/background.png");
  background-size: cover;
  background-attachment: fixed;
}

.snowflake {
  color: #fff;
  font-size: 1em;
  font-family: Arial;
  text-shadow: 0 0 1px #000;
}

@-webkit-keyframes snowflakes-fall {
  0% {
    top: -10%;
  }
  100% {
    top: 100%;
  }
}
@-webkit-keyframes snowflakes-shake {
  0% {
    -webkit-transform: translateX(0px);
    transform: translateX(0px);
  }
  50% {
    -webkit-transform: translateX(80px);
    transform: translateX(80px);
  }
}
@keyframes snowflakes-fall {
  0% {
    top: -10%;
  }
  100% {
    top: 100%;
  }
}
@keyframes snowflakes-shake {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(80px);
  }
}
.snowflake {
  position: fixed;
  top: -10%;
  z-index: 9999;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
  -webkit-animation-name: snowflakes-fall, snowflakes-shake;
  -webkit-animation-duration: 10s, 3s;
  -webkit-animation-timing-function: linear, ease-in-out;
  -webkit-animation-iteration-count: infinite, infinite;
  -webkit-animation-play-state: running, running;
  animation-name: snowflakes-fall, snowflakes-shake;
  animation-duration: 10s, 3s;
  animation-timing-function: linear, ease-in-out;
  animation-iteration-count: infinite, infinite;
  animation-play-state: running, running;
}

@function random-decimal($max) {
  @return random($max) / 10;
}

@mixin random-animation-delay(
  $anim1: random-decimal(100),
  $anim2: random-decimal(25)
) {
  -webkit-animation-delay: $anim1 + s, $anim2 + s;
  animation-delay: $anim1 + s, $anim2 + s;
}

$snowflakes: 15;

@for $i from 1 through $snowflakes {
  .snowflake:nth-of-type(#{$i}) {
    left: random(100) + vw;
    margin-left: -40px;
    @include random-animation-delay();
  }
}
</style>
