<template>
 <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>-->
   <div class="App">
  <router-view/>
  </div>
</template>

<style>
*{
  box-sizing:border-box;
}

body{
   height:100%;
     margin: 0;
     background-color:  #00337C;
}
#app {
  font-family: 'Segoe Print', Tahoma, Geneva, Verdana, sans-serif, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  text-align: center;
 /*background-color: #2c3e50;*/
  margin: auto;
 display: flex;
 flex-direction: column;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
