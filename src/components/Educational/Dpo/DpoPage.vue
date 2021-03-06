<template>
  <!--  <div class="way">-->
  <!--    <h4>Главная / Образование / <font color="#2754EB">Дополнительное профессиональное образование</font></h4>-->
  <!--  </div>-->
  <PageWrapper v-if="mounted" :title="title">
    <template #filters>
      <DpoFilters
        :condition="mode === 'programs' || mode === ''"
        :modes="modes"
        :mode="mode"
        @selectMode="selectMode"
        @load="loadCourses"
      />
    </template>

    <div class="editor-content card-item">
      <EditorContent
        v-if="selectedDocumentType && selectedDocumentType.description !== '<p>undefined</p>'"
        :content="selectedDocumentType.description"
      />
    </div>
    <DpoCoursesList v-if="mode === 'programs'" />
    <DocumentsList v-if="selectedDocumentType" :documents="selectedDocumentType.documents" />
    <DpoCoursesContacts v-if="mode === 'contacts'" />
  </PageWrapper>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';

import EditorContent from '@/components/EditorContent.vue';
import DocumentsList from '@/components/Educational/Dpo/DocumentsList.vue';
import DpoCoursesContacts from '@/components/Educational/Dpo/DpoCoursesContacts.vue';
import DpoCoursesList from '@/components/Educational/Dpo/DpoCoursesList.vue';
import DpoFilters from '@/components/Educational/Dpo/DpoFilters.vue';
import PageWrapper from '@/components/PageWrapper.vue';
import IDocumentType from '@/interfaces/document/IDocumentType';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import IDpoDocumentType from '@/interfaces/IDpoDocumentType';
import IOption from '@/interfaces/schema/IOption';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import DpoCoursesSortsLib from '@/services/Provider/libs/sorts/DpoCoursesSortsLib';

export default defineComponent({
  name: 'DpoPage',
  components: {
    DocumentsList,
    DpoCoursesContacts,
    DpoFilters,
    EditorContent,
    DpoCoursesList,
    PageWrapper,
  },

  setup() {
    const route = useRoute();
    const documentTypes: ComputedRef<IDpoDocumentType[]> = computed(() => Provider.store.getters['dpoDocumentTypes/items']);
    const selectedDocumentType: Ref<IDocumentType | undefined> = ref(undefined);
    const sortModels: Ref<ISortModel[]> = ref([]);
    const modes: Ref<IOption[]> = ref([]);
    const mode: ComputedRef<string> = computed(() => (route.query.mode as string) || 'programs');
    const title: ComputedRef<string> = computed(() => {
      let title = '';
      switch (true) {
        case mode.value === 'programs':
          title = 'Программы дополнительного профессионального образования';
          break;
        case mode.value === 'contacts':
          title = 'Контакты дополнительного профессионального образования';
          break;
        default:
          break;
      }
      return title;
    });

    const selectMode = async (value: string) => {
      if (value === mode.value) {
        return;
      }
      const dpoDocumentType = documentTypes.value.find((dpoDocType: IDpoDocumentType) => dpoDocType.documentType.id === value);
      if (dpoDocumentType) {
        selectedDocumentType.value = dpoDocumentType.documentType;
      } else {
        selectedDocumentType.value = undefined;
      }
    };

    const setModes = async () => {
      await Provider.store.dispatch('dpoDocumentTypes/getAll');
      modes.value.push({ value: 'programs', label: 'Программы' });
      documentTypes.value.forEach((docType: IDpoDocumentType) => {
        if (docType.documentType.id) {
          modes.value.push({ value: docType.documentType.id, label: docType.documentType.name });
        }
      });
      modes.value.push({ value: 'contacts', label: 'Контакты' });
    };

    const loadCourses = async () => {
      Provider.store.commit('dpoCourses/clearItems');
      await Provider.store.dispatch('dpoCourses/getAll', Provider.filterQuery.value);
    };

    const load = async () => {
      Provider.resetFilterQuery();
      Provider.filterQuery.value.pagination.limit = 100;
      Provider.setSortModels(DpoCoursesSortsLib.byName(Orders.Asc));
      Provider.setSortList(...createSortModels(DpoCoursesSortsLib));
      await setModes();
      await loadCourses();
    };

    Hooks.onBeforeMount(load);

    return {
      title,
      selectedDocumentType,
      mode,
      mounted: Provider.mounted,
      load,
      sortModels,
      modes,
      selectMode,
      loadCourses,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/elements/ordinatura.scss';
.editor-content:empty {
  display: none;
}
.el-descriptions__label {
  font-size: 15px;
}

.links {
  text-align: left;
  padding-left: 7px;
}

.icon-phone {
  width: 20px;
  height: 20px;
  fill: #2754eb;
}

.icon-email {
  width: 20px;
  height: 20px;
  fill: #2754eb;
}

.icon-time {
  width: 20px;
  height: 20px;
  fill: #2754eb;
}

.icon-map-marker {
  width: 23px;
  height: 23px;
  fill: #2754eb;
}

.search_block {
  padding-top: 10px;
}

.contact-data {
  margin-top: 25px;
}

.contact-data-list {
  list-style-type: none;
}

.contact-data-list-item-h4 {
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  overflow-wrap: break-word;
  color: #4a4a4a;
  text-align: left;
  justify-content: left;
}

.contact-data-list-item {
  padding-bottom: 20px;
}

.contact-h3 {
  display: flex;
  justify-content: left;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 12px;
  font-weight: lighter;
  color: #4a4a4a;
  align-content: center;
  text-align: center;
  margin: 2px;
}

.item {
  font-size: 14px;
  display: flex;
  padding-right: 10px;
  width: auto;
  align-items: center;
  text-align: left;
}

:deep(.main-box) {
  margin: 0px !important;
}

:deep(.page-container) {
  background: #f6f6f6 !important;
}

.way {
  height: 40px;
  background: #f6f6f6;
}

h4 {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.1ex;
  margin: 0px;
  font-size: 14px;
  font-weight: normal;
  color: #343e5c;
}

h3 {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.1ex;
  margin: 0px;
  font-size: 16px;
  font-weight: normal;
  color: #343e5c;
}

.filter-block {
  height: 145px;
  background: #ffffff;
  z-index: 200;
}

.filter-block-2 {
  height: 145px;
  background: #ffffff;
  z-index: 200;
}

.full-width {
  background: #ffffff;
  position: absolute;
  left: 0px;
  top: 0;
  height: 145px;
  margin-top: 20px;
  border: 1px solid #e4e6f2;
  border-radius: 5px;
  width: 100%;
}

.full-width-2 {
  background: #ffffff;
  position: absolute;
  left: 0px;
  top: 0;
  height: 145px;
  margin-top: 20px;
  border: 1px solid #e4e6f2;
  border-radius: 5px;
  width: 100%;
}

.hidden {
  display: none;
}

.sort {
  display: flex;
  justify-content: right;
  align-items: center;
  height: 60px;
  padding: 0 10px;
}

.sort-item-1 {
  display: flex;
  justify-content: space-between;
  width: auto;
  align-items: center;
  margin-right: 30px;
}

.sort-item-2 {
  display: flex;
  justify-content: space-between;
  width: auto;
  align-items: center;
}

.item-1 {
  width: auto;
  display: flex;
  margin-right: 20px;
}

.item-2 {
  width: 138px;
  display: flex;
}

.item-3 {
  width: auto;
  display: flex;
  margin-right: 20px;
}

.item-4 {
  width: 188px;
  display: flex;
}

@media screen and (max-width: 1216px) {
  .full-width {
    height: 200px;
  }

  .filter-block {
    height: 200px;
  }
}

@media screen and (max-width: 605px) {
  .full-width {
    height: 324px;
  }

  .filter-block {
    height: 324px;
  }
}

@media screen and (max-width: 400px) {
  .item-3 {
    width: auto;
    display: flex;
    margin-right: 5px;
  }
  .item-4 {
    width: 158px;
    display: flex;
  }
}
</style>
