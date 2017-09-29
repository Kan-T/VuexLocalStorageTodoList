<template>
  <div>
    <div class="row flex-row list-group-item" v-for="(item,index) in items" :key="index">

      <input type="checkbox" class="col-xs-1 input-sm" v-model="item.done" :disabled="listName==CONST.DONE" v-show="!editable" @change.stop="setDone(index)">
      <i class="col-xs-1 fa fa-arrows fa-fw form-control-static" v-show="editable"></i>

      <div class="flex-row-item-grow">
        <p class="daily-cut form-control-static">{{item.content}}</p>
      </div>

      <div class="flex-row-item">
        <div @click="item.flag=!item.flag" v-show="!editable">
          <span class="fa-stack fa-fw" >
            <i class="fa fa-circle fa-stack-2x color-gray"></i>
            <i class="fa fa-flag fa-stack-1x fa-inverse" :style="{color: (item.flag?'red':'')}"></i>
          </span>
        </div>
        <button class="btn btn-default" v-show="editable" @click="deleteItem(index)">
          <i class="fa fa-trash-o"></i>
        </button>
      </div>

      <div class="flex-row-item">
        <dropdown :listName="listName" :ind="index" @move="moveTo" v-show="!editable">
        </dropdown>
        <button class="btn btn-default" v-show="editable" @click="top(index)">
          <i class="fa fa-arrow-up"></i>
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import Local from '../Local'
import dropdown from './Dropdown'
import * as CONST from '../Const'

export default {
  name: 'ListItem',
  data () {
    return {
      CONST:CONST,
      items:[],
      listName: this.$route.query.listName,
      listLocal: (new Local(this.listName)),
      doneLocal: (new Local(CONST.DONE)),
    }
  },
  props:["editable",],
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
    },
    top(index){
      let itemArr=this.items.splice(index, 1)
      this.items.unshift(itemArr[0])
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
