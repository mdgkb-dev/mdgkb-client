<template>
  <div style="min-height: 100vh">
    <KeepAlive :include="[]" :max="0">
      <AdminHeaderTop />
      <div class="admin-main-container">
        <AdminSideMenu class="side-menu hidden-sm-and-down" />
        <div class="admin-container">
          <AdminHeaderBottom />
          <div v-if="$route.meta.adminLayout === AdminLayout.TableList" style="height: inherit">
            <slot />
          </div>
          <el-main v-else>
            <template #default>
              <slot />
            </template>
            <template #fallback>
              <div>Loading...</div>
            </template>
          </el-main>
        </div>
      </div>
      <AdminMenuDrawer />
    </KeepAlive>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue';
import { useStore } from 'vuex';

import { AdminLayout } from '@/interfaces/admin/AdminLayout';
import AdminHeaderBottom from '@/views/adminLayout/AdminHeaderBottom.vue';
import AdminHeaderTop from '@/views/adminLayout/AdminHeaderTop.vue';
import AdminMenuDrawer from '@/views/adminLayout/AdminMenuDrawer.vue';
import AdminSideMenu from '@/views/adminLayout/AdminSideMenu.vue';

export default defineComponent({
  name: 'AdminLayout',
  components: {
    AdminHeaderTop,
    AdminHeaderBottom,
    AdminSideMenu,
    AdminMenuDrawer,
  },
  setup() {
    const store = useStore();
    const isDrawerOpen: ComputedRef<boolean> = computed(() => store.getters['admin/isDrawerOpen']);
    const closeDrawer = () => store.commit('admin/closeDrawer');

    return { isDrawerOpen, closeDrawer, AdminLayout };
  },
});
</script>

<style lang="scss" scoped>
.admin-main-container {
  height: calc(100vh - 61px);
}
.admin-container {
  height: calc(100vh - 121px);
  width: 100%;
}
.el-main {
  height: inherit;
}
</style>
