<template>
  <div class="dropdown" @click="show=!show">
    <button class="btn btn-default dropdown-toggle" type="button">
      <i class="fa fa-copy fa-fw "></i>
    </button>
    <ul class="my-dropdown-menu" v-if="show">
      <li v-for="(item,i) in list" :key="i" @click="emit(i)"><a>{{item}}</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  data () {
    return {
      list:["今日","明日","本周","未来"],
      show:false
    }
  },
  props:["listName","ind"],
  computed:{
  },
  methods: {
    emit(i){
      let targetList = this.list[i]

      if(targetList==this.listName){

      }else{
        this.$emit("move", this.ind, targetList)
      }
    }
  },
  components:{ }
}
</script>


<style scoped>
.my-dropdown-menu {
  position: absolute;
  top: -50%;
  left:auto;
  right: 100%;
  z-index: 1000;
  float: left;
  min-width: 250%;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  font-size: 14px;
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  -webkit-background-clip: padding-box;
          background-clip: padding-box;
}
</style>
