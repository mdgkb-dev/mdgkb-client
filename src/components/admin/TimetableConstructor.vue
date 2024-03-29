<template>
  <el-card>
    <template #header>
      <div class="flex-row-between">
        <div>
          <span> Расписание </span>
          <el-button
            v-if="timetable && timetable.timetableDays.length > 0"
            size="small"
            type="danger"
            icon="el-icon-minus"
            circle
            @click="removeTimetable"
          ></el-button>
          <el-button v-else size="small" type="success" icon="el-icon-plus" circle @click="addTimetable" />
        </div>

        <el-button s size="small" type="success" icon="el-icon-plus" @click="createCustomTimetableDay"
          >Создать элемент расписания</el-button
        >
      </div>
    </template>
    <div v-if="timetable && timetable.timetableDays.length > 0">
      <el-row v-for="(day, i) in timetable.timetableDays" :key="day">
        <el-col :span="5">
          <div>
            <el-input v-if="day.isCustom" v-model="day.customName" class="timetable-row" />
            <div v-else class="timetable-row" :class="{ weekend: day.weekday.isWeekend() || day.isWeekend }">{{ day.weekday.name }}</div>
            <div v-if="day.breaksExists && !day.isWeekend" class="timetable-row">Перерыв</div>
          </div>
        </el-col>
        <el-col :span="19">
          <div v-if="!day.isWeekend">
            {{ day.startTimeLimit }}
            <div class="timetable-row">
              <el-time-select
                :model-value="day.getTime(day.startTime)"
                class="time-select"
                step="00:15"
                :start="day.startTimeLimit"
                :end="day.endTimeLimit"
                @change="day.startTime = $event"
              />
              -
              <el-time-select
                :model-value="day.getTime(day.endTime)"
                class="time-select"
                :start="day.startTimeLimit"
                :end="day.endTimeLimit"
                step="00:15"
                @change="day.endTime = $event"
              />
              <el-checkbox v-model="day.breaksExists" class="add-break-checkbox">Перерыв</el-checkbox>
              <el-checkbox v-model="day.isWeekend" class="add-break-checkbox">Выходной</el-checkbox>
              <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="removeTimetableDay(i)" />
            </div>
            <div v-if="day.breaksExists">
              <el-time-select
                :model-value="day.getTime(day.breakStartTime)"
                class="time-select"
                :start="day.startTimeLimit"
                :end="day.endTimeLimit"
                step="00:15"
                @change="day.breakStartTime = $event"
              />
              -
              <el-time-select
                :model-value="day.getTime(day.breakEndTime)"
                class="time-select"
                :start="day.startTimeLimit"
                :end="day.endTimeLimit"
                step="00:15"
                @change="day.breakEndTime = $event"
              />
            </div>
          </div>
          <div v-else class="timetable-row">
            <div>
              <el-checkbox v-model="day.isWeekend" class="add-break-checkbox" label="Выходной" />
            </div>
          </div>
        </el-col>
        <el-divider v-if="i < timetable.timetableDays.length"></el-divider>
      </el-row>
    </div>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref } from 'vue';
import { useStore } from 'vuex';

import Timetable from '@/classes/Timetable';
export default defineComponent({
  name: 'TimetableConstructor',
  props: {
    storeModule: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const store = useStore();
    const weekdays = computed(() => store.getters['timetables/weekdays']);
    const timetable: Ref<Timetable> = computed<Timetable>(() => store.getters[`${props.storeModule}/timetable`]);

    onBeforeMount(async () => {
      await store.dispatch('timetables/getAllWeekdays');
    });

    const addTimetable = () => {
      store.commit(`${props.storeModule}/setTimetable`, Timetable.CreateStandartTimetable(weekdays.value));
    };

    const removeTimetable = () => {
      store.commit(`${props.storeModule}/removeTimetable`);
    };

    const removeTimetableDay = (i: number) => {
      store.commit(`${props.storeModule}/removeTimetableDay`, i);
    };

    // const createCustomTimetableDay = () => {
    //   store.commit(`${props.storeModule}/createCustomTimetableDay`, TimetableDay.CreateCustomTimetableDay());
    // };

    return {
      // createCustomTimetableDay,
      removeTimetableDay,
      removeTimetable,
      timetable,
      addTimetable,
      weekdays,
    };
  },
});
</script>

<style scoped>
.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.timetable-row {
  line-height: 40px;
  height: 40px;
  margin-bottom: 5px;
}
.weekend {
  color: red;
}
:deep(.el-button) {
  padding: 5px;
  margin: 0 !important;
  min-height: unset;
  border: none;
}
.time-select {
  width: 100px;
  margin: 0;
}

.add-break-checkbox {
  margin-left: 10px;
}
</style>
