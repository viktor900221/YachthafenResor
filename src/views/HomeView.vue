<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
   <navbar></navbar>
    <HomeHeader></HomeHeader>
    <img  id="bedienung" alt="bedienung" src="../assets/logo100.png">
    <Liegeplatz></Liegeplatz>  
  </div>
</template>

<script>
// @ is an alias to /src

import HomeHeader from '@/components/HomeHeader.vue';
import Liegeplatz from '@/components/Liegeplatz.vue';
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'HomeView',
  components: {
    
    HomeHeader,
    Liegeplatz,
    Navbar,
  }
}
</script>

<style scoped>
#Logo {
    width: 200px;
    height: 100px;
}

#bedienung {
    width: 150px;
    height: 150px;
}

</style>