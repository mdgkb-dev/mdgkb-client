import { Module } from 'vuex';

import Carousel from '@/classes/carousel/Carousel';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  items: [],
  item: new Carousel(),
  nowSlide: 0,
  fileLists: [[]],
};

const namespaced = true;

export const carousels: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
