<template>
  <div v-if="mounted" class="flex-column">
    <el-form label-position="top">
      <el-card>
        <el-form-item label="Название">
          <el-input v-model="formPattern.title" placeholder="Название"></el-input>
        </el-form-item>
        <el-form-item prop="description">
          <WysiwygEditor v-model="formPattern.description" />
        </el-form-item>
        <el-form-item label="Группа статусов">
          <el-select v-model="formPattern.formStatusGroup" value-key="id" placeholder="Группа статусов" @change="changeStatusGroup">
            <el-option v-for="item in formStatusGroups" :key="item.id" :label="item.name" :value="item"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Статус, назначаемый при создании формы">
          <el-select
            v-model="formPattern.defaultFormStatus"
            value-key="id"
            placeholder="Группа статусов"
            :disabled="!formPattern.formStatusGroup"
          >
            <el-option v-for="item in formPattern.formStatusGroup?.formStatuses" :key="item.id" :label="item.label" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Запрашивать согласие на обработку персональных данных">
          <el-switch v-model="formPattern.withPersonalDataAgreement"></el-switch>
        </el-form-item>
        <el-form-item v-if="formPattern.withPersonalDataAgreement" label="Cогласие на обработку персональных данных">
          <FileUploader v-if="formPattern.personalDataAgreement" :file-info="formPattern.personalDataAgreement" />
        </el-form-item>
      </el-card>
      <FormConstructor :form="formPattern" />
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeUnmount, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import FileUploader from '@/components/FileUploader.vue';
import FormConstructor from '@/components/FormConstructor/FormConstructor.vue';
import IForm from '@/interfaces/IForm';
import IFormStatusGroup from '@/interfaces/IFormStatusGroup';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'AdminFormPatternPage',
  components: { FormConstructor, FileUploader, WysiwygEditor },

  setup() {
    const formPattern: ComputedRef<IForm> = computed<IForm>(() => Provider.store.getters['formPatterns/item']);
    const formStatusGroups: ComputedRef<IFormStatusGroup[]> = computed(() => Provider.store.getters['formStatusGroups/items']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      try {
        if (Provider.route().params['id']) {
          await Provider.store.dispatch('formPatterns/update', formPattern.value);
        } else {
          await Provider.store.dispatch('formPatterns/create', formPattern.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : Provider.router.push('/admin/form-patterns');
    };

    const changeStatusGroup = () => {
      Provider.store.commit('formPatterns/resetDefaultFormStatus');
    };

    const load = async () => {
      if (Provider.route().params['id']) {
        await Provider.store.dispatch('formPatterns/get', Provider.route().params['id']);
        Provider.store.commit('admin/setHeaderParams', { title: 'Обновить шаблон', showBackButton: true, buttons: [{ action: submit }] });
      } else {
        Provider.store.commit('admin/setHeaderParams', { title: 'Добавить шаблон', showBackButton: true, buttons: [{ action: submit }] });
      }
      await Provider.getAll('formStatusGroups');
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(formPattern, formUpdated, { deep: true });
    };

    Hooks.onBeforeMount(load);

    onBeforeUnmount(() => {
      Provider.store.commit('formPatterns/resetItem');
    });
    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      formPattern,
      formStatusGroups,
      changeStatusGroup,
      mounted: Provider.mounted,
    };
  },
});
</script>

<style lang="scss" scoped>
.flex-column {
  display: flex;
  flex-direction: column;
}
.el-card {
  margin-bottom: 20px;
}
:deep(.upload-container) {
  display: flex;
}
</style>
