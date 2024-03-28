import { Module } from 'vuex';

import ChatMessage from '@/services/classes/ChatMessage';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<ChatMessage>;

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(ChatMessage),
  };
};

const state = getDefaultState();
const namespaced = true;

export const chatMessages: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
