<template>
  <FiltersWrapper v-if="mounted">
    <template #header-left-top>
      <RemoteSearch
        :max-width="400"
        placeholder="Начните вводить наименование вакансии"
        :key-value="schema.vacancy.key"
        @select="selectSearch"
      />
      <FilterSelect
        placeholder="Выберите отделение"
        :options="schema.division.options"
        :table="schema.vacancy.tableName"
        :col="schema.vacancy.divisionId"
        :operator="Operators.Eq"
        :data-type="DataTypes.String"
        @load="$emit('load')"
      />
      <FilterSelectDate
        class="filters-block"
        :table="schema.vacancy.tableName"
        :col="schema.vacancy.date"
        placeholder="Дата публикации"
        @load="$emit('load')"
      />
    </template>
    <template #footer>
      <SortList :max-width="400" show-label :models="sortList" @load="$emit('load')" />
    </template>
  </FiltersWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import FilterSelect from '@/components/Filters/FilterSelect.vue';
import FilterSelectDate from '@/components/Filters/FilterSelectDate.vue';
import FiltersWrapper from '@/components/Filters/FiltersWrapper.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortList.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';
import ISearchObject from '@/interfaces/ISearchObject';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'VacanciesFilters',
  components: { RemoteSearch, SortList, FilterSelect, FiltersWrapper, FilterSelectDate },
  emits: ['load'],

  setup() {
    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push(`/vacancies/${event.value}`);
    };

    return {
      selectSearch,
      sortList: Provider.sortList,
      schema: Provider.schema,
      mounted: Provider.mounted,
      Operators,
      DataTypes,
    };
  },
});
</script>
