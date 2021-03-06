import { Module } from 'vuex';

import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    selectedHospitalization: undefined,
  };
};

const state = getDefaultState();
const namespaced = true;

export const hospitalizations: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
