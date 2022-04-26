<template>
  <q-layout class="q-pa-md">
    <router-view />

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

        <q-table class="no-shadow" separator="cell" hide-pagination row-key="id" :rows="pharmaData" :columns="pharmaColumns" :pagination="pagination" :rows-per-page-label="'50'" @request="onLoadCurrentFilter" >

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
                <q-btn color="dark" size="sm" label="Visualizar" class="text-capitalize" :to="{ name: 'r_pacient_view', params: { pacientId: props.row.login.uuid }}" />
              </q-td>
            </q-tr>
          </template>

          <template v-slot:bottom="scope">
            <div class="col-12 q-my-md" v-if="scope.pagination.rowsPerPage < this.limitCount">
              <div class="flex justify-center">
                <q-btn flat class="text-capitalize" color="purple" label="Loading more..." @click="loadingMore(scope)" />
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

  </q-layout>
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
      ],
      limitCount: 50,

      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10
      }
    }
  },

  mounted () {
    this.onLoadCurrentFilter()
  },

  methods: {

    onLoadCurrentFilter () {
      this.$axios({ method: 'get', url: `https://randomuser.me/api/?results=${this.limitCount}&nat=us,br` })
        .then((response) => {
          this.pharmaData = response.data.results
        })
        .catch((err) => {
          console.log(err)
        })
    },

    loadingMore (variable) {
      variable.pagination.rowsPerPage += 10
    },

    dateFormated (value) {
      return date.formatDate(value, 'DD/MM/YYYY')
    },

    goToPacientView (pacientData) {
      console.log(pacientData.params.id)
      this.$router.push({ name: 'r_pacient_view', params: { pacientId: pacientData.params.id.login.uuid } })

    }
  }
}
</script>

<style lang="sass">

.container
  max-width: 50vw
  margin: 3rem auto 0

</style>