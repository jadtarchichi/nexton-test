<template>
  <div class="home">
    <div class="search-form">
      <div class="loading-box">
        <div class="lds-circle" v-if="isLoading"><div></div></div>
      </div>
      <div>
        <input
          v-model="searchText"
          placeholder="Recherche"
          class="search-input"
          @change="searchInputChanged()"
          @keyup.enter="search(true)"
        />
      </div>

      <div>
        <span
          class="search-box"
          :class="!searchText || isLoading ? 'disabled-cursor' : 'enabled-cursor'"
          @click="search(true)"
        >
          <font-icon icon="search" class="font-search" size="2x" />
        </span>
      </div>
    </div>

    <div class="search-result" v-if="!isLoading && searchClicked">
      <div class="wrapper" v-if="listItems.length > 0">
        <div
          class="item"
          v-for="item in listItems"
          :key="item"
          @click="goToDetails(item)"
        >
          <div>
            <img v-if="item.imageurl" :src="baseImageUrl + item.imageurl" />
          </div>
          <div class="title">
            <b>{{ item.title[0].value }}</b>
          </div>
          <div>{{ item.subtitle }}</div>
        </div>
      </div>

      <div v-else class="no-results">Aucun Résultat</div>

      <Pagination
        :limitNumber="parseInt(limitNumber)"
        :totalCount="searchResult.total"
        @editLimitNumber="editLimitNumber"
      />
    </div>
  </div>
</template>

<script>
import "@/styles/home.css";
import Pagination from "@/components/Pagination";
import { getSearch } from "@/services/api";

export default {
  name: "Home",
  components: {
    Pagination,
  },
  data() {
    return {
      isLoading: false,
      searchClicked: false,
      searchText: localStorage.getItem("ocs-search-Text") || "",
      searchResult: {},
      limitNumber: localStorage.getItem("ocs-search-limit-number") || 8,
      baseImageUrl: process.env.VUE_APP_IMAGEURL,
    };
  },
  computed: {
    listItems() {
      if (!this.searchResult.total) return [];

      return this.searchResult.contents.slice(0, this.limitNumber);
    },
  },
  mounted() {
    if (this.searchText) {
      this.search();
    }
  },
  methods: {
    search(editLimit) {
      if (!this.searchText || this.isLoading) return;

      this.searchClicked = true;
      this.isLoading = true;

      if (editLimit) {
        this.limitNumber = 8;
        this.editLocalStorage("ocs-search-limit-number", this.limitNumber);
      }

      getSearch(this.searchText)
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
      this.editLocalStorage("ocs-search-Text", this.searchText);

      this.$router.push({
        name: "Details",
        params: {
          id: item.detaillink.split("/").pop(),
          mode: item.detaillink.includes("programme") ? "programme" : "serie",
        },
        query: {
          title: item.title[0].value,
          subTitle: item.subtitle,
          fullScreenImage: item.fullscreenimageurl,
        },
      });
    },
    searchInputChanged() {
      if (!this.searchText) {
        this.editLocalStorage("ocs-search-Text", "");
      }
    },
    editLimitNumber(pag) {
      if (pag == "add") {
        this.limitNumber = parseInt(this.limitNumber) + 8;
      } else if (pag == "remove") {
        this.limitNumber = parseInt(this.limitNumber) - 8;
      }

      this.editLocalStorage("ocs-search-limit-number", this.limitNumber);
    },
    editLocalStorage(id, value) {
      localStorage.setItem(id, value);
    },
  },
};
</script>