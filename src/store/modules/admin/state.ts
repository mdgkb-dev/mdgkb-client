import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type';

export interface State {
  pageTitle: string;
  showSaveButton: boolean;
  isCollapseSideMenu: boolean;
  isDrawerOpen: boolean;
  loading: ILoadingInstance | undefined;
  loadingSaveButton: boolean;
  submit: undefined | (() => Promise<void>);
}
