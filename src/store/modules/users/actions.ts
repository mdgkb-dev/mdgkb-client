import { ActionTree } from 'vuex';

import IUser from '@/interfaces/users/IUser';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('users');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IUser[]>());
  },
  get: async ({ commit }, id: number) => {
    commit('set', await httpClient.get<IUser>({ query: `${id}` }));
  },
  findEmail: async ({ commit }, email): Promise<void> => {
    const res = await httpClient.get<IUser[]>({ query: `get-by-email/${email}` });
    commit('emailExist', res);
  },
};

export default actions;
