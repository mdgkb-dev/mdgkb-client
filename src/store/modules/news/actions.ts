import { ActionTree } from 'vuex';

import EventApplication from '@/classes/EventApplication';
import News from '@/classes/News';
import NewsComment from '@/classes/NewsComment';
import NewsLike from '@/classes/NewsLike';
import INewsWithCount from '@/interfaces/INewsWithCount';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('news');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions(httpClient),
  getMain: async ({ commit }, fill?: boolean): Promise<void> => {
    const items = await httpClient.get<INewsWithCount[]>({ query: 'main' });
    if (fill) {
      commit('setMainOrFill', items);
    } else {
      commit('setMain', items);
    }
  },
  getSubMain: async ({ commit }, fill?: boolean): Promise<void> => {
    const items = await httpClient.get<INewsWithCount[]>({ query: 'submain' });
    if (fill) {
      commit('setSubMainOrFill', items);
    } else {
      commit('setSubMain', items);
    }
  },
  getByMonth: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
    const items = await httpClient.get<INewsWithCount[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
    commit('setCalendarNews', items);
  },
  createLike: async (_, newsLike: NewsLike): Promise<void> => {
    await httpClient.post<NewsLike, NewsLike>({ query: `like`, payload: newsLike });
  },
  deleteLike: async (_, newsLike: NewsLike): Promise<void> => {
    await httpClient.delete({ query: `like/${newsLike.id}` });
  },
  addFilterTag: async ({ commit }): Promise<void> => {
    commit('setFilteredNews');
  },
  removeFilterTag: async ({ commit }, id: string): Promise<void> => {
    commit('removeFilterTag', id);
    commit('setFilteredNews');
  },
  resetFilterTags: async ({ commit }): Promise<void> => {
    commit('resetFilterTags');
    commit('setFilteredNews');
  },
  sendEventApplications: async (_, eventApplication: EventApplication): Promise<void> => {
    await httpClient.post<EventApplication, EventApplication>({ query: `event/application`, payload: eventApplication });
  },
  getSuggestionNews: async ({ commit }, id: string): Promise<void> => {
    commit('setAll', await httpClient.get<News[]>({ query: `get-suggestion/${id}` }));
  },
  // sendToTg: async (_, message: string): Promise<void> => {
  //   if (!process.env.VUE_APP_TG_TOKEN || process.env.VUE_APP_TG_CHAT_ID) {
  //     console.log('env tg');
  //   }
  //   await axiosInstance({
  //     url: `https://api.telegram.org/bot${process.env.VUE_APP_TG_TOKEN}/sendMessage?chat_id=${process.env.VUE_APP_TG_CHAT_ID}&text=${message}&parse_mode=HTML`,
  //     method: 'post',
  //   });
  // },
};

export default actions;
