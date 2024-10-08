<template>
  asdfasdf
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="page" :rules="rules" :model="page" label-position="top">
      <el-container direction="vertical">
        <el-card>
          <template #header> Заголовок </template>
          <el-form-item prop="title" label="Заголовок">
            <el-input v-model="page.title" placeholder="Заголовок" />
          </el-form-item>
          <el-form-item prop="title" label="Группа страниц">
            <el-select v-model="page.pagesGroup" placeholder="Группа страниц">
              <el-option label="Без группы" value="Без группы" />
              <el-option label="Образование" value="Образование" />
              <el-option label="Сведения об организации" value="Сведения об организации" />
            </el-select>
          </el-form-item>
          <el-form-item label="Доступно для роли">
            <el-select v-model="page.role" value-key="id" label="Роль">
              <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item"> </el-option>
            </el-select>
          </el-form-item>
          <el-checkbox v-model="page.withComments"> Включить комментарии </el-checkbox>
          <el-checkbox v-model="page.showContacts"> Показать контакты </el-checkbox>
          <el-checkbox v-model="page.collaps"> Сделать разделы свернутыми </el-checkbox>
          <WysiwygEditor v-model="page.content" />
        </el-card>
      </el-container>
      <div v-if="page.showContacts" style="margin-bottom: 20px">
        <CollapseItem title="Контакты">
          <template #inside-content>
            <ContactsForm :contact="page.contactInfo" full />
          </template>
        </CollapseItem>
      </div>
      <el-button @click="() => openDialog()"> Добавить меню </el-button>
      <div v-if="page.pageSideMenus.length" class="card-item" style="margin-top: 10px">
        <draggable class="groups" :list="page.pageSideMenus" item-key="id" handle=".el-icon-s-grid" @end="sort(page.pageSideMenus)">
          <template #item="{ element, index }">
            <div class="side-menu-row">
              <i style="margin-right: 5px; cursor: pointer" class="el-icon-s-grid drug-icon" />
              <div style="width: 100%">
                <a @click="openDialog(index)"> {{ element.name }} </a>
              </div>
              <TableButtonGroup
                :show-remove-button="true"
                :show-edit-button="true"
                @remove="$classHelper.RemoveFromClassByIndex(index, page.pageSideMenus, page.pageSideMenusForDelete)"
                @edit="openDialog(index)"
              />
            </div>
          </template>
        </draggable>
      </div>
      <AdminPageSideMenuDialog />
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';
import draggable from 'vuedraggable';

import AdminPageSideMenuDialog from '@/components/admin/AdminPages/AdminPageSideMenuDialog.vue';
import ContactsForm from '@/components/admin/Contacts/ContactsForm.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import CollapseItem from '@/services/components/Collapse/CollapseItem.vue';
import Page from '@/services/classes/page/Page';
import Role from '@/services/classes/Role';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import sort from '@/services/sort';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminPagesPage',
  components: { CollapseItem, WysiwygEditor, TableButtonGroup, draggable, AdminPageSideMenuDialog, ContactsForm },
  setup() {
    const form = ref();
    const rules = {
      title: [{ required: true, message: 'Необходимо указать наименование страницы', trigger: 'blur' }],
    };
    const page: ComputedRef<Page> = computed(() => Provider.store.getters['pages/item']);
    const roles: ComputedRef<Role[]> = computed(() => Provider.store.getters['roles/items']);

    const openPage = () => {
      const route = Provider.router.resolve(page.value.getLink());
      window.open(route.href, '_blank');
    };

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    const loadNewsItem = async () => {
      const buttons = [
        { action: submit, text: 'Сохранить' },
        { action: submitAndExit, text: 'Сохранить и выйти' },
      ];
      if (Provider.route().params['slug']) {
        await Provider.store.dispatch('pages/getBySlug', Provider.route().params['slug']);
        Provider.store.commit('admin/setHeaderParams', {
          title: page.value.title,
          showBackButton: true,
          buttons: [...buttons, { action: openPage, text: 'Посмотреть страницу', type: 'warning' }],
        });
      } else {
        Provider.store.commit('pages/resetState');
        Provider.store.commit('admin/setHeaderParams', {
          title: 'Добавить страницу',
          showBackButton: true,
          buttons: buttons,
        });
      }
      await Provider.store.dispatch('roles/getAll');
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(page, formUpdated, { deep: true });
    };

    Hooks.onBeforeMount(loadNewsItem);

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    const submit = async () => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      if (!Provider.route().params['slug']) {
        await PagesStore.Create(page.value);
        await Router.To('/admin/pages');
        return;
      }
      await PagesStore.UpdateAndSet(page.value);
      ElMessage({ message: 'Успешно сохранено', type: 'success' });
    };

    const submitAndExit = async (next?: NavigationGuardNext) => {
      await submit();
      next ? next() : await Router.To('/admin/pages');
    };

    const openDialog = async (index?: number) => {
      if (index === undefined) {
        await page.value.addSideMenu();
        PagesStore.SetIndex(page.value.pageSideMenus.length - 1);
      } else {
        PagesStore.SetIndex(index);
      }
      PagesStore.SetSideMenuDialogActive(true);
    };

    return {
      sort,
      mounted: Provider.mounted,
      submit,
      page,
      form,
      openDialog,
      roles,
      rules,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
@import '@/assets/styles/elements/collapse.scss';

.wrapper {
  height: 90vh;
  overflow: hidden;
  overflow-y: scroll;
}

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

.side-menu-row {
  padding: 5px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: lightblue;
  }
}
</style>
