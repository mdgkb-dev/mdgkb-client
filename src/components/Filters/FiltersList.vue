<template>
  <el-form>
    <el-form-item>
      <el-select v-model="selectedFilterModel" value-key="label" :placeholder="selectedFilterModel?.label" @change="setFilter">
        <el-option :label="defaultLabel" :value="emptyFilterModel" />
        <el-option v-for="item in models" :key="item" :label="item.label" :value="item" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, PropType, Ref, ref, WritableComputedRef } from 'vue';

import FilterModel from '@/classes/filters/FilterModel';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'FiltersList',
  components: {},
  props: {
    models: {
      type: Array as PropType<IFilterModel[]>,
      default: () => [],
    },
    defaultLabel: {
      type: String as PropType<string>,
      default: 'Все',
    },
  },
  emits: ['load'],
  setup(props, { emit }) {
    const emptyFilterModel: WritableComputedRef<IFilterModel> = computed(() => new FilterModel());
    const selectedFilterModel: Ref<IFilterModel | undefined> = ref(undefined);
    const selectedId: Ref<string | undefined> = ref(undefined);
    const sortModels: Ref<IFilterModel[]> = computed(() => Provider.store.getters['filter/sortModels']);
    const setDefaultFilterModel = (): void => {
      selectedFilterModel.value = emptyFilterModel.value;
    };
    onBeforeMount((): void => {
      setDefaultFilterModel();
    });

    const setFilter = () => {
      if (selectedFilterModel.value && selectedFilterModel.value.table) {
        Provider.replaceFilterModel(selectedFilterModel.value, selectedId.value);
        selectedId.value = selectedFilterModel.value.id;
      } else {
        Provider.spliceFilterModel(selectedId.value);
      }
      emit('load');
    };

    return {
      selectedFilterModel,
      setDefaultFilterModel,
      sortModels,
      setFilter,
      emptyFilterModel,
    };
  },
});
</script>

<style lang="scss" scoped>
.anticon {
  margin: 4px 4px 2px 4px;
  font-size: 13px;
  &:hover {
    color: #5cb6ff;
  }
}
.set {
  color: #5cb6ff;
}

:deep(.el-input__inner) {
  border-radius: 20px;
  padding-left: 25px;
  height: 34px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
}

:deep(.el-input__inner::placeholder) {
  color: #4a4a4a;
}

:deep(.el-select .el-input .el-select__caret) {
  color: #4a4a4a;
  font-size: 16px;
  font-weight: bold;
  margin-right: 5px;
}

.el-select {
  width: 100%;
}

:deep(.el-form-item) {
  margin-bottom: 0px;
}
</style>
