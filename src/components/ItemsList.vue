<template>
  <div class="container-fluid">
    <nav class="navbar navbar-default nav-justified">
      <div class="container-fluid">
        <div class=row>
          <p class="navbar-brand col-xs-3">{{tittle}}</p>
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
                  @click="deleteToday(index)">
            <i class="fa fa-trash-o"></i>
          </button>

        </div>
      </transition-group>
    </draggable>

  </div>
</template>

<script>
import Vue from 'vue'
import draggable from 'vuedraggable'
import { mapMutations } from 'vuex'

export default Vue.component('itmesList' ,{
  name: 'itemsList',
  props: [
    'tittle',
    'listName'
  ],
  data () {
    return {
      editable:false
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
    items: {
      get(){
        return this.$store.state[this.listName].items
      },
      set(newValue){
        this.$store.commit(`save$<this.listName>`,newValue)
      }
    },
    editText(){
      return this.editable?"完成":"编辑"
    },
  },
  methods: {
    ...mapMutations([   // 映射
      `delete$<this.listName>`
    ]),
    onMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element;
      return relatedElement
    },
    clear(){
      let conf = confirm("列表内的清单将被清空，确定要清空此列表吗？")
      if(conf){
        this.$store.commit(`clear$<this.listName>`)
      }
    }
  },
  components:{ draggable }
})
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
