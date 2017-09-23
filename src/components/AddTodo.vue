<template>
  <form class="list-bottom container-fluid">
    <div class="row flex-row" v-show="showDetail">
        <div class="col-xs-11"></div>
        <button type="button" class="close col-xs-1" aria-label="Close" @click="showDetail=false">
          <span aria-hidden="true">&times;</span>
        </button>
    </div>

    <div class="row flex-row">
      <div class="col-xs-10">
        <input type="text" class="form-control" :placeholder="CONST.CONTENT_TO_ADD" style="width:100%;" v-model="addContent" @click="show">
      </div>
      <div class="col-xs-1" @click="addFlag=!addFlag">
        <span class="fa-stack fa-fw">
          <i class="fa fa-circle fa-stack-2x cbp-icon"></i>
          <i :class="addFlagClass"></i>
        </span>
      </div>
      <div class="col-xs-1 form-control-static" @click="add">
        <button class="btn btn-default">
          <i class="fa fa-plus fa-fw"></i>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import * as CONST from '../Const'

export default {
  name: 'AddTodo',
  data () {
    return {
      CONST: CONST,
      showDetail: false,
      addContent:"",
      addFlag: false,
      item:{content:"",flag:false,done:false},
    }
  },
  computed:{
    addFlagClass(){
      return {
        "fa": true,
        "fa-flag": true,
        "fa-stack-1x": true,
        "fa-inverse": true,
        "cbp-red" : this.addFlag
      }
    },
  },
  methods: {
    add(){
      if(this.addContent){              //Need to add JSON filter function.
        let addItem = {
          content:this.addContent,
          flag:this.addFlag,
          done:false
        }
        this.$emit("add",addItem)
        this.showDetail=false
        this.addContent=''
        this.addFlag=false
      }
    },
    show(){
      this.showDetail=true
      this.$store.commit("closeSide")
    }
  },
  components:{ }
}
</script>

<style scoped>

.list-bottom {
  position: fixed;
  background: #E5F4FE;
  bottom: 3px;
  right: 15px;
  left: 15px;
  padding-left: 3px;
  padding-right: 28px;
  padding-top: 2px;
  padding-bottom: 2px;
  z-index: 1030;
}

</style>
