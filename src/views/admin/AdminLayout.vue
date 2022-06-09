<template>
  <div style="min-height: 100vh">
    <AdminHeaderTop />
    <div class="admin-main-container">
      <AdminSideMenu class="side-menu hidden-sm-and-down" />
      <div class="admin-container">
        <!-- <AdminHeaderBottom /> -->
        <slot />
        <!-- <template #fallback> -->
        <!-- <div>Loading...</div> -->
        <!-- </template> -->
      </div>
    </div>
    <!-- <AdminMenuDrawer /> -->
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import { AdminLayout } from '@/interfaces/admin/AdminLayout';
import AdminHeaderTop from '@/views/adminLayout/AdminHeaderTop.vue';
import AdminSideMenu from '@/views/adminLayout/AdminSideMenu.vue';

export default defineComponent({
  name: 'AdminLayout',
  components: {
    AdminHeaderTop,
    AdminSideMenu,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const isDrawerOpen: ComputedRef<boolean> = computed(() => store.getters['admin/isDrawerOpen']);
    const closeDrawer = () => store.commit('admin/closeDrawer');
    const adminLayoutTable: ComputedRef<boolean> = computed(() => {
      return route.meta.adminLayout === 'tableList';
    });

    return {
      isDrawerOpen,
      closeDrawer,
      AdminLayout,
      adminLayoutTable,
    };
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
