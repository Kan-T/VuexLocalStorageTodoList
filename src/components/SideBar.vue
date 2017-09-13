<template>
  <div class="cbp-spmenu-push">
    <nav :class="sideClass1" id="cbp-spmenu-s1" @click="goto">
      <h3><i class="fa fa-chevron-left" @click="showLeft"></i> 列表</h3>
      <a :class="{active: (activeLi==0)}"><i class="fa fa-list fa-1x"></i>今日待办</a>
      <a :class="{active: (activeLi==1)}">待办清单</a>
      <a :class="{active: (activeLi==2)}">长期习惯</a>
      <a :class="{active: (activeLi==3)}">已完成</a>
      <template v-for="(element,index) in otherList">
        <a :class="{active: (activeLi==(index+4))}">{{element}}</a>
      </template>

      <form class="form-inline cbp-fixed-bottom ">
          <input type="text" id="content" required placeholder="要添加的列表"
                v-model="addItem">
          <button type="submit" class="btn btn-default"  @click="add">
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
    goto(e){
      let text = e.target.text;
      switch(text)
      {
      case "今日待办":
        this.activeLi=0;
        this.$router.push('/');
        break;
      case "待办清单":
        this.activeLi=1;
        this.$router.push({path: '/todolist'});
        break;
      case "长期习惯":
        this.activeLi=2;
        this.$router.push('/thirdapi');
        break;
      case "已完成":
        this.activeLi=3;
        this.$router.push('/done');
        break;
      }
      let i = this.otherList.indexOf(text)
      if(i>=0){
        this.activeLi = i+4
        this.$router.push({ name: 'others', query:{'listName': text} })
      }
    },
    showLeft(){
      this.open=!this.open
    },
    add(){
      if(this.addItem!=''){
        this.otherList.push(this.addItem);
      }
      this.otherListLocal.set(this.otherList);
    }
  },
}
</script>

<style></style>
