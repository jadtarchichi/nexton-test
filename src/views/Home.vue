<template>
  <div class="home">
    <div class="search-form">
      <div class="lds-circle" v-if="isLoading"><div></div></div>

      <div>
        <input
          v-model="searchText"
          placeholder="Recherche"
          class="search-input"
          @change="searchInputChanged()"
          @keyup.enter="search()"
        />
      </div>

      <div>
        <span
          class="search-icon"
          :class="!searchText || isLoading ? 'disabled-cursor' : ''"
          @click="search()"
          ><img src="@/assets/search-icon.png"
        /></span>
      </div>
    </div>

    <div class="search-result" v-if="!isLoading && searchResult != null">
      <div class="no-results">
        {{ !searchResult.contents ? "Aucun Résultat" : "" }}
      </div>

      <div class="wrapper">
        <div
          class="item"
          v-for="item in searchResult.contents"
          :key="item"
          @click="goToDetails(item)"
        >
          <div>
            <img :src="baseImageUrl + item.imageurl" />
          </div>
          <div>
            <b>{{ item.title[0].value }}</b>
          </div>
          <div>{{ item.subtitle }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/styles/home.css"

export default {
  name: "Home",
  data() {
    return {
      isLoading: false,
      searchText: localStorage.getItem("orange-search-Text") || "",
      searchResult: null,
      baseImageUrl: process.env.VUE_APP_IMAGEURL,
    };
  },
  mounted() {
    if (this.searchText) {
      this.search();
    }
  },
  methods: {
    search() {
      if (!this.searchText || this.isLoading) return;

      this.isLoading = true;
      this.axios
        .get(
          process.env.VUE_APP_APIURL +
            "/contents?search=title=" +
            this.searchText
        )
        .then((response) => {
          this.searchResult = response.data;
        })
        .catch(() => {
          this.searchResult = {};
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    goToDetails(item) {
      localStorage.setItem("orange-search-Text", this.searchText);
      
      this.$router.push({
        name: "Details",
        params: { id: item.id, mode: item.detaillink.includes('programme') ? "programme" : "serie" },
      });
    },
    searchInputChanged() {
      if (!this.searchText) {
        localStorage.setItem("orange-search-Text", "");
      }
    },
  },
};
</script>