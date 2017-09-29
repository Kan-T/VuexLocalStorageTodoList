<template>
  <div class="side-container flex-row">
    <div class="close" @click.stop="toggleLeft" v-show="showSide"></div>

    <aside data-v="" v-show="showSide">
      <div data-v="" class="brand">
        <div class="flex-row-wide flex-row-space-between" >
          <div class="flex-row-item btn" @click.stop="toggleLeft">
            <h4><i class="fa fa-chevron-left fa-fw"></i>{{CONST.CLOSE_LIST}}</h4>
          </div>
          <div class="flex-row-item btn btn-default navbar-btn" @click.stop="editList">
            {{ this.editable ? CONST.COMPLETE : CONST.EDIT }}
          </div>
        </div>

        <div class="flex-col-item" style="width: 120px;">
          <select class="form-control input-sm" v-model="lang">
            <option disabled value="">{{CONST.CHOOSE}}</option>
            <option>{{CONST.LANG_CHN}}</option>
            <option>{{CONST.LANG_EN}}</option>
          </select>
        </div>
      </div>

      <div data-v="" class="nav-container">
        <div data-v="" class="nav-div">
          <ul data-v="" role="tablist" class="nav nav-pills nav-stacked">

            <li data-v="" class="no-link" @click.stop="showTodo=!showTodo">
              <a data-v="">{{CONST.PLAN_LIST}}
                <i :class="['fa','fa-fw',showTodo?'fa-caret-down':'fa-caret-right']"></i>
              </a>
            </li>
            <template v-for="(element,index) in todoList">
              <li data-v="" v-show="showTodo">
                <a data-v="" @click.stop="goto(index)" :class="['sub-list',(activeLi==index) ? 'router-link-active' : '']">
                {{element}}
                </a>
              </li>
            </template>

            <li data-v="" class="no-link" @click.stop="showOther=!showOther">
              <a data-v="">{{CONST.OTHER_LIST}}
                <i :class="['fa','fa-fw',showOther?'fa-caret-down':'fa-caret-right']"></i>
              </a>
            </li>
            <template v-for="(element,index) in otherList">
              <li data-v="" v-show="showOther">
                <a data-v="" @click.stop="goto(index+todoList.length)" :class="['sub-list',(activeLi==(index+todoList.length)) ? 'router-link-active' : '']">
                  {{element}}
                  <i class="fa fa-close fa-fw pull-right" @click.stop="del(index,element)" v-show="editable"></i>
                </a>
              </li>
            </template>

          </ul>
        </div>
      </div>
      <br>
      <br>

      <form class="form-inline fixed-bottom ">
        <input type="text" id="content" required :placeholder="CONST.LIST_TO_ADD"
              v-model="addItem">
        <button type="submit" class="btn btn-default" @click.stop="add">
          <i class="fa fa-plus"></i>
        </button>
      </form>
    </aside>

    <div class="side-bar-switch" @click.stop="toggleLeft">
      <i class="fa fa-angle-double-right fa-2x"></i>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import Local from '../Local'
import * as CONST from '../Const'

export default {
  name: 'SideBar',
  data () {
    return {
      CONST:CONST,
      activeLi:-1,
      todoList:[CONST.TODAY, CONST.TOMORROW, CONST.WEEK, CONST.FUTURE, CONST.CUSTOM, CONST.DONE],
      otherList:[],
      addItem:"",
      addError:"",
      lang: CONST.LANG_CHN,
      showTodo:true,
      showOther:true,
      editable:false,
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
    liClass(){
      return {
        "sub-list":true,
        "router-link-exact-active": true,
        "router-link-active": true
      }
    },
  },
  methods: {
    goto(index){                     //进入各子列表，用不同的listName名称复用List组件
      let list = this.todoList.concat(this.otherList)
      let text = list[index]
      if(text){
        this.activeLi = index
        this.$router.push({ name:'list', query:{'listName':text} })
        this.toggleLeft()
      }
    },

    toggleLeft(){
      this.$store.commit("toggleSide")
      this.editable=false
    },

    add(){
      let i = this.todoList.indexOf(this.addItem)
      let j = this.otherList.indexOf(this.addItem)
      if(this.addItem!='' & i<0 & j<0){
        this.otherList.push(this.addItem)
        this.otherListLocal.set(this.otherList)
        this.addItem=''
      }
    },

    del(index,element){
      let i = index + this.todoList.length
      if( i < this.activeLi ){
        this.activeLi=this.activeLi-1
      }else if( i == this.activeLi ) {
        this.activeLi = -1
        this.$router.push({ path: '/' })
      }else{
      }

      let delLocal = new Local(element)
      delLocal.clear()
      this.otherList.splice(index, 1)
      this.otherListLocal.set(this.otherList)
    },

    editList(){
      this.editable=!this.editable
    }
  },//end methods
  components: {  }
}
</script>

<style>
</style>
