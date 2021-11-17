import { Module } from 'vuex';

import User from '@/classes/user/User';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  items: [],
  item: new User(),
  emailExists: false,
  authPageEmail: '',
};

const namespaced = true;

export const users: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
