<template>
  <el-table :data="gates">
    <el-table-column label="Название">
      <template #default="scope">
        <div v-if="isEditMode">
          <el-input v-model="scope.row.name" size="small" placeholder="Название"></el-input>
        </div>
        <div v-else>
          {{ scope.row.name }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Шаблон">
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
  </el-table>
</template>

<script lang="ts" setup>
import Form from '@/classes/Form';
import Gate from '@/classes/Gate';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';

const gates: Gate[] = GatesStore.Item();
const formPatterns: ComputedRef<Form[]> = computed(() => Provider.store.getters['formPatterns/items']);
const isEditMode: Ref<boolean> = ref(false);
const isNotEditMode: ComputedRef<boolean> = computed(() => !isEditMode.value);

const edit = async () => {
  await Provider.store.dispatch('formPatterns/getAll');
  isEditMode.value = true;
};
const save = async () => {
  await GatesStore.UpdateMany();
  isEditMode.value = false;
};

const load = async () => {
  await GatesStore.GetAll();
  PHelp.AdminUI.Head.Set('Входы', [Button.Success('Сохранить', save), Button.Success('Редактировать', edti)]);
};

Hooks.onBeforeMount(load);
</script>
