<template>
  <div class="container-fluid">
    <nav class="navbar navbar-default">
    </nav>
    <draggable :list='todayItems' @update="dragEnd">
      <transition-group>
        <div class="list-group-item daily-cut" v-for="item in todayItems" :key="item.content">
          {{item.content}}
        </div>
      </transition-group>
    </draggable>

    <br>
    <div class="well text-center"><button class="btn btn-default" @click="seeDone">
          显示已完成
    </button></div>
    <div v-show="showDone">
      <div class="list-group-item daily-cut" v-for="item in doneItems" :key="item.content">
        {{item.content}}
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'Today',
  data () {
    return {
      showDone:false
    }
  },
  computed:{
    todayItems(){
      return this.$store.state.todayItems.items
    },
    doneItems(){
      return this.$store.state.doneItems
    },
  },
  methods: {
    seeDone(){
      this.showDone=!this.showDone;
    },
    dragEnd(evt){
      console.log('拖动前的索引：'+evt.oldIndex);
      console.log('拖动后的索引：'+evt.newIndex);
      console.dir(this.todayItems);
      console.dir(this.$store.state.todayItems.items);
    },
  },
  components:{ draggable }
}
</script>

<style scoped>

</style>
