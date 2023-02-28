<template>
  <div class="h-screen">
    <div class="flex my-10">
      <h1 class="mx-auto text-bold text-4xl">Create Order</h1>
    </div>
    <form
      ref="orderForm"
      class="container rounded-lg bg-white shadow-lg w-3/5 p-4 mx-auto justify-center"
      @submit.prevent="submitOrder"
    >
      <label class="label block mb-1 text-sm">
        Origin Latitude:
        <input
          class="input w-full border-2 border-slate-200 px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"
          v-model="order.origin_lat"
          type="number"
          step="any"
          required
        />
      </label>
      <label class="label block mb-1 text-sm">
        Origin Longitude:
        <input
          class="input w-full border-2 border-slate-200 px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"
          v-model="order.origin_lng"
          type="number"
          step="any"
          required
        />
      </label>
      <label class="label block mb-1 text-sm">
        Destination Latitude:
        <input
          class="input w-full border-2 border-slate-200 px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"
          v-model="order.dest_lat"
          type="number"
          step="any"
          required
        />
      </label>
      <label class="label block mb-1 text-sm">
        Destination Longitude:
        <input
          class="input w-full border-2 border-slate-200 px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"
          v-model="order.dest_lng"
          type="number"
          step="any"
          required
        />
      </label>
      <label class="label block mb-1 text-sm">
        Store:
        <select
          class="input w-full border-2 border-slate-200 px-4 pr-8 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"
          v-model="order.store_id"
          required
        >
          <option v-for="store in stores" :value="store.id" :key="store.id">
            {{ store.name }}
          </option>
        </select>
      </label>
      <label class="label block mb-1 text-sm">
        Drivers:
        <ul
          class="w-full border-2 border-slate-200 px-4 pr-8 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none divide-y-2 divide-solid"
        >
          <li v-for="driver in drivers" :key="driver.id" class="flex my-auto">
            {{ driver.name }}
            <div class="btn btn-xs ml-auto bg-slate-500">
              Orders count:
              <div class="badge badge-secondary ml-2">{{ driver.orders_count }}</div>
            </div>
          </li>
        </ul>
      </label>
      <button class="btn btn-primary" :class="loading ? 'loading' : ''" type="submit">
        Create Order
      </button>
    </form>
    <div v-if="success || error" class="toast fixed">
      <div class="alert" :class="success ? 'alert-success' : error ? 'alert-error' : ''">
        <div>
          <span v-if="success">New order created.</span>
          <span v-if="error">Error creating order.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postData } from '../utils/postData'
export default {
  data() {
    return {
      drivers: [],
      stores: [],
      order: {
        origin_lat: null,
        origin_lng: null,
        dest_lat: null,
        dest_lng: null,
        store_id: null,
        driver_id: null
      },
      loading: false,
      success: false,
      error: false
    }
  },
  mounted() {
    fetch('http://localhost:8000/api/drivers')
      .then((res) => res.json())
      .then((data) => {
        this.drivers = data
      })
      .catch((err) => {
        console.log(err)
      })
    fetch('http://localhost:8000/api/stores')
      .then((res) => res.json())
      .then((data) => {
        this.stores = data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    submitOrder() {
      this.loading = true
      postData(`http://localhost:8000/api/stores/${this.order.store_id}/orders`, this.order)
        .then((data) => {
          this.order = {
            origin_lat: null,
            origin_lng: null,
            dest_lat: null,
            dest_lng: null,
            store_id: null,
            driver_id: null
          }
          this.success = true
          fetch('http://localhost:8000/api/drivers')
            .then((res) => res.json())
            .then((data) => {
              this.drivers = data
            })
            .catch((err) => {
              console.log(err)
            })
            .then(() => {
              setTimeout(() => {
                this.loading = false
              }, 500)
              setTimeout(() => {
                this.success = false
              }, 2000)
            })
          console.log(data) // JSON data parsed by `data.json()` call
        })
        .catch((err) => {
          setTimeout(() => {
            this.loading = false
          }, 1000)
          this.error = true
          setTimeout(() => {
            this.error = false
          }, 2000)
          console.log(err)
        })
    }
  }
}
</script>
