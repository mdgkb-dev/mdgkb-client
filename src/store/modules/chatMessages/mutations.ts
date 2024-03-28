import { MutationTree } from 'vuex';

import ChatMessage from '@/services/classes/ChatMessage';
import getBaseMutations from '@/services/store/baseModule/baseMutations';
import { getDefaultState } from '@/store/modules/news';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<ChatMessage, State>(ChatMessage),
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export default mutations;
