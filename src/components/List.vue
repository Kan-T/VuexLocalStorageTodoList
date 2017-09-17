<template>
  <div class="container-fluid">
    <nav class="navbar navbar-default nav-justified">
      <div class="container-fluid">
        <div class=row>
          <div class="col-xs-1" @click.stop="toggleLeft"><i class="fa fa-bars fa-fw navbar-brand"></i></div>

          <p class="navbar-brand col-xs-2">{{listName}}</p>
          <div class="col-xs-6"></div>

          <button class="btn btn-default navbar-btn col-xs-1"
            @click="clear">清空<i class="fa fa-trash-o"></i>
          </button>
          <div class="col-xs-1"></div>
          <button class="btn btn-default navbar-btn col-xs-1"
            @click="editList">
            {{this.editable?"完成":"编辑"}}
          </button>

        </div>
      </div>
    </nav>

    <draggable v-model='items' :options="dragOptions" :move="onMove"  element="div" class="container-fluid">
      <transition-group type="transition" :name="'flip-list'">
        <div class="row list-group-item" v-for="(item,index) in items" :key="index">

          <i class="col-xs-1 fa fa-arrows fa-fw form-control-static" v-show="editable"></i>
          <input type="checkbox" class="col-xs-1 input-sm" v-model="item.done" v-show="!editable" @change.stop="setDone(index)">

          <div class="col-xs-9 form-control-static">
            <p class="daily-cut">{{item.content}}</p>
          </div>

          <div class="col-xs-1 form-control-static">
            <button class="btn btn-default" v-show="editable"
                    @click="deleteItem(index)">
              <i class="fa fa-trash-o"></i>
            </button>
            <div @click="item.flag=!item.flag" v-show="!editable">
              <span class="fa-stack fa-fw" >
                <i class="fa fa-circle fa-stack-2x cbp-icon"></i>
                <i class="fa fa-flag fa-stack-1x fa-inverse" :style="{color: (item.flag?'red':'')}"></i>
              </span>
            </div>
          </div>

          <div class="col-xs-1 form-control-static">
            <dropdown></dropdown>
          </div>
        </div>
      </transition-group>
    </draggable>

    <div class="row">
      .
    </div>

    <form class="container-fluid form-inline cbp-spmenu cbp-fixed-bottom cbp-input-bottom">
      <div v-show="showDetail">
        <div class="row">
          <div class="form-group col-xs-11">
          </div>
          <div class="form-group col-xs-1" @click="showDetail=false">
            <button type="button" class="close" aria-label="Close" >
                <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-9">
          <input type="text" class="form-control" placeholder="要添加的内容" style="width:100%;" v-model="addContent" @click="showDetail=true">
        </div>
        <div class="col-xs-1" @click="addFlag=!addFlag">
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle fa-stack-2x cbp-icon"></i>
            <i :class="addFlagClass"></i>
          </span>
        </div>
        <div class="col-xs-2">
          <button class="btn btn-default" @click="add">添加</button>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Local from '../Local'
import dropdown from './Dropdown'

export default {
  name: 'List',
  data () {
    return {
      editable: false,
      listName: this.$route.query.listName,
      listLocal: (new Local(this.listName)),
      doneLocal: (new Local("已完成")),     //必须与SideBar.vue中的todoList里的最后一项“已完成”相同
      showDetail: false,
      addContent:"",
      addFlag: false,
      items:[{content:"",flag:false,done:false}],
    }
  },
  created(){
    this.listName=this.$route.query.listName     //刷新时，可更新
    this.listLocal = new Local(this.listName)
    this.items=this.listLocal.get() || []
  },
  watch: {
    "$route": function(newRoute){                //路由进入时，可更新
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
    addFlagClass(){
      return {
        "fa": true,
        "fa-flag": true,
        "fa-stack-1x": true,
        "fa-inverse": true,
        "cbp-red" : this.addFlag
      }
    },
    flagClass(){
      return {
        "fa": true,
        "fa-flag": true,
        "fa-stack-1x": true,
        "fa-inverse": true,
        "cbp-red" : this.addFlag
      }
    },
  },
  methods: {
    editList(){
      this.editable=!this.editable
      if(!this.editable){
        this.listLocal.set(this.items)
      }
    },
    onMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element;
      return relatedElement
    },
    deleteItem(index){
      this.items.splice(index, 1)
      this.listLocal.set(this.items)
    },
    clear(){
      let conf = confirm("列表内的清单将被清空，确定要清空此列表吗？")
      if(conf){
        this.items = []
        this.listLocal.clear()
      }
    },
    add(){
      if(this.addContent){
        let addItem = {content:this.addContent,flag:this.addFlag}

        this.items.push(addItem)
        this.listLocal.set(this.items)

        this.addContent=''
        this.addFlag=false

        this.showDetail=false
      }
    },
    setDone(index){
      setTimeout(()=>{
        this.doneLocal.addList(this.items[index])
        this.deleteItem(index)
      }, 500)
    },
    toggleLeft(){
      this.$store.commit("toggleSide")
    },
  },
  components:{ draggable, dropdown }
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

.vertial-middle{
  vertical-align:middle;
}
</style>
