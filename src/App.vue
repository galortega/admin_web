<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <body class="bg-slate-100">
    <TheNavbar />
    <div class="sm:flex container p-5 mx-auto content justify-between flex-wrap">
      <RouterView class="view main-content w-full"></RouterView>
    </div>
    <TheFooter />
  </body>
</template>
