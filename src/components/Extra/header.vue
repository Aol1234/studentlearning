<template>
  <div>
    <div class="app">
      <router-link class="link" :to="{ name: 'DashBoard' }">Dashboard</router-link>
      <router-link class="link" :to="{ name: 'ProfileView' }">Profile</router-link>
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
    background-color: #4938f8;
    color: white;
    border-bottom-width: 0.2vw;
    border-radius: 0.1vw;
    border-style: solid;
    border-color: #4938f8;
  }
  .link{
    color: white;
  }
  .link:hover{
    color: white;
  }
</style>
