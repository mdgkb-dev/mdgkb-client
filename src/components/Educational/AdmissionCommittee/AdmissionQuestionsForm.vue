<template>
  <el-form-item label="Вы подаёте заявление на платное обучение?" prop="paid" :rules="rules.paid">
    <el-radio-group :model-value="residencyApplicationValue.paid" @change="selectPaid">
      <el-radio :label="true" size="large">Да</el-radio>
      <el-radio :label="false" size="large">Нет</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="Вы подаёте заявление на приоритетную или дополнительную специальность?" prop="main" :rules="rules.main">
    <el-radio-group v-model="residencyApplicationValue.main">
      <el-radio :label="true" size="large">Приоритетную</el-radio>
      <el-radio :label="false" size="large">Дополнительную</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="Вы проходили первичную аккредитацию?" prop="primaryAccreditation" :rules="rules.primaryAccreditation">
    <el-radio-group v-model="residencyApplicationValue.primaryAccreditation">
      <el-radio :label="true" size="large">Да</el-radio>
      <el-radio :label="false" size="large">Нет</el-radio>
    </el-radio-group>
  </el-form-item>
  <template v-if="residencyApplicationValue.primaryAccreditation === undefined"></template>
  <template v-else-if="residencyApplicationValue.primaryAccreditation">
    <el-form-item label="Первичная аккредитация пройдена в: " prop="primaryAccreditationPlace" :rules="rules.primaryAccreditationPlace">
      <el-input v-model="residencyApplicationValue.primaryAccreditationPlace">Первичная аккредитация пройдена в: </el-input>
    </el-form-item>
    <el-form-item label="Баллы первичной аккредитации" prop="primaryAccreditationPoints" :rules="rules.primaryAccreditationPoints">
      <el-input-number v-model="residencyApplicationValue.primaryAccreditationPoints" min="0">Баллы первичной аккредитации</el-input-number>
    </el-form-item>
  </template>
  <template v-else>
    <el-form-item label="Вступительные испытания прохожу в:" prop="primaryAccreditation" :rules="rules.primaryAccreditation">
      <el-radio-group v-model="residencyApplicationValue.mdgkbExam">
        <el-radio :label="true" size="large">Морозовской больнице</el-radio>
        <el-radio :label="false" size="large">В другом месте (указать)</el-radio>
      </el-radio-group>
    </el-form-item>
    <template v-if="residencyApplicationValue.mdgkbExam">
      <el-form-item
        label="Указать программу специалитета, по которой сдаются вступительные экзамены: "
        prop="entranceExamSpecialisation"
        :rules="rules.entranceExamSpecialisation"
      >
        <el-input v-model="residencyApplicationValue.entranceExamSpecialisation" />
      </el-form-item>
    </template>
    <template v-if="!residencyApplicationValue.mdgkbExam && residencyApplicationValue.mdgkbExam !== undefined">
      <el-form-item label="Вступительные испытания прохожу в: " prop="primaryAccreditationPlace" :rules="rules.primaryAccreditationPlace">
        <el-input v-model="residencyApplicationValue.primaryAccreditationPlace">Вступительные экзамены прохожу в: </el-input>
      </el-form-item>
      <el-form-item
        label="Баллы вступительных испытаний (если пройдены)"
        prop="primaryAccreditationPoints"
        :rules="rules.primaryAccreditationPoints"
      >
        <el-input-number v-model="residencyApplicationValue.primaryAccreditationPoints" min="0" />
      </el-form-item>
    </template>
  </template>
  <el-dialog
    v-model="showFreeDialog"
    title="Для выбора бесплатного обучения нужно загрузить Договор с Департаментом здравоохранения города Москвы"
    width="40%"
  >
    <div v-for="field in residencyApplicationValue.formValue.getFieldsByCodes(['ContractDzm'])" :key="field.id">
      <div style="margin-top: 10px">
        <span><b> Загрузите договор: </b></span
        ><span
          ><FileUploader
            v-if="residencyApplicationValue.formValue.findFieldValue(field.id).file"
            :file-info="residencyApplicationValue.formValue.findFieldValue(field.id).file"
          />
        </span>
      </div>

      <div class="text-align-right margin-top-1">
        <el-button @click="showFreeDialog = false">Отмена</el-button>
        <el-button
          v-if="residencyApplicationValue.formValue.findFieldValue(field.id).file.fileSystemPath"
          type="primary"
          @click="submitFreeFile"
        >
          Подтвердить загрузку
        </el-button>
      </div>
    </div>

    <span class="dialog-footer"> </span>
  </el-dialog>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import ResidencyApplication from '@/classes/ResidencyApplication';
import FileUploader from '@/components/FileUploader.vue';
import IResidencyApplication from '@/interfaces/IResidencyApplication';

export default defineComponent({
  name: 'AdmissionQuestionsForm',
  components: { FileUploader },
  props: {
    residencyApplication: {
      type: Object as PropType<IResidencyApplication>,
      required: true,
    },
  },
  emits: ['allQuestionsAnswered'],
  setup(props, { emit }) {
    const residencyApplicationValue: Ref<IResidencyApplication> = ref(new ResidencyApplication());

    onBeforeMount(() => {
      residencyApplicationValue.value = props.residencyApplication;
    });
    const showFreeDialog: Ref<boolean> = ref(false);

    const rules = {
      primaryAccreditation: [{ required: true, message: 'Пожалуйста, выберите вариант', trigger: 'change' }],
      main: [{ required: true, message: 'Пожалуйста, выберите вариант', trigger: 'change' }],
      paid: [{ required: true, message: 'Пожалуйста, выберите вариант', trigger: 'change' }],
      primaryAccreditationPoints: [{ required: true, message: 'Пожалуйста, укажите баллы первичной аккредитации', trigger: 'blur' }],
      primaryAccreditationPlace: [{ required: true, message: 'Пожалуйста, укажите место первичной аккредитации', trigger: 'blur' }],
      entranceExamSpecialisation: [
        {
          required: true,
          message: 'Пожалуйста, укажите программу специалитета, по которой сдаются вступительные экзамены',
          trigger: 'blur',
        },
      ],
    };

    const setFreeApplication = async () => {
      ElMessageBox.confirm('Для выбора бесплатного обучения нужно загрузить Договор с Департаментом здравоохранения города Москвы', {
        confirmButtonText: 'Загрузить',
        cancelButtonText: 'Выбрать платное',
        type: 'warning',
      })
        .then(() => {
          showFreeDialog.value = true;
        })
        .catch(() => {
          residencyApplicationValue.value.paid = true;
        });
    };

    const selectPaid = async (paid: boolean) => {
      if (paid) {
        residencyApplicationValue.value.paid = true;
        return;
      }
      await setFreeApplication();
    };

    const submitFreeFile = () => {
      residencyApplicationValue.value.paid = false;
      showFreeDialog.value = false;
    };

    return {
      submitFreeFile,
      showFreeDialog,
      selectPaid,
      rules,
      residencyApplicationValue,
    };
  },
});
</script>

<style lang="scss" scoped>
.questions-container {
  text-align: center;
}

.hospitalization-table-wrapper {
  background: white;
}

.select {
  background: #2754eb;
  margin: 10px 0;
  font-weight: normal;
  font-size: 14px;
  border-radius: 40px;
  padding: 12px 23px;
  height: auto;
  letter-spacing: 2px;
  color: white;
  border: none;
  margin-right: 30px;
  &:hover {
    cursor: pointer;
  }
}

.select_dont {
  background: #f49524;
  margin: 10px 0;
  font-weight: normal;
  font-size: 14px;
  border-radius: 40px;
  padding: 12px 23px;
  height: auto;
  letter-spacing: 2px;
  color: white;
  border: none;
  &:hover {
    cursor: pointer;
  }
}

.select:hover {
  background: darken(#2754eb, 10%);
}

.select_dont:hover {
  background: darken(#f49524, 10%);
}

.select-block {
  margin-top: 22px;
}

.text-align-right {
  text-align: right;
}

.margin-top-1 {
  margin-top: 1rem;
}
</style>
