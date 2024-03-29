<template>
  <div class="flex-column">
    <div>
      <el-button @click="addGroup">Добавить группу</el-button>
      <el-button v-if="editMode" @click="save">Сохранить</el-button>
      <el-button v-else @click="editMode = !editMode">Редактировать</el-button>
    </div>
    <div v-if="editMode">
      <el-card v-for="(paidProgramsGroup, i) in paidProgramsGroups" :key="i">
        <el-input v-model="paidProgramsGroup.name"></el-input>
        <el-button @click="removeGroup">Удалить группу</el-button>
        <el-button @click="paidProgramsGroup.addPaidProgram()">Добавить программу</el-button>

        <el-card v-for="(paidProgram, j) in paidProgramsGroup.paidPrograms" :key="j">
          <el-input v-model="paidProgram.name"></el-input>
          <el-button @click="paidProgramsGroup.removePaidProgram(j)">Удалить</el-button>
        </el-card>
      </el-card>
    </div>
    <div v-else>
      <el-card v-for="(paidProgramsGroup, i) in paidProgramsGroups" :key="i">
        <div>
          {{ paidProgramsGroup.name }}
        </div>

        <el-card v-for="(paidProgram, j) in paidProgramsGroup.paidPrograms" :key="j">
          <el-button @click="editProgram(paidProgram.id)">Редактировать</el-button>
          <div>{{ paidProgram.name }}</div>
        </el-card>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import PaidProgramsGroup from '@/classes/PaidProgramsGroup';
import IPaidProgramsGroup from '@/interfaces/IPaidProgramsGroupsForServer';

export default defineComponent({
  name: 'AdminPaidProgramsGroupsList',
  setup() {
    const store = useStore();
    const router = useRouter();
    const editMode = ref(false);
    const paidProgramsGroups: Ref<IPaidProgramsGroup[]> = computed(() => store.getters['paidProgramsGroups/items']);
    const paidProgramsGroupsForDelete: Ref<string[]> = computed(() => store.getters['paidProgramsGroups/itemsForDelete']);

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('paidProgramsGroups/getAll', false);
      store.commit('admin/setHeaderParams', { title: 'Платные программы' });
      store.commit('admin/closeLoading');
    });

    const addGroup = () => {
      paidProgramsGroups.value.push(new PaidProgramsGroup());
    };

    const editProgram = async (id: string) => {
      await router.push(`/admin/paid-programs/${id}`);
    };

    const save = async () => {
      await store.dispatch('paidProgramsGroups/updateMany', {
        paidProgramsGroups: paidProgramsGroups.value,
        paidProgramsGroupsForDelete: paidProgramsGroupsForDelete.value,
      });
      editMode.value = false;
    };

    const removeGroup = (index: number) => {
      const idForDelete = paidProgramsGroups.value[index].id;
      if (idForDelete) {
        paidProgramsGroupsForDelete.value.push(idForDelete);
      }
      paidProgramsGroups.value.splice(index, 1);
    };

    return { editProgram, addGroup, paidProgramsGroups, save, editMode, removeGroup };
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

.el-tag {
  margin: 3px;
}
</style>
