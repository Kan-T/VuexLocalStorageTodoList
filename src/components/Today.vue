<template>
  <div class="container-fluid">
    <nav class="navbar navbar-default nav-justified">
      <p class="navbar-brand">今日待办事项</p>
      <button class="btn btn-default navbar-btn"
        @click="savePlan">
        {{editText}}
      </button>
    </nav>

    <div class="list-group-item daily-cut" v-for="item in todayItems" :key="item.content" v-show="!showDrag">
      {{item.content}}
    </div>

    <draggable :list='todayItems' v-if="showDrag">
      <transition-group>
        <div class="list-group-item daily-cut" v-for="item in todayItems" :key="item.content">
          <span class="glyphicon glyphicon-resize-vertical"></span>
          {{item.content}}
        </div>
      </transition-group>
    </draggable>

    <br>
    <nav class="navbar navbar-default">
        <button class="btn btn-default navbar-btn center-block" @click="seeDone">显示已完成</button>
    </nav>

    <div v-show="showDone">
      <div class="list-group-item daily-cut" v-for="(item,index) in todayDone" :key="index">
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
      showDrag:false,
      showDone:false,
    }
  },
  computed:{
    todayItems(){
      return this.$store.getters.todayTodo
    },
    todayDone(){
      return this.$store.getters.todayDone
    },
    editText(){
      return this.showDrag?"退出编辑":"编辑"
    },
  },
  methods: {
    seeDone(){
      this.showDone=!this.showDone;
    },
    savePlan(){
      this.showDrag=!this.showDrag;
      this.$store.dispatch('saveStore');
    }
  },
  mounted(){
    this.$store.commit("loadStore")
    console.log("In Today mounted: " + JSON.stringify(this.todayItems))
  },
  components:{ draggable }
}
</script>

<style scoped>
</style>
