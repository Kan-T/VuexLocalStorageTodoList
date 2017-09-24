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
  padding-left: 10px;
  padding-right: 10px;
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
  padding-bottom: 15px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid transparent;
  z-index: 200;
}
.navbar-default-blue {
  background: #E9F7FF;
  border-color: #A2C3D4;
}
.close {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
}
</style>