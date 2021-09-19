<template>
  <div class="pagination">
    <div v-if="limitNumber < totalCount" @click="edit('add')">Voir Plus <font-icon icon="plus" /></div>
    <div v-if="limitNumber > 8" @click="edit('remove')">Voir Moins <font-icon icon="minus" /></div>
  </div>
</template>

<script>
import '@/styles/pagination.css'

export default {
  props: {
    limitNumber: {
      type: Number,
      default: 8,
      required: true,
    },
    totalCount: {
      type: Number,
      default: 0,
      required: true,
    }
  },
  methods:{
    edit(text){
      this.$emit("edit-limit-number", text);
    }
  }
};
</script>
   