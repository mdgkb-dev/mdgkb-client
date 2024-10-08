<template>
  <div class="flex-column">
    <el-card>
      <el-table v-if="roles" :data="roles">
        <el-table-column label="Название" sortable>
          <template #default="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column width="50" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup
              :show-edit-button="true"
              :show-remove-button="true"
              @remove="remove(scope.row.id)"
              @edit="edit(scope.row.id)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import Role from '@/services/classes/Role';

export default defineComponent({
  name: 'AdminRolesList',
  components: { TableButtonGroup },

  setup() {
    const router = useRouter();
    const store = useStore();
    const roles: ComputedRef<Role[]> = computed<Role[]>(() => store.getters['roles/items']);

    const isEditMode: Ref<boolean> = ref(false);
    const isNotEditMode: Ref<boolean> = ref(true);

    const create = (): void => {
      router.push('/admin/roles/new');
    };
    const remove = async (id: string): Promise<void> => {
      await store.dispatch('roles/remove', id);
    };
    const edit = (id: string): void => {
      router.push(`/admin/roles/${id}`);
    };
    const updateAll = async (): Promise<void> => {
      await store.dispatch('roles/updateAll');
      isEditMode.value = false;
      isNotEditMode.value = true;
    };
    const openEditMode = () => {
      isEditMode.value = true;
      isNotEditMode.value = false;
    };

    onBeforeMount(async () => {
      await store.dispatch('roles/getAll');
      store.commit('roles/seedFormStatusToFormStatuses');
      PHelp.AdminUI.Head.Set('Роли юзеров', [
        Button.Success('Редактировать', openEditMode, isNotEditMode),
        Button.Success('Сохранить', updateAll, isNotEditMode),
        Button.Success('Добавить', create, isNotEditMode),
      ]);
    });

    return {
      roles,
      create,
      remove,
      edit,
      isEditMode,
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
</style>
