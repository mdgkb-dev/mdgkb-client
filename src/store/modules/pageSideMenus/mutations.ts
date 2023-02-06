import { MutationTree } from 'vuex';

import PageSideMenu from '@/classes/PageSideMenu';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { getDefaultState } from '.';
import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<PageSideMenu, State>(PageSideMenu),
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export default mutations;
