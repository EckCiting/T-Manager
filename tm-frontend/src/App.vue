<template>
  <v-app style="background-color:#f1f2f8; width:100%; height:100%;">
    <!-- navigation bar -->
    <div
      style="position:fixed; width:100%; display:flex; justify-content:center; z-index:5"
    >
      <navBar></navBar>
    </div>
    <!-- page background -->
    <div class="thisPage"></div>
    <!-- page detail -->
    <v-main style="padding-top:85px;">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import navBar from "@/components/navBar";
export default Vue.extend({
  name: "App",
  components: {
    navBar
  }
});
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.thisPage {
  position: fixed;
  width: 100%;
  height: 100%;
  /* background picture */
  background-image: url("assets/TmanagerLogo_l4.5.svg");
  background-size: 750px;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
