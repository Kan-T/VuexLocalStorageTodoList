<template>
  <form class="container">
    <div class="row">
      <div class="col-sm-2">
        <label for="content">待办事项</label>
      </div>
      <div class="col-sm-10">
        <textarea id="content" required class="form-control" rows="3" v-model="item.content"></textarea>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-sm-2">
          <label for="targetDate">到期日</label>
      </div>
      <div class="col-sm-10">
        <input type="date" class="form-control" id="targetDate" v-model="item.targetDate">
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-sm-2">
          <label for="flag" v-model="item.flag">旗标</label>
      </div>
      <div class="col-sm-10">
        <input type="checkbox" id="flag">
      </div>
    </div>
    <br>
    <button class="btn btn-default center-block" @click="add">  添 加  </button>
  </form>
</template>

<script>
export default {
  name: 'AddTodo',
  data () {
    return {
      item:{}
    }
  },
  methods: {
    add(){
      this.$store.commit("addToday",this.item)
      this.$router.push('/')
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
