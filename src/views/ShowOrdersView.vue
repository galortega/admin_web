<template>
  <div class="h-screen">
    <div class="flex my-10">
      <h1 class="mx-auto text-bold text-4xl">Current Orders</h1>
    </div>
    <div class="overflow-x-auto container shadow-lg rounded-lg">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Driver</th>
            <th>Store</th>
            <th>Status</th>
            <th>Created at</th>
            <th>Assigned at</th>
            <th>Delivered at</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="order.id">
            <th>{{ index + 1 }}</th>
            <td>{{ order.origin_lat }}, {{ order.origin_lng }}</td>
            <td>{{ order.dest_lat }}, {{ order.dest_lng }}</td>
            <td>{{ order.driver?.name }}</td>
            <td>{{ order.store.name }}</td>
            <td>{{ order.status }}</td>
            <!--show order.created_at (unix) as a formatted date with hours and minutes-->
            <td>{{ new Date(order.created_at * 1000).toLocaleString() }}</td>
            <!--show order.assigned_at (unix) as a formatted date if exists-->
            <td>{{ order.assigned_at ? new Date(order.assigned_at * 1000).toLocaleString() : 'N/A' }}</td>
            <!--show order.delivered_at (unix) as a formatted date if exists-->
            <td>{{ order.delivered_at ? new Date(order.delivered_at * 1000).toLocaleString() : 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrentOrders',
  data() {
    return {
      orders: []
    }
  },
  mounted() {
    fetch('http://localhost:8000/api/orders')
      .then((res) => res.json())
      .then((data) => {
        this.orders = data
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>
