import { GetterTree } from 'vuex';

import IDivision from '@/interfaces/buildings/IDivision';
import RootState from '@/store/types';

import { State } from './state';
import ITimetable from '@/interfaces/timetables/ITimetable';

const getters: GetterTree<State, RootState> = {
  divisions(state): IDivision[] | undefined {
    const { divisions } = state;
    return divisions;
  },
  division(state): IDivision | undefined {
    const { division } = state;
    return division;
  },
  timetable(state): ITimetable | undefined {
    if (state.division) return state.division.timetable;
  },
};

export default getters;
