import { GetterTree } from 'vuex';

import IDietAge from '@/interfaces/IDietAge';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IDietAge[] {
    return state.items;
  },
  item(state): IDietAge {
    return state.item;
  },
  selectedItemId(state): string {
    return state.selectedItemId;
  },
};

export default getters;
