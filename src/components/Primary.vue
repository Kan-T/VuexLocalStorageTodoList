<template>
  <div class="container-fluid">
    <nav class="navbar navbar-default nav-justified">
      <div class="col-xs-1" @click.stop="toggleLeft"><i class="fa fa-bars fa-fw navbar-brand"></i></div>
      <p class="navbar-brand"></p>
    </nav>

    <nav class="navbar navbar-default">
      <button class="btn btn-default navbar-btn center-block">{{CONST.TODO_LIST}}</button>
    </nav>

  </div>
</template>

<script>
import * as CONST from '../Const'

export default {
  name: 'Primary',
  data () {
    return {
      CONST:CONST
    }
  },
  computed:{
  },
  methods: {
    toggleLeft(){
      this.$store.commit("toggleSide")
    },
  },
  components:{ }
}
</script>


<style scoped>

</style>
