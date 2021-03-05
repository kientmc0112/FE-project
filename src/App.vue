<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <Header />
    <Sidebar />
    <Footer /> -->
    <router-view />
  </div>
</template>

<script>
// import Header from './components/commons/Header.vue'
// import Footer from './components/commons/Footer.vue'
// import Sidebar from './components/commons/Sidebar.vue'

export default {
  name: 'App',
  // components: {
  //   Header,
  //   Sidebar,
  //   Footer
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
