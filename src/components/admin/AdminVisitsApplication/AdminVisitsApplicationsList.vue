<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <template #header>
      <FilterMultipleSelect class="filters-block" :filter-model="filterByStatus" :options="filtersToOptions()" @load="loadApplications" />
    </template>
    <template #header-bottom>
      <FilterCheckbox
        :table="schema.visitsApplication.tableName"
        :col="schema.visitsApplication.withCar"
        label="Только заявки на въезд"
        :data-type="DataTypes.Boolean"
        :operator="Operators.Eq"
        :filter-value="true"
        @load="loadApplications"
      />
      <FilterCheckbox
        :table="schema.visitsApplication.tableName"
        :col="schema.visitsApplication.withCar"
        label="Только заявки на посещение"
        :data-type="DataTypes.Boolean"
        :operator="Operators.Eq"
        :filter-value="false"
        @load="loadApplications"
      />
    </template>
    <template #sort>
      <SortList :max-width="400" :models="sortList" :store-mode="true" @load="loadApplications" />
    </template>
    <el-table :key="visitsApplications" :data="visitsApplications">
      <el-table-column label="Статус" width="200" class-name="sticky-left">
        <template #default="scope">
          <TableFormStatus :form="scope.row.formValue" />
        </template>
      </el-table-column>
      <el-table-column label="Тип" width="150" align="center">
        <template #default="scope">
          {{ scope.row.withCar ? 'На въезд' : 'На посещение' }}
        </template>
      </el-table-column>
      <el-table-column label="Дата подачи заявления" align="center" width="150">
        <template #default="scope">
          {{ $dateTimeFormatter.format(scope.row.formValue.createdAt, { month: '2-digit', hour: 'numeric', minute: 'numeric' }) }}
        </template>
      </el-table-column>
      <el-table-column label="Даты посещения" align="center" width="150">
        <template #default="scope">
          <div v-for="(item, i) in scope.row.visits" :key="i">
            {{ $dateTimeFormatter.format(item.date, { month: '2-digit', hour: 'numeric', minute: 'numeric' }) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Email заявителя" min-width="150">
        <template #default="scope">
          {{ scope.row.formValue.user.email }}
        </template>
      </el-table-column>
      <el-table-column label="ФИО пациента" min-width="200">
        <template #default="scope">
          {{ scope.row.formValue.child.human.getFullName() }}
        </template>
      </el-table-column>
      <el-table-column label="Вход" min-width="200">
        <template #default="scope">
          {{ scope.row.gate.name }}
        </template>
      </el-table-column>
      <el-table-column label="Отделение" min-width="200">
        <template #default="scope">
          {{ scope.row.division.name }}
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
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';

import FilterModel from '@/classes/filters/FilterModel';
import FilterQuery from '@/classes/filters/FilterQuery';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import FilterCheckbox from '@/components/Filters/FilterCheckbox.vue';
import FilterMultipleSelect from '@/components/Filters/FilterMultipleSelect.vue';
import TableFormStatus from '@/components/FormConstructor/TableFormStatus.vue';
import SortList from '@/components/SortList/SortList.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
import { Orders } from '@/interfaces/filters/Orders';
import IFormStatus from '@/interfaces/IFormStatus';
import IVisitsApplication from '@/interfaces/IVisitsApplication';
import IOption from '@/interfaces/schema/IOption';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import FormStatusesFiltersLib from '@/services/Provider/libs/filters/FormStatusesFiltersLib';
import VisitsApplicationsFiltersLib from '@/services/Provider/libs/filters/VisitsApplicationsFiltersLib';
import VisitsApplicationsSortsLib from '@/services/Provider/libs/sorts/VisitsApplicationsSortsLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminVisitsApplicationsList',
  components: { TableButtonGroup, AdminListWrapper, SortList, TableFormStatus, FilterMultipleSelect, FilterCheckbox },

  setup() {
    const filterByStatus: Ref<IFilterModel> = ref(new FilterModel());
    const formStatuses: ComputedRef<IFormStatus[]> = computed(() => Provider.store.getters['formStatuses/items']);
    const visitsApplications: ComputedRef<IVisitsApplication[]> = computed(() => Provider.store.getters['visitsApplications/items']);
    const applicationsCount: ComputedRef<number> = computed(() => Provider.store.getters['meta/applicationsCount']('visits_applications'));
    const create = () => Provider.router.push(`${Provider.route().path}/new`);
    const edit = (id: string) => Provider.router.push(`${Provider.route().path}/${id}`);

    const loadApplications = async () => {
      await Provider.store.dispatch('visitsApplications/getAll', Provider.filterQuery.value);
    };

    const load = async () => {
      Provider.setSortList(...createSortModels(VisitsApplicationsSortsLib));
      Provider.setSortModels(VisitsApplicationsSortsLib.byCreatedAt(Orders.Desc));
      await loadApplications();
      await loadFilters();
      filterByStatus.value = VisitsApplicationsFiltersLib.byStatus();
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Заявления на посещение',
        buttons: [{ text: 'Добавить', type: 'primary', action: create }],
        applicationsCount,
      });
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'visitsApplications', action: 'getAll' },
      sortModels: [],
    });

    const filtersToOptions = (): IOption[] => {
      const options: IOption[] = [];
      formStatuses.value.forEach((i: IFormStatus) => {
        if (i.id) {
          options.push({ value: i.id, label: i.label });
        }
      });
      return options;
    };

    const loadFilters = async () => {
      const filterQuery = new FilterQuery();
      if (visitsApplications.value.length > 0) {
        const formStatusesGroupId = visitsApplications.value[0].formValue.formStatus.formStatusGroupId;
        if (formStatusesGroupId) {
          filterQuery.filterModels.push(FormStatusesFiltersLib.byGroupId(formStatusesGroupId));
        }
      }
      await Provider.store.dispatch('formStatuses/getAll', filterQuery);
    };

    return {
      filterByStatus,
      visitsApplications,
      mounted: Provider.mounted,
      sortList: Provider.sortList,
      schema: Provider.schema,
      edit,
      loadApplications,
      filtersToOptions,
      DataTypes,
      Operators,
    };
  },
});
</script>
