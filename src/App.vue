<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',

  mounted() {
    console.log(this);
  },
}
</script>

<style></style>
