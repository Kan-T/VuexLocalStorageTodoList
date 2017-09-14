<template>
  <div id="app" class="cbp-spmenu-push">
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
  methods: {
  },
  components:{ SideBar }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.daily-cut {
  overflow:hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.daily-middle {
  display:table-cell;
  vertical-align:middle;
}
</style>