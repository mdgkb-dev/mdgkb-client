import { ElMessage } from 'element-plus';
import { onBeforeMount } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import AdminHeaderParams from '@/classes/admin/AdminHeaderParams';
import FilterQuery from '@/classes/filters/FilterQuery';
import createSortModels, { ISortModelBuildersLib } from '@/services/CreateSortModels';
import Provider from '@/services/Provider';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export interface IHooksOptions {
  pagination?: IPaginationOptions;
  sortsLib?: ISortModelBuildersLib;
  adminHeader?: AdminHeaderParams;
  getAction?: string;
  v2?: boolean;
}

export interface IPaginationOptions {
  storeModule: string;
  action: string;
}

type func = (filterQuery: FilterQuery) => void;

const Hooks = (() => {
  const onBeforeMountWithLoading = (f: func, options?: IHooksOptions) => {
    return onBeforeMount(async () => {
      Provider.mounted.value = false;
      Provider.store.commit('admin/showLoading');
      Provider.resetFilterQuery();
      await Provider.store.dispatch('meta/getSchema');
      if (options?.sortsLib) {
        Provider.setSortList(...createSortModels(options.sortsLib));
      }
      Provider.setDefaultSortModel();
      await Provider.filterQuery.value.fromUrlQuery(Provider.route().query);
      Provider.setStoreModule();
      Provider.setGetAction(options?.getAction);
      Provider.initPagination(options?.pagination);
      await f(Provider.filterQuery.value);
      console.log('load');
      if ((options?.adminHeader, options?.adminHeader)) {
        console.log(Provider.item);
        Provider.store.commit('admin/setHeaderParams', options.adminHeader);
      }
      console.log('opt', options?.adminHeader);
      Provider.store.commit('admin/closeLoading');
      Provider.mounted.value = true;
    });
  };

  const { saveButtonClick, showConfirmModal } = useConfirmLeavePage();

  const onBeforeRouteLeaveWithSubmit = (submitFunction?: CallableFunction) => {
    return onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      const func = submitFunction ? submitFunction : submit;
      showConfirmModal(func(), next);
      Provider.resetState();
    });
  };

  const submit = (submitFunction?: CallableFunction) => {
    return async () => {
      saveButtonClick.value = true;
      if (!validate(Provider.form)) {
        saveButtonClick.value = false;
        return;
      }
      try {
        if (submitFunction) {
          await submitFunction();
        } else {
          await Provider.submit();
        }
        ElMessage({ message: 'Сохранено', type: 'success' });
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
    };
  };

  return {
    onBeforeMount: onBeforeMountWithLoading,
    onBeforeRouteLeave: onBeforeRouteLeaveWithSubmit,
    submit,
  };
})();

export default Hooks;
