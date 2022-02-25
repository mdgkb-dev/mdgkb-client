import { MutationTree } from 'vuex';

import Teacher from '@/classes/Teacher';
import ITeacher from '@/interfaces/ITeacher';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: ITeacher[]) {
    state.items = items.map((i: ITeacher) => new Teacher(i));
  },
  set(state, item: ITeacher) {
    state.item = new Teacher(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: ITeacher) => i.id === id);
    state.items.splice(index, 1);
  },
};

export default mutations;