import { ActionTree } from 'vuex';

import IDietAge from '@/interfaces/IDietAge';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('age-periods');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IDietAge[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IDietAge>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }, item: IDietAge): Promise<void> => {
    await httpClient.post<IDietAge, IDietAge>({
      payload: item,
    });
  },
  update: async (_, item: IDietAge): Promise<void> => {
    await httpClient.put<IDietAge, IDietAge>({ query: `${item.id}`, payload: item });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
