import { ActionTree } from 'vuex';

import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions('daily-menu-items'),
};

export default actions;
