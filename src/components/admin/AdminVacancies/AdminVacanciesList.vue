<template>
  <component :is="'AdminListWrapper'" v-if="mounted" show-header>
    <!-- <template #header>
      <RemoteSearch :key-value="schema.vacancy.key" @select="selectSearch" />
      <FilterSelectDate :table="schema.vacancy.tableName" :col="schema.vacancy.date" placeholder="Дата публикации" @load="load" />
      <FilterMultipleSelect
        class="filters-block"
        :filter-model="filterByDivision"
        :options="schema.division.options"
        @load="loadVacancies"
      />
    </template>
    <template #header-right>
      <SortList :models="sortList" :store-mode="true" @load="load" />
    </template>
    <template #header-bottom>
      <FilterCheckbox
        :table="schema.vacancy.tableName"
        :col="schema.vacancy.responsesCount"
        label="С отзывами"
        :data-type="DataTypes.Number"
        :operator="Operators.Gt"
        :filter-value="0"
        @load="loadVacancies"
      />
      <FilterCheckbox
        :table="schema.vacancy.tableName"
        :col="schema.vacancy.newResponsesCount"
        label="С новыми отзывами"
        :data-type="DataTypes.Number"
        :operator="Operators.Gt"
        :filter-value="0"
        @load="loadVacancies"
      />
      <FilterCheckbox
        :table="schema.vacancy.tableName"
        :col="schema.vacancy.active"
        label="Активные"
        :data-type="DataTypes.Boolean"
        :operator="Operators.Eq"
        :filter-value="true"
        @load="loadVacancies"
      />
    </template> -->
    <el-table v-if="vacancies" :data="vacancies">
      <el-table-column prop="title" label="Название" class-name="sticky-left" min-width="200">
        <template #default="scope">
          <el-badge
            v-if="scope.row.newResponsesCount"
            :value="scope.row.newResponsesCount"
            type="danger"
            size="mini"
            style="margin-top: 10px"
          >
            <div style="padding: 5px 10px 0 0">
              {{ scope.row.title }}
            </div>
          </el-badge>
          <div v-else>
            {{ scope.row.title }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Отделение" min-width="200">
        <template #default="scope">
          {{ scope.row.division?.name }}
        </template>
      </el-table-column>
      <el-table-column label="Активна" align="center" min-width="80">
        <template #default="scope">
          <el-switch v-model="scope.row.active" @change="setActive(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="Отзывов" align="center" min-width="100">
        <template #default="scope">
          {{ scope.row.responsesCount }}
        </template>
      </el-table-column>
      <el-table-column prop="date" label="Дата добавления" align="center" min-width="200">
        <template #default="scope">
          {{ $dateTimeFormatter.format(scope.row.date) }}
        </template>
      </el-table-column>
      <el-table-column prop="minSalary" label="Минимальная зарплата" align="center" min-width="150">
        <template #default="scope">
          <div v-if="isEditMode">
            <el-input-number
              v-model="scope.row.minSalary"
              controls-position="right"
              size="mini"
              placeholder="Минимальная заработная плата"
            />
          </div>
          <div v-else>
            {{ scope.row.minSalary }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="maxSalary" label="Минимальная зарплата" align="center" min-width="150">
        <template #default="scope">
          <div v-if="isEditMode">
            <el-input-number
              v-model="scope.row.maxSalary"
              controls-position="right"
              size="mini"
              placeholder="Минимальная заработная плата"
            />
          </div>
          <div v-else>
            {{ scope.row.maxSalary }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Шаблон формы для откликов" align="center" min-width="200">
        <template #default="scope">
          <div v-if="isEditMode">
            <el-select v-model="scope.row.formPattern" value-key="id" size="small" placeholder="Выберите шаблон">
              <el-option v-for="item in formPatterns" :key="item.id" :label="item.title" :value="item"> </el-option>
            </el-select>
          </div>
          <div v-else>
            {{ scope.row.formPattern.title || 'Не назначен' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="50" align="center" class-name="sticky-right">
        <template #default="scope">
          <TableButtonGroup
            :show-edit-button="true"
            :show-remove-button="true"
            @edit="$router.push(`/admin/vacancies/${scope.row.id}`)"
            @remove="remove(scope.row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <Pagination />
    </template>
  </component>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import FilterModel from '@/classes/filters/FilterModel';
import Pagination from '@/components/admin/Pagination.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
import IForm from '@/interfaces/IForm';
import ISearchObject from '@/interfaces/ISearchObject';
import IVacancy from '@/interfaces/IVacancy';
import ISchema from '@/interfaces/schema/ISchema';
import VacanciesFiltersLib from '@/services/Provider/libs/filters/VacanciesFiltersLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminVacanciesList',
  components: {
    TableButtonGroup,
    Pagination,
    AdminListWrapper,
  },
  setup() {
    const vacancies: ComputedRef<IVacancy[]> = computed(() => store.getters['vacancies/items']);
    const isEditMode: Ref<boolean> = ref(false);
    const isNotEditMode: ComputedRef<boolean> = computed(() => !isEditMode.value);
    const formPatterns: ComputedRef<IForm[]> = computed(() => store.getters['formPatterns/items']);
    const store = useStore();
    const router = useRouter();
    const mounted = ref(false);
    const schema: ComputedRef<ISchema> = computed(() => store.getters['meta/schema']);

    const editMany = async () => {
      store.commit('admin/showLoading');
      await store.dispatch('formPatterns/getAll');
      isEditMode.value = true;
      store.commit('admin/closeLoading');
    };
    const saveMany = async () => {
      store.commit('admin/showLoading');
      await store.dispatch('vacancies/updateMany');
      isEditMode.value = false;
      store.commit('admin/closeLoading');
    };

    const loadVacancies = async () => {
      await store.dispatch('vacancies/getAll');
    };
    const filterByDivision: Ref<IFilterModel> = ref(new FilterModel());
    const load = async () => {
      // setSortList(...createSortModels(VacanciesSortsLib));
      // setSortModels(VacanciesSortsLib.byTitle());
      store.commit('admin/showLoading');
      await loadVacancies();
      // await store.dispatch('meta/getSchema');
      filterByDivision.value = VacanciesFiltersLib.byDivisions([]);
      // await store.dispatch('meta/getOptions');
      store.commit('admin/setHeaderParams', {
        title: 'Вакансии',
        buttons: [
          { text: 'Сохранить', condition: isEditMode, action: saveMany },
          { text: 'Редактировать', type: 'primary', condition: isNotEditMode, action: editMany },
          { text: 'Создать вакансию', type: 'primary', action: create },
        ],
      });
      store.commit('admin/closeLoading');
      mounted.value = true;
    };

    onBeforeMount(load);

    const remove = async (id: string) => {
      await store.dispatch('vacancies/remove', id);
    };

    const create = () => router.push(`/admin/vacancies/new`);

    const newResponsesExists = (): boolean => {
      return vacancies.value.some((vacancy: IVacancy) => vacancy.withNewResponses());
    };

    const setActive = async (vacancy: IVacancy) => {
      await store.dispatch('vacancies/update', vacancy);
    };

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await router.push({ name: `AdminVacanciesEdit`, params: { id: event.id, slug: event.id } });
    };

    return {
      setActive,
      Operators,
      load,
      vacancies,
      remove,
      create,
      newResponsesExists,
      selectSearch,
      DataTypes,
      mounted,
      isEditMode,
      formPatterns,
      schema,
    };
  },
});
</script>

<style lang="scss" scoped>
$margin: 20px 0;

.flex-column {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: $margin;
}

.flex-row-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: $margin;
}
</style>
