<template>
  <div class="pagination">
    <div v-if="showMore" @click="edit('add')">Voir Plus <font-icon icon="plus" /></div>
    <div v-if="showLess" @click="edit('remove')">Voir Moins <font-icon icon="minus" /></div>
  </div>
</template>

<script>
import '@/styles/pagination.css'

export default {
  props: {
    showMore: {
      type: Boolean,
      default: false,
      required: true,
    },
    showLess: {
      type: Boolean,
      default: false,
      required: true,
    }
  },
  methods:{
    edit(text){
      this.$emit("edit-limit-count", text);
    }
  }
};
</script>
   