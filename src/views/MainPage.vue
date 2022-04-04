<template>
  <div class="columns is-marginless has-text-centered">
    <div class="column">
      <div class="title m-3">Willkommen beim Wichtelgenerator 2.0</div>
      <div class="subtitle m-6">Wichtel dich glücklich.</div>

      <div class="container has-text-justified">
        Damit Tante Ingrid dieses Jahr nicht wieder zwei Geschenke bekommt und
        der kleine Tobi leer ausgeht, stellen wir euch pünktlich zur
        Weihnachtszeit den Wichtelgenerator 2.0 vor. Neben den teilnehmenden
        Wichtelmännchen und -frauchen könnt ihr zusätzlich das Budget, den Ort
        und das Datum der Wichtelparty festlegen, damit auch wirklich jeder
        Bescheid weiß. Als optionales Feature könnt ihr zudem Restriktionen
        festlegen. Über diese könnt ihr gewünschte oder ungewünschte
        Kombinationen einstellen - damit Tante Helen nicht wieder ihren Erzfeind
        Helmut beschenken muss. Zu guter Letzt bekommt jeder Teilnehmer eine
        personalisierte Mail mit allen Details zur Wichtelparty und natürlich
        seiner Zielperson.
      </div>

      <button
        class="button is-danger m-3"
        @click="$router.push({ name: 'Event' })"
      >
        <span class="icon">
          <i class="fas fa-play fa-lg"></i>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainPage",
};
</script>

<style scoped></style>
