<template>
  <el-card>
    <template #header>{{ title }}</template>
    <el-upload
      ref="uploader"
      :multiple="false"
      action="#"
      list-type="picture-card"
      class="avatar-uploader-cover"
      :file-list="fileList"
      :auto-upload="false"
      :limit="parseInt('1')"
      :on-change="toggleUpload"
      :class="{ hideUpload: !showUpload }"
      accept="image/jpeg,image/png,image/jng"
    >
      <template #default>
        <i class="el-icon-plus custom-plus"></i>
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
import { computed, defineComponent, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import Cropper from '@/classes/cropper/Cropper';
import FileInfo from '@/classes/File/FileInfo';
import IFile from '@/interfaces/files/IFile';
import IFilesList from '@/interfaces/files/IFIlesList';

export default defineComponent({
  name: 'AdminDoctorImage',
  props: {
    title: { type: String, required: true },
  },
  setup() {
    const store = useStore();
    const fileList: Ref<IFilesList[]> = computed(() => store.getters[`doctors/fileList`]);
    const fileInfo: Ref<FileInfo> = computed(() => store.getters[`doctors/fileInfo`]);

    let uploader = ref();
    let showUpload = ref(fileList.value.length === 0);

    const openCropper = (file: IFile) => {
      console.log('open', file);
      store.commit('cropper/open', Cropper.CreateCropper(file.url, 'doctors', 'saveFromCropper', 1));
    };

    const toggleUpload = (file: IFile) => {
      showUpload.value = !showUpload.value;
      store.commit('doctors/setFileInfo', FileInfo.CreatePreviewFile(file, 'previewFile', fileInfo.value.id));
      openCropper(file);
    };

    const handleRemove = () => {
      uploader.value.clearFiles();
      setTimeout(() => {
        showUpload.value = !showUpload.value;
      }, 800);
      store.commit('doctors/removeFileInfo');
    };

    const handlePictureCardPreview = (file: IFile) => {
      openCropper(file);
    };

    return {
      handlePictureCardPreview,
      openCropper,
      fileList,
      fileInfo,
      uploader,
      handleRemove,
      showUpload,
      toggleUpload,
    };
  },
});
</script>

<style lang="scss" scoped>
$news-content-max-width: 300px;
$news-content-max-height: $news-content-max-width;

.hideUpload {
  :deep(.el-upload) {
    display: none;
  }
}

.avatar-uploader-cover {
  height: 300px;
  text-align: center;
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
