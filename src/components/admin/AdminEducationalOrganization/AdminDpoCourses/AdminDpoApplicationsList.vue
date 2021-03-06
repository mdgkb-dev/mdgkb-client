<template>
  <AdminListWrapper v-if="mounted" pagination>
    <!-- <template #header>
      <FiltersList :models="createFilterModels()" @load="loadApplications" />
    </template> -->
    <template #sort>
      <SortList :max-width="400" :models="sortList" :store-mode="true" @load="loadApplications" />
    </template>
    <el-table :data="dpoApplications">
      <el-table-column label="Статус" width="200" class-name="sticky-left">
        <template #default="scope">
          <TableFormStatus :form="scope.row.formValue" />
        </template>
      </el-table-column>
      <el-table-column label="Дата подачи заявления" align="center" width="150">
        <template #default="scope">
          {{ $dateTimeFormatter.format(scope.row.formValue.createdAt, { month: '2-digit', hour: 'numeric', minute: 'numeric' }) }}
        </template>
      </el-table-column>
      <el-table-column label="Email заявителя" min-width="150">
        <template #default="scope">
          {{ scope.row.formValue.user.email }}
        </template>
      </el-table-column>
      <el-table-column label="ФИО заявителя" min-width="200">
        <template #default="scope">
          {{ scope.row.formValue.user.human.getFullName() }}
        </template>
      </el-table-column>
      <el-table-column label="Наименование курса" min-width="200">
        <template #default="scope">
          {{ scope.row.dpoCourse.name }}
        </template>
      </el-table-column>
      <el-table-column width="50" fixed="right" align="center" class-name="sticky-right">
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" @edit="edit(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeUnmount, ref, watch } from 'vue';

import FilterQuery from '@/classes/filters/FilterQuery';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import TableFormStatus from '@/components/FormConstructor/TableFormStatus.vue';
import SortList from '@/components/SortList/SortList.vue';
// import FiltersList from '@/components/Filters/FiltersList.vue';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Orders } from '@/interfaces/filters/Orders';
import IDpoApplication from '@/interfaces/IDpoApplication';
import IFormStatus from '@/interfaces/IFormStatus';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import DpoApplicationsFiltersLib from '@/services/Provider/libs/filters/DpoApplicationsFiltersLib';
import FormStatusesFiltersLib from '@/services/Provider/libs/filters/FormStatusesFiltersLib';
import DpoApplicationsSortsLib from '@/services/Provider/libs/sorts/DpoApplicationsSortsLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminDpoApplicationsList',
  components: { TableButtonGroup, AdminListWrapper, SortList, TableFormStatus },

  setup() {
    const dpoApplications: ComputedRef<IDpoApplication[]> = computed(() => Provider.store.getters['dpoApplications/items']);
    const formStatuses: ComputedRef<IFormStatus[]> = computed(() => Provider.store.getters['formStatuses/items']);
    const applicationsCount: ComputedRef<number> = computed(() => Provider.store.getters['meta/applicationsCount'](tableName));

    const filterModel = ref();
    const title = ref('');
    let tableName = '';

    watch(Provider.route(), async () => {
      setType();
      await unsubscribe();
      await subscribe();
      await Provider.store.dispatch('dpoApplications/getAll', Provider.filterQuery.value);
    });

    const setType = () => {
      filterModel.value = DpoApplicationsFiltersLib.byCourseType(false);
      if (Provider.route().path === '/admin/nmo/applications') {
        filterModel.value.boolean = true;
        title.value = 'Заявки НМО';
        tableName = 'nmo_applications';
      } else {
        filterModel.value.boolean = false;
        title.value = 'Заявки ДПО';
        tableName = 'dpo_applications';
      }
      Provider.store.commit('filter/setFilterModel', filterModel.value);
    };

    const setFilter = async () => {
      await Provider.store.dispatch('meta/getSchema');
      Provider.store.commit(`filter/resetQueryFilter`);
      Provider.store.commit('filter/replaceSortModel', DpoApplicationsSortsLib.byCreatedAt());
      Provider.filterQuery.value.pagination.cursorMode = false;
    };

    const loadApplications = async () => {
      await Provider.store.dispatch('dpoApplications/getAll', Provider.filterQuery.value);
    };

    const loadFilters = async () => {
      const filterQuery = new FilterQuery();
      if (dpoApplications.value.length > 0) {
        const formStatusesGroupId = dpoApplications.value[0].formValue.formStatus.formStatusGroupId;
        if (formStatusesGroupId) {
          filterQuery.filterModels.push(FormStatusesFiltersLib.byGroupId(formStatusesGroupId));
        }
      }
      await Provider.store.dispatch('formStatuses/getAll', filterQuery);
    };

    const load = async () => {
      // await setFilter();
      // await loadFilters();
      setType();
      Provider.setSortList(...createSortModels(DpoApplicationsSortsLib));
      Provider.setSortModels(DpoApplicationsSortsLib.byCreatedAt(Orders.Desc));
      await loadApplications();
      Provider.store.commit('admin/setHeaderParams', {
        title: title,
        buttons: [{ text: 'Подать заявление', type: 'primary', action: create }],
        applicationsCount,
      });
      Provider.store.commit('pagination/setCurPage', 1);
      await subscribe();
      window.addEventListener('beforeunload', unsubscribe);
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'dpoApplications', action: 'getAll' },
      sortModels: [],
    });

    const subscribe = async () => {
      const isNmo = Provider.route().path === '/admin/nmo/applications';
      await Provider.store.dispatch('dpoApplications/subscribeCreate', isNmo);
    };

    const unsubscribe = async () => {
      await Provider.store.dispatch('dpoApplications/unsubscribeCreate');
    };
    onBeforeUnmount(async () => {
      await Provider.store.dispatch('dpoApplications/unsubscribeCreate');
    });

    const create = () => Provider.router.push(`${Provider.route().path}/new`);
    // const remove = async (id: string) => await Provider.store.dispatch('dpoCourses/remove', id);
    const edit = (id: string) => Provider.router.push(`${Provider.route().path}/${id}`);

    const createFilterModels = (): IFilterModel[] => {
      const filters: IFilterModel[] = [];
      formStatuses.value.forEach((fs: IFormStatus) => {
        if (fs.id) {
          filters.push(DpoApplicationsFiltersLib.byStatus(fs.id, fs.label));
        }
      });
      return filters;
    };

    return {
      createFilterModels,
      mounted: Provider.mounted,
      sortList: Provider.sortList,
      dpoApplications,
      loadApplications,
      edit,
      formStatuses,
    };
  },
});
</script>
