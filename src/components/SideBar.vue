<template>
  <div class="cbp-spmenu-push">
    <nav :class="sideClass1" id="cbp-spmenu-s1" @click="goto">
      <h3>清单列表</h3>
      <a id="今日待办" :class="{active: (activeLi==0)}"><i class="fa fa-list fa-1x"></i>今日待办</a>
      <a id="待办清单" :class="{active: (activeLi==1)}">待办清单</a>
      <a id="长期习惯" :class="{active: (activeLi==2)}">长期习惯</a>
      <a id="已完成" :class="{active: (activeLi==3)}">已完成</a>
      <a :id="otherLists[0]" :class="{active: (activeLi==5)}">{{otherLists[0]}}</a>
    </nav>
    <div :class="sideClass2" @click="showLeft"><i class="fa fa-chevron-right"></i></div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data () {
    return {
      activeLi:0,
      otherLists:["电影"],
      open:false
    }
  },
  computed:{
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
        "cbp-spmenu-open": this.open
      }
    }
  },
  methods: {
    goto(e){
      switch(e.target.id)
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
      case this.otherLists[0]:
        this.activeLi=5;
        this.$router.push({ name: 'others', query:{listName: this.otherLists[0]} });
        break;
      }
    },
    showLeft(){
      this.open=!this.open
    }
  },
}
</script>

<style></style>
