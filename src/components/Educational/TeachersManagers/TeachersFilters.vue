<template>
  <div v-if="mount" class="left-side-container">
    <RemoteSearch :key-value="schema.teacher.key" @select="selectSearch" />

    <FilterReset @load="load" />
    <SortList :models="createSortModels()" @load="load" />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Doctor from '@/classes/Doctor';
import MedicalProfile from '@/classes/MedicalProfile';
import NmoCourse from '@/classes/NmoCourse';
import FilterReset from '@/components/Filters/FilterResetButton.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortList.vue';
import ISchema from '@/interfaces/schema/ISchema';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import SortModel from '@/services/classes/SortModel';
import { DataTypes } from '@/services/interfaces/DataTypes';
import ISearchObject from '@/services/interfaces/ISearchObject';
import { Operators } from '@/services/interfaces/Operators';
import { Orders } from '@/services/interfaces/Orders';
import TokenService from '@/services/Token';

export default defineComponent({
  name: 'TeachersFilters',
  components: {
    FilterReset,
    RemoteSearch,
    SortList,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const doctors: Ref<Doctor[]> = computed<Doctor[]>(() => store.getters['doctors/items']);
    const medicalProfiles: Ref<MedicalProfile[]> = computed<MedicalProfile[]>(() => store.getters['medicalProfiles/items']);
    const mount = ref(false);

    const filterQuery: ComputedRef<FilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);
    const dpoCourses: Ref<NmoCourse[]> = computed<NmoCourse[]>(() => store.getters['dpoCourses/items']);

    onBeforeMount(async () => {
      store.commit(`filter/resetQueryFilter`);
      await load();
      mount.value = true;
    });

    const load = async () => {
      filterQuery.value.pagination.cursorMode = false;
      filterQuery.value.pagination.limit = 6;
      store.commit('filter/setStoreModule', 'teachers');
      await store.dispatch('teachers/getAll', { filterQuery: filterQuery.value });
    };

    const createSortModels = (): SortModel[] => {
      return [SortModel.CreateSortModel(schema.value.teacher.tableName, schema.value.teacher.fullName, Orders.Asc, 'По алфавиту', true)];
    };

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await router.push(`/divisions/${event.value}`);
    };

    return {
      dpoCourses,
      selectSearch,
      createSortModels,
      TokenService,
      Operators,
      DataTypes,
      load,
      medicalProfiles,
      schema,
      doctors,
      mount,
    };
  },
});
</script>

<style scoped lang="scss">
// $left-side-max-width: 370px;
// $right-side-max-width: 1000px;

.doctor-page-container {
  // display: flex;
  // justify-content: center;
  margin: 0 auto;
  .left-side {
    margin-right: 20px;
    // max-width: $left-side-max-width;
  }
  .right-side {
    // max-width: $right-side-max-width;
  }
}
h2 {
  margin: 0;
}
.card-header {
  text-align: center;
}
.doctor-img-container {
  margin: 0 10px 10px 0;
  img {
    width: 150px;
  }
}
.flex-row {
  display: flex;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.link {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.title-out {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  letter-spacing: 0.1em;
  font-size: 12px;
  color: #343e5c;
  margin-left: 4px;
  height: 50px;
  align-items: center;
  font-weight: bold;
}
</style>
