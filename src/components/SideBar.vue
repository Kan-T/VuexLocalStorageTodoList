<template>
  <div class="cbp-spmenu-push">
    <nav :class="sideClass1" id="cbp-spmenu-s1" @click="goto">
      <h3 @click.stop="toggleLeft" ><i class="fa fa-chevron-left"></i> 关闭列表</h3>
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
    <div :class="sideClass2" @click="toggleLeft"><i class="fa fa-chevron-right"></i></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Local from '../Local'

export default {
  name: 'SideBar',
  data () {
    return {
      activeLi:-1,
      todoList:["今日","明日","本周","本月","未来","固定习惯","已完成"],
      otherList:[],
      addItem:"",
      addError:"",
    }
  },
  created(){
    this.otherList = this.otherListLocal.get() || []      //initialize otherList

    let listName=this.$route.query.listName
    if(listName){                                        //刷新时，让active正确的列表项
      let list = this.todoList.concat(this.otherList)
      this.activeLi=list.indexOf(listName)
    }

  },
  computed:{
    showSide(){
      return this.$store.state.SideBar.showSide
    },
    otherListLocal(){
      return new Local("otherList")
    },
    sideClass1(){
      return {
        "cbp-spmenu": true,
        "cbp-spmenu-vertical": true,
        "cbp-spmenu-left": true,
        "cbp-spmenu-open": this.showSide
      }
    },
    sideClass2(){
      return {
        "cbp-spmenu": true,
        "show-bar": true,
        "cbp-spmenu-left": true,
        "cbp-spmenu-open": this.showSide,
        "center-block":true
      }
    }
  },
  methods: {
    goto(e){                     //进入各子列表，用不同的listName名称复用List组件
      let text = e.target.text;
      let list = this.todoList.concat(this.otherList)
      let i = list.indexOf(text)
      if(i>=0){
        this.activeLi = i
        this.$router.push({ name:'list', query:{'listName':text} })
      }

      this.toggleLeft()
    },

    toggleLeft(){
      this.$store.commit("toggleSide")
    },

    add(){
      let i = this.todoList.indexOf(this.addItem)
      let j = this.otherList.indexOf(this.addItem)
      if(this.addItem!='' & i<0 & j<0){
        this.otherList.push(this.addItem)
        this.otherListLocal.set(this.otherList)
      }
    }
  }//end methods
}
</script>

<style></style>
