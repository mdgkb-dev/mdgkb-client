<template>
  <el-form :gutter="12" label-position="top" :style="{ width: '100%', maxWidth: `${maxWidth}${typeof maxWidth === 'number' ? 'px' : ''}` }">
    <el-form-item>
      <el-select v-model="filterModel.value1" :filterable="filterable" clearable :placeholder="placeholder" round @change="addFilterModel">
        <el-option v-for="(option, optionIndex) in options" :key="optionIndex" :label="option.label" :value="option.value"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useStore } from 'vuex';

import IOption from '@/interfaces/schema/IOption';
import FilterModel from '@/services/classes/filters/FilterModel';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

export default defineComponent({
  name: 'FilterSelect',
  props: {
    table: {
      type: String as PropType<string>,
      default: '',
    },
    col: {
      type: String as PropType<string>,
      default: '',
    },
    operator: {
      type: String as PropType<Operators>,
      default: '',
    },
    options: {
      type: Array as PropType<IOption[]>,
      default: () => [],
    },
    placeholder: {
      type: String as PropType<string>,
      default: '',
    },
    dataType: {
      type: String as PropType<DataTypes>,
      default: '',
    },
    joinTable: {
      type: String as PropType<string>,
      default: '',
    },
    joinTableFk: {
      type: String as PropType<string>,
      default: '',
    },
    joinTablePk: {
      type: String as PropType<string>,
      default: '',
    },
    joinTableId: {
      type: String as PropType<string>,
      default: '',
    },
    joinTableIdCol: {
      type: String as PropType<string>,
      default: '',
    },
    filterable: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    maxWidth: {
      type: [Number, String],
      default: 250,
    },
  },
  emits: ['load'],
  setup(props, { emit }) {
    const store = useStore();

    const createModel = (): FilterModel => {
      if (props.dataType === DataTypes.Join) {
        return FilterModel.CreateFilterModelWithJoin(
          props.table,
          props.col,
          props.joinTable,
          props.joinTablePk,
          props.joinTableFk,
          props.dataType,
          props.joinTableId,
          props.joinTableIdCol
        );
      } else {
        const fm = FilterModel.CreateFilterModel(props.table, props.col, props.dataType);
        fm.operator = props.operator;
        return fm;
      }
    };

    const filterModel = ref(createModel());

    const addFilterModel = (value: string) => {
      if (!value.length) {
        reloadModel();
      } else {
        filterModel.value.value1 = value;
        filterModel.value.joinTableId = value;
        store.commit('filter/setFilterModel', filterModel.value);
      }
      emit('load', value);
    };

    const reloadModel = () => {
      store.commit('filter/spliceFilterModel', filterModel.value.id);
      createModel();
    };

    return {
      addFilterModel,
      filterModel,
    };
  },
});
</script>

<style lang="scss" scoped>
// @import '@/assets/elements/filterForm.scss';

:deep(.el-input__inner) {
  border-radius: 20px;
  padding-left: 25px;
  height: 34px;
  // width: 100%;
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
}

:deep(.el-input__inner::placeholder) {
  color: #4a4a4a;
}

:deep(.el-select .el-input .el-select__caret) {
  color: #4a4a4a;
  font-size: 15px;
  font-weight: bold;
  margin-right: 5px;
}

.el-select {
  width: 100%;
}

:deep(.el-input__suffix) {
  top: -2px;
}

:deep(.el-form-item) {
  padding: 0 10px;
  margin: 0;
}

.el-form {
  width: 100%;
}

// :deep(.el-select__popper) {
//   width: inherit;
// }
</style>
