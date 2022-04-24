<template>
  <div class="q-pa-md">
    <q-header>
      <q-toolbar class="bg-primary text-white">
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
        </q-avatar>

        <q-toolbar-title>Pharma Inc</q-toolbar-title>

        <q-btn flat round icon="account_circle" size="lg" />
      </q-toolbar>
    </q-header>

    <div class="row">
      <div class="container text-center">

        <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dolor labore velit quasi dolore eaque voluptatum voluptatibus. Similique ipsum itaque laboriosam magnam saep.</h5>

        <q-table class="no-shadow" binary-state-sort hide-pagination row-key="id" :rows="pharmaData" :columns="pharmaColumns" :rows-per-page-options="[0]" @request="onLoadCurrentFilter" >

          <template v-slot:top>
            <q-input dense outlined square color="dark" class="full-width" v-model="title" label="Search">
              <template v-slot:append>
                <q-icon v-if="title !== ''" name="close" @click="title = ''" class="cursor-pointer" />
              </template>
            </q-input>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td :props="props" key="name">
                <p>{{ props.row.name.title }} {{ props.row.name.first }} {{ props.row.name.last }}</p>
              </q-td>
              <q-td :props="props" key="gender">
                <p class="text-capitalize">{{ props.row.gender }}</p>
              </q-td>
              <q-td :props="props" key="birth">
                <p>{{ dateFormated(props.row.dob.date) }} - {{ props.row.dob.age }} anos</p>
              </q-td>
              <q-td :props="props" key="action">
                <q-btn color="dark" size="sm" label="Visualizar" class="text-capitalize" />
              </q-td>
            </q-tr>
          </template>

          <template v-slot:bottom>
            <div class="col-12 q-my-md">
              <div class="flex justify-center">
                <q-btn flat class="text-capitalize" color="purple" label="Loading more..." @click="loadingMore()" />
              </div>
            </div>
          </template>

          <template v-slot:no-data>
            <div class="row full-width">
              <div class="q-mt-xs q-px-xs col-12">
                <p>Nenhum registro encontrado</p>
              </div>
            </div>
          </template>

        </q-table>

      </div>
    </div>

  </div>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'IndexPage',

  data () {
    return {
      title: '',
      pharmaData: [],
      pharmaColumns: [
        { align:'center', name: 'name', field: rows => rows.name.first, label: 'Name', sortable: true },
        { align:'center', name: 'gender', field: 'gender', label: 'Gender' },
        { align:'center', name: 'birth', field: rows => rows.dob.date, label: 'Birth' },
        { align:'center', name: 'action', field: 'action', label: 'Actions' }
      ]
    }
  },

  mounted () {
    this.onLoadCurrentFilter()
  },

  methods: {

    onLoadCurrentFilter () {
      this.$axios({ method: 'get', url: 'https://randomuser.me/api/' })
        .then((response) => {
          this.pharmaData = response.data.results
        })
        .catch((err) => {
          console.log(err)
        })
    },

    dateFormated (value) {
      return date.formatDate(value, 'DD/MM/YYYY')
    }
  }
}
</script>

<style lang="sass">

.container
  max-width: 50vw
  margin: 3rem auto 0

</style>