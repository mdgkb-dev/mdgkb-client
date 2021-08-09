<template>
  <div class="flex-column">
    <div class="flex-row-between">
      <el-button type="primary" @click="$router.push('/admin/news/new')">Добавить новость</el-button>
      <!--      <el-pagination background layout="prev, pager, next" :total="100"> </el-pagination>-->
    </div>
    <el-card>
      <el-table :data="news" v-if="news">
        <el-table-column prop="title" label="Заголовок" sortable> </el-table-column>
        <el-table-column prop="created_by" label="Автор" sortable> </el-table-column>
        <el-table-column prop="viewsCount" label="Просмотров" sortable> </el-table-column>
        <el-table-column prop="status" label="Статус" sortable> </el-table-column>
        <el-table-column label="Тэги">
          <template #default="scope">
            <span v-for="(item, i) in scope.row.tags" :key="item.id">
              {{ i + 1 === scope.row.tags.length ? item.label : `${item.label}, ` }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Дата публикации" align="center" width="200" sortable>
          <template #default="scope">
            {{ $dateFormatRu(scope.row.publishedOn) }}
          </template>
        </el-table-column>
        <el-table-column width="40" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup @edit="edit(scope.row.id)" @remove="remove(scope.row.id)" :showEditButton="true" :showRemoveButton="true" />
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
import { useStore } from 'vuex';
import { defineComponent, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import INewsParams from '@/interfaces/news/INewsParams';
import INews from '@/interfaces/news/INews';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';

export default defineComponent({
  name: 'AdminNewsList',
  components: { TableButtonGroup },
  setup() {
    const store = useStore();
    const router = useRouter();

    const loadNews = async (): Promise<void> => {
      const defaultParams: INewsParams = { limit: 100 };
      await store.dispatch('news/getAll', defaultParams);
      store.commit('admin/setPageTitle', 'Все новости');
    };
    const news = computed(() => store.getters['news/news']);

    const edit = async (id: string): Promise<void> => {
      const item = news.value.find((i: INews) => i.id === id);
      if (item) await router.push(`/admin/news/${item.slug}`);
    };

    const remove = async (id: string) => {
      await store.dispatch('news/remove', id);
    };

    onMounted(loadNews);

    return { news, edit, remove };
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
