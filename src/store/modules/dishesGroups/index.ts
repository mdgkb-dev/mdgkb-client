import { Module } from 'vuex';

import DishesGroup from '@/classes/DishesGroup';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new DishesGroup(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const dishesGroups: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
