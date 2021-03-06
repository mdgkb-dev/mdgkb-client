<template>
  <div v-if="mount" class="card-flex-container">
    <div v-for="center in centers" :key="center.id" class="card-container">
      <CenterCard :center="center" />
    </div>
  </div>
  <div class="loadmore-button">
    <LoadMoreButton @loadMore="loadMore" />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import CenterCard from '@/components/Divisions/CenterCard.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ICenter from '@/interfaces/ICenter';
import ISchema from '@/interfaces/schema/ISchema';

export default defineComponent({
  name: 'CentersList',
  components: { CenterCard, LoadMoreButton },
  setup() {
    const store = useStore();
    const mount = ref(false);
    const centers: Ref<ICenter[]> = computed<ICenter[]>(() => store.getters['centers/items']);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);

    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);

    const loadMore = async () => {
      const lastCursor = centers.value[centers.value.length - 1].name;
      filterQuery.value.pagination.setLoadMore(lastCursor, schema.value.center.name, schema.value.center.tableName);
      await store.dispatch('centers/getAll', filterQuery.value);
    };

    onBeforeMount(async () => {
      store.commit(`filter/resetQueryFilter`);
      filterQuery.value.pagination.cursorMode = false;
      filterQuery.value.pagination.limit = 6;
      store.commit('filter/setStoreModule', 'centers');
      await store.dispatch('centers/getAll', filterQuery.value);
      mount.value = true;
    });

    return {
      centers,
      loadMore,
      mount,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/doctor-info-card.scss';

.card-flex-container {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}
.card-container {
  height: 350px;
  margin: 0 auto;
}
</style>
