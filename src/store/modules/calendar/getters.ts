import { GetterTree } from 'vuex';

import Calendar from '@/classes/Calendar';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  calendar(state): Calendar {
    return state.calendar;
  },
};

export default getters;
