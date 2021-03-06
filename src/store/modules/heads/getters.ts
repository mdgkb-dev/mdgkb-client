import { GetterTree } from 'vuex';

import Head from '@/classes/Head';
import IHead from '@/interfaces/IHead';
import ITimetable from '@/interfaces/timetables/ITimetable';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IHead[] {
    console.log(state.items);
    return state.items.filter((head: IHead) => !head.isMain);
  },
  mainDoctor(state): IHead {
    const main = state.items.find((head: IHead) => head.isMain);
    if (main) {
      return main;
    }
    return new Head();
  },
  item(state): IHead {
    return state.item;
  },
  timetable(state): ITimetable {
    return state.item.timetable;
  },
};

export default getters;
