<template>
  <FiltersWrapper v-if="mounted">
    <template v-if="condition" #header-left-top>
      <RemoteSearch
        :max-width="360"
        :key-value="schema.residencyCourse.key"
        :table="schema.residencyCourse.tableName"
        :col="schema.residencyCourse.name"
        placeholder="Начните вводить название специальности"
        @select="selectSearch"
        @load="$emit('load')"
      />
      <FilterSelect
        placeholder="Выбрать год начала"
        :options="schema.educationYear.options"
        :table="schema.residencyCourse.tableName"
        :col="schema.residencyCourse.startYearId"
        :data-type="DataTypes.String"
        :operator="Operators.Eq"
        @load="$emit('load')"
      />
    </template>
    <template #header-right>
      <ModeChoice path="residency" :modes="modes" @selectMode="(value) => $emit('selectMode', value)" />
    </template>
    <template v-if="condition" #footer>
      <SortList :models="sortList" :max-width="400" show-label :store-mode="true" @load="$emit('load')" />
    </template>
  </FiltersWrapper>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType } from 'vue';

import FilterSelect from '@/components/Filters/FilterSelect.vue';
import FiltersWrapper from '@/components/Filters/FiltersWrapper.vue';
import ModeChoice from '@/components/ModeChoice.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortList.vue';
import IOption from '@/interfaces/schema/IOption';
import { DataTypes } from '@/services/interfaces/DataTypes';
import ISearchObject from '@/services/interfaces/ISearchObject';
import { Operators } from '@/services/interfaces/Operators';
import Provider from '@/services/Provider/Provider';
import TokenService from '@/services/Token';

export default defineComponent({
  name: 'ResidencyFilters',
  components: {
    ModeChoice,
    RemoteSearch,
    FilterSelect,
    FiltersWrapper,
    SortList,
  },
  props: {
    mode: {
      type: String as PropType<string>,
      required: true,
      default: '',
    },
    modes: {
      type: Array as PropType<IOption[]>,
      required: false,
      default: () => [],
    },
    condition: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['load', 'selectMode'],

  setup() {
    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push(`/residency-courses/${event.value}`);
    };

    onBeforeMount(async () => {
      await Provider.store.dispatch('meta/getOptions', Provider.schema.value.specialization);
      await Provider.store.dispatch('meta/getOptions', Provider.schema.value.educationYear);
      Provider.schema.value.educationYear.options.forEach((o) => (o.label = new Date(o.label).getFullYear().toString()));
    });

    const resetFilter = () => {
      Provider.store.commit(`filter/resetQueryFilter`);
      Provider.store.commit('filter/setDefaultSortModel');
    };

    return {
      resetFilter,
      selectSearch,
      TokenService,
      Operators,
      DataTypes,
      schema: Provider.schema,
      sortList: Provider.sortList,
      mounted: Provider.mounted,
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
}

h2 {
  margin: 0;
}
/* .card-header {
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
} */

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
}
h2 {
  margin: 0;
}
/* .card-header {
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
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 0.1em;
  font-size: 12px;
  color: #343e5c;
  margin-left: 4px;
  height: 50px;
  align-items: center;
  font-weight: bold;
}

.horizontal {
  display: flex;
  justify-content: space-between;
  // align-items: center;
}

.block-item {
  display: flex;
  width: 272px;
  margin: 0 10px;
}

.hidden {
  display: none;
} */

:deep(.el-checkbox__label) {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  color: #343e5c;
}

:deep(.el-autocomplete) {
  height: 38px;
}

/* .el-select {
  height: 38px;
}

.line {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 22px;
}

@media screen and (max-width: 1216px) {
  .block-item {
    min-width: 272px;
    width: 31%;
  }
}

@media screen and (max-width: 897px) {
  .block-item {
    min-width: 272px;
    width: 46%;
  }
}

@media screen and (max-width: 605px) {
  .block-item {
    min-width: 272px;
    width: 100%;
  }
} */
</style>
