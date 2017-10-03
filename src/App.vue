<template>
  <div id="app">
    <side-bar></side-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import SideBar from './components/SideBar'

export default {
  name: 'app',
  data(){
    return{
    }
  },
  props:["loadItem"],
  methods: {
  },
  components:{ SideBar }
}

</script>

<style>
</style>