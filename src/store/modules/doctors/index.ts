import { Module } from 'vuex';

import Doctor from '@/classes/doctors/Doctor';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  doctors: [],
  filteredDoctors: [],
  doctor: new Doctor(),
  divisionDoctors: [],
  fileList: [],
};

const namespaced = true;

export const doctors: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
