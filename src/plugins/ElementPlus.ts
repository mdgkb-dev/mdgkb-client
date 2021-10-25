import {
  ElAutocomplete,
  ElAvatar,
  ElBreadcrumb,
  ElButton,
  ElCard,
  ElCheckbox,
  ElCheckTag,
  ElCol,
  ElCollapse,
  ElContainer,
  ElDatePicker,
  ElDescriptions,
  ElDialog,
  ElDivider,
  ElDrawer,
  ElForm,
  ElIcon,
  ElImage,
  ElInfiniteScroll,
  ElInput,
  ElInputNumber,
  ElLoading,
  ElMenu,
  ElMessage,
  ElMessageBox,
  ElNotification,
  ElPagination,
  ElPopconfirm,
  ElPopover,
  ElRadio,
  ElRow,
  ElScrollbar,
  ElSelect,
  ElSpace,
  ElSwitch,
  ElTable,
  ElTag,
  ElTimeline,
  ElTooltip,
  ElTree,
  ElUpload,
} from 'element-plus';
import makeInstaller from 'element-plus/lib/make-installer';

export const components = [
  ElAutocomplete,
  ElAvatar,
  ElBreadcrumb,
  ElButton,
  ElCard,
  ElCheckbox,
  ElCheckTag,
  ElCol,
  ElCollapse,
  ElContainer,
  ElDatePicker,
  ElDescriptions,
  ElDialog,
  ElDivider,
  ElDrawer,
  ElForm,
  ElIcon,
  ElImage,
  ElInput,
  ElInputNumber,
  ElMenu,
  ElPagination,
  ElPopconfirm,
  ElPopover,
  ElRadio,
  ElRow,
  ElScrollbar,
  ElSelect,
  ElSpace,
  ElSwitch,
  ElTable,
  ElTag,
  ElTimeline,
  ElTooltip,
  ElTree,
  ElUpload,
];

export const plugins = [ElInfiniteScroll, ElLoading, ElMessage, ElMessageBox, ElNotification];

export const setupElementPlusComponents = makeInstaller(components);
export const setupElementPlusPlugins = makeInstaller(plugins);
