<template>
  <form class="container-fluid ">
    <nav class="navbar navbar-default-blue fixed-bottom-fluid">
      <div class="row flex-row" v-show="showDetail">
          <div class="col-xs-11"></div>
          <div class="btn col-xs-1 flex-row-item" aria-label="Close" @click="showDetail=false">
            <i class="fa fa-close"></i>
          </div>
      </div>

      <div class="flex-row">
        <div class="flex-row-item-grow">
          <input type="text" class="form-control" :placeholder="CONST.CONTENT_TO_ADD" style="width:100%;" v-model="addContent" @click="show">
        </div>
        <div class="flex-row-item" @click="addFlag=!addFlag">
          <span class="fa-stack fa-fw">
            <i class="fa fa-circle fa-stack-2x cbp-icon"></i>
            <i :class="addFlagClass"></i>
          </span>
        </div>
        <div class="flex-row-item" @click="add">
          <button class="btn btn-default">
            <i class="fa fa-plus fa-fw"></i>
          </button>
        </div>
      </div>
    </nav>
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
  margin-left: 0px;
  margin-right: 0px;
  padding-right: 30px;
  padding-top: 2px;
  padding-bottom: 2px;
  z-index: 200;
}

</style>
