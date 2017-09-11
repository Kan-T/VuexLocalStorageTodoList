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
            @click="editable=!editable">
            {{editText}}
          </button>

        </div>
      </div>
    </nav>

    <draggable v-model='items' :options="dragOptions" :move="onMove"
    element="div" class="container-fluid">
      <transition-group type="transition" :name="'flip-list'">
        <div class="row list-group-item" v-for="(item,index) in items" :key="index">

          <i class="col-xs-1 fa fa-arrows" v-show="editable"></i>
          <input type="checkbox" class="col-xs-1 input-sm" v-show="!editable" >

          <p class="col-xs-10 daily-cut daily-middle">{{item.content}}</p>

          <button class="btn btn-default col-xs-1" v-show="editable"
                  @click="deleteItem(index)">
            <i class="fa fa-trash-o"></i>
          </button>

        </div>
      </transition-group>
    </draggable>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Local from '../store/modules/Local'

export default {
  name: 'Others',
  data () {
    return {
      editable:false,
    }
  },
  computed:{
    listName(){
      return this.$route.query.listName
    },
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
    items: {
      get(){
        return this.listLocal.get() || []
      },
      set(newValue){
        this.listLocal.set(newValue)
      }
    },
    editText(){
      return this.editable?"完成":"编辑"
    },
  },
  methods: {
    onMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element;
      return relatedElement
    },
    deleteItem(index){
      this.items.splice(index, 1)
    },
    clear(){
      let conf = confirm("列表内的清单将被清空，确定要清空此列表吗？")
      if(conf){
        listLocal.clear()
      }
    }
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
