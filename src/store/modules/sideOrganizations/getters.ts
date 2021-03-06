import { GetterTree } from 'vuex';

import ISideOrganization from '@/interfaces/sideOrganization/ISideOrganization';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  sideOrganizations(state): ISideOrganization[] | undefined {
    const { sideOrganizations } = state;
    return sideOrganizations;
  },
  sideOrganization(state): ISideOrganization {
    const { sideOrganization } = state;
    return sideOrganization;
  },
};

export default getters;
