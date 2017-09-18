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
        <input type="text" class="form-control" placeholder="要添加的内容" style="width:100%;" v-model="addContent" @click="showDetail=true">
      </div>
      <div class="col-xs-1" @click="addFlag=!addFlag">
        <span class="fa-stack fa-lg">
          <i class="fa fa-circle fa-stack-2x cbp-icon"></i>
          <i :class="addFlagClass"></i>
        </span>
      </div>
      <div class="col-xs-2">
        <button class="btn btn-default" @click="add">添加</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'AddTodo',
  data () {
    return {
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
      }
    },
  },
  components:{ }
}
</script>

<style scoped>

</style>
