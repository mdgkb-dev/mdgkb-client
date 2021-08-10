import { GetterTree } from 'vuex';

import IDoctor from '@/interfaces/doctors/IDoctor';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  doctors(state): IDoctor[] | undefined {
    const { doctors } = state;
    return doctors;
  },
  filteredDoctors(state): IDoctor[] | undefined {
    const { filteredDoctors } = state;
    return filteredDoctors;
  },
  doctor(state): IDoctor | undefined {
    const { doctor } = state;
    return doctor;
  },
  divisionDoctors(state): IDoctor[] | undefined {
    const { divisionDoctors } = state;
    return divisionDoctors;
  },
};

export default getters;
