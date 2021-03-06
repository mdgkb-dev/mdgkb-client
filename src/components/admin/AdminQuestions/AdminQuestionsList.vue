<template>
  <component :is="'AdminListWrapper'" v-if="mounted" show-header>
    <template #header>
      <FilterCheckboxV2 class="filters-block" :filter-model="onlyNewFilter" @load="loadQuestions" />
      <SortListV2 class="filters-block" :store-mode="false" @load="loadQuestions" />
    </template>
    <el-table v-if="questions" :data="questions">
      <el-table-column label="Тема вопроса" sortable>
        <template #default="scope">
          {{ scope.row.getThemeOrFirstPhrase() }}
        </template>
      </el-table-column>
      <el-table-column label="Дата" sortable>
        <template #default="scope">
          {{ $dateTimeFormatter.format(scope.row.date, { hour: 'numeric', minute: 'numeric' }) }}
        </template>
      </el-table-column>
      <el-table-column label="Статус">
        <template #default="scope">
          <AdminQuestionStatus :question="scope.row" />
        </template>
      </el-table-column>
      <el-table-column label="Публикация">
        <template #default="scope">
          <template v-if="isEditMode">
            <el-switch v-model="scope.row.published" active-text="Да" inactive-text="Нет" />
          </template>
          <template v-else>
            <el-tag v-if="scope.row.published" size="small" type="success">Опубликован</el-tag>
            <el-tag v-else size="small" type="danger">Не опубликован</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column width="50" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup
            :show-check-button="true"
            :show-more-button="true"
            @showMore="$router.push(`/admin/questions/${scope.row.id}`)"
            @check="changeNewStatus(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <Pagination />
    </template>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import { NavigationGuardNext } from 'vue-router';

import FilterModel from '@/classes/filters/FilterModel';
import AdminQuestionStatus from '@/components/admin/AdminQuestions/AdminQuestionStatus.vue';
import Pagination from '@/components/admin/Pagination.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import FilterCheckboxV2 from '@/components/Filters/FilterCheckboxV2.vue';
import SortListV2 from '@/components/SortList/SortListV2.vue';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Orders } from '@/interfaces/filters/Orders';
import IQuestion from '@/interfaces/IQuestion';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import QuestionsFiltersLib from '@/services/Provider/libs/filters/QuestionsFiltersLib';
import QuestionsSortsLib from '@/services/Provider/libs/sorts/QuestionsSortsLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminQuestionsList',
  components: { SortListV2, FilterCheckboxV2, TableButtonGroup, AdminQuestionStatus, AdminListWrapper, Pagination },
  setup() {
    const questions: Ref<IQuestion[]> = computed(() => Provider.store.getters['questions/items']);
    const onlyNewFilter: Ref<IFilterModel> = ref(new FilterModel());
    const isEditMode: Ref<boolean> = ref(false);
    const isNotEditMode: Ref<boolean> = ref(true);
    const { confirmLeave, saveButtonClick, beforeWindowUnload, showConfirmModal } = useConfirmLeavePage();
    const edit = () => {
      if (isEditMode.value) {
        return;
      }
      isEditMode.value = true;
      isNotEditMode.value = false;
    };

    const save = async (next?: NavigationGuardNext) => {
      if (!isEditMode.value) {
        return;
      }
      saveButtonClick.value = true;
      await Provider.store.dispatch('questions/updateMany');
      isEditMode.value = false;
      isNotEditMode.value = true;
      if (next) next();
    };

    const loadQuestions = async () => {
      await Provider.getAll('questions');
    };

    const load = async () => {
      Provider.setSortModels(QuestionsSortsLib.byDate(Orders.Desc));
      Provider.setSortList(...createSortModels(QuestionsSortsLib, Orders.Desc));
      await loadQuestions();
      onlyNewFilter.value = QuestionsFiltersLib.onlyNew();
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Вопросы',
        buttons: [
          { text: 'Редактировать', type: 'success', action: edit, condition: isNotEditMode },
          { text: 'Сохранить', type: 'success', action: save, condition: isEditMode },
        ],
      });
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'questions', action: 'getAll' },
      sortModels: [],
    });

    const publish = async (question: IQuestion) => {
      question.publish();
      await Provider.store.dispatch('questions/publish', question.id);
    };

    const changeNewStatus = async (question: IQuestion) => {
      question.changeNewStatus();
      await Provider.store.dispatch('questions/changeNewStatus', question);
    };
    return { questions, loadQuestions, publish, changeNewStatus, mounted: Provider.mounted, onlyNewFilter, isEditMode };
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
