<template>
  <el-card style="width: 450px; margin: 10px; height: 170px" class="doctor-card" @click="dialogOpen = true">
    <div class="flex-column">
      <div class="flex-row">
        <div class="doctor-img-container">
          <img @error="errorImg" v-if="doctor.fileInfo.fileSystemPath" :src="doctor.fileInfo.getImageUrl()" alt="alt" />
          <img v-else src="@//assets/img/310x310.png" />
        </div>
        <div class="flex-column">
          <span class="doctor-name">
            <b>{{ doctor.human.getFullName() }}</b>
          </span>
          <br />
          <span>Врач {{ doctor.position }}</span>
        </div>
      </div>
    </div>
  </el-card>

  <el-dialog v-model="dialogOpen" width="40%">
    <div style="text-align: center">
      <div class="doctor-img-container">
        <img @error="errorImg" v-if="doctor.fileInfo.fileSystemPath" :src="doctor.fileInfo.getImageUrl()" alt="alt" />
        <img v-else src="@/assets/img/310x310.png" />
      </div>
      <h2 class="doctor-name">
        <b>{{ doctor.human.getFullName() }}</b>
      </h2>
      <h3>Врач {{ doctor.position }}</h3>
    </div>
    <div>{{ doctor.tags }}</div>
    <p><b>Прием:</b> {{ division.address }}</p>
    <p><b>График работы:</b> {{ doctor.schedule }}</p>
    <p><b>Отделение:</b> {{ division.name }}</p>
    <p><b>Образование:</b> {{ doctor.education }}</p>
  </el-dialog>
</template>

<script lang="ts">
import IDivision from '@/interfaces/buildings/IDivision';
import IDoctor from '@/interfaces/doctors/IDoctor';
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'DoctorInfoCard',
  props: {
    doctor: { type: Object as PropType<IDoctor>, required: true },
    division: { type: Object as PropType<IDivision>, required: true },
  },
  setup() {
    let dialogOpen = ref(false);
    return { dialogOpen };
  },
});
</script>

<style lang="scss" scoped>
.doctor-card {
  border-radius: 15px;
  width: 100%;
  color: #4a4a4a;
  font-size: 14px;

  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  .doctor-img-container {
    margin: 0 10px 10px 0;
    img {
      width: 120px;
    }
  }
  .doctor-name {
    font-size: 16px;
    font-weight: 600;
  }
  .flex-row {
    display: flex;
  }
  .flex-column {
    display: flex;
    flex-direction: column;
  }
}
</style>
