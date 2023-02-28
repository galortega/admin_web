import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    drivers: []
  }),
  actions: {
    async fetchDrivers() {
      // Make a request to your API to get the list of drivers
      const response = await fetch('localhost:8000/api/drivers')
      const data = await response.json()
      this.drivers = data
    }
  }
})
