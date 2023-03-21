import { MutationTree } from 'vuex';

import Preparation from '@/classes/Preparation';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(Preparation),
};

export default mutations;
