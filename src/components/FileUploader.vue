<template>
  <el-upload
    :on-change="changeFileHandler"
    action="#"
    :auto-upload="false"
    class="upload-container"
    :show-file-list="false"
    list-type="picture"
    accept=".pdf, .jpeg, .jpg"
  >
    <el-button size="mini" type="success">{{ fileInfo && fileInfo.originalName ? 'Обновить' : 'Загрузить' }}</el-button>
    <template #tip>
      <div v-if="fileInfo && fileInfo.originalName" class="file-name">
        <a :href="fileInfo.getFileUrl()" target="_blank">
          <div>{{ fileInfo.originalName }}</div>
        </a>
        <el-button size="mini" icon="el-icon-close" @click="removeFile"></el-button>
      </div>
      <div v-else class="file-name">Файл не загружен</div>
    </template>
  </el-upload>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IFile from '@/interfaces/files/IFile';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default defineComponent({
  name: 'FileUploader',
  props: {
    fileInfo: {
      type: Object as PropType<IFileInfo>,
      required: true,
    },
  },

  setup(props) {
    const changeFileHandler = (file: IFile) => {
      props.fileInfo.uploadAndSetFile(file);
    };
    const removeFile = () => {
      props.fileInfo.clearFile();
    };

    return {
      changeFileHandler,
      removeFile,
    };
  },
});
</script>

<style lang="scss" scoped>
.file-name {
  margin-left: 5px;
  display: flex;
  align-items: center;
  a {
    line-height: 1.1;
  }
  .el-button {
    margin-left: 2px;
    padding: 5px;
    margin: 0;
    min-height: unset;
    border: none;
  }
}
.upload-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

@media screen and (max-width: 1280px) {
  .upload-container {
    display: block;
  }
}

@media screen and (max-width: 1200px) {
  .upload-container {
    display: flex;
  }
}

// @media screen and (max-width: 1024px) {
//   .upload-container {
//     display: block;
//   }
// }
</style>
