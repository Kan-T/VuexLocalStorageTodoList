<template>
  <div class="container-fluid">
    <div class="loading flex-row flex-row-space-between" v-if="isLoading">
      <div></div><i class="fa fa-5x fa-spinner fa-pulse"></i><div></div>
    </div>

    <listnav :listName="listName" :isLoading="isLoading" @saveList="saveList"></listnav>

    <draggable v-model='items' :options="dragOptions" :move="onMove"  element="ul" class="container-fluid">
      <transition-group type="transition" :name="'flip-list'">
        <li v-for="(item,index) in items" :key="index" :class="['row', 'flex-row', 'list-group-item', item.flag?'list-group-item-danger':'list-group-item-warning']">

          <input type="checkbox" class="list-box input-sm" v-model="item.done" v-show="!editList" :disabled="item.done" @change.stop="setDone(index)">
          <i class="list-box fa fa-arrows fa-fw form-control-static" v-show="editList"></i>

          <tooltip class="flex-row-item-grow daily-cut" trigger="outside-click" :text="item.content" :auto-placement="true" :enable="enableTip">
            <p class="daily-cut form-control-static tip-flag">{{item.content}}</p>
          </tooltip>

          <div class="flex-row-item">
            <div @click="changeFlag(index)" v-show="!editList">
              <span class="fa-stack fa-fw" >
                <i class="fa fa-circle fa-stack-2x color-gray"></i>
                <i class="fa fa-flag fa-stack-1x fa-inverse" :style="{color: (item.flag?'red':'')}"></i>
              </span>
            </div>
            <button class="btn btn-default" v-show="editList" @click="deleteItem(index)">
              <i class="fa fa-trash-o"></i>
            </button>
          </div>

          <div class="flex-row-item" v-show="listName!==CONST.DONE">
            <dropdown :listName="listName" :ind="index" v-show="!editList" @move="moveTo" @edit="openPopEdit(item,index)">
            </dropdown>
            <button class="btn btn-default" v-show="editList" @click="top(index)">
              <i class="fa fa-arrow-up"></i>
            </button>
          </div>

        </li>
      </transition-group>
    </draggable>

    <div class="row"><br><br><br></div>

    <addtodo class="row" @add="add" v-show="listName!=CONST.DONE"></addtodo>

    <pop :loadItem="loadItem" @save="saveItem"></pop>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import {Tooltip as tooltip} from 'uiv'
import Local from '../Local'
import listnav from './ListNav'
import dropdown from './Dropdown'
import addtodo from './AddTodo'
import Pop from './Pop'
import * as CONST from '../Const'

export default {
  name: 'List',
  components:{draggable, tooltip, dropdown, addtodo, Pop, listnav},
  data () {
    return {
      CONST:CONST,
      items:[],
      isLoading: false,
      listName: this.$route.query.listName,
      listLocal: (new Local(this.listName)),
      doneLocal: (new Local(CONST.DONE)),

      loadItem:{},                                //for Pop editting
      loadInd:-1
    }
  },
  computed:{
    editList(){ return this.$store.state.List.editList },
    enableTip(){ return this.$store.state.List.enableTip },
    dragOptions () {
      return {
        animation: 0,
        group: 'description',
        disabled: !this.editList,
        ghostClass: 'ghost'
      }
    },
  },
  methods: {
    onMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element;
      return relatedElement
    },
    changeFlag(index){
      this.items[index].flag=!this.items[index].flag
      this.listLocal.set(this.items)
    },
    deleteItem(index){
      this.items.splice(index, 1)
    },
    top(index){
      let itemArr=this.items.splice(index, 1)
      this.items.unshift(itemArr[0])
    },
    saveList(){
      this.listLocal.set(this.items)
    },
    add(obj){
      this.items.push(obj)
      this.listLocal.set(this.items)

      this.addContent=''
      this.addFlag=false
    },
    openPopEdit(item,index){
      this.loadInd = index
      this.loadItem = item
      this.$store.commit('setPop',true)
    },
    saveItem(item){
      this.items[this.loadInd]=item
      this.listLocal.set(this.items)

      this.loadInd=-1
      this.loadItem={}
    },
    setDone(index){
      setTimeout(()=>{
        if(this.items[index].done){
          this.items[index].doneDate = new Date()
          this.doneLocal.addList(this.items[index])
          this.deleteItem(index)
          this.listLocal.set(this.items)
        }
      }, 200)
    },
    toggleLeft(){
      this.$store.commit("toggleSide")
    },
    moveTo(ind,targetList){
      let targetLocal = new Local(targetList)
      let itemTemp

      if(this.listName == CONST.CUSTOM){
        itemTemp = this.items[ind]                //For custom, just copy.
      }else{
        itemTemp = this.items.splice(ind, 1)[0]
        this.listLocal.set(this.items)
      }

      targetLocal.addList(itemTemp)
    },
    // clear(){
    //   let conf = confirm(CONST.EMPTY_CONFIRM)
    //   if(conf){
    //     this.items = []
    //     this.listLocal.clear()
    //   }
    // },
  },    //End of methods
  mounted(){
    this.isLoading=true

    this.editable=false                             //刷新时，可更新
    this.listName=this.$route.query.listName
    this.listLocal = new Local(this.listName)
    this.items=this.listLocal.get() || []

    let doneLocal = new Local(CONST.DONE)           //Delete old Done items
    let today = new Date().toISOString().substring(0, 10)
    let lastDate = localStorage.getItem("last_clean_date") || today
    let keepDays = parseInt( localStorage.getItem("done_keey_days") ) || 10

    let doneItems = doneLocal.get()
    let lastCleanDate = lastDate.substring(0, 10)

    if( doneItems && doneItems.length>0 && today<lastCleanDate ){
        let delDate=new Date()
        delDate.setDate( delDate.getDate()-keepDays )

        let items = doneItems.filter( item => item.doneDate<delDate )
        doneLocal.set(items)
    }
    localStorage.setItem("last_clean_date",JSON.stringify(new Date))

    this.isLoading=false
  },
  watch: {
    $route: function(newRoute){                   //路由进入时，可更新
      this.isLoading=true

      this.editable=false
      this.listName=newRoute.query.listName
      this.listLocal = new Local(this.listName)
      this.items=this.listLocal.get() || []

      this.isLoading=false
    }
  },
}
</script>

<style scoped>
.flip-list-move {
  transition: transform 0.3s;
}
.ghost {
  opacity: .5;
  background: #C8EBFB;
}
</style>
