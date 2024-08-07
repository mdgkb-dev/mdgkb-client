<template>
  <draggable class="groups" :list="items" item-key="id" handle=".el-icon-s-grid" @end="sort(items)">
    <template #item="{ element }">
      <div>
        <i class="el-icon-s-grid drug-icon" />
        {{ element.employee.human.getFullName() }}
      </div>
    </template>
  </draggable>
  <el-button @click="cancel">Отмена</el-button>
  <el-button @click="save">Сохранить</el-button>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, PropType, Ref } from 'vue';
import draggable from 'vuedraggable';

import EducationalAcademic from '@/classes/EducationalAcademic';
import Head from '@/classes/Head';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import SortModel from '@/services/classes/SortModel';
import Provider from '@/services/Provider/Provider';
import sort from '@/services/sort';

export default defineComponent({
  name: 'OrderedList',
  components: { draggable },
  props: {
    storeModule: {
      type: String as PropType<string>,
      default: '',
    },
    sortModel: {
      type: Object as PropType<SortModel>,
      reguired: true,
      default: new SortModel(),
    },
  },
  setup(props, { emit }) {
    const items: Ref<(Head | EducationalAcademic)[]> = computed(() => Provider.store.getters[`${props.storeModule}/items`]);
    onBeforeMount(async () => {
      const filterQuery = new FilterQuery();
      filterQuery.setSortModel(props.sortModel);
      await Provider.store.dispatch(`${props.storeModule}/getAll`, filterQuery);
    });

    const save = async () => {
      await Provider.store.dispatch(`${props.storeModule}/updateMany`);
      emit('close');
    };

    const cancel = () => {
      emit('close');
    };
    return {
      sort,
      cancel,
      save,
      items,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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

.tag-link {
  margin: 2px;
  transition: all 0.2s;
  color: blue;
  border-color: blue;
  border-radius: 20px;
  &:hover {
    background-color: blue;
    color: white;
    cursor: pointer;
  }
}
</style>
