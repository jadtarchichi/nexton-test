<template>
  <div class="loading-box" v-if="isLoading">
    <div class="lds-circle" v-if="isLoading"><div></div></div>
  </div>
  <div class="details" v-if="!isLoading">
    <div class="image" v-if="item.fullScreenImage">
      <img :src="baseImageUrl + item.fullScreenImage" />
    </div>

    <div v-if="!errorMessage && showContent" class="content">
      <div v-if="this.item.title">
        <b>{{ this.item.title }}</b>
      </div>
      <div>
        <b>{{ this.item.subTitle }}</b>
      </div>
      <div>
        {{ this.item.pitch }}
      </div>
      <div>
        <button @click="showModel = true">Play</button>
      </div>
    </div>

    <div v-if="errorMessage" class="error-message">
      <router-link to="/">
        {{ this.errorMessage }}
      </router-link>
    </div>

    <Modal v-model="showModel">
      <div class="modal">
        <div class="close-modal" @click="showModel = false">
          <font-icon icon="times" />
        </div>
        <div class="container">
          <video-player
            :license-server="licenseServer"
            :manifest-url="manifestUrl"
            :poster-url="posterUrl"
          />
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import "@/styles/details.css";
import VideoPlayer from "@/components/VideoPlayer.vue";
import { getDetails } from "@/services/api";

export default {
  name: "Details",
  components: { VideoPlayer },
  created() {
    if (this.$route.params.item)
      this.item = JSON.parse(this.$route.params.item);
    else {
      this.$router.push({ name: "Home" });
    }
  },
  data() {
    return {
      isLoading: true,
      showModel: false,
      showContent: false,
      baseImageUrl: process.env.VUE_APP_IMAGEURL,
      item: null,
      errorMessage: "",

      licenseServer: "https://widevine-proxy.appspot.com/proxy",
      manifestUrl:
        "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd",
      posterUrl:
        "https://upload.wikimedia.org/wikipedia/commons/a/a7/Big_Buck_Bunny_thumbnail_vlc.png",
    };
  },
  mounted() {
    const { mode, id } = this.$route.params;

    if (id) {
      this.isLoading = true;

      getDetails(mode, id)
        .then((response) => {
          this.item = {
            ...this.item,
            pitch:
              mode == "serie"
                ? (response.data.contents.seasons[0] || {}).pitch
                : response.data.contents.pitch,
          };

          console.log("this.item", this.item);
        })
        .catch(() => {
          this.item = {};
          this.errorMessage = "Error 404";
        })
        .finally(() => {
          this.isLoading = false;
          setTimeout(() => {
            this.showContent = true;
          }, 1000);
        });
    }
  },
};
</script>