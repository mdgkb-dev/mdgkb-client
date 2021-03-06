import { ActionTree } from 'vuex';

import IEntrance from '@/interfaces/buildings/IEntrance';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('entrances');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IEntrance[]>());
  },
};

export default actions;
