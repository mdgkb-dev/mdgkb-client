<template>
  <table class="table-list">
    <colgroup>
      <col width="40%" />
      <col width="20%" />
      <col width="5%" />
      <col width="10%" />
      <col width="5%" />
    </colgroup>
    <thead>
      <th><h4>ТИП</h4></th>
      <th><h4>НАЗВАНИЕ</h4></th>
      <th><h4>ДАТА&nbsp;ПОДАЧИ</h4></th>
      <th><h4>СТАТУС</h4></th>
      <th><h4>ДОСТУПНЫЕ ДЕЙСТВИЯ</h4></th>
    </thead>
    <tbody>
      <tr v-for="formValue in user.formValues" :key="formValue.id">
        <td>
          <router-link :to="formValue.getApplicationTypeLink()">
            {{ formValue.getApplicationType() }}
          </router-link>
        </td>

        <td>
          <div :to="formValue.getApplicationNameLink()">
            {{ formValue.getApplicationName() }}
          </div>
        </td>

        <td>{{ $dateTimeFormatter.format(formValue.createdAt) }}</td>

        <td>
          <div class="box">
            <el-tag
              v-if="formValue.formStatus.label"
              size="small"
              :style="`background-color: inherit; color: ${formValue.formStatus.color}; border-color: ${formValue.formStatus.color}`"
              >{{ formValue.formStatus.label }}</el-tag
            >
          </div>
        </td>

        <td>
          <div v-for="item in formValue.formStatus.formStatusToFormStatuses" :key="item.id">
            <div v-if="item.childFormStatus.userActionName">
              <el-popover
                v-if="item.childFormStatus.icon.fileSystemPath"
                placement="top-start"
                width="auto"
                trigger="hover"
                :content="item.childFormStatus.userActionName"
              >
                <template #reference>
                  <button>
                    <img
                      :src="item.childFormStatus.icon.getImageUrl()"
                      alt="alt"
                      @click="updateFormStatus(formValue, item.childFormStatus)"
                    />
                  </button>
                </template>
              </el-popover>
              <button
                v-else
                :style="`background-color: ${item.childFormStatus.color}; color: white; border: 1px solid ${item.childFormStatus.color}`"
                @click="updateFormStatus(formValue, item.childFormStatus)"
              >
                {{ item.childFormStatus.userActionName }}
              </button>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <el-dialog v-model="cancelDialogVisible" title="Для отмены заявки загрузите заявление об отзыве документов" width="40%">
    <CancelDialogForm
      :form-value="selectedFormValue"
      @close-dialog="cancelDialogVisibleOff"
      @cancel-application="updateApplication"
    ></CancelDialogForm>
    <span class="dialog-footer"> </span>
  </el-dialog>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import CancelDialogForm from '@/components/Profile/Education/CancelDialogForm.vue';
import IForm from '@/interfaces/IForm';
import IFormStatus from '@/interfaces/IFormStatus';
import IUser from '@/interfaces/IUser';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'ApplicationTable',
  components: { CancelDialogForm },
  props: {
    user: {
      type: Object as PropType<IUser>,
      required: true,
    },
  },
  setup() {
    const formStatuses: ComputedRef<IFormStatus[]> = computed<IFormStatus[]>(() => Provider.store.getters['formStatuses/items']);
    const cancelDialogVisible: Ref<boolean> = ref(false);
    const selectedFormValue: Ref<IForm | undefined> = ref(undefined);
    const selectedStatus: Ref<IFormStatus | undefined> = ref(undefined);

    const cancelApplication = async (formValue: IForm, status: IFormStatus) => {
      ElMessageBox.confirm('Вы уверены, что хотите отозвать заявку?', {
        confirmButtonText: 'Да',
        cancelButtonText: 'Отмена',
        type: 'warning',
      }).then(() => {
        selectedFormValue.value = formValue;
        selectedStatus.value = status;
        cancelDialogVisible.value = !cancelDialogVisible.value;
      });
    };

    const updateFormStatus = async (formValue: IForm, status: IFormStatus) => {
      if (status.isCancelled()) {
        await cancelApplication(formValue, status);
        return;
      }
      if (status.isClarified()) {
        await Provider.router.push(`/profile/education/applications/${formValue.id}`);
        return;
      }
      if (status.isEditable) {
        formValue.setStatus(status, formStatuses.value);
      }
      await Provider.store.dispatch('formValues/update', formValue);
    };

    const updateApplication = async () => {
      if (selectedFormValue.value && selectedStatus.value) {
        console.log(selectedFormValue.value);
        console.log(selectedStatus.value);
        selectedFormValue.value.setStatus(selectedStatus.value, formStatuses.value);
        selectedFormValue.value.clearAllFields();
        await Provider.store.dispatch('formValues/update', selectedFormValue.value);
      }
      cancelDialogVisible.value = false;
    };
    const cancelDialogVisibleOff = () => {
      cancelDialogVisible.value = false;
    };

    onBeforeMount(async () => {
      await Provider.store.dispatch('formStatuses/getAll');
    });

    return {
      cancelDialogVisible,
      updateApplication,
      selectedFormValue,
      cancelDialogVisibleOff,
      updateFormStatus,
    };
  },
});
</script>

<style lang="scss" scoped>
h4 {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.1ex;
  margin: 0px;
  font-size: 11px;
  font-weight: normal;
  color: #a3a5b9;
}

table {
  height: auto;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border-bottom: 1px solid #dcdfe6;
  padding: 9px 7px 9px 7px;
  height: auto;
}

td {
  button {
    img {
      height: 25px;
    }
    margin-bottom: 2px;
    padding: 3px 7px;
    border-radius: 5px;
    font-size: 12px;
    &:hover {
      cursor: pointer;
      filter: brightness(110%);
    }
  }
}

th {
  text-align: left;
  padding: 2px 0 0 3px;
  background-color: #eff2f6;
  height: 20px;
}

th:first-child {
  border-radius: 5px 0 0 0;
}

th:last-child {
  border-radius: 0 5px 0 0;
}

tr {
  &:hover {
    background-color: #ecf5ff;
  }
}

.box {
  position: relative;
  margin-right: 20px;
}

@media screen and (max-width: 980px) {
  .box {
    margin-right: 0px;
    background: #ffffff;
  }
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
