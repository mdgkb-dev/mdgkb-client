<template>
  <!-- <div v-for="type of normativeDocumentTypes" :key="type.id"> -->
  <el-container direction="vertical">
    <div class="header-center">
      <h2>Нормативные документы</h2>
    </div>
    <el-collapse v-model="activeName" accordion @change="collapseChangeHandler">
      <template v-for="(type, item) in normativeDocumentTypes" :key="type.id">
        <el-collapse-item :name="item + 1">
          <template #title>
            <h3 class="collapseHeader">{{ type.name }}</h3>
          </template>
          <!-- <h3>{{ type.name }}</h3> -->
          <el-table
            ref="table"
            :data="normativeDocumentsList.filter((doc) => doc.type.id === type.id)"
            class="table-shadow"
            header-row-class-name="header-style"
            row-class-name="no-hover"
          >
            <el-table-column width="40" align="center">
              <template #default>
                <div class="document-icon"><FilePdfOutlined /></div>
              </template>
            </el-table-column>
            <el-table-column prop="name" align="left" min-width="130" resizable>
              <template #header>
                <el-input prefix-icon="el-icon-search" v-model="filter" placeholder="Найти документ" size="large" />
              </template>
              <template #default="scope"> {{ scope.row.name }} </template>
            </el-table-column>
            <el-table-column fixed="right" width="300" align="right">
              <template #default="scope">
                <a
                  v-if="scope.row.fileInfo"
                  :href="getFileUrl(scope.row?.fileInfo?.fileSystemPath)"
                  :download="scope.row?.fileInfo?.originalName"
                  target="_blank"
                  style="margin-right: 10px"
                >
                  <el-button icon="el-icon-download">Скачать</el-button>
                </a>
                <el-button icon="el-icon-view" @click="openModal(getFileUrl(scope.row?.fileInfo?.fileSystemPath))">Просмотр</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </template>
    </el-collapse>
  </el-container>
  <!-- </div> -->
  <el-dialog v-model="modalOpen">
    <NormativeDocumentsModal :filePath="filePath" />
  </el-dialog>
  <a ref="fileAnchor" style="display: none" />
</template>

<script lang="ts">
import { ref, onBeforeMount, defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { FilePdfOutlined } from '@ant-design/icons-vue';
import NormativeDocumentsModal from '@/components/NormativeDocuments/NormativeDocumentsModal.vue';
import INormativeDocument from '@/interfaces/normativeDocument/INormativeDocument';

export default defineComponent({
  name: 'NormativeDocuments',
  components: { NormativeDocumentsModal, FilePdfOutlined },
  setup() {
    const filter = ref('');
    const store = useStore();
    const filePath = ref('');
    const modalOpen = ref(false);
    const normativeDocuments = computed(() => store.getters['normativeDocuments/documents']);
    const normativeDocumentsList = computed((): INormativeDocument => {
      if (filter.value) {
        return normativeDocuments.value.filter((o: INormativeDocument) => {
          if (o.name) return o.name.toLowerCase().includes(filter.value.toLowerCase());
        });
      } else {
        return normativeDocuments.value;
      }
    });
    const normativeDocumentTypes = ref();
    const activeName = ref(1);

    const getFileUrl = (path: string): string => {
      return `${process.env.VUE_APP_STATIC_URL}/${path}`;
    };

    const openModal = (path: string): void => {
      filePath.value = path;
      modalOpen.value = !modalOpen.value;
      return;
    };

    onBeforeMount(async () => {
      await store.dispatch('normativeDocuments/getAll');
      await store.dispatch('normativeDocumentTypes/getAll');
      normativeDocumentTypes.value = store.getters['normativeDocumentTypes/types'];
    });

    const collapseChangeHandler = () => {
      filter.value = '';
    };

    return {
      filePath,
      modalOpen,
      normativeDocumentTypes,
      normativeDocuments,
      normativeDocumentsList,
      getFileUrl,
      activeName,
      openModal,
      filter,
      collapseChangeHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/collapse.scss';
.document-icon {
  font-size: 20px;
}
</style>
