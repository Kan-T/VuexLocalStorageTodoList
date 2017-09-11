<template>
  <div id="app">
    <nav class="navbar navbar-default justified navbar-fixed-bottom">
      <ul class="nav nav-tabs nav-justified" @click="goto">
        <li :class="{active: (activeLi==0)}"><a id="今日待办">
            <i class="fa fa-list fa-1x"></i>今日待办
        </a></li>
        <li :class="{active: (activeLi==1)}"><a id="待办清单">
            待办清单<span class="glyphicon glyphicon-list-alt" aria-hidden="true">
        </span></a></li>
        <li :class="{active: (activeLi==2)}"><a id="添加">
            添加<span class="glyphicon glyphicon-plus-sign" aria-hidden="true">
        </span></a></li>
        <li :class="{active: (activeLi==3)}"><a id="长期习惯">
            长期习惯<span class="glyphicon glyphicon-screenshot" aria-hidden="true">
        </span></a></li>
        <li :class="{active: (activeLi==4)}"><a id="已完成">
            已完成<span class="glyphicon glyphicon-repeat" aria-hidden="true">
        </span></a></li>
        <li :class="{active: (activeLi==5)}"><a :id="otherLists[0]">
            {{otherLists[0]}}
        </a></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
  data(){
    return{
      activeLi:0,
      showLeft:false,
      otherLists:["电影"]
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
      case "添加":
        this.activeLi=2;
        this.$router.push('/addtodo');
        break;
      case "长期习惯":
        this.activeLi=3;
        this.$router.push('/thirdapi');
        break;
      case "已完成":
        this.activeLi=4;
        this.$router.push('/done');
        break;
      case this.otherLists[0]:
        this.activeLi=5;
        this.$router.push({ name: 'others', query:{listName: this.otherLists[0]} });
        break;
      }
    }
  },
  components:{  }
}

</script>

<style>
  @import './assets/bootstrap/css/bootstrap.css';
</style>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.daily-cut {
  overflow:hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.daily-middle {
  display:table-cell;
  vertical-align:middle;
}
</style>