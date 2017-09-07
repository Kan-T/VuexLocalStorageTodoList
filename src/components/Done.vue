<template>
  <div class="container-fluid">
    <nav class="navbar navbar-default nav-justified">
      <p class="navbar-brand">已完成事项</p>
    </nav>

    <nav class="navbar navbar-default">
      <button class="btn btn-default navbar-btn center-block" @click="seeDone">显示已完成</button>
    </nav>

    <div v-show="showDone">
      <div class="list-group-item daily-cut" v-for="(item,index) in doneHistory" :key="index">
        {{item.content}}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Done',
  data () {
    return {
      showDone:false
    }
  },
  computed:{
    doneHistory(){
      return this.$store.state.doneHistory.items;
    }
  },
  methods: {
    seeDone(){
      this.showDone=!this.showDone;
    },
  },
  components:{ }
}
</script>


<style scoped>

</style>
