<template>
  <div class="flex-column">
    <!-- <div class="flex-row-between"> -->
    <!-- <el-button type="primary" @click="$router.push('/admin/pages/new')">Добавить страницу</el-button> -->
    <!--      <el-pagination background layout="prev, pager, next" :total="100"> </el-pagination>-->
    <!-- </div> -->
    <el-card>
      <el-table v-if="pages" :data="pages">
        <el-table-column prop="title" label="Заголовок" sortable> </el-table-column>
        <el-table-column prop="slug" label="Ссылка" sortable> </el-table-column>
        <el-table-column width="50" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup
              :show-more-button="true"
              :show-edit-button="true"
              :show-remove-button="true"
              @edit="edit(scope.row.id)"
              @remove="remove(scope.row.id)"
              @showMore="$router.push(scope.row.getLink())"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="flex-row-end">
      <!--      <el-pagination background layout="prev, pager, next" :total="100"> </el-pagination>-->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import INews from '@/interfaces/news/INews';

export default defineComponent({
  name: 'AdminPagesList',
  components: { TableButtonGroup },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const pages = computed(() => store.getters['pages/pages']);

    const loadNews = async (): Promise<void> => {
      await store.dispatch('pages/getAll');
      store.commit('admin/setHeaderParams', { title: 'Страницы', buttons: [{ text: 'Добавить', type: 'primary', action: create }] });
    };

    const edit = async (id: string): Promise<void> => {
      const item = pages.value.find((i: INews) => i.id === id);
      if (item) {
        await router.push(`/admin/pages/${item.slug}`);
      }
    };

    const remove = async (id: string) => {
      await store.dispatch('pages/remove', id);
    };

    const create = () => {
      router.push('/admin/pages/new');
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await loadNews();
      store.commit('admin/closeLoading');
    });

    return { pages, edit, remove };
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
