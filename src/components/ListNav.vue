<template>
  <nav class="navbar navbar-default-blue">
    <div class="container-fluid">
      <div class="row flex-row">

        <div class="col-xs-1 btn flex-row-item" @click.stop="toggleLeft">
          <i class="fa fa-bars fa-fw navbar-brand pull-left"></i>
        </div>

        <div class="navbar-brand flex-row-item-grow"><p>{{listName}}</p></div>

<!--           <div class="flex-row-item">
          <button class="btn btn-warning navbar-btn"
            @click="clear">{{CONST.EMPTY}}<i class="fa fa-trash-o"></i>
          </button>
        </div> -->

        <div class="flex-row-item">
          <button class="btn btn-default navbar-btn" @click="toggleTip">
            {{enableTip?CONST.TURN_OFF:CONST.TURN_ON}}{{CONST.TIP}}
          </button>
        </div>

        <div class="flex-row-item">
          <button class="btn btn-default navbar-btn flex-row-item"
            @click="edit">
            {{ this.editList ? CONST.SAVE : CONST.EDIT }}
          </button>
        </div>

      </div>
    </div>
  </nav>
</template>

<script>
import * as CONST from '../Const'
import Local from '../Local'

export default {
  name: 'ListNav',
  components:{  },
  data () {
    return {
      CONST:CONST,
    }
  },
  props:["isLoading", "listName"],
  computed: {
    editList(){
      return this.$store.state.List.editList
    },
    enableTip(){
      return this.$store.state.List.enableTip
    },
  },
  methods: {
    edit(){
      this.$store.commit("toggleEditList")
      if(!this.editList){
        this.$emit("saveList")
      }
      this.$store.commit("closeSide")
    },
    toggleTip(){
      this.$store.commit("toggleTip")
    },
  },    //End of methods
}
</script>

<style scoped>
</style>
