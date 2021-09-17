<template>
  <Header />
  <div class="main">
    <router-view />
    <div class="scrollTop" @click="scrollTop()">
      <font-icon icon="arrow-alt-circle-up" size="4x" style="color: #ff7900" />
    </div>
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
      localStorage.setItem("ocs-search-Text", "");
      localStorage.setItem("ocs-search-limit-count", "");
    },
    scrollTop(){
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }
};
</script>