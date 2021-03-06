import { Module } from 'vuex';

import Partner from '@/classes/partners/Partner';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new Partner(),
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
