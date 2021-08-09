<template>
  <div class="admin-header-bottom">
    <h4>{{ pageTitle }}</h4>
    <!-- <el-page-header @back="goBack" title="" :content="pageTitle" /> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const pageTitle = computed(() => store.getters['admin/pageTitle']);
    const goBack = () => {
      router.go(-1);
    }
    return { pageTitle, goBack };
  },
});
</script>

<style lang="scss" scoped>
$header-bottom-height: 20px;
$header-bottom-background-color: whitesmoke;
$header-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);

.admin-header-bottom {
  height: $header-bottom-height;
  box-shadow: $header-shadow;
  background-color: $header-bottom-background-color;
  display: flex;
  align-items: center;
  padding: 20px 10px;
}

h4 {
  font-weight: normal;
  font-size: 18px;
}
</style>
