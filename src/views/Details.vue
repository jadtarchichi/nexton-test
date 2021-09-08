<template>
  <div class="details" v-if="!isLoading">
    <div class="image" v-if="item.fullscreenimageurl">
      <img :src="baseImageUrl + item.fullscreenimageurl" />
    </div>

    <div v-if="!errorMessage && showContent" class="content">
      <div v-if="this.item.title">
        <b>{{ this.item.title[0].value }}</b>
      </div>
      <div>
        {{ this.item.subtitle }}
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
        <div class="close-modal" @click="showModel = false">&#10006;</div>
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

export default {
  name: "Details",
  components: { VideoPlayer },
  data() {
    return {
      isLoading: true,
      showModel: false,
      showContent: false,
      baseImageUrl: process.env.VUE_APP_IMAGEURL,
      item: {},
      errorMessage: "",

      licenseServer: "https://widevine-proxy.appspot.com/proxy",
      manifestUrl:
        "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd",
      posterUrl:
        "https://upload.wikimedia.org/wikipedia/commons/a/a7/Big_Buck_Bunny_thumbnail_vlc.png",
    };
  },
  mounted() {
    this.isLoading = true;
    if (this.$route.params.id) {
      this.axios
        .get(
          process.env.VUE_APP_APIURL +
            "/details/" +
            this.$route.params.mode +
            "/" +
            this.$route.params.id
        )
        .then((response) => {
          this.item = response.data.contents;
        })
        .catch(() => {
          this.item = {};
          this.errorMessage = "Error 404";
        })
        .finally(() => {
          this.isLoading = false;
          setTimeout(() => {
            this.showContent = true;
          }, 1500);
        });
    } else {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>