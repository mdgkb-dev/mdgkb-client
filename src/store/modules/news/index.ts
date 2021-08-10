import { Module } from 'vuex';

import News from '@/classes/news/News';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  news: [],
  filteredNews: [],
  filterTags: [],
  newsItem: new News(),
  allNewsLoaded: false,
  calendarNews: [new News()],
  calendarMeta: undefined,
};

const namespaced = true;

export const news: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
