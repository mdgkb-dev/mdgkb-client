import { Module } from 'vuex';

import Vacancy from '@/classes/Vacancy';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new Vacancy(),
    count: 0,
  };
};

const state = getDefaultState();
const namespaced = true;

export const vacancies: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
