<template>
  <div class="container-fluid">
    <nav class="navbar navbar-default nav-justified">
      <p class="navbar-brand">今日待办事项</p>
      <button class="btn btn-default navbar-btn"
        @click="editable=!editable">
        {{editText}}
      </button>
    </nav>

    <draggable v-model='todayItems' :options="dragOptions" :move="onMove">
      <transition-group  type="transition" :name="'flip-list'">
        <div class="list-group-item daily-cut" v-for="item in todayItems" :key="item.content">
          <span :class="item.fixed? 'glyphicon glyphicon-pushpin'
                                  : 'glyphicon glyphicon-resize-vertical'"
          @click=" item.fixed=! item.fixed" aria-hidden="true" v-show="editable">
          </span>
          {{item.content}}
        </div>
      </transition-group>
    </draggable>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'Today',
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
    todayItems: {
      get(){
        return this.$store.state.todayItems.items
      },
      set(newValue){
        this.$store.commit("saveToday",newValue)
      }
    },
    editText(){
      return this.editable?"退出编辑":"编辑"
    },
  },
  methods: {
    onMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
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
