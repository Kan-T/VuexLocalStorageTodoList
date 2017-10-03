<template>
  <modal v-model="open" size="lg" :header="false" :backdrop="false" @show="init">

    <div class="flex-row">
      <div class="flex-row-item-grow">
        <textarea class="form-control" v-model="saveItem.content"></textarea>
      </div>
      <div class="flex-row-item" @click="saveItem.flag=!saveItem.flag">
        <span class="fa-stack fa-fw">
          <i class="fa fa-circle fa-stack-2x color-gray"></i>
          <i :class="FlagClass"></i>
        </span>
      </div>
    </div>

    <div slot="footer">
      <button type="button" class="btn btn-default" @click="open=false">{{CONST.CANCEL}}</button>
      <button type="button" class="btn btn-primary" @click="save">{{CONST.SAVE}}</button>
    </div>
  </modal>
</template>

<script>
import { Modal as modal } from 'uiv'
import * as CONST from '../Const'
import Local from '../Local'

export default {
  name: 'Pop',
  components:{ modal },
  data () {
    return {
      CONST: CONST,
      saveItem:{content:"",flag:false,done:false},
    }
  },
  props:["loadItem"],
  computed: {
    FlagClass(){
      return {
        "fa": true,
        "fa-flag": true,
        "fa-stack-1x": true,
        "fa-inverse": true,
        "color-red" : this.saveItem.flag
      }
    },
    open: {
      get(){
        return this.$store.state.Pop.showPop
      },
      set(val){
        this.$store.commit('setPop',val)
      }
    },
  },
  methods: {
    init(){
      this.saveItem = {...this.loadItem}      //对象浅复制
    },
    save(){
      if(this.saveItem.content){              //Need to add JSON filter function.
        this.$emit("save",this.saveItem)
      }
      this.open=false
    }
  },
}
</script>

<style scoped>
</style>
