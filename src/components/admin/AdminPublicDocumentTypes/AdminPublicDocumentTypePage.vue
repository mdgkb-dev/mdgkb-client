<template>
  <div v-if="mounted" class="page-container">
    <el-form ref="form" :rules="rules" :model="publicDocumentType" label-position="top">
      <el-card header="Раздел">
        <el-form-item label="Название раздела" prop="name">
          <el-input v-model="publicDocumentType.name" placeholder="Название раздела"></el-input>
        </el-form-item>
        <el-form-item label="Якорь" prop="routeAnchor">
          <el-input v-model="publicDocumentType.routeAnchor" placeholder="Якорь"></el-input>
        </el-form-item>
        <el-form-item label="Поместить в раздел Образование" prop="routeAnchor">
          <el-checkbox
            :model-value="!!publicDocumentType.educationPublicDocumentType"
            @change="publicDocumentType.setEducationPublicDocumentType($event)"
          ></el-checkbox>
        </el-form-item>
        <el-form-item prop="description">
          <WysiwygEditor v-model:content="publicDocumentType.description" />
        </el-form-item>
      </el-card>
      <el-card>
        <template #header>
          <div class="card-header">
            <span>Типы документов</span>
            <el-button type="success" @click="addDocType">Добавить тип</el-button>
          </div>
        </template>
        <el-card v-for="(docType, docTypeIndex) in publicDocumentType.documentTypes" :key="docTypeIndex">
          <template #header>
            <div class="card-header">
              <el-form-item
                style="margin: 0 10px 0 0; width: 100%"
                :prop="'documentTypes.' + docTypeIndex + '.name'"
                :rules="rules.docTypeName"
              >
                <el-input v-model="docType.name" placeholder="Название типа документов"></el-input>
              </el-form-item>
              <el-button type="danger" icon="el-icon-close" @click="removeDocType(docTypeIndex)"></el-button>
            </div>
            <div>
              <el-form-item prop="description">
                <WysiwygEditor v-model:content="docType.description" />
              </el-form-item>
            </div>
          </template>
          <el-table :data="docType.documents">
            <el-table-column prop="name" label="Название документа">
              <template #default="scope">
                <el-form-item
                  size="mini"
                  :prop="'documentTypes.' + docTypeIndex + '.documents.' + scope.$index + '.name'"
                  :rules="rules.docName"
                  style="margin: 0"
                >
                  <el-input v-model="scope.row.name" placeholder="Название документа"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="Документ">
              <template #default="scope">
                <DocumentUploader :document="scope.row" />
              </template>
            </el-table-column>
            <el-table-column width="70" align="center">
              <template #header>
                <el-button type="success" icon="el-icon-plus" size="mini" @click="addDocument(docType)"></el-button>
              </template>
              <template #default="scope">
                <TableButtonGroup :show-remove-button="true" @remove="removeDocument(docType, scope.$index)" />
              </template>
            </el-table-column>
          </el-table>
          <!-- <el-card v-for="(doc, docIndex) in docType.documents" :key="docIndex">
            <el-form-item
              label="Название документа"
              :prop="'documentTypes.' + docTypeIndex + '.documents.' + docIndex + '.name'"
              :rules="rules.docName"
            >
              <el-input v-model="doc.name" placeholder="Название документа"></el-input>
            </el-form-item>
            <DocumentUploader :document="doc" />
          </el-card> -->
        </el-card>
      </el-card>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import DocumentUploader from '@/components/DocumentUploader.vue';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IPublicDocumentType from '@/interfaces/document/IPublicDocumentType';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminPublicDocumentTypePage',
  components: { DocumentUploader, TableButtonGroup, WysiwygEditor },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const form = ref();
    const mounted: Ref<boolean> = ref(false);
    const publicDocumentType: ComputedRef<IPublicDocumentType> = computed(() => store.getters['publicDocumentTypes/item']);
    const rules = {
      name: [{ required: true, message: 'Необходимо указать название раздела', trigger: 'blur' }],
      docName: [{ required: true, message: 'Необходимо указать название документа', trigger: 'blur' }],
      docTypeName: [{ required: true, message: 'Необходимо указать название типа документа', trigger: 'blur' }],
    };

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    const addDocType = () => {
      store.commit('publicDocumentTypes/addDocType');
    };

    const removeDocType = (index: number) => {
      store.commit('publicDocumentTypes/removeDocType', index);
    };

    const addDocument = (docType: IDocumentType) => {
      docType.addDocument();
    };

    const removeDocument = (docType: IDocumentType, index: number) => {
      docType.removeDocument(index);
    };

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      try {
        if (route.params['id']) {
          await store.dispatch('publicDocumentTypes/update', publicDocumentType.value);
        } else {
          await store.dispatch('publicDocumentTypes/create', publicDocumentType.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : router.push('/admin/public-document-types');
    };

    onBeforeMount(async () => {
      store.commit('publicDocumentTypes/resetState');
      store.commit('admin/showLoading');
      if (route.params['id']) {
        await store.dispatch('publicDocumentTypes/get', route.params['id']);
        store.commit('admin/setHeaderParams', { title: 'Обновить раздел', showBackButton: true, buttons: [{ action: submit }] });
      } else {
        store.commit('admin/setHeaderParams', { title: 'Добавить раздел', showBackButton: true, buttons: [{ action: submit }] });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(publicDocumentType, formUpdated, { deep: true });
      store.commit('admin/closeLoading');
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    onBeforeUnmount(() => {
      store.commit('publicDocumentTypes/resetState');
    });

    return {
      mounted,
      form,
      rules,
      publicDocumentType,
      addDocument,
      addDocType,
      removeDocType,
      removeDocument,
    };
  },
});
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  flex-direction: column;
}
.el-card {
  margin-bottom: 20px;
}
:deep(.avatar-uploader-cover) {
  text-align: start;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
