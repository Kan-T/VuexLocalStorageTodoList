<template>
  <div>
    <button class="btn btn-default" @click="show=!show">
      <i class="fa fa-copy fa-fw "></i>
    </button>
    <div v-if="show">
      <div class="close" @click="show=false"></div>
      <ul class="my-dropdown-menu">
        <li v-for="(item,i) in list" :key="i" @click="emit(i)">
          {{item}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as CONST from '../Const'

export default {
  name: 'Dropdown',
  data () {
    return {
      list:[CONST.TODAY, CONST.TOMORROW, CONST.WEEK, CONST.FUTURE],
      show:false,
      activeLi:-1,
    }
  },
  props:["listName","ind"],
  computed:{
  },
  methods: {
    emit(i){
      let targetList = this.list[i]

      if(targetList!==this.listName){
        this.$emit("move", this.ind, targetList)
        this.show=false
      }
    }
  },
  components:{ }
}
</script>


<style scoped>
.my-dropdown-menu {
  position: absolute;
  top: -80%;
  left:auto;
  right: 10%;
  z-index: 1000;
  min-width: 100px;
  padding: 0px 0;
  margin: 0px 0 0;
  list-style: none;
  font-size: 14px;
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  -webkit-background-clip: padding-box;
          background-clip: padding-box;
}
.my-dropdown-menu>li {
  border-bottom: 1px solid #cccccc;
  padding: 7px 0;
}
.close {
    opacity: 0;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
}
.active {
  background: #F2FAFF;
  border-left: 2px solid #7CC9F7;
}
</style>
