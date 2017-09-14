<template>
  <div class="cbp-spmenu-push">
    <nav :class="sideClass1" id="cbp-spmenu-s1" @click="goto">
      <h3><i class="fa fa-chevron-left" @click="showLeft"></i> 列表</h3>
      <template v-for="(element,index) in todoList">
        <a :class="{active: (activeLi==index)}">{{element}}</a>
      </template>
      <template v-for="(element,index) in otherList">
        <a :class="{active: (activeLi==(index+todoList.length))}">{{element}}</a>
      </template>

      <form class="form-inline cbp-fixed-bottom ">
          <input type="text" id="content" required placeholder="要添加的列表"
                v-model="addItem">
          <button type="submit" class="btn btn-default" @click="add">
            <i class="fa fa-plus"></i>
          </button>
      </form>

    </nav>
    <div :class="sideClass2" @click="showLeft"><i class="fa fa-chevron-right"></i></div>
  </div>
</template>

<script>
import Local from '../Local'

export default {
  name: 'SideBar',
  data () {
    return {
      activeLi:0,
      todoList:["今日","明日","本周","本月","未来","固定习惯"],
      otherList:[],
      addItem:"",
      addError:"",
      open:false
    }
  },
  created(){
    this.otherList = this.otherListLocal.get() || []
  },
  computed:{
    otherListLocal(){
      return new Local("otherList")
    },
    sideClass1(){
      return {
        "cbp-spmenu": true,
        "cbp-spmenu-vertical": true,
        "cbp-spmenu-left": true,
        "cbp-spmenu-open": this.open
      }
    },
    sideClass2(){
      return {
        "cbp-spmenu": true,
        "show-bar": true,
        "cbp-spmenu-left": true,
        "cbp-spmenu-open": this.open,
        "center-block":true
      }
    }
  },
  methods: {
    goto(e){                     //进入各子列表，用不同的listName名称复用List组件
      let text = e.target.text;

      let i = this.todoList.indexOf(text)
      if(i>=0){
        this.activeLi = i
        this.$router.push({ name: 'list', query:{'listName': text} })
      }

      i = this.otherList.indexOf(text)
      if(i>=0){
        this.activeLi = i+this.todoList.length
        this.$router.push({ name: 'list', query:{'listName': text} })
      }
    },

    showLeft(){
      this.open=!this.open
    },

    add(){
      let i = this.todoList.indexOf(this.addItem)
      let j = this.otherList.indexOf(this.addItem)
      if(this.addItem!='' & i>=0 & j>=0){
        this.otherList.push(this.addItem)
        this.otherListLocal.set(this.otherList)
      }
    }
  }//end methods
}
</script>

<style></style>
