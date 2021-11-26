import {
  ElAutocomplete,
  ElAvatar,
  ElBadge,
  ElBreadcrumb,
  ElButton,
  ElCard,
  ElCarousel,
  ElCheckbox,
  ElCheckTag,
  ElCol,
  ElCollapse,
  ElColorPicker,
  ElContainer,
  ElDatePicker,
  ElDescriptions,
  ElDialog,
  ElDivider,
  ElDrawer,
  ElDropdown,
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
  ElPageHeader,
  ElPagination,
  ElPopconfirm,
  ElPopover,
  ElRadio,
  ElRow,
  ElScrollbar,
  ElSelect,
  ElSelectV2,
  ElSpace,
  ElSwitch,
  ElTable,
  ElTabs,
  ElTag,
  ElTimeline,
  ElTimeSelect,
  ElTooltip,
  ElTree,
  ElUpload,
} from 'element-plus';
import makeInstaller from 'element-plus/lib/make-installer';

export const components = [
  ElPageHeader,
  ElAutocomplete,
  ElAvatar,
  ElBreadcrumb,
  ElButton,
  ElCard,
  ElCarousel,
  ElCheckbox,
  ElCheckTag,
  ElCol,
  ElCollapse,
  ElContainer,
  ElColorPicker,
  ElDatePicker,
  ElDescriptions,
  ElDialog,
  ElDivider,
  ElDrawer,
  ElDropdown,
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
  ElTabs,
  ElTag,
  ElTimeline,
  ElTooltip,
  ElTree,
  ElUpload,
  ElSelectV2,
  ElTimeSelect,
  ElBadge,
];

export const plugins = [ElInfiniteScroll, ElLoading, ElMessage, ElMessageBox, ElNotification];

export const setupElementPlusComponents = makeInstaller(components);
export const setupElementPlusPlugins = makeInstaller(plugins);
