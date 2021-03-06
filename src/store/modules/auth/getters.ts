import { GetterTree } from 'vuex';

import User from '@/classes/User';
import IPathPermission from '@/interfaces/IPathPermission';
import IUser from '@/interfaces/IUser';
import TokenService from '@/services/Token';
import RootState from '@/store/types';

import State from './state';

const getters: GetterTree<State, RootState> = {
  token(state): string {
    return state.token;
  },
  user(state): IUser | undefined {
    if (TokenService.getUser()) {
      state.user = new User(TokenService.getUser());
    }
    return state.user;
  },
  isAuth(state): boolean {
    state.isAuth = TokenService.isAuth();
    return state.isAuth;
  },
  authModalVisible(state): boolean {
    return state.authModalVisible;
  },
  loginStatus(state): 'login' | 'register' | 'forgotPassword' | 'passwordChange' {
    return state.loginStatus;
  },
  pathPermissions(state): IPathPermission[] {
    return state.pathPermissions;
  },
  userPathPermissions(state): IPathPermission[] {
    return state.userPathPermissions;
  },
};

export default getters;
