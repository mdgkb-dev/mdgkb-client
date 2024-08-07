import { ActionTree } from 'vuex';

import SearchElement from '@/classes/SearchElement';
import SearchModel from '@/services/classes/SearchModel';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import State from './state';

const httpClient = new HttpClient('search');
const httpClient1 = new HttpClient('meta');

const actions: ActionTree<State, RootState> = {
  search: async ({ commit }, searchModel: SearchModel): Promise<void> => {
    const item = await httpClient.get<SearchModel>({ query: `?key=${searchModel.key}&query=${searchModel.query}` });
    if (item && item.searchGroup) {
      item.searchGroup.options.forEach((opt: SearchElement) => {
        searchModel.searchObjects.push({ id: opt.id, value: opt.value, label: opt.label, description: opt.description });
      });
    }
  },
  mainSearch: async ({ commit }, searchModel: SearchModel): Promise<void> => {
    commit('setSearchModel', await httpClient.get<SearchModel>({ query: `/main?searchModel=${searchModel.toUrl()}` }));
  },
  full: async ({ commit }, searchModel: SearchModel): Promise<void> => {
    searchModel.options = [];
    searchModel.searchGroups.forEach((s: searchGroup) => {
      s.options = [];
    });
    commit('setSearchModel', await httpClient1.get<SearchModel>({ query: `main?searchModel=${searchModel.toUrl()}` }));
  },
  searchGroups: async ({ commit, state }): Promise<void> => {
    if (state.searchModel.searchGroups.length > 0) {
      return;
    }
    commit('setSearchGroups', await httpClient.get<SearchModel>({ query: `search-groups` }));
  },
};

export default actions;
