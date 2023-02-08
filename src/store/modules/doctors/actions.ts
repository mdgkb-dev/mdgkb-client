import { ActionTree } from 'vuex';

import FilterQuery from '@/classes/filters/FilterQuery';
import IDoctor from '@/interfaces/IDoctor';
import IDoctorComment from '@/interfaces/IDoctorComment';
import IDoctorsWithCount from '@/interfaces/IDoctorsWithCount';
import ISearch from '@/interfaces/ISearch';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('doctors');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
    const items = await httpClient.get<IDoctor[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
    if (filterQuery && filterQuery.pagination.append) {
      commit('appendToAll', items);
      filterQuery.pagination.setAllLoaded(items ? items.length : 0);
      return;
    }
    commit('setAll', items);
  },
  getAllMain: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IDoctor[]>({ query: 'main' }));
  },
  getAllAdmin: async ({ commit }, filterQuery: FilterQuery): Promise<void> => {
    const query = `admin/${filterQuery.toUrl()}`;
    commit('setAllAdmin', await httpClient.get<IDoctorsWithCount>({ query }));
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IDoctor>({ query: `${id}` }));
  },
  getByDivisionId: async ({ commit }, id: string) => {
    commit('setDivisionDoctors', await httpClient.get<IDoctor>({ query: `${id}` }));
  },
  create: async ({ commit }, item: IDoctor): Promise<void> => {
    await httpClient.post<IDoctor, IDoctor>({ payload: item, fileInfos: item.getFileInfos(), isFormData: true });
    commit('set');
  },
  update: async ({ commit }, item: IDoctor): Promise<void> => {
    item.timetable.timetableDaysForDelete = item.timetableDaysForDelete;
    await httpClient.put<IDoctor, IDoctor>({ query: `${item.id}`, payload: item, fileInfos: item.getFileInfos(), isFormData: true });
    commit('set');
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },

  addDoctorToDivisionDoctors: async ({ commit }, newDoctor: IDoctor): Promise<void> => {
    commit('addDoctorToDivisionDoctors', newDoctor);
    commit('filterDoctors');
  },

  removeComment: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `comment/${id}` });
    commit('removeComment', id);
  },
  createComment: async ({ commit }, comment: IDoctorComment): Promise<void> => {
    const res = await httpClient.post<IDoctorComment, IDoctorComment>({ query: `comment`, payload: comment });
    commit('resetComment', res);
  },
  updateComment: async ({ commit }, newComment: IDoctorComment): Promise<void> => {
    await httpClient.put({ query: `comment/${newComment.id}`, payload: newComment });
    commit('updateComment', newComment.comment.id);
  },
  deleteComment: async ({ commit }, comment: IDoctorComment): Promise<void> => {
    await httpClient.delete({ query: `comment/${comment.id}` });
    commit('deleteCommentFromNews', comment);
  },
  search: async ({ commit }, search: ISearch): Promise<void> => {
    const items = await httpClient.get<IDoctor[]>({ query: `search?query=${search.query}` });
    if (items) {
      items.forEach((i: IDoctor) => {
        if (i.id) {
          search.searchObjects.push({
            value: `${i.employee.human.surname} ${i.employee.human.name} ${i.employee.human.patronymic}`,
            id: i.employee.human.slug,
            label: `${i.employee.human.surname} ${i.employee.human.name} ${i.employee.human.patronymic}`,
            description: '',
          });
        }
      });
    }
  },
  getAllById: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IDoctor>({ query: id });
    commit('setAll', [res]);
  },
};

export default actions;
