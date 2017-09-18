<template>
  <form class="container-fluid form-inline cbp-spmenu cbp-fixed-bottom cbp-input-bottom">
    <div v-show="showDetail">
      <div class="row">
        <div class="form-group col-xs-11">
        </div>
        <div class="form-group col-xs-1" @click="showDetail=false">
          <button type="button" class="close" aria-label="Close" >
              <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-9">
        <input type="text" class="form-control" :placeholder="CONST.CONTENT_TO_ADD" style="width:100%;" v-model="addContent" @click="show">
      </div>
      <div class="col-xs-1" @click="addFlag=!addFlag">
        <span class="fa-stack fa-lg">
          <i class="fa fa-circle fa-stack-2x cbp-icon"></i>
          <i :class="addFlagClass"></i>
        </span>
      </div>
      <div class="col-xs-2">
        <button class="btn btn-default" @click="add">{{CONST.ADD}}</button>
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

</style>
