<template>
  <el-drawer v-model="isDrawerOpen" direction="ttb" title="Поиск по сайту" size="200px" @closed="closeDrawer" @opened="openDrawer">
    <el-form>
      <el-form-item>
        <el-select-v2
          ref="searchInput"
          v-model="value"
          remote
          :options="searchModel.searchGroups"
          filterable
          :remote-method="find"
          style="width: 100%"
          placeholder="Введите свой запрос"
          round
          @change="handleSelect"
          @focus="searchModel.searchGroups = []"
          @blur="searchModel.searchGroups = []"
        >
          <template #default="{ item }">
            <span class="result-item">{{ item.label }}</span>
          </template>
        </el-select-v2>
      </el-form-item>
    </el-form>
    <div class="filters">
      <div>
        <ul class="tag-list">
          <li v-for="searchGroup in searchGroups" :key="searchGroup.id" cancelable="true" :label="searchGroup.id">
            <button v-if="searchGroup.label" class="tag-item-batton" @click="register">{{ searchGroup.label }}</button>
          </li>
        </ul>
      </div>
      <!-- <el-checkbox-group v-model="groups" :min="0" :max="1" @change="changeFilter">
        <el-checkbox-button v-for="searchGroup in searchGroups" :key="searchGroup.id" cancelable="true" :label="searchGroup.id">
          
        </el-checkbox-button>
      </el-checkbox-group> -->
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import SearchGroup from '@/classes/SearchGroup';
import SearchModel from '@/services/classes/SearchModel';

export default defineComponent({
  name: 'SearchDrawer',
  setup() {
    const store = useStore();
    const searchInput = ref();
    const searchString: Ref<string> = ref('');
    let groups: Ref<string[]> = ref([]);
    const router = useRouter();

    const searchModel: ComputedRef<SearchModel> = computed<SearchModel>(() => store.getters['search/searchModel']);
    const searchGroups: ComputedRef<SearchGroup[]> = computed<SearchGroup[]>(() => store.getters['search/searchGroups']);
    const isDrawerOpen: ComputedRef<boolean> = computed<boolean>(() => store.getters['search/isSearchDrawerOpen']);

    const openDrawer = () => {
      searchModel.value.searchGroups = [];
      searchInput.value.inputRef.focus();
    };

    const closeDrawer = () => store.commit('search/toggleDrawer', false);

    onBeforeMount(async () => {
      await store.dispatch('search/searchGroups');
    });

    const find = async (query: string) => {
      searchModel.value.searchGroups = [];
      if (query.length > 2) {
        searchModel.value.query = query;
        await store.dispatch('search/mainSearch', searchModel.value);
      }
    };

    const handleSelect = async (link: string) => {
      store.commit('search/toggleDrawer', false);
      await router.push(link);
    };
    const changeFilter = (searchGroupIds: string[]) => {
      if (searchGroupIds.length) {
        searchModel.value.searchGroupId = searchGroupIds[0];
      }
    };
    return {
      groups,
      changeFilter,
      searchGroups,
      value: ref([]),
      searchModel,
      handleSelect,
      searchString,
      find,
      searchInput,
      isDrawerOpen,
      closeDrawer,
      openDrawer,
    };
  },
});
</script>

<style lang="scss" scoped>
.filters {
  margin-top: 10px;
}
:deep(.el-drawer__header) {
  margin: 0 !important;
}

.result-item {
  padding-left: 20px;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 14px;
  font-weight: lighter;
  color: #4a4a4a;
}

:deep(.el-select-v2__combobox-input) {
  font-family: Roboto, Verdana, sans-serif;
  font-size: 14px;
  font-weight: lighter;
  color: #4a4a4a;
}

.tag-list {
  list-style-type: none;
  display: flex;
  justify-content: left;
  padding-left: 0px;
}

.tag-item-batton {
  background: #ffffff;
  border-radius: 40px;
  border: 1px solid #2754eb;
  font-family: roboto;
  font-size: 0.8rem;
  color: #2754eb;
  margin-left: 5px;
  padding: 3px 18px;
  text-align: center;
  &:hover {
    cursor: pointer;
    background-color: #133dcc;
    color: #ffffff;
    border: 1px solid #133dcc;
  }
  &:active {
    cursor: pointer;
    background-color: #133dcc;
    color: #ffffff;
    border: 1px solid #133dcc;
  }
}

:deep(.el-select-v2__wrapper) {
  border-radius: 40px;
}
</style>
