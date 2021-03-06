<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <template #header>
      <SortList class="filters-block" :models="sortList" @load="loadComments" />
      <FilterSelectDate class="filters-block" :table="schema.comment.tableName" :col="schema.comment.publishedOn" @load="loadComments" />
      <FilterCheckbox
        class="filters-block"
        label="Отмодерированные"
        :table="schema.comment.tableName"
        :col="schema.comment.modChecked"
        :data-type="DataTypes.Boolean"
        :operator="Operators.Eq"
        @load="loadComments"
      />
      <FilterSelectV2 :filter-models="createFilterModels()" @load="loadComments" />
    </template>
    <div class="comments-container">
      <div id="list" style="overflow: auto; padding-right: 5px">
        <AdminCommentCard v-for="(comment, i) in comments" :key="i" :comment="comment" />
      </div>
      <div v-if="!comments.length">Комментариев нет</div>
    </div>
  </AdminListWrapper>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeUnmount, Ref, ref } from 'vue';

import AdminCommentCard from '@/components/admin/AdminComments/AdminCommentCard.vue';
import FilterCheckbox from '@/components/Filters/FilterCheckbox.vue';
import FilterSelectDate from '@/components/Filters/FilterSelectDate.vue';
import FilterSelectV2 from '@/components/Filters/FilterSelectV2.vue';
import SortList from '@/components/SortList/SortList.vue';
import IComment from '@/interfaces/comments/IComment';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import { Operators } from '@/interfaces/filters/Operators';
import { Orders } from '@/interfaces/filters/Orders';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import CommentsFiltersLib from '@/services/Provider/libs/filters/CommentsFiltersLib';
import CommentsSortsLib from '@/services/Provider/libs/sorts/CommentsSortsLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminCommentList',
  components: { FilterSelectV2, AdminCommentCard, FilterSelectDate, FilterCheckbox, AdminListWrapper, SortList },
  setup() {
    const comments: ComputedRef<IComment[]> = computed<IComment[]>(() => Provider.store.getters['comments/comments']);
    const applicationsCount: ComputedRef<number> = computed(() => Provider.store.getters['meta/applicationsCount']('comments'));
    const searchString: Ref<string> = ref('');

    const load = async (filterQuery: IFilterQuery) => {
      Provider.setSortList(...createSortModels(CommentsSortsLib, Orders.Desc));
      Provider.setSortModels(CommentsSortsLib.byPublishedOn(Orders.Desc));
      await Provider.store.dispatch('comments/getAll', filterQuery);
      await Provider.store.dispatch('comments/subscribeCreate');
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Заявления на посещение',
        buttons: [],
        applicationsCount,
      });
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'comments', action: 'getAll' },
      sortModels: [],
    });

    const loadComments = async () => {
      await Provider.store.dispatch('comments/getAll', Provider.filterQuery.value);
    };

    onBeforeUnmount(async () => {
      await Provider.store.dispatch('comments/unsubscribeCreate');
    });

    const createFilterModels = (): IFilterModel[] => {
      return [CommentsFiltersLib.onlyNewsComments(), CommentsFiltersLib.onlyDoctorsComments(), CommentsFiltersLib.onlyDivisionsComments()];
    };

    return {
      comments,
      mounted: Provider.mounted,
      schema: Provider.schema,
      searchString,
      loadComments,
      load,
      Operators,
      DataTypes,
      sortList: Provider.sortList,
      createFilterModels,
    };
  },
});
</script>

<style lang="scss" scoped>
.comments-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  overflow: hidden;
}
</style>
