<template>
  <div class="container-fluid">
    <nav class="navbar navbar-default nav-justified">
      <p class="navbar-brand">已完成事项</p>
    </nav>

    <nav class="navbar navbar-default">
      <button class="btn btn-default navbar-btn center-block" @click="seeDone">显示已完成</button>
    </nav>

    <div v-show="showDone">
      <div class="list-group-item daily-cut" v-for="(item,index) in Done" :key="index">
        {{item.content}}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Done',
  data () {
  },
  computed:{
    // ...mapGetters([
    //   'todayItems',
    // ]),
  },
  methods: {
    seeDone(){
      this.showDone=!this.showDone;
    },
    savePlan(){
      this.editable=!this.editable;
      this.$store.dispatch('saveStore');
    },
    onMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
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

.flip-list-move {
  transition: transform 0.5s;
}
.ghost {
  opacity: .5;
  background: #C8EBFB;
}

</style>
