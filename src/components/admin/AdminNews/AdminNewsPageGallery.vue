<template>
  <el-card class="gallery">
    <template #header> Галерея </template>
    <el-upload
      ref="uploader"
      :multiple="false"
      class="avatar-uploader"
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :auto-upload="false"
      :on-change="toggleUpload"
      accept="image/jpeg,image/png,image/jng"
    >
      <template #default>
        <i class="el-icon-plus"></i>
      </template>
      <template #file="{ file }">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        </div>
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </template>
    </el-upload>
  </el-card>
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

import Cropper from '@/classes/cropper/Cropper';
import IFile from '@/interfaces/files/IFile';
import IFilesList from '@/interfaces/files/IFIlesList';

export default defineComponent({
  name: 'AdminNewsPage',
  emits: ['toggleUpload', 'handleRemove', 'handlePictureCardPreview'],
  setup() {
    const store = useStore();
    const fileList = computed(() => store.getters[`news/galleryList`]);

    const openCropper = (file: IFile) => {
      store.commit('cropper/open', Cropper.CreateCropper(file.url, 'news', 'saveFromCropperGallery', 8 / 3.3));
    };

    const toggleUpload = (file: IFile) => {
      store.commit('news/pushToNewsImages', file);
      store.commit('news/setCurGalleryCropIndex', fileList.value.length);
      openCropper(file);
    };

    const handlePictureCardPreview = (file: IFile) => {
      const index = fileList.value.findIndex((f: IFilesList) => f.name === file.name);
      if (index > -1) store.commit('news/setCurGalleryCropIndex', index);
      openCropper(file);
    };

    const handleRemove = (file: IFile) => {
      store.commit('news/removeFromGallery', file);
    };

    return {
      handlePictureCardPreview,
      fileList,
      toggleUpload,
      handleRemove,
    };
  },
});
</script>

<style lang="scss" scoped>
.gallery {
  width: 100%;
  text-align: center;
}

$news-content-max-width: 800px;
$news-content-max-height: 330px;

.hideUpload {
  :deep(.el-upload) {
    display: none;
  }
}

.avatar-uploader-cover {
  height: 300px;
  text-align: center;
  align-content: center;
}

.custom-plus {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

:deep(.el-upload) {
  width: $news-content-max-width;
  height: $news-content-max-height;
  background: white;
  text-align: center;
  line-height: $news-content-max-height;
}

:deep(.el-upload-list__item) {
  width: $news-content-max-width !important;
  height: $news-content-max-height !important;
}

:deep(.el-upload-list__item-thumbnail) {
  width: $news-content-max-width !important;
  height: $news-content-max-height !important;
}
</style>
