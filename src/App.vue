<template>
  <Suspense v-if="mounted">
    <AdminLayout v-if="$route.meta && $route.meta.layout">
      <el-main v-if="show">
        <router-view />
      </el-main>
      <template v-else>
        <router-view />
      </template>
    </AdminLayout>
    <MainLayout v-else>
      <router-view />
    </MainLayout>
  </Suspense>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref, watch } from '@vue/runtime-core';
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import TokenService from '@/services/Token';
import AdminLayout from '@/views/admin/AdminLayout.vue';
import MainLayout from '@/views/main/MainLayout.vue';

import User from './classes/User';

export default defineComponent({
  name: 'App',
  components: {
    MainLayout,
    AdminLayout,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const mounted: Ref<boolean> = ref(false);
    const show = computed(() => {
      console.log('route.meta', route.meta);
      return route.meta && route.meta.adminLayout;
    });

    watch(route, () => {
      changeDocumentTitle();
    });

    const changeDocumentTitle = () => {
      const defaultTitle = 'Морозовская детская городская клиническая больница';
      document.title = route.meta.title ? `${route.meta.title} | МДГКБ` : defaultTitle;
    };

    // TODO безопасно ли это?
    const setLocalStorageToVuex = () => {
      const userData = localStorage.getItem('user');
      const token = TokenService.getAccessToken();
      if (userData && token) {
        const user = new User(JSON.parse(userData));
        store.commit('auth/setTokens', token);
        store.commit('auth/setUser', user);
        store.commit('auth/setIsAuth', true);
      }
    };

    onBeforeMount(async (): Promise<void> => {
      changeDocumentTitle();
      await store.dispatch('meta/getSchema');
      await store.dispatch('search/searchGroups');
      mounted.value = true;
    });

    onMounted(() => {
      setLocalStorageToVuex();
    });

    return { mounted, show };
  },
});
</script>
