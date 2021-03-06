import { GetterTree } from 'vuex';

import IPostgraduateApplication from '@/interfaces/IPostgraduateApplication';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IPostgraduateApplication[] {
    return state.items;
  },
  item(state): IPostgraduateApplication {
    return state.item;
  },
  emailExists(state): boolean {
    return state.emailExists;
  },
  count(state): number {
    return state.count;
  },
};

export default getters;
