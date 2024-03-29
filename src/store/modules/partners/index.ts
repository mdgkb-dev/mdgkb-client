import { Module } from 'vuex';

import Partner from '@/classes/Partner';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new Partner(),
    filteredItems: [],
  };
};

const state = getDefaultState();
const namespaced = true;

export const partners: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
