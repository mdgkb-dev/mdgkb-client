import { ActionTree } from 'vuex';

import IFileInfo from '@/interfaces/files/IFileInfo';
import Cache from '@/services/Cache';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import HttpClient from '@/services/HttpClient';
import IFileInfosGetter from '@/services/interfaces/IFileInfosGetter';
import { IBodilessParams, IBodyfulParams } from '@/services/interfaces/IHTTPTypes';
import ItemsWithCount from '@/services/interfaces/ItemsWithCount';
import IWithId from '@/services/interfaces/IWithId';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

export default function getBaseActions<T extends IWithId & IFileInfosGetter, StateType extends IBasicState<T>>(
  endPointOrClient: HttpClient | string
): ActionTree<StateType, RootState> {
  let httpClient: HttpClient = new HttpClient();
  if (typeof endPointOrClient === 'string') {
    httpClient = new HttpClient(endPointOrClient);
  } else {
    httpClient = endPointOrClient;
  }
  const cache = new Cache();
  cache.name = String(endPointOrClient);

  interface GetAllOptions {
    filterQuery?: FilterQuery;
    withCache?: boolean;
  }

  return {
    getAll: async ({ commit }, options?: GetAllOptions): Promise<void> => {
      const get = async () => {
        return await httpClient.get<T[] | ItemsWithCount<T>>({ query: options && options.filterQuery ? options.filterQuery.toUrl() : '' });
      };
      let res;
      if (options && options.withCache) {
        res = await cache.storeGetWithCache<T[] | ItemsWithCount<T>>(get);
      } else {
        res = await get();
      }
      const setItems = Array.isArray(res) ? res : res?.items;

      if (options && options.filterQuery && options.filterQuery.pagination.append && setItems) {
        commit('appendToAll', setItems);
        options.filterQuery.pagination.setAllLoaded(setItems ? setItems.length : 0);
        return;
      }

      if (Array.isArray(res)) {
        commit('setAll', res);
      } else {
        commit('setAllWithCount', res);
      }
    },
    get: async ({ commit }, filter?: string | FilterQuery) => {
      if (!filter) {
        console.warn('noFilterSetInQuery');
        return;
      }
      let query: IBodilessParams;
      if (typeof filter === 'string') {
        query = { query: filter };
      } else {
        query = { query: `get${filter.toUrl()}` };
      }
      commit('set', await httpClient.get<T>(query));
    },
    create: async ({ state }, item: T): Promise<unknown> => {
      if (!item) {
        item = state.item;
      }
      const opts: IBodyfulParams<T> = { payload: item, isFormData: true };
      if (item.getFileInfos) {
        opts.fileInfos = item.getFileInfos();
        opts.fileInfos.forEach((f: IFileInfo) => (f.url = ''));
      }
      return await httpClient.post<T, T>(opts);
    },
    createAndSet: async ({ commit, dispatch }, item: T): Promise<void> => {
      const result = await dispatch('create', item);
      commit('set', result);
    },
    createAndReset: async ({ commit, dispatch }, item: T): Promise<void> => {
      await dispatch('create', item);
      commit('set');
    },
    update: async ({ state }, item: T): Promise<unknown> => {
      if (!item) {
        item = state.item;
      }
      const opts: IBodyfulParams<T> = { query: `${item.id}`, payload: item, isFormData: true };
      if (item.getFileInfos) {
        opts.fileInfos = item.getFileInfos();
        opts.fileInfos.forEach((f: IFileInfo) => (f.url = ''));
      }
      return await httpClient.put<T, T>(opts);
    },
    updateAndSet: async ({ dispatch, commit }, item: T): Promise<void> => {
      const result = await dispatch('update', item);
      commit('set', result);
    },
    updateAndReset: async ({ dispatch, commit }, item: T): Promise<void> => {
      await dispatch('update', item);
      commit('set');
    },
    remove: async ({ commit }, id: string): Promise<void> => {
      await httpClient.delete({ query: `${id}` });
      commit('remove', id);
    },
    updateMany: async ({ state }): Promise<void> => {
      await httpClient.put<T[], T[]>({ query: 'many', payload: state.items });
    },
  };
}
