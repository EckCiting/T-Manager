<template>
  <div>
    <!-- The user's avatar on the Profile page -->
    <v-avatar
      style=" cursor:pointer;"
      size="150"
      @click="showUploadImg = true"
      @mouseover="showEditImg = true"
      @mouseleave="showEditImg = false"
    >
      <v-img
        :src="$store.state.host + 'auth/images/' + $store.getters.getUserphoto"
      ></v-img>
      <v-fade-transition>
        <v-overlay v-if="showEditImg" absolute color="#606060">
          <div style="font-fanily:SourceHanSansSC-regular;font-size:14px">
            Edit Avatar
          </div>
        </v-overlay>
      </v-fade-transition>
    </v-avatar>

    <!-- The dialog for the avatar upload -->
    <v-dialog v-model="showUploadImg" persistent max-width="450px">
      <v-card
        style="height:500px;background-color:#FFFFFF;display:flex;flex-direction:column;align-items:center;
        border-radius:10px"
      >
        <div
          @click="showUploadImg = false"
          style="display:flex;justify-content:flex-end;margin-top:10px;height:30px;width:430px"
        >
          <v-icon style="font-size:26px;cursor:pointer;"> mdi-close</v-icon>
        </div>

        <div
          style="margin-top:20px;height:350px;width:350px;border:solid 1px;border-color:#a5a5a5"
        >
          <v-img :src="fileUrl" height="350" width="350"></v-img>
        </div>
        <div
          style="margin-top:20px;display:flex;flex-direction:row;align-items:center;justify-items:center;width:300px;"
        >
          <div style="display:flex;align-items:center;margin-top:-10px">
            <v-file-input
              outlined
              hide-input
              prepend-icon="mdi-image-plus"
              v-model="imgFile"
              @change="Preview_image()"
              color="#f7b249"
              accept="image/* "
            >
            </v-file-input>
            <div style="margin-top:13px;font-size:16px;color:#757575">
              Click upload
            </div>
          </div>

          <v-spacer></v-spacer>
          <v-btn
            depressed
            style="border:#cccccc solid 1px; color:#777777; width:100px"
            @click="uploadImg"
            :loading="loading"
            :disabled="loading || imgFile == ''"
          >
            upload</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showUploadImg: false,
      imgFile: "",
      fileUrl: "",
      showEditImg: false,
      loading: false
    };
  },
  props: ["userName"],
  methods: {
    /**CheckImgSize*/
    checkImgSizeRules(v) {
      if (v.size > 1024 * 1024 * 5) {
        alert("Uploaded avatar should not be larger than 5M!");
        return false;
      }
      return true;
    },
    /** Upload a image*/
    async uploadImg() {
      if (this.imgFile == "") {
        alert("Need to select a picture!");
      }
      if (!this.checkImgSizeRules(this.imgFile)) {
        return;
      }
      this.loading = true;
      var originalFile = new FormData();
      originalFile.append("file", this.imgFile);
      await this.$axios({
        method: "post",
        url:
          this.$store.state.host +
          "resource/upload/" +
          this.$store.getters.getUsername,
        data: originalFile,
        headers: {
          Authorization: "Bearer " + this.$store.getters.getToken
        }
      })
        .then(res => {
          alert("Avatar uploaded successfully!");
          this.loading = false;
          if (this.$store.getters.getUserphoto != null) {
            this.deleteImg();
            this.$store.commit("set_userphoto", res.data);
          }
          this.$router.go(0);
        })
        .catch(error => {
          this.loading = false;
          // console.log(error);
        });
    },
    /**preview the image while uploading a image file*/
    Preview_image() {
      this.fileUrl = URL.createObjectURL(this.imgFile);
    },
    /**delete the image*/
    deleteImg() {
      this.$axios({
        method: "delete",
        url:
          this.$store.state.host +
          "resource/delete/" +
          this.$store.getters.getUserphoto,
        headers: {
          Authorization: "Bearer " + this.$store.getters.getToken
        }
      }).then(res => {});
    }
  }
};
</script>

<style scoped>
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
