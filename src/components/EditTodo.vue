<template>
  <div class="panel panel-info fixed-bottom z-top">

    <div class="panel-heading">
      <h3 class="panel-title">Panel title</h3>
    </div>

    <div class="panel-body">
      <div class="row flex-row">
        <div class="col-xs-11"></div>
        <div class="btn col-xs-1 flex-row-item">
          <i class="fa fa-close"></i>
        </div>
      </div>

      <div class="flex-row">
        <div class="flex-row-item-grow">
          <input type="text" class="form-control" style="width:100%;" v-model="saveItem.content">
        </div>
        <div class="flex-row-item" @click="saveItem.flag=!saveItem.flag">
          <span class="fa-stack fa-fw">
            <i class="fa fa-circle fa-stack-2x color-gray"></i>
            <i :class="FlagClass"></i>
          </span>
        </div>
        <div class="flex-row-item" @click="save">
          <button class="btn btn-default">
            <i class="fa fa-save fa-fw"></i>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import * as CONST from '../Const'

export default {
  name: 'EditTodo',
  data () {
    return {
      CONST: CONST,
      saveItem:{content:"",flag:false,done:false},
    }
  },
  props:["loadItem"],
  created(){
    this.saveItem = {...this.loadItem}      //对象浅复制
  },
  computed:{
    FlagClass(){
      return {
        "fa": true,
        "fa-flag": true,
        "fa-stack-1x": true,
        "fa-inverse": true,
        "color-red" : this.saveItem.flag
      }
    },
  },
  methods: {
    save(){
      if(this.saveItem.content){              //Need to add JSON filter function.
        this.$emit("save",this.saveItem)
      }
    },
  },
}
</script>

<style scoped>

</style>
