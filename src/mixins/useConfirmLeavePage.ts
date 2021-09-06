import { ElMessage, ElMessageBox } from 'element-plus';
import { Ref, ref } from 'vue';
import { NavigationGuardNext } from 'vue-router';

declare type SubmitCallback = (next: NavigationGuardNext) => void;
interface IReturn {
  saveButtonClick: Ref<boolean>;
  formUpdated: () => void;
  beforeWindowUnload: (e: Event) => void;
  showConfirmModal: (submit: SubmitCallback, next: NavigationGuardNext) => void;
}

export default function (): IReturn {
  const confirmLeave: Ref<boolean> = ref(false);
  const saveButtonClick: Ref<boolean> = ref(false);

  const formUpdated = (): void => {
    confirmLeave.value = true;
  };

  const beforeWindowUnload = (e: Event): void => {
    if (confirmLeave.value) {
      e.preventDefault();
    }
  };

  const showConfirmModal = (submit: SubmitCallback, next: NavigationGuardNext): void => {
    if (confirmLeave.value && !saveButtonClick.value) {
      ElMessageBox.confirm('У вас есть несохранённые изменения', 'Вы уверены, что хотите покинуть страницу?', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Сохранить',
        cancelButtonText: 'Не сохранять',
      })
        .then(() => {
          // Вызывается при сохранении
          submit(next);
        })
        .catch((action: string) => {
          if (action === 'cancel') {
            ElMessage({
              type: 'warning',
              message: 'Изменения не были сохранены',
            });
            next();
          }
        });
    } else {
      next();
    }
  };

  return {
    saveButtonClick,
    beforeWindowUnload,
    formUpdated,
    showConfirmModal,
  };
}
