import { computed, ComputedRef, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, RouteLocationNormalizedLoaded } from 'vue-router';

import FilterQuery from '@/classes/filters/FilterQuery';
import Pagination from '@/classes/filters/Pagination';
import SortModel from '@/classes/filters/SortModel';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import ISchema from '@/interfaces/schema/ISchema';
import { IPaginationOptions } from '@/services/Hooks/Hooks';
import StringsService from '@/services/Strings';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';

import router from '../../router';
import store from '../../store';
import HttpClient from '../HttpClient';

const Provider = (() => {
  const r = router;
  const s = store;
  const mounted: Ref<boolean> = ref(false);
  const form = ref();
  const schema: Ref<ISchema> = computed(() => s.getters['meta/schema']);
  const filterQuery: ComputedRef<FilterQuery> = computed(() => s.getters['filter/filterQuery']);
  const sortList: Ref<SortModel[]> = ref([]);
  const saveButtonClicked: Ref<boolean> = ref(false);
  let storeModule = '';
  let getAction = '';
  function initPagination(options?: IPaginationOptions): void {
    store.commit('filter/setStoreModule', options?.storeModule ?? getStoreModule());
    store.commit('filter/setAction', options?.action ?? getGetAction());
    store.commit('pagination/setCurPage', 1);
  }

  function dropPagination(): void {
    filterQuery.value.pagination = new Pagination();
    store.commit('pagination/setCurPage', 1);
  }

  // function getItems<T>(): ComputedRef<T> {
  //   return computed(() => store.getters[storeModule + '/items']);
  // }

  const item = computed(() => {
    storeModule;
    route().fullPath;
    route().path;
    Provider.router;
    mounted;
    return store.getters[storeModule + '/item'];
  });
  const items = computed(() => {
    return store.getters[storeModule + '/items'];
  });

  // function getItem<T>(): ComputedRef<T> {
  //   return
  // }

  function resetState(): void {
    if (storeModule === '') {
      return;
    }
    store.commit(`${storeModule}/resetState`);
  }

  function getStoreModule(): string {
    return storeModule;
  }

  async function loadItems(): Promise<void> {
    return await store.dispatch(`${storeModule}/${getAction}`, filterQuery.value);
  }

  async function submit(next?: NavigationGuardNext): Promise<void> {
    if (Provider.route().params['id']) {
      await store.dispatch(`${storeModule}/update`, store.getters[storeModule + '/item']);
    } else {
      await store.dispatch(`${storeModule}/create`, store.getters[storeModule + '/item']);
    }
    next ? next() : await Provider.router.push(`/admin/${StringsService.toKebabCase(storeModule)}`);
  }

  async function loadItem(col?: string | FilterQuery): Promise<void> {
    const { beforeWindowUnload, formUpdated } = useConfirmLeavePage();
    if (Provider.route().params['id']) {
      if (typeof col === 'string') {
        Provider.filterQuery.value.setParams(col, Provider.route().params['id'] as string);
        await Provider.store.dispatch(`${storeModule}/get`, Provider.filterQuery.value);
      } else {
        await Provider.store.dispatch(`${storeModule}/get`, route().params['id']);
      }
    } else {
      Provider.store.commit(`${storeModule}/resetState`);
    }
    window.addEventListener('beforeunload', beforeWindowUnload);
    watch(item, formUpdated, { deep: true });
  }

  function setGetAction(action: string | undefined = 'getAll'): void {
    getAction = action;
  }

  function getGetAction(): string {
    return getAction;
  }

  async function createAdmin(): Promise<void> {
    await router.push(`/admin/${StringsService.toKebabCase(storeModule)}/new`);
  }

  async function editAdmin(id: string): Promise<void> {
    await router.push(`/admin/${StringsService.toKebabCase(storeModule)}/${id}`);
  }

  async function remove(id: string): Promise<void> {
    return await store.dispatch(`${StringsService.toKebabCase(storeModule)}/remove`, id);
  }

  function getAdminLib() {
    return {
      items,
      item,
      loadItems,
      create: createAdmin,
      edit: editAdmin,
      remove,
      mounted: mounted,
      schema: schema,
      sortList: sortList,
    };
  }

  function setStoreModule(module: string | undefined = ''): void {
    if (module) {
      storeModule = module;
      return;
    }
    const pathParts = route().path.split('/');
    let pathLen = 1;
    if (route().params['id'] || pathParts[pathParts.length - 1] === 'new') {
      pathLen = 2;
    }
    storeModule = StringsService.toCamelCase(pathParts[pathParts.length - pathLen]);
  }

  function setDefaultSortModel(): void {
    if (filterQuery.value.sortModel) {
      return;
    }
    const defaultSortModel = sortList.value.find((sortModel: SortModel) => sortModel.default);
    if (defaultSortModel) {
      filterQuery.value.sortModel = defaultSortModel;
    }
  }

  async function getAll(module?: string): Promise<void> {
    if (!module) {
      module = getStoreModule();
    }
    await s.dispatch(`${module}/getAll`, filterQuery.value);
  }

  function setFilterModel(model: IFilterModel): void {
    s.commit('filter/setFilterModel', model);
  }
  function setFilterModels(...models: IFilterModel[]): void {
    models.forEach((model: IFilterModel) => setFilterModel(model));
  }

  function setSortList(...models: SortModel[]): void {
    sortList.value = models;
  }

  function setSortModel(model: SortModel): void {
    s.commit('filter/setSortModel', model);
  }

  function resetFilterQuery(): void {
    s.commit(`filter/resetQueryFilter`);
    filterQuery.value.reset();
    sortList.value = [];
  }

  function setSortModels(...models: SortModel[]): void {
    models.forEach((model: SortModel) => setSortModel(model));
  }

  function setLimit(limit: number): void {
    filterQuery.value.pagination.limit = limit;
  }

  function setSortModelsForOneTable(table: string, ...cols: string[]) {
    cols.forEach((col: string) => {
      setSortModel(SortModel.CreateSortModel(table, col));
    });
  }

  function spliceFilterModel(id: string | undefined): void {
    s.commit('filter/spliceFilterModel', id);
  }

  function replaceFilterModel(newFilterModel: IFilterModel, previousFilterModelId: string | undefined) {
    spliceFilterModel(previousFilterModelId);
    setFilterModel(newFilterModel);
  }

  function route(): RouteLocationNormalizedLoaded {
    return router.currentRoute.value;
  }

  let sseReconnectCount = 0;
  const maxReconnectCount = 100;
  type f = (e: MessageEvent) => void;
  async function handlerSSE<T>(query: string, storeModule?: string, funcForMessage?: f): Promise<EventSource> {
    if (!storeModule) {
      storeModule = query;
    }
    const c = new HttpClient('subscribe');
    let source = await c.subscribe<T>({ query: query });
    const defaultFunc = function (e: MessageEvent) {
      Provider.store.commit(`${storeModule}/unshiftToAll`, JSON.parse(e.data));
    };

    const f = (e: MessageEvent) => {
      if (funcForMessage) {
        funcForMessage(e);
      } else {
        defaultFunc(e);
      }
    };
    source.onmessage = f;

    source.onerror = function (e) {
      setTimeout(async () => {
        source.close();
        sseReconnectCount++;
        if (sseReconnectCount > maxReconnectCount) {
          sseReconnectCount = 0;

          return;
        }
        source = await handlerSSE(query, storeModule);
      }, sseReconnectCount * 10000);
    };

    return source;
  }

  function routerPushBlank(path: string): void {
    const route = r.resolve({ path: path });
    window.open(route.href, '_blank');
  }

  function getPath(): string {
    const arr = route().path.split('/');
    return arr[arr.length - 1];
  }

  return {
    dropPagination,
    saveButtonClicked,
    resetState,
    routerPushBlank,
    setSortList,
    sortList,
    mounted,
    resetFilterQuery,
    setSortModelsForOneTable,
    setFilterModels,
    setFilterModel,
    setSortModel,
    setSortModels,
    spliceFilterModel,
    filterQuery,
    setLimit: setLimit,
    schema,
    router: r,
    store: s,
    replaceFilterModel,
    form,
    getAll,
    route,
    handlerSSE,
    getPath,
    setDefaultSortModel,
    //
    getStoreModule,
    setStoreModule,
    setGetAction,
    getGetAction,
    items,
    createAdmin,
    editAdmin,
    remove,
    getAdminLib,
    loadItems,
    initPagination,
    loadItem,
    item,
    submit,
  };
})();

export default Provider;