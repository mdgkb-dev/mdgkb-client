<template>
  <div class="buttons-container">
    <div class="button-container">
      <button class="blue-button" @click="$router.push('/appointments/oms')">
        <el-icon><calendar /></el-icon>
        Запись на прием
      </button>
    </div>
    <div class="button-container">
      <a href="https://morozdgkb.onlinedoctor.ru/doctors/" class="tele-link">
        <button class="green-button">
          <el-icon><cellphone /></el-icon>
          Телемедицина
        </button>
      </a>
    </div>
    <div class="button-container">
      <button class="orange-button" @click="isCallBackModalOpen = true">
        <el-icon><phone-filled /></el-icon>
        Обратный звонок
      </button>
      <CallBack v-if="isCallBackModalOpen" @close="isCallBackModalOpen = false" />
    </div>
    <div class="button-container">
      <!-- TODO: переписать с ID (вход для пациентов) -->
      <button class="blue-button" @click="$router.push('/visits-application/8ccf8e9b-b487-493e-b451-60b193181f07')">
        <el-icon><calendar /></el-icon>
        Заявка на посещение
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Calendar, Cellphone, PhoneFilled } from '@element-plus/icons-vue';
import { defineComponent, Ref, ref } from 'vue';

import CallBack from '@/components/Main/CallBack/CallBack.vue';

export default defineComponent({
  name: 'MainHeaderButtons',
  components: {
    Calendar,
    Cellphone,
    PhoneFilled,
    CallBack,
  },
  emits: ['close'],
  setup() {
    const isCallBackModalOpen: Ref<boolean> = ref(false);
    return {
      isCallBackModalOpen,
    };
  },
});
</script>

<style lang="scss" scoped>
.tele-link {
  text-decoration: none;
}
.buttons-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 115px;
  background-color: #d8e8ff;
}
button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: none;
  width: 230px;
  height: 60px;
  padding: 0 25px;
  font-size: 14px;
  color: white;
  font-weight: bold;
  margin: 0 20px;
  cursor: pointer;
}
.el-icon {
  margin-right: 20px;
  font-size: 22px;
}
.blue-button {
  background-color: #2754ec;
  &:hover {
    background-color: darken(#2754ec, 10%);
  }
}
.green-button {
  background-color: #31af5e;
  &:hover {
    background-color: darken(#31af5e, 10%);
  }
}
.orange-button {
  background-color: #f3911c;
  &:hover {
    background-color: darken(#f3911c, 10%);
  }
}

@media screen and (max-width: 1100px) {
  .buttons-container {
    justify-content: center;
    padding: 10px;
    height: auto;
    flex-wrap: wrap;
  }
  button {
    margin: 10px;
  }
}
</style>
