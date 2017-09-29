<template>
  <div id="app">
    <side-bar></side-bar>
    <router-view></router-view>
    <pop></pop>
  </div>
</template>

<script>
import SideBar from './components/SideBar'
import Pop from './components/Pop'

export default {
  name: 'app',
  data(){
    return{
    }
  },
  methods: {
  },
  components:{ SideBar, Pop }
}

</script>

<style>
</style>