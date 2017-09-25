<template>
  <div class="container-fluid">
    <nav class="navbar navbar-default-blue">
      <div class="container-fluid">
        <div class="row flex-row">

          <div class="col-xs-1 btn flex-row-item" @click.stop="toggleLeft">
            <i class="fa fa-bars fa-fw navbar-brand text-center"></i>
          </div>

          <div class="navbar-brand flex-row-item-grow"><p>{{listName}}</p></div>

          <div class="flex-row-item">
            <button class="btn btn-default navbar-btn"
              @click="clear">{{CONST.EMPTY}}<i class="fa fa-trash-o"></i>
            </button>
          </div>

          <div class="flex-row-item">
            <button class="btn btn-default navbar-btn flex-row-item"
              @click="editList">
              {{ this.editable ? CONST.SAVE : CONST.EDIT }}
            </button>
          </div>

        </div>
      </div>
    </nav>

    <draggable v-model='items' :options="dragOptions" :move="onMove"  element="div" class="container-fluid">
      <transition-group type="transition" :name="'flip-list'">
        <div class="row flex-row list-group-item" v-for="(item,index) in items" :key="index">

          <i class="col-xs-1 fa fa-arrows fa-fw form-control-static" v-show="editable"></i>
          <input type="checkbox" class="col-xs-1 input-sm" v-model="item.done" v-show="!editable" @change.stop="setDone(index)">

          <div class="flex-row-item-grow">
            <p class="daily-cut form-control-static">{{item.content}}</p>
          </div>

          <div class="flex-row-item">
            <button class="btn btn-default" v-show="editable"
                    @click="deleteItem(index)">
              <i class="fa fa-trash-o"></i>
            </button>
            <div @click="item.flag=!item.flag" v-show="!editable">
              <span class="fa-stack fa-fw" >
                <i class="fa fa-circle fa-stack-2x color-gray"></i>
                <i class="fa fa-flag fa-stack-1x fa-inverse" :style="{color: (item.flag?'red':'')}"></i>
              </span>
            </div>
          </div>

          <div class="flex-row-item">
            <dropdown :listName="listName" :ind="index" @move="moveTo">
            </dropdown>
          </div>

        </div>
      </transition-group>
    </draggable>

    <div class="row"><br><br><br></div>

    <addtodo class="row" @add="add"></addtodo>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Local from '../Local'
import dropdown from './Dropdown'
import addtodo from './AddTodo'
import * as CONST from '../Const'

export default {
  name: 'List',
  data () {
    return {
      CONST:CONST,
      editable: false,
      items:[],
      listName: this.$route.query.listName,
      listLocal: (new Local(this.listName)),
      doneLocal: (new Local(CONST.DONE)),     //必须与SideBar.vue中的todoList里的最后一项“已完成”相同
    }
  },
  created(){
    this.editable=false
    this.listName=this.$route.query.listName     //刷新时，可更新
    this.listLocal = new Local(this.listName)
    this.items=this.listLocal.get() || []
  },
  watch: {
    "$route": function(newRoute){                //路由进入时，可更新
      this.editable=false
      this.listName=newRoute.query.listName
      this.listLocal = new Local(this.listName)
      this.items=this.listLocal.get() || []
    }
  },
  computed:{
    dragOptions () {
      return {
        animation: 0,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost'
      }
    },
    flagClass(){
      return {
        "fa": true,
        "fa-flag": true,
        "fa-stack-1x": true,
        "fa-inverse": true,
        "color-red" : this.addFlag
      }
    },
  },
  methods: {
    editList(){
      this.editable=!this.editable
      if(!this.editable){
        this.listLocal.set(this.items)
      }
      this.$store.commit("closeSide")
    },
    onMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element;
      return relatedElement
    },
    deleteItem(index){
      this.items.splice(index, 1)
      // this.listLocal.set(this.items)
    },
    clear(){
      let conf = confirm(CONST.EMPTY_CONFIRM)
      if(conf){
        this.items = []
        this.listLocal.clear()
      }
    },
    add(obj){
      this.items.push(obj)
      this.listLocal.set(this.items)

      this.addContent=''
      this.addFlag=false
    },
    setDone(index){
      setTimeout(()=>{
        this.doneLocal.addList(this.items[index])
        this.deleteItem(index)
        this.listLocal.set(this.items)
      }, 500)
    },
    toggleLeft(){
      this.$store.commit("toggleSide")
    },
    moveTo(ind,targetList){
      // console.log(ind + targetList)
      let targetLocal = new Local(targetList)
      let itemTemp

      if(this.listName == CONST.CUSTOM){
        itemTemp = this.items[ind]                //For custom, just copy.
      }else{
        itemTemp = this.items.splice(ind, 1)[0]
        this.listLocal.set(this.items)
      }

      targetLocal.addList(itemTemp)
    }
  },
  components:{ draggable, dropdown, addtodo}
}
</script>

<style scoped>
.flip-list-move {
  transition: transform 0.2s;
}

.ghost {
  opacity: .5;
  background: #C8EBFB;
}

</style>
