<template>
  <div class="side-container flex-row">
    <nav class="side-bar flex-col" @click="goto" v-show="showSide">
      <h3 class="flex-row" >
        <div class="flex-row-item" @click.stop="toggleLeft">
          <i class="fa fa-chevron-left"></i>
          {{CONST.CLOSE_LIST}}
        </div>
      </h3>

      <template v-for="(element,index) in todoList">
        <a :class="{active: (activeLi==index)}">{{element}}</a>
      </template>
      <template v-for="(element,index) in otherList">
        <a :class="{active: (activeLi==(index+todoList.length))}">{{element}}</a>
      </template>

      <form class="form-inline fixed-bottom ">
          <input type="text" id="content" required :placeholder="CONST.LIST_TO_ADD"
                v-model="addItem">
          <button type="submit" class="btn btn-default" @click="add">
            <i class="fa fa-plus"></i>
          </button>
      </form>
    </nav>

    <div class="side-bar-switch" @click="toggleLeft">
      <i class="fa fa-angle-double-right fa-2x"></i>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import Local from '../Local'
import * as CONST from '../Const'

export default {
  name: 'SideBar',
  data () {
    return {
      CONST:CONST,
      activeLi:-1,
      todoList:[CONST.TODAY, CONST.TOMORROW, CONST.WEEK, CONST.FUTURE, CONST.CUSTOM, CONST.DONE],
      otherList:[],
      addItem:"",
      addError:"",
    }
  },
  created(){
    this.otherList = this.otherListLocal.get() || []      //initialize otherList

    let listName=this.$route.query.listName
    if(listName){                                        //刷新时，让active正确的列表项
      let list = this.todoList.concat(this.otherList)
      this.activeLi=list.indexOf(listName)
    }

  },
  computed:{
    showSide(){
      return this.$store.state.SideBar.showSide
    },
    otherListLocal(){
      return new Local("otherList")
    },
  },
  methods: {
    goto(e){                     //进入各子列表，用不同的listName名称复用List组件
      let text = e.target.text;
      let list = this.todoList.concat(this.otherList)
      let i = list.indexOf(text)
      if(i>=0){
        this.activeLi = i
        this.$router.push({ name:'list', query:{'listName':text} })
        this.toggleLeft()
      }
    },

    toggleLeft(){
      this.$store.commit("toggleSide")
    },

    add(){
      let i = this.todoList.indexOf(this.addItem)
      let j = this.otherList.indexOf(this.addItem)
      if(this.addItem!='' & i<0 & j<0){
        this.otherList.push(this.addItem)
        this.otherListLocal.set(this.otherList)
        this.addItem=''
      }
    }
  }//end methods
}
</script>

<style>
.flex-col {
  display: flex;
  flex-direction:column;
}
.flex-col-item {
  flex-grow: 0;
  flex-shrink:0;
}
.flex-row {
  display: flex;
  flex-direction:row;
}

.side-container{
  position: fixed;
  top: 0;
  height: 100%;
  z-index: 999;
}
.side-bar {
  background: #65B1DF;
  width: 240px;
  height: 100%;
}
.side-bar h3 {
  display: inline-block;
  color: #FFFFFF;
  padding: 10px;
  margin: 0;
  font-size: 1.3em;
  font-weight: 500;
  background: #096296;
}
.side-bar a {
  display: block;
  color: #FFFFFF;
  font-size: 1.2em;
  font-weight: 400;
  padding: 0.7em;
  border-bottom: 1px solid #258ecd;
}
.side-bar a:hover {
  background: #258ecd;
}
.side-bar a.active {
  background: #afdefa;
  color: #000000;
  border-left: 7px solid #258ecd;
}
.side-bar-switch{
  display: flex;
  align-items:center;
  width: 20px;
  height: 80px;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-right: 1px solid;
  z-index: 300;
  background: #E9F7FF;
}
</style>
