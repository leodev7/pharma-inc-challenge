<template>
  <q-dialog v-model="pacientModal">
    <q-card class="my-card" v-if="pacientData && pacientData.length >= 1">

      <q-card-section>
        <div class="text-center">
          <q-img class="image" :src="pacientData[0].picture.large" />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="text-center">
          <p>{{ pacientData[0].name.title }} {{ pacientData[0].name.first }} {{ pacientData[0].name.last }}</p>
          <p>Email: {{ pacientData[0].email }}</p>
          <p>Gender: {{ pacientData[0].gender }}</p>
          <p>Birth date: {{ dateFormated(pacientData[0].dob.date) }} - {{ pacientData[0].dob.age }} years</p>
          <p>Phone: {{ pacientData[0].phone }}</p>
          <p>Country: {{ pacientData[0].location.country }}</p>
          <p>Address: {{ pacientData[0].location.street.name }}, {{ pacientData[0].location.street.number }} - {{ pacientData[0].location.city }} - {{ pacientData[0].location.state }}</p>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat label="Back" color="primary" :to="{ path: '/' }" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { date } from 'quasar'

export default {
  data: function() {
    return {
      pacientId: this.$route.params.pacientId,
      pacientDataString: this.$route.params.pacientData
    }
  },
  setup () {
    return {
      pacientModal: true,
      pacientData: []
    }
  },

  mounted () {
    try {
      this.pacientData = JSON.parse(this.pacientDataString)
    } catch (error) {
      this.pacientData = []
      this.$router.push({ name: 'r_home' })
    }
  },

  methods: {
    dateFormated (value) {
      return date.formatDate(value, 'DD/MM/YYYY')
    }
  },
}
</script>

<style lang="sass" scoped>
.image
  border-radius: 50%
  max-width: 200px

</style>