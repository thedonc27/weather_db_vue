<template>
    <nav> 
        <v-app-bar flat app color = "#333F42">
                <v-toolbar-items @click="drawer = !drawer" class="grey--text">
                     <v-app-bar-nav-icon color="#B4975A"></v-app-bar-nav-icon>
                </v-toolbar-items>
                
                <v-toolbar-title class="text-uppercase white--text">
                    <span class = "red--text font-weight-light">Weather</span>
                    <span>Dashboard</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-avatar>
                    <img
                        src="../assets/christian.png"
                        alt="Christian"
                    >
                </v-avatar>
        </v-app-bar>
        <v-navigation-drawer app v-model="drawer" temporary class="red">
            <v-list>
                <v-list-item v-for= "link in links" :key="link.text" router-link :to="link.route">
                    <v-list-item-action>
                        <v-icon class="white--text"> {{link.icon}}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>

export default {
    data(){
        return {
            drawer: false,
            links: [
                {icon:'mdi-home-variant', text: 'Home', route: '/'},
                {icon: 'mdi-information-outline', text: 'About', route:'/about'}
            ]
        }
    }
}
</script>
