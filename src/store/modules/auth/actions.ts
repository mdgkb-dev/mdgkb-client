import { ActionTree } from 'vuex';

import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IPathPermission from '@/interfaces/IPathPermission';
import IPathPermissionsWithCount from '@/interfaces/IPathPermissionsWithCount';
import ITokens from '@/interfaces/ITokens';
import IUser from '@/interfaces/IUser';
import HttpClient from '@/services/HttpClient';
import TokenService from '@/services/Token';
import RootState from '@/store/types';

import State from './state';

const httpClient = new HttpClient('auth');

const actions: ActionTree<State, RootState> = {
  login: async ({ commit }, user: IUser): Promise<void> => {
    const res = await httpClient.post<IUser, { user: IUser; tokens: ITokens }>({ query: 'login', payload: user });
    if (!res) {
      return;
    }
    const { user: newUser, tokens } = res;
    commit('setUser', newUser);
    commit('setTokens', tokens);
    commit('setIsAuth', true);
    commit('setFavourite', newUser);
  },
  register: async ({ commit }, user: IUser): Promise<void> => {
    const res = await httpClient.post<IUser, { user: IUser; tokens: ITokens }>({ query: 'register', payload: user });
    if (!res) {
      return;
    }
    const { user: newUser, tokens } = res;
    commit('setUser', newUser);
    commit('setTokens', tokens);
    commit('setIsAuth', true);
  },
  restorePassword: async ({ commit }, user: IUser): Promise<void> => {
    await httpClient.post<IUser, IUser>({ query: 'restore-password', payload: user });
  },
  passwordChange: async ({ commit }, user: IUser): Promise<void> => {
    await httpClient.post<IUser, IUser>({ query: 'password-change', payload: user });
  },
  refreshPassword: async ({ commit }, user: IUser): Promise<void> => {
    await httpClient.put<IUser, IUser>({ query: 'refresh-password', payload: user });
  },
  logout: async ({ commit, state }): Promise<void> => {
    commit('setIsAuth', false);
    commit('clearUser');
    commit('clearTokens');
  },
  refreshToken: async ({ commit }): Promise<void> => {
    commit(
      'setTokens',
      await httpClient.post<any, { user: IUser; token: ITokens }>({
        query: 'refresh-token',
        payload: { refreshToken: TokenService.getRefreshToken() },
      })
    );
  },
  checkUuid: async ({ commit }, checkObj: { userId: string; uniqueId: string }): Promise<void> => {
    await httpClient.get<IUser>({ query: `check-uuid/${checkObj.userId}/${checkObj.uniqueId}` });
  },
  checkPathPermissions: async ({ commit }, path: string): Promise<void> => {
    await httpClient.post<string, string>({ query: `check-path-permissions`, payload: path });
  },
  savePathPermissions: async ({ commit }, paths: IPathPermission[]): Promise<void> => {
    await httpClient.put<IPathPermission[], IPathPermission[]>({ query: 'path-permissions', payload: paths });
  },
  getAllPathPermissions: async ({ commit }): Promise<void> => {
    commit('setPathPermissions', await httpClient.get<IPathPermission[]>({ query: 'path-permissions' }));
  },
  getAllPathPermissionsAdmin: async ({ commit }, filterQuery: IFilterQuery): Promise<void> => {
    const query = `path-permissions/admin/${filterQuery.toUrl()}`;
    commit('setPathPermissionsAdmin', await httpClient.get<IPathPermissionsWithCount>({ query }));
  },
  getUserPathPermissions: async ({ state, commit }): Promise<void> => {
    commit('setUserPathPermissions', await httpClient.get<IPathPermission[]>({ query: `path-permissions/${state.user.roleId}` }));
  },
};

export default actions;
