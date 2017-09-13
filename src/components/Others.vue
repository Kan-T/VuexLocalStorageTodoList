<template>
  <div class="container-fluid">
    <nav class="navbar navbar-default nav-justified">
      <div class="container-fluid">
        <div class=row>
          <p class="navbar-brand col-xs-3">{{listName}}</p>
          <div class="col-xs-6"></div>

          <button class="btn btn-default navbar-btn col-xs-1"
            @click="clear"><i class="fa fa-trash-o"></i> 清空
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

            <i class="col-xs-1 fa fa-arrows" v-show="editable"></i>
            <input type="checkbox" class="col-xs-1 input-sm" v-show="!editable" >

            <p class="col-xs-10 daily-cut daily-middle">{{item.content}}</p>

            <button class="btn btn-default col-xs-1" v-show="editable"
                    @click="deleteItem(index)">
              <i class="fa fa-trash-o"></i>
            </button>
            <div class="col-xs-1" @click="item.flag=!item.flag" v-show="!editable">
              <span class="fa-stack fa-lg" >
                <i class="fa fa-circle fa-stack-2x cbp-icon"></i>
                <i class="fa fa-flag fa-stack-1x fa-inverse" :style="{color: (item.flag?'red':'')}"></i>
              </span>
            </div>

        </div>
      </transition-group>
    </draggable>

    <form class="form-inline cbp-spmenu cbp-fixed-bottom cbp-input-bottom" @click="showMore">
      <div v-show="showDetail">
        <div class="row">
          <div class="form-group col-xs-11">
          </div>
          <a class="btn col-xs-1" @click="closeMore">
            <i class="fa fa-close cbp-black"></i>
          </a>
        </div>
        <div class="row">
        ..
        </div>
      </div>

      <div class="row">
        <div class="col-xs-9">
          <input type="text" class="form-control" placeholder="要添加的内容"
                v-model="addItem.content" style="width:100%;">
        </div>
        <div class="col-xs-1" @click="addItem.flag=!addItem.flag">
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle fa-stack-2x cbp-icon"></i>
            <i :class="addFlagClass"></i>
          </span>
        </div>
        <div class="col-xs-2 ">
          <button class="btn btn-default" @click="add">添加</button>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Local from '../Local'

export default {
  name: 'Others',
  data () {
    return {
      editable: false,
      listName: this.$route.query.listName,
      showDetail: false,
      items:[{content:"",flag:false}],
      addItem: {
        content:"",
        flag: false
      }
    }
  },
  created(){
    this.items=this.listLocal.get() || []
  },
  computed:{
    listLocal(){
      return new Local(this.listName)
    },
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
        "cbp-red" : this.addItem.flag
      }
    },
    flagClass(){
      return {
        "fa": true,
        "fa-flag": true,
        "fa-stack-1x": true,
        "fa-inverse": true,
        "cbp-red" : this.addItem.flag
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
      if(this.addItem.content){

        this.items.push(this.addItem)

        this.listLocal.set(this.items)

        this.addItem={}
        this.closeMore()
      }
    },
    showMore(){
      this.showDetail = true
    },
    closeMore(){
      this.showDetail = false
    },
  },
  components:{ draggable }
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
