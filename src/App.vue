<template>
  <div id="app">
    <v-card-text id="navbar">
      <router-link :to="{ name: 'DashBoard' }">Dashboard</router-link>
      <router-link :to="{ name: 'Profile' }">Profile</router-link>
    </v-card-text>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#navbar {
float: top;
text-align: center;

}
</style>
