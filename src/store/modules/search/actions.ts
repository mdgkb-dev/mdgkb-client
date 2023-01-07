import { ActionTree } from 'vuex';

import ISearchElement from '@/interfaces/ISearchElement';
import ISearchModel from '@/interfaces/ISearchModel';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import State from './state';

const httpClient = new HttpClient('search');

const actions: ActionTree<State, RootState> = {
  search: async ({ commit }, searchModel: ISearchModel): Promise<void> => {
    const item = await httpClient.get<ISearchModel>({ query: `?searchModel=${searchModel.toUrl()}` });
    if (item) {
      item.searchGroup.options.forEach((opt: ISearchElement) => {
        searchModel.searchObjects.push({ id: opt.id, value: opt.value, label: opt.label, description: opt.description });
      });
    }
  },
  mainSearch: async ({ commit }, searchModel: ISearchModel): Promise<void> => {
    commit('setSearchModel', await httpClient.get<ISearchModel>({ query: `/main?searchModel=${searchModel.toUrl()}` }));
  },
  full: async ({ commit }, searchModel: ISearchModel): Promise<void> => {
    commit('setSearchModel', await httpClient.get<ISearchModel>({ query: `full?searchModel=${searchModel.toUrl()}` }));
  },
  searchGroups: async ({ commit }): Promise<void> => {
    commit('setSearchGroups', await httpClient.get<ISearchModel>({ query: `search-groups` }));
  },
};

export default actions;
