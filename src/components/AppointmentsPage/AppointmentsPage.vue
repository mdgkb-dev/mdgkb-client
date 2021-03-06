<template>
  <div v-if="mount">
    <el-row :gutter="40">
      <el-col :xl="6" :lg="6" :md="24" class="calendar">
        <ModeButtons :second-mode-active="omsMode" :store-mode="false" first-mode="ОМС" second-mode="ДМС" @changeMode="changeMode" />
      </el-col>
      <el-col :xl="18" :lg="18" :md="24">
        <div v-if="createChildMode" class="card-item">
          <ChildForm @createChild="createChild" />
        </div>
        <div v-else class="card-item">
          <div class="flex-row">
            <div class="form">
              <AppointmentForm @createChildMode="changeCreateChildMode" />
            </div>
            <hr class="gray-border" />
            <div class="calendar-zone">
              <AppointmentsCalendar @chooseDay="chooseDay" />
              <hr class="gray-border" />
              <div v-if="chosenDay">
                <div class="middle-header">Время записи</div>
                <AppointmentsSlots @chooseSlot="chooseSlot" />
              </div>
            </div>
          </div>
          <div class="center-button">
            <button class="green-button" @click.prevent="submit">Записаться</button>
            <AppointmentModal v-if="isAppointmentModalOpen" @close="isAppointmentModalOpen = false" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { ElNotification } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import AppointmentForm from '@/components/AppointmentsPage/AppointmentForm.vue';
import AppointmentsCalendar from '@/components/AppointmentsPage/AppointmentsCalendar.vue';
import AppointmentsSlots from '@/components/AppointmentsPage/AppointmentsSlots.vue';
import ChildForm from '@/components/AppointmentsPage/ChildForm.vue';
import ModeButtons from '@/components/ModeButtons.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';
import IAppointment from '@/interfaces/IAppointment';
import IChild from '@/interfaces/IChild';

export default defineComponent({
  name: 'AppointmentsPage',
  components: {
    ChildForm,
    AppointmentForm,
    AppointmentsSlots,
    AppointmentsCalendar,
    ModeButtons,
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const chosenDay: Ref<string | undefined> = ref();
    const mount = ref(false);
    const omsMode: Ref<boolean> = ref(route.path === '/appointments/oms');
    const appointment: ComputedRef<IAppointment> = computed(() => store.getters['appointments/item']);
    const createChildMode: Ref<boolean> = ref(false);

    onBeforeMount(async () => {
      appointment.value.oms = omsMode.value;
      await store.dispatch('meta/getSchema');
      mount.value = true;
    });

    const changeMode = async (omsModeActive: boolean) => {
      omsMode.value = omsModeActive;
      appointment.value.oms = omsMode.value;
      if (omsModeActive) {
        await router.replace('/appointments/oms');
      } else {
        await router.replace('/appointments/dms');
      }
    };

    const sendApplication = async () => {
      await store.dispatch('appointments/create', appointment.value);
    };

    const chooseDay = (day: Date) => {
      appointment.value.date = day;
      chosenDay.value = day.toString();
    };

    const chooseSlot = (slot: string) => {
      appointment.value.time = slot;
    };

    const changeCreateChildMode = () => {
      createChildMode.value = true;
    };

    const createChild = async (child: IChild) => {
      store.commit('auth/addChild', child);
      await store.dispatch('children/create', child);
      if (appointment.value.user) {
        appointment.value.user.children.push(child);
      }
      createChildMode.value = false;
    };

    const submit = async () => {
      await store.dispatch('appointments/create', appointment.value);
      store.commit('appointments/resetItem');
      ElNotification({
        title: 'Запись к врачу',
        message: 'Запись успешно создана!',
        type: 'success',
        duration: 2000,
      });
    };

    return {
      createChild,
      createChildMode,
      changeCreateChildMode,
      chooseSlot,
      chooseDay,
      chosenDay,
      appointment,
      sendApplication,
      omsMode,
      changeMode,
      Operators,
      DataTypes,
      mount,
      submit,
    };
  },
});
</script>

<style scoped lang="scss">
.middle-header {
  font-weight: 400;
  font-size: 18px;
  text-align: center;
}

.center-button {
  margin-top: 10px;
  text-align: center;
}
// .green-button {
//   background: #31af5e;
//   color: white;
//   &:hover {
//     background: darken(#31af5e, 5%);
//     color: white;
//   }
// }

.green-button {
  background: #0bae57;
  border-radius: 40px;
  border: none;
  font-family: roboto;
  font-size: 1rem;
  color: #ffffff;
  margin-left: 5px;
  margin-top: 30px;
  padding: 10px 25px;
  text-align: center;
  &:hover {
    cursor: pointer;
    background-color: #2b9b53;
  }
}

.card-item {
  margin-top: 10px;
}
.flex-row {
  justify-content: space-between;
}
.calendar-zone {
  width: 450px;
}

.form {
  width: 400px;
  height: 100%;
  margin-right: 20px;
}

.gray-border {
  border: 1px solid #f0f2f7;
}
.appointment-container {
  display: flex;
  justify-content: space-between;
}
</style>
