// eslint-disable-next-line simple-import-sort/imports
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import 'dayjs/locale/ru';
import './assets/styles/element-variables.scss';

import sanitizeHTML from 'sanitize-html';

import scroll from '@/services/Scroll';
import carouselSwipe from '@/services/CarouselSwipe';

const app = createApp(App);
import VueSocialSharing from 'vue-social-sharing';
// import YmapPlugin from 'vue-yandex-maps';
import Vue3TouchEvents from 'vue3-touch-events';

app.config.globalProperties.$dateTimeFormatter = new DateTimeFormatter('ru-RU');
app.config.globalProperties.$sanitize = sanitizeHTML;
app.config.globalProperties.$scroll = scroll;
app.config.globalProperties.$carouselSwipe = carouselSwipe;
app.config.globalProperties.$buildUrl = buildUrl;

app.use(VueSocialSharing);
app.use(Vue3TouchEvents);

import { library } from '@fortawesome/fontawesome-svg-core';
import { faVk } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import buildUrl from '@/services/BuildUrl';
import DateTimeFormatter from '@/services/DateFormat';
import Provider from '@/services/Provider';

library.add(faVk);

app.component('FontAwesomeIcon', FontAwesomeIcon);

app.use(store);
app.use(router);
// app.use(YmapPlugin);
app.use(ElementPlus);

// locale.use(lang);
Provider.router = router;
Provider.store = store;
router.isReady().then(() => {
  app.mount('#app');
});
