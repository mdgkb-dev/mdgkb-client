<template>
  <AdminListWrapper pagination>
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
          {{
            $dateTimeFormatter.format(scope.row.formValue.createdAt, {
              month: '2-digit',
              hour: 'numeric',
              minute: 'numeric',
            })
          }}
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
          {{ scope.row.nmoCourse.name }}
        </template>
      </el-table-column>
      <el-table-column width="50" align="center" class-name="sticky-right">
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" @edit="edit(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeUnmount, ref, watch } from 'vue';

import DpoApplication from '@/classes/DpoApplication';
import FormStatus from '@/classes/FormStatus';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import TableFormStatus from '@/components/FormConstructor/TableFormStatus.vue';
import FilterModel from '@/services/classes/filters/FilterModel';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
// import FiltersList from '@/components/Filters/FiltersList.vue';
import { Orders } from '@/services/interfaces/Orders';
import DpoApplicationsFiltersLib from '@/libs/filters/DpoApplicationsFiltersLib';
import FormStatusesFiltersLib from '@/libs/filters/FormStatusesFiltersLib';
import DpoApplicationsSortsLib from '@/libs/sorts/DpoApplicationsSortsLib';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminDpoApplicationsList',
  components: { TableButtonGroup, AdminListWrapper, TableFormStatus },

  setup() {
    const dpoApplications: ComputedRef<DpoApplication[]> = computed(() => Provider.store.getters['dpoApplications/items']);
    const formStatuses: ComputedRef<FormStatus[]> = computed(() => Provider.store.getters['formStatuses/items']);
    const applicationsCount: ComputedRef<number> = computed(() => Provider.store.getters['admin/applicationsCount'](tableName));

    const filterModel = ref();
    const title = ref('');
    let tableName = '';

    watch(Provider.route(), async () => {
      setType();
      await unsubscribe();
      await subscribe();
      await Provider.store.dispatch('dpoApplications/getAll');
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
    };

    const loadApplications = async () => {
      await Provider.store.dispatch('dpoApplications/getAll');
    };

    const loadFilters = async () => {
      const filterQuery = new FilterQuery();
      filterQuery.filterModels.push(FormStatusesFiltersLib.byCode('education'));
      await Provider.store.dispatch('formStatuses/getAll', filterQuery);
    };

    const load = async () => {
      // await setFilter();
      await loadFilters();
      setType();
      // Provider.setSortList(...createSortModels(DpoApplicationsSortsLib));
      // Provider.setSortModels(DpoApplicationsSortsLib.byCreatedAt(Orders.Desc));
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

    const createFilterModels = (): FilterModel[] => {
      const filters: FilterModel[] = [];
      formStatuses.value.forEach((fs: FormStatus) => {
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
