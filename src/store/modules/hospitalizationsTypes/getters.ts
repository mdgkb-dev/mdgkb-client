import { GetterTree } from 'vuex';

import IHospitalizationType from '@/interfaces/IHospitalizationType';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IHospitalizationType[] {
    return state.items;
  },
  item(state): IHospitalizationType {
    return state.item;
  },
};

export default getters;