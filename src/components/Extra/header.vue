<template>
  <div>
    <div class="app">
      <router-link :to="{ name: 'DashBoard' }">Dashboard</router-link>
      <router-link :to="{ name: 'ProfileView' }">Profile</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style>
  .app {
    background-color: white;
    border-width: 0vw;
    border-bottom-width: 0.2vw;
    border-left-width: 0.1vw;
    border-right-width: 0.1vw;
    border-radius: 0.25vw;
    border-style: solid;
    border-color: #4938f8;
  }
</style>
