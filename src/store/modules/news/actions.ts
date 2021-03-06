import { ActionTree } from 'vuex';

import IFileInfo from '@/interfaces/files/IFileInfo';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import INewsWithCount from '@/interfaces/INewsWithCount';
import IEventApplication from '@/interfaces/news/IEventApplication';
import INews from '@/interfaces/news/INews';
import INewsComment from '@/interfaces/news/INewsComment';
import INewsImage from '@/interfaces/news/INewsImage';
import INewsLike from '@/interfaces/news/INewsLike';
import INewsToTag from '@/interfaces/news/INewsToTag';
import ITag from '@/interfaces/news/ITag';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('news');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: IFilterQuery): Promise<void> => {
    const items = await httpClient.get<INewsWithCount[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
    if (filterQuery && filterQuery.pagination.cursorMode) {
      commit('appendToAll', items);
      return;
    }
    commit('setAll', items);
  },
  // getAll: async ({ commit, state }): Promise<void> => {
  //   state.params.filterTags = state.filterTags.map((tag: ITag) => tag.id);
  //   if (state.news[state.news.length - 1]) {
  //     state.params.publishedOn = state.news[state.news.length - 1].publishedOn;
  //   } else {
  //     state.params.publishedOn = undefined;
  //   }
  //   const res = await httpClient.get<{ data: INews[] }>({ query: state.params.toUrl() });
  //   commit('setAll', res);
  // },
  // getAllAdmin: async ({ commit }, filterQuery: IFilterQuery): Promise<void> => {
  //   const query = `admin/${filterQuery.toUrl()}`;
  //   commit('setAllAdmin', await httpClient.get<INewsWithCount[]>({ query: query }));
  // },
  // getAllMain: async ({ commit }): Promise<void> => {
  //   commit('setAllMain', await httpClient.get<INewsWithCount[]>({ query: 'main' }));
  // },
  get: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<INews>({ query: `${slug}` });
    commit('set', res);
  },
  getByMonth: async ({ commit }, filterQuery?: IFilterQuery): Promise<void> => {
    const items = await httpClient.get<INewsWithCount[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
    commit('setCalendarNews', items);
    // commit('updateCalendarMeta', params);
  },
  // getByMonth: async ({ commit }, params: ICalendarMeta): Promise<void> => {
  //   const query = `month/?month=${params.month}&year=${params.year}`;
  //   const res = await httpClient.get<{ data: INews[] }>({ query: query });
  //   commit('setCalendarNews', res);
  //   commit('updateCalendarMeta', params);
  // },
  create: async ({ commit }, news: INews): Promise<void> => {
    const fileInfos: IFileInfo[] = [];
    news.newsImages.forEach((image: INewsImage) => {
      if (image.fileInfo) fileInfos.push(image.fileInfo);
    });
    fileInfos.push(news.previewImage);
    fileInfos.push(news.mainImage);
    await httpClient.post<INews, INews>({ payload: news, fileInfos: fileInfos, isFormData: true });
    commit('set');
  },
  update: async ({ commit }, news: INews): Promise<void> => {
    const fileInfos: IFileInfo[] = [];
    news.newsImages.forEach((image: INewsImage) => {
      if (image.fileInfo) fileInfos.push(image.fileInfo);
    });
    fileInfos.push(news.previewImage);
    fileInfos.push(news.mainImage);
    await httpClient.put<INews, INews>({
      query: `${news.id}`,
      payload: news,
      fileInfos: fileInfos,
      isFormData: true,
    });
    commit('set');
  },
  remove: async ({ commit }, newsId: string): Promise<void> => {
    await httpClient.delete({ query: `${newsId}` });
    commit('remove', newsId);
  },

  addTag: async (_, item: INewsToTag): Promise<void> => {
    await httpClient.post<INewsToTag, INewsToTag>({ query: `tag`, payload: item });
  },

  removeTag: async (_, item: INewsToTag): Promise<void> => {
    await httpClient.delete<INewsToTag, INewsToTag>({ query: `tag`, payload: item });
  },

  createLike: async ({ commit }, newsLike: INewsLike): Promise<void> => {
    const res = await httpClient.post<INewsLike, INewsLike>({ query: `like`, payload: newsLike });
    commit('setLikeNews', res);
  },
  removeComment: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `comment/${id}` });
    commit('removeComment', id);
  },
  createComment: async ({ commit }, comment: INewsComment): Promise<void> => {
    const res = await httpClient.post<INewsComment, INewsComment>({ query: `comment`, payload: comment });
    commit('setComment', res);
  },
  updateComment: async ({ commit }, newComment: INewsComment): Promise<void> => {
    await httpClient.put({ query: `comment/${newComment.id}`, payload: newComment });
    commit('updateComment', newComment.comment.id);
  },
  deleteComment: async ({ commit }, comment: INewsComment): Promise<void> => {
    await httpClient.delete({ query: `comment/${comment.id}` });
    commit('deleteCommentFromNews', comment);
  },
  deleteLike: async ({ commit }, newsLike: INewsLike): Promise<void> => {
    await httpClient.delete({ query: `like/${newsLike.id}` });
    commit('deleteLikeFromNews', newsLike);
  },
  addFilterTag: async ({ commit }, tag: ITag): Promise<void> => {
    commit('addFilterTag', tag);
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
  sendEventApplications: async (_, eventApplication: IEventApplication): Promise<void> => {
    await httpClient.post<IEventApplication, IEventApplication>({ query: `event/application`, payload: eventApplication });
  },
};

export default actions;
