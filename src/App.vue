<template>
  <div id="app" class="cbp-spmenu-push" >
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
/*div {
   outline: 1px solid red !important;
}*/
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
}
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
.flex-row {
  display: flex;
  align-items: center;
}
.flex-row-item {
  flex-grow: 0;
  flex-shrink:1;
  margin-right: 5px;
}
.flex-row-item-grow {
  flex-grow: 1;
  flex-shrink:1;
  margin-right: 5px;
}
.fixed-bottom-fluid {
  position: fixed;
  right: 15px;
  left: 15px;
  bottom: 0;
  margin-bottom: 0;
  border-width: 1px 0 0;
  z-index: 200;
}
.navbar-default-blue {
  background: #F7FCFF;
  border-color: #e7e7e7;
}
</style>