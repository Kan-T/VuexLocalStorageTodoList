<template>
  <modal v-model="open" size="lg" :header="false" :backdrop="false">

    <p>xxx</p>

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
    }
  },
  computed: {
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
    save(){

      this.open=false
    }
  },
  watch: {
  },
}
</script>


<style scoped>
</style>
