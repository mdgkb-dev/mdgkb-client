import { MutationTree } from 'vuex';

import DpoApplication from '@/classes/DpoApplication';
import DpoCourse from '@/classes/DpoCourse';
import Form from '@/classes/Form';
import User from '@/classes/User';
import IDpoApplication from '@/interfaces/IDpoApplication';
import IDpoApplicationsWithCount from '@/interfaces/IDpoApplicationsWithCount';
import IDpoCourse from '@/interfaces/IDpoCourse';
import IForm from '@/interfaces/IForm';
import IUser from '@/interfaces/IUser';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IDpoApplication[]) {
    state.items = items.map((i: IDpoApplication) => new DpoApplication(i));
  },
  setAllWithCount(state, item: IDpoApplicationsWithCount) {
    if (!item.dpoApplications) {
      state.items = [];
      return;
    }
    state.items = item.dpoApplications.map((i: IDpoApplication) => new DpoApplication(i));
    state.count = item.count;
  },
  appendToAll(state, item: IDpoApplicationsWithCount) {
    if (!item.dpoApplications) {
      state.items = [];
      return;
    }
    const dpoApplications = item.dpoApplications.map((i: IDpoApplication) => new DpoApplication(i));
    state.items.push(...dpoApplications);
    state.count = item.count;
  },
  unshiftToAll(state, item: IDpoApplication) {
    state.items.unshift(new DpoApplication(item));
  },
  set(state, item: IDpoApplication) {
    state.item = new DpoApplication(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IDpoApplication) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new DpoApplication();
  },
  setUser(state, user: IUser) {
    state.item.formValue.user = new User(user);
  },
  setCourse(state, dpoCourse: IDpoCourse) {
    state.item.dpoCourse = new DpoCourse(dpoCourse);
    state.item.dpoCourseId = state.item.dpoCourse.id;
  },
  setEmailExists(state, emailExists: boolean) {
    state.emailExists = emailExists;
  },
  setFormValue(state, form: IForm) {
    state.item.formValue = new Form(form);
  },
  changeFormPattern(state, pattern: IForm) {
    state.item.formValue.removeAllFieldsAndValues();
    state.item.formValue.applyFormPatternFields(pattern);
    state.item.formValue.initFieldsValues();
  },
};

export default mutations;
