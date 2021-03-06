<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="medicalProfile" :model="medicalProfile">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="19">
          <el-container direction="vertical">
            <el-card>
              <template #header>Название</template>
              <el-form-item prop="title">
                <el-input v-model="medicalProfile.name" placeholder="Заголовок"></el-input>
              </el-form-item>
            </el-card>
            <el-card class="content-card">
              <template #header>Описание</template>
              <el-form-item prop="content">
                <WysiwygEditor v-model:content="medicalProfile.description" />
              </el-form-item>
            </el-card>
          </el-container>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <ImageCropper />
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import ImageCropper from '@/components/admin/ImageCropper.vue';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import IMedicalProfile from '@/interfaces/IMedicalProfile';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminPagesPage',
  components: { WysiwygEditor, ImageCropper },
  setup() {
    const editorOption = {
      modules: {
        toolbar: [
          ['полужирный', 'курсив', 'подчеркивание', 'зачеркивание'], // полужирный, курсив, подчеркивание, зачеркивание
          ['blockquote', 'code-block'], // цитата, кодовый блок
          [{ header: 1 }, { header: 2 }], // Заголовок в виде пар ключ-значение; 1, 2 означает размер шрифта
          [{ script: 'sub' }, { script: 'super' }], // нижний индекс и нижний индекс
          [{ indent: '- 1' }, { indent: '+ 1' }], // отступ
          [{ direction: 'rtl' }], // направление текста
          [{ size: ['small', false, 'large', 'huge'] }], // размер шрифта
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // Несколько уровней заголовка
          [{ color: [] }, { background: [] }], // цвет шрифта, цвет фона шрифта
          [{ font: [] }], // шрифт
          [{ align: [] }], // Выравнивание
          ['clean'], // Очистить стиль шрифта
          ['image', 'video'], // Загрузить изображения, загрузить видео
        ],
      },
    };
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    let mounted = ref(false);
    const form = ref();

    const medicalProfile: Ref<IMedicalProfile> = computed(() => store.getters['medicalProfiles/item']);

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await loadItem();
      store.commit('admin/closeLoading');
    });

    const loadItem = async () => {
      if (route.params['id']) {
        await store.dispatch('medicalProfiles/get', route.params['id']);
        store.commit('admin/setHeaderParams', { title: medicalProfile.value.name, showBackButton: true, buttons: [{ action: submit }] });
      } else {
        store.commit('medicalProfiles/resetState');
        store.commit('admin/setHeaderParams', {
          title: 'Добавить медицинский профиль',
          showBackButton: true,
          buttons: [{ action: submit }],
        });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(medicalProfile, formUpdated, { deep: true });
      store.commit('admin/closeLoading');
    };

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      if (!route.params['id']) {
        await store.dispatch('medicalProfiles/create', medicalProfile.value);
        await router.push('/admin/pages');
        return;
      }
      await store.dispatch('medicalProfiles/update', medicalProfile.value);
      next ? next() : await router.push('/admin/medical-profiles');
    };

    return {
      editorOption,
      mounted,
      submit,
      medicalProfile,
      form,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

.content-card {
  min-height: 450px;
  max-height: 900px;
}

:deep(.el-dialog) {
  overflow: hidden;
}
</style>
