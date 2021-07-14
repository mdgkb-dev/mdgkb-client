import { GetterTree } from 'vuex';

import RootState from '@/store/types';

import { State } from './state';
import IBuilding from "@/interfaces/buildings/IBuilding";

const getters: GetterTree<State, RootState> = {
  buildings(state): IBuilding[] | undefined {
    return state.buildings;
  },
  building(state): IBuilding | undefined {
    return state.building;
  },
};

export default getters;
