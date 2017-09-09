<template>
  <itmesList tittle="今日待办" list-name="Today"></itmesList>
</template>

<script>
import itmesList from './itemsList'

export default {
  name: 'Today',
  components:{ itmesList }
}
</script>

<style scoped>
.flip-list-move {
  transition: transform 0.2s;
}

.ghost {
  opacity: .5;
  background: #C8EBFB;
}
</style>
