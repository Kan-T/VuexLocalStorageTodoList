<template>
  <div id="app">
    <nav class="navbar navbar-default justified navbar-fixed-top">
      <ul class="nav nav-tabs nav-justified" @click="goto">
        <li :class="{active: (activeLi==0)}"><a id="今日待办">
            今日待办<span class="glyphicon glyphicon-calendar" aria-hidden="true">
        </span></a></li>
        <li :class="{active: (activeLi==1)}"><a id="待办清单">
            待办清单<span class="glyphicon glyphicon-list-alt" aria-hidden="true">
        </span></a></li>
        <li :class="{active: (activeLi==2)}"><a id="添加">
            添加<span class="glyphicon glyphicon-plus-sign" aria-hidden="true">
        </span></a></li>
        <li :class="{active: (activeLi==3)}"><a id="定期循环">
            定期循环<span class="glyphicon glyphicon-repeat" aria-hidden="true">
        </span></a></li>
        <li :class="{active: (activeLi==4)}"><a id="持续清单">
            持续清单<span class="glyphicon glyphicon-screenshot" aria-hidden="true">
        </span></a></li>
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
      activeLi:0
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
        this.$router.push('/thirdapi');
        break;
      case "定期循环":
        this.activeLi=3;
        this.$router.push('/thirdapi');
        break;
      case "持续清单":
        this.activeLi=4;
        this.$router.push('/thirdapi');
        break;
      }
    }
  },
  components:{}
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
</style>