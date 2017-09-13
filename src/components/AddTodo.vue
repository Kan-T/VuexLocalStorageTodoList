<template>
    <form class="form-inline container-fluid cbp-spmenu cbp-fixed-bottom cbp-input-bottom" @click="showMore">
      <div v-show="showDetail">
        <div class="row">
          <div class="form-group col-xs-11">
  <!--           <label for="targetDate">到期日</label>
            <input type="date" class="form-control" id="targetDate" v-model="item.targetDate"> -->
          </div>
          <a class="btn col-xs-1" @click="closeMore">
            <i class="fa fa-close cbp-black"></i>
          </a>
        </div>
        <div class="row">
        ..
        </div>
      </div>

      <div class="row">
        <div class="col-xs-9">
          <input type="text" required class="form-control" placeholder="要添加的内容"
                v-model="item.content" style="width:100%;">
        </div>
        <div class="col-xs-1" @click="item.flag=!item.flag">
          <span class="fa-stack fa-lg" >
            <i class="fa fa-circle fa-stack-2x cbp-icon"></i>
            <i :class="flagClass"></i>
          </span>
        </div>
        <div class="col-xs-2 ">
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
      showDetail:false,
      item:{
        content:"",
        flag:false
      }
    }
  },
  computed:{
    flagClass() {
      return{
        "fa": true,
        "fa-flag": true,
        "fa-stack-1x": true,
        "fa-inverse": true,
        }
    },
  },
  props:["local"],
  methods: {
    add(){
      console.log(this.item)
      if(this.item.content!=''){
        this.local.addList(this.item)
        this.closeMore()
      }
    },
    showMore(){
      this.showDetail = true
    },
    closeMore(){
      this.showDetail = false
    },
  },
}
</script>

<style scoped>
</style>
