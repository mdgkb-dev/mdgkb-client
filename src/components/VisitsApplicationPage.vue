<template>
  <div class="form-container">
    <h2>Заявка на оформление пропуска</h2>
    <div class="card-item">
      <el-form ref="form" :model="visitsApplication" label-position="top" :rules="rules">
        <UserForm
          :validate-email="false"
          :form="visitsApplication.formValue"
          :active-fields="UserFormFields.CreateWithAllChildFields({ userPhone: true })"
        />
        <el-form-item label="Выберите отделение" prop="division">
          <el-select v-model="visitsApplication.division" value-key="id" placeholder="Выберите отделение">
            <el-option v-for="item in divisions" :key="item.id" :label="item.name" :value="item"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <template #label>
            <div @click.prevent>
              <span>Даты и время, назначенные для плановой госпитализации (осмотра)</span>
              <el-button style="margin-left: 10px" size="mini" type="success" @click="visitsApplication.addVisit()">Добавить</el-button>
            </div>
          </template>
          <div v-for="(item, i) in visitsApplication.visits" :key="i" style="margin-bottom: 10px">
            <el-date-picker v-model="item.date" type="datetime" :default-value="new Date()" />
            <el-button
              v-if="visitsApplication.visits.length > 1"
              style="margin-left: 10px"
              size="mini"
              icon="el-icon-close"
              type="danger"
              @click="visitsApplication.removeVisit(i)"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <template #label>
            <div @click.prevent>
              <span>Для оформления пропуска на въезд</span>
              <el-button
                v-if="!visitsApplication.withCar"
                style="margin-left: 10px"
                size="mini"
                type="success"
                @click="visitsApplication.changeWithCar(true)"
              >
                Добавить данные об автомобиле
              </el-button>
              <el-button v-else style="margin-left: 10px" size="mini" type="danger" @click="visitsApplication.changeWithCar(false)">
                Убрать данные об автомобиле
              </el-button>
            </div>
          </template>
          <!-- <div style="margin: 5px">Для оформления пропуска на въезд:</div> -->
          <div v-if="visitsApplication.withCar">
            <el-form-item label="Номер автомобиля" :rules="rules.userCarNumber" prop="formValue.user.human.carNumber">
              <el-input v-model="visitsApplication.formValue.user.human.carNumber" placeholder="Номер автомобиля"></el-input>
            </el-form-item>
            <el-form-item label="Марка автомобиля" :rules="rules.userCarModel" prop="formValue.user.human.carModel">
              <el-input v-model="visitsApplication.formValue.user.human.carModel" placeholder="Марка автомобиля"></el-input>
            </el-form-item>
          </div>
        </el-form-item>
        <FieldValuesForm :form="visitsApplication.formValue" />
        <PersonalDataAgreement :form-value="visitsApplication.formValue" :form-pattern="gate.formPattern" />
        <div class="footer">
          <el-button round type="success" @click.prevent="submit()">Отправить форму</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Division from '@/classes/Division';
import Gate from '@/classes/Gate';
import User from '@/classes/User';
import UserFormFields from '@/classes/UserFormFields';
import VisitsApplication from '@/classes/VisitsApplication';
import Hooks from '@/services/Hooks/Hooks';
import ISearchObject from '@/services/interfaces/ISearchObject';
import Provider from '@/services/Provider/Provider';
import validate from '@/services/validate';

const visitsApplication: VisitsApplication = VisitsApplicationsStore.Item();
const gate: Gate = GatesStore.Item();
const divisions: Division[] = DivisionsStore.Items();
const division: Division = DivisionsStore.Item();
const isAuth: ComputedRef<boolean> = computed(() => Provider.store.getters['auth/isAuth']);
const user: ComputedRef<User> = computed(() => Provider.store.getters['auth/user']);
const form = ref();
const rules = ref({
  division: [{ required: true, message: 'Необходимо выбрать отделение', trigger: 'change' }],
  userCarNumber: [{ required: true, message: 'Пожалуйста, укажите номер автомобиля', trigger: 'blur' }],
  userCarModel: [{ required: true, message: 'Пожалуйста, укажите марку автомобиля', trigger: 'blur' }],
});

watch(isAuth, async () => {
  VisitsApplicationsStore.SetUser(user.value);
});

const submit = async () => {
  visitsApplication.formValue.validate();
  if (!validate(form, true) || !visitsApplication.formValue.validated) {
    return;
  }
  visitsApplication.formValue.clearIds();
  await VisitsApplicationsStore.Create();
  PHelp.Notification.Success('Форма успешно отправлена');
  Router.Back();
};

const load = async () => {
  DivisionsStore.FTSP({ ftsp: new FTSP() });
  await GatesStore.Get(Router.GetStringParam('gateId'));
  VisitsApplicationsStore.ResetItem();
  VisitsApplicationsStore.SetFormValue(gate.formPattern);
  visitsApplication.formValue.initFieldsValues();
  VisitsApplicationsStore.SetGate(gate);
  VisitsApplicationsStore.SetUser(user.value);
  VisitsApplicationsStore.SetInitVisit();
};

Hooks.onBeforeMount(load);

const selectDivision = async (event: ISearchObject) => {
  visitsApplication.divisionId = event.id;
  DivisionsStore.Get(event.id);
  visitsApplication.division = new Division(division);
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.form-container {
  margin: 0 10px;

  h2 {
    text-align: center;
  }

  .footer {
    text-align: right;
    margin-top: 20px;
  }
}
</style>
