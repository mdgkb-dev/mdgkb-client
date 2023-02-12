import { MutationTree } from 'vuex';

import AppointmentType from '@/classes/AppointmentType';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(AppointmentType),
};

export default mutations;
