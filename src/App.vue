<template>
  <v-app>
    <nav-bar></nav-bar>
    <v-content>
      <main>
        <router-view>
          <router-link to="/">Home</router-link> 
          <router-link to="/about">About</router-link>
        </router-view>
      </main>
           <v-card height="0">
              <v-footer fixed class="font-weight-medium">
                <v-flex text-center xs12>
                  {{ new Date().getFullYear() }} — <strong>Footer With Vuetify</strong>
                </v-flex>
              </v-footer>
        </v-card>  
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: {
    'nav-bar': Navbar,
  },
  data(){
    return {

    }
  }
}
</script>


<style>

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
