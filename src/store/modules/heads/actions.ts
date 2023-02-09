import { ActionTree } from 'vuex';

import FilterQuery from '@/classes/filters/FilterQuery';
import IHead from '@/interfaces/IHead';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('heads');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
    const items = await httpClient.get<IHead[]>({ query: filterQuery ? filterQuery?.toUrl() : '' });
    if (filterQuery) {
      filterQuery.pagination.setAllLoaded(items ? items.length : 0);
    }
    if (filterQuery && filterQuery.pagination.append) {
      commit('appendToAll', items);
      return;
    }
    commit('setAll', items);
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IHead>({ query: `${id}` }));
  },
  create: async ({ commit }, item: IHead): Promise<void> => {
    await httpClient.post<IHead, IHead>({ payload: item, isFormData: true });
    commit('set');
  },
  update: async ({ commit }, item: IHead): Promise<void> => {
    await httpClient.put<IHead, IHead>({ query: `${item.id}`, payload: item, isFormData: true });
    commit('set');
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
