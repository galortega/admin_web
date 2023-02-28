<template>
  <div class="navbar bg-base-100 shadow-xl rounded-box">
    <div class="flex-1">
      <RouterLink to="/" class="btn btn-ghost normal-case text-xl">Order Dispatcher</RouterLink>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal p-0 rounded-lg">
        <li><RouterLink to="/">Orders</RouterLink></li>
        <li class="bg-slate-300 rounded-lg"><RouterLink to="/new">New Order</RouterLink></li>
      </ul>
    </div>
  </div>
</template>
