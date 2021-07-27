import { Module } from 'vuex';

import RootState from '@/store/types';
import State from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export const state: State = {
  types: [],
  type: undefined,
};

const namespaced = true;

const normativeDocumentTypes: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default normativeDocumentTypes;
