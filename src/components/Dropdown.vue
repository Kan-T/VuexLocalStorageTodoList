<template>
  <div>
    <button class="btn btn-default" @click.stop="show=!show">
      <i class="fa fa-cog fa-fw"></i>
    </button>
    <div v-if="show">
      <div class="close" @click.stop="show=false"></div>
      <ul class="my-dropdown-menu">

        <li class="big btn"  @click.stop="edit">
          <span>{{CONST.EDIT}}</span> <i class="fa fa-fw fa-edit"></i>
        </li>

        <li class="title">
          {{ (listName==CONST.CUSTOM)?CONST.COPY_TO:CONST.MOVE_TO }}
          <i class="fa fa-fw fa-caret-down"></i>
        </li>

        <li v-for="(item,i) in list" :key="i" @click.stop="move(i)">
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
      CONST:CONST,
      list:[CONST.TODAY, CONST.TOMORROW, CONST.WEEK, CONST.FUTURE],
      show:false,
      activeLi:-1,
    }
  },
  props:["listName","ind"],
  computed:{
    custom(){
      return CONST.CUSTOM
    }
  },
  methods: {
    move(i){
      let targetList = this.list[i]

      if(targetList!==this.listName){
        this.$emit("move", this.ind, targetList)
        this.show=false
      }
    },
    edit(){
      this.$emit("edit", this.ind)
      this.show=false
    }
  },
  components:{  }
}
</script>


<style scoped>
.my-dropdown-menu {
  position: absolute;
  top: -150%;
  left:auto;
  right: 60px;
  z-index: 1000;
  min-width: 100px;
  padding: 0px 0;
  margin: 0px 0 0;
  list-style: none;
  font-size: 13px;
  text-align: left;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  -webkit-background-clip: padding-box;
          background-clip: padding-box;
}
.my-dropdown-menu>li {
  padding-left: 25px;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100%;
}
.my-dropdown-menu>li.title {
  padding-left: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.my-dropdown-menu>li.big {
  border-bottom: 1px solid #cccccc;
  padding-left: 25px;
  padding-top: 15px;
  padding-bottom: 15px;
  width: 100%;
  font-size: 14px;
  background: #f4f6f7;
  font-weight: 600;
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
