<template>
  <Header />
  <div class="main">
    <router-view />
  </div>
  <div id="modals"></div>
</template>

<script>
import "@/styles/main.css";
import Header from "@/components/Header.vue";

export default {
  name: "App",
  created() {
    window.addEventListener('beforeunload', this.leaving)
  },
  components: {
    Header,
  },
  methods: {
    leaving() {
      localStorage.setItem("orange-search-Text", "");
    },
  }
};
</script>