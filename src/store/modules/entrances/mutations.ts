import { MutationTree } from 'vuex';

import Entrance from '@/classes/buildings/Entrance';
import IEntrance from '@/interfaces/buildings/IEntrance';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IEntrance[]) {
    state.items = items.map((i: IEntrance) => new Entrance(i));
  },
};

export default mutations;
