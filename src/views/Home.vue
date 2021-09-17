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
          @keyup.enter="search()"
        />
      </div>

      <div>
        <span
          class="search-box"
          :class="!searchText || isLoading ? 'disabled-cursor' : ''"
          @click="search()"
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
        :showMore="limitNumber < this.searchResult.total"
        :showLess="limitNumber > 8"
        @editLimitCount="editLimitCount"
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
      limitNumber: localStorage.getItem("ocs-search-limit-count") || 8,
      baseImageUrl: process.env.VUE_APP_IMAGEURL,
    };
  },
  computed: {
    listItems() {
      if (!this.searchResult.total) return [];

      return this.searchResult.contents.filter((item, index) => {
        if (index < this.limitNumber) {
          return true;
        }
        return false;
      });
    },
  },
  mounted() {
    if (this.searchText) {
      this.search();
    }
  },
  methods: {
    search() {
      if (!this.searchText || this.isLoading) return;

      this.searchClicked = true;
      this.isLoading = true;
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
      localStorage.setItem("ocs-search-Text", this.searchText);

      // Normalement on appel un API pour retourner les informations
      // on peut résoudre par params ou par store
      this.$router.push({
        name: "Details",
        params: {
          id: item.detaillink.split("/").pop(),
          mode: item.detaillink.includes("programme") ? "programme" : "serie",
          item: JSON.stringify({
            title: item.title[0].value,
            subTitle: item.subtitle,
            fullScreenImage: item.fullscreenimageurl,
          }),
        },
      });
    },
    searchInputChanged() {
      if (!this.searchText) {
        localStorage.setItem("ocs-search-Text", "");
      }
    },
    editLimitCount(pag) {
      if (pag == "add") {
        this.limitNumber = parseInt(this.limitNumber) + 8;
      } else if (pag == "remove") {
        this.limitNumber = parseInt(this.limitNumber) - 8;
      }

      localStorage.setItem("ocs-search-limit-count", this.limitNumber);
    },
  },
};
</script>