import { MutationTree } from 'vuex';

import Form from '@/classes/Form';
import Hospitalization from '@/classes/Hospitalization';
import HospitalizationType from '@/classes/HospitalizationType';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(Hospitalization),
  selectHospitalization(state, item: HospitalizationType) {
    state.item.hospitalizationType = new HospitalizationType(item);
    state.item.hospitalizationTypeId = item.id;
    state.item.formValue = new Form(item.formPattern);
    state.item.formValue.initFieldsValues();
  },
};

export default mutations;
