<template>
  <AdminListWrapper v-if="mounted">
    <template #header>
      <!-- <CalendarComponent @select-day="selectDay" @back-to-today="fillCalendar" @move="fillCalendar" /> -->
    </template>
    <template #sort />
    <VerticalCollapseContainer v-if="selectedMenu" :tab-id="1" :collapsed="true">
      <template #main>
        <div v-if="!dailyMenus.length" class="menu-shadow">
          <el-button round type="primary" plain style="scale: 1.2" @click="createNewDailyMenus"> Создать меню </el-button>
          <el-button v-if="menusCopies.length" round type="warning" plain style="scale: 1.2" @click="paste">
            Вставить меню из буфера</el-button
          >
        </div>
      </template>
      <template #inside-title> Книга блюд </template>
      <template #inside-content-left>
        <DishBook v-if="!dishesConstructorVisible && mounted" :menu="selectedMenu" @edit-dish-sample="openDishesConstructor" />
      </template>
      <template #inside-content-right>
        <AdminDishesMenusTable />
      </template>
    </VerticalCollapseContainer>

    <el-dialog v-model="dishesConstructorVisible" :width="1280" :destroy-on-close="true" center>
      <DishesSamplesConstructor :selected-sample="selectedSample" />
    </el-dialog>
  </AdminListWrapper>
</template>

<script lang="ts" setup>
import CalendarEvent from '@/classes/CalendarEvent';
import DailyMenu from '@/classes/DailyMenu';
import DishesGroup from '@/classes/DishesGroup';
import DishSample from '@/classes/DishSample';
import Calendar from '@/services/classes/calendar/Calendar';
import Day from '@/services/classes/calendar/Day';
import FilterModel from '@/services/classes/filters/FilterModel';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import Hooks from '@/services/Hooks/Hooks';
import DailyMenusFiltersLib from '@/libs/filters/DailyMenusFiltersLib';
import DailyMenusSortsLib from '@/libs/sorts/DailyMenus';
import Provider from '@/services/Provider/Provider';

const dishesConstructorVisible: Ref<boolean> = ref(false);
const dailyMenus: Ref<DailyMenu[]> = computed(() => Provider.store.getters['dailyMenus/items']);
const menusCopies: Ref<DailyMenu[]> = computed(() => Provider.store.getters['dailyMenus/menusCopies']);
const periodMenus: Ref<DailyMenu[]> = computed(() => Provider.store.getters['dailyMenus/periodItems']);
const dishesGroups: Ref<DishesGroup[]> = computed(() => Provider.store.getters['dishesGroups/items']);
const calendar: Ref<Calendar> = computed(() => Provider.store.getters['calendar/calendar']);
const dayFilter: Ref<FilterModel> = ref(new FilterModel());
const selectedSample: Ref<DishSample | undefined> = ref(undefined);
const selectedMenu: Ref<DailyMenu> = computed(() => Provider.store.getters['dailyMenus/item']);
const mounted = ref(false);
const load = async () => {
  // await Provider.store.dispatch('search/searchGroups');
  await Provider.store.dispatch('dishesGroups/getAll');

  dayFilter.value = DailyMenusFiltersLib.byDate(new Date());
  // const ftsp = new FTSP()
  // ftsp.setF(dayFilter.value)
  // await Store.FTSP('dailyMenus', { ftsp: ftsp, withCache: true })
  PHelp.AdminUI.Head.Set('Меню буфета', [Button.Success('Создать блюда', openDishesConstructor)]);

  await selectDay(calendar.value.getToday());
  // await fillCalendar()
  mounted.value = true;
};

const paste = async () => {
  menusCopies.value.forEach((m: DailyMenu) => {
    m.initGroups();
    dailyMenus.value.push(m);
  });
  for (const menu of menusCopies.value) {
    await Provider.store.dispatch('dailyMenus/create', menu);
  }
};

const openDishesConstructor = (dishSample?: DishSample) => {
  selectedSample.value = dishSample;
  dishesConstructorVisible.value = true;
};

Hooks.onBeforeMount(load);

const getTodayMenus = async () => {
  const userTimezoneOffset = calendar.value.getSelectedDay().date.getTimezoneOffset() * 60000;
  dayFilter.value.date1 = new Date(calendar.value.getSelectedDay().date.getTime() - userTimezoneOffset);
  const ftsp = new FTSP();
  ftsp.setF(dayFilter.value);
  ftsp.setS(DailyMenusSortsLib.byOrder());
  await Store.FTSP('dailyMenus', { ftsp: ftsp });
  dailyMenus.value.forEach((d: DailyMenu) => d.dishesGroups.push(...dishesGroups.value));
};

const fillCalendar = async () => {
  const period = calendar.value.getActivePeriod();
  if (period.length === 0) {
    return;
  }
  const fq = new FilterQuery();
  fq.filterModels.push(DailyMenusFiltersLib.byPeriod(period[0].date, period[period.length - 1].date));
  await Provider.store.dispatch('dailyMenus/getPeriodItems', fq);
  period.forEach((day: Day) => {
    const menu = periodMenus.value.find((m: DailyMenu) => m.date.getDate() === day.date.getDate());
    if (!menu) {
      return;
    }
    day.events.push(new CalendarEvent());
  });
};

const findMenu = () => {
  if (dailyMenus.value.length < 1) {
    return;
  }
  Provider.store.commit('dailyMenus/set', dailyMenus.value[0]);
  selectedMenu.value.initGroups();
};

const selectDay = async (): Promise<void> => {
  await getTodayMenus();
  if (dailyMenus.value.length === 0) {
    return;
  }
  findMenu();
  await fillCalendar();
};

const createNewDailyMenus = async () => {
  const date = calendar.value.getDateWithOffset();
  const breakfast = DailyMenu.CreateBreakfast(calendar.value.getDateWithOffset());
  const lunch = DailyMenu.CreateDinner(date);
  await Provider.store.dispatch('dailyMenus/create', breakfast);
  await Provider.store.dispatch('dailyMenus/create', lunch);
  dailyMenus.value.push(breakfast, lunch);
  breakfast.dishesGroups = dishesGroups.value;
  lunch.dishesGroups = dishesGroups.value;
  Provider.store.commit('dailyMenus/set', dailyMenus.value[0]);
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
$margin: 20px 0;

.blue {
  display: flex;
  padding: 2px 3px;
  background: #c4e3ff;
  border: 2px solid #379fff;
  border-radius: 5px;
  transition: 0.5s;
}

.normal {
  display: flex;
  padding: 2px 3px;
  background: #ffffff;
  border: 2px solid #ffffff;
  transition: 0.3s;
}

.flex-column {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: $margin;
}

.flex-row-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: $margin;
}

.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

:deep(.el-dialog) {
  overflow: hidden;
  top: -50px;
}

:deep(.el-dialog__header) {
  padding: 0;
}

:deep(.el-dialog--center .el-dialog__body) {
  padding: 0;
}

:deep(.el-dialog__headerbtn) {
  top: 12px;
  right: 13px;
}

:deep(.el-dialog__headerbtn .el-dialog__close) {
  color: #ffffff;
  font-size: 18px;
}

:deep(.el-dialog__headerbtn .el-dialog__close:hover) {
  color: #343e5c;
}

.arrow-button {
  background: #ffffff;
  border-radius: none;
  border: none;
}

.tools-button {
  background: #ffffff;
  border-radius: none;
  border: none;
  height: 24px;
}

.icon-arrow-left {
  width: 24px;
  height: 24px;
  fill: #c4c4c4;
  cursor: pointer;
  transition: 0.3s;
}

.icon-arrow-left:hover {
  fill: #7c8295;
}

.icon-arrow-right {
  width: 24px;
  height: 24px;
  fill: #c4c4c4;
  cursor: pointer;
  transition: 0.3s;
}

.icon-arrow-right:hover {
  fill: #7c8295;
}

.icon-add {
  width: 22px;
  height: 22px;
  fill: #343e5c;
  cursor: pointer;
  transition: 0.3s;
}

.icon-add:hover {
  fill: #379fff;
}

.icon-delete {
  width: 20px;
  height: 20px;
  fill: #343e5c;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 1px;
}

.icon-delete:hover {
  fill: #379fff;
}

.icon-print {
  width: 24px;
  height: 24px;
  fill: #ffffff;
  stroke: #343e5c;
  cursor: pointer;
  transition: 0.3s;
}

.icon-print:hover {
  fill: #ffffff;
  stroke: #379fff;
}

.icon-excel {
  width: 24px;
  height: 24px;
  fill: #343e5c;
  cursor: pointer;
  transition: 0.3s;
}

.icon-excel:hover {
  fill: #379fff;
}

.calendar-tools {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.calendar-title {
  margin-left: 40px;
  margin-bottom: 3px;
  display: block;
  font-size: 14px;
  color: #343e5c;
}

.calendar-button {
  font-size: 14px;
  color: #2754eb;
  cursor: pointer;
}

.calendar-button:hover {
  color: darken(#2754eb, 20%);
}

.day-block {
  display: flex;
  width: 820px;
}

.day {
  display: flex;
  justify-content: space-between;
  width: 100px;
  height: 30px;
  border: 1px solid #7c8295;
  border-radius: 5px;
  background: #ffffff;
  cursor: pointer;
}

.date {
  font-size: 18px;
  color: #7c8295;
  margin-left: 5px;
}

.day-week {
  font-size: 18px;
  color: #1979cf;
  margin-right: 5px;
}

.weekend {
  color: red;
}

.menu {
  border: 1px solid #d8d9db;
  border-radius: 5px;
  background: #f9fafb;
  height: 100%;
  position: relative;
}

.menu-shadow {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-title-tools-tabs {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #7c8295;
  height: 30px;
  background: #ffffff;
}

.menu-title-tabs {
  width: 100%;
  display: flex;
  justify-content: left;
  height: 30px;
}

.menu-title {
  min-width: 100px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: #343e5c;
  margin: 0 10px;
  font-size: 14px;
  font-weight: 600;
}

.tabs {
  width: 100%;
  display: grid;
  grid-gap: 0px;
  grid-template-columns: repeat(auto-fit, minmax(10px, 1fr));
  grid-template-rows: repeat(1, 5px);
  height: 30px;
}

.tabs > div {
  height: 26px;
  object-fit: cover;
}

.title {
  overflow: hidden;
}

.tools-block {
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 0;
  height: 30px;
}

.diets-container {
  width: calc(100% - 18px);
  margin: 0 8px 8px 8px;
  overflow: hidden;
  overflow-y: scroll;
  height: calc(100% - 65px);
}

.table-container {
  width: 100%;
  border: 1px solid #dcdfe6;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  background: #ffffff;
}

.table-list {
  height: auto;
  border-collapse: collapse;
  width: 100%;

  td {
    border-bottom: 1px solid #dcdfe6;
    padding: 9px 7px 9px 7px;
    height: auto;
    position: sticky;
  }

  th {
    border-bottom: 1px solid #dcdfe6;
    padding: 9px 7px 9px 7px;
    height: auto;
    position: sticky;
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
}

h4 {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.1ex;
  margin: 0px;
  font-size: 11px;
  font-weight: normal;
  color: #a3a5b9;
}

.line {
  position: absolute;
  top: 4px;
  right: 0px;
  height: 16px;
  width: 1px;
  border-right: 1px solid #7c8295;
  margin-left: 0px;
}

.selected-tabs-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px 0 10px;
  margin-top: 3px;
  margin-left: -1px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 1px solid #7c8295;
  border-bottom: 1px solid #f9fafb;
  cursor: pointer;
  z-index: 101;
  width: auto;
  white-space: nowrap;
  text-transform: uppercase;
  background: #f9fafb;
  font-size: 12px;
}

.tabs-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px 0 10px;
  margin-top: 4px;
  cursor: pointer;
  width: auto;
  white-space: nowrap;
  text-transform: uppercase;
  font-size: 12px;
  transition: 0.3s;
}

.tabs-item:hover {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 1px solid #7c8295;
  border-bottom: 1px solid #7c8295;
  background: #f9fafb;
  margin-top: 3px;
  margin-left: -1px;
}

.tabs-item:hover > .line {
  display: none;
}

.tabs-button {
  display: inline-block;
  padding: 0;
  cursor: pointer;
  height: 26px;
  margin-top: 4px;
  text-transform: uppercase;
  transition: 0.3s;
}

.tabs-button:hover {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: #f9fafb;
  margin-top: 4px;
  z-index: 101;
}

.button-block {
  display: flex;
  justify-content: right;
  align-items: center;
}

.button-add {
  height: 20px;
  border: 1px solid #1979cf;
  border-radius: 15px;
  background: #ffffff;
  color: #1979cf;
  margin: 10px 10px 10px 0;
  padding: 0 20px;
  transition: 0.3s;
}

.button-add:hover {
  background: #1979cf;
  color: #ffffff;
}

.button-save {
  height: 20px;
  border: 1px solid #449d7c;
  border-radius: 15px;
  background: #ffffff;
  color: #449d7c;
  margin: 10px 10px 10px 0;
  padding: 0 20px;
}

.button-save:hover {
  background: #449d7c;
  color: #ffffff;
}

.button-print {
  height: 20px;
  border: 1px solid #0741ca;
  border-radius: 15px;
  background: #ffffff;
  color: #0741ca;
  margin: 10px 10px 10px 0;
  padding: 0 20px;
}

.button-print:hover {
  background: #0741ca;
  color: #ffffff;
}

.add-title {
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 20px;
  color: #1979cf;
}

.slider-container {
  display: flex;
}

.dishes {
  display: flex;
  max-width: 50%;
  height: 400px;
}

.main-box {
  width: calc(100% - 26px);
  border: 1px solid #d8d9db;
  border-radius: 5px;
  background: #f9fafb;
}

.arrow-box {
  width: 20px;
  background: #00b5a4;
  margin-right: 6px;
  padding-top: 70px;
}

.arrow-box-title {
  font-size: 14px;
  color: #ffffff;
  transform: rotate(-90deg);
}

.arrow-box-button {
  width: 20px;
  background: #00b5a4;
  border-radius: none;
  border: none;
  padding: 0;
  margin-top: 90px;
}

.icon-arrow-box-right {
  width: 20px;
  height: 20px;
  fill: #ffffff;
  cursor: pointer;
  transition: 0.3s;
}

.icon-arrow-box-right:hover {
  fill: #7c8295;
}

.tools-button-table {
  position: absolute;
  background: #ffffff;
  border-radius: none;
  border: none;
  height: 24px;
}

.icon-delete-table {
  width: 16px;
  height: 16px;
  fill: #343e5c;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 1px;
}

.icon-delete-table:hover {
  fill: #379fff;
}

.icon-eye {
  width: 16px;
  height: 16px;
  fill: #343e5c;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 1px;
  margin-left: 10px;
}

.icon-eye:hover {
  fill: #379fff;
}

.icon-closed {
  width: 16px;
  height: 16px;
  fill: #a1a7bd;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 1px;
  margin-left: 10px;
}

.icon-closed:hover {
  fill: #379fff;
}

input[type='text'] {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  margin: 0;
  border: 1px solid #c4c4c4;
  border-radius: 3px;
  outline: none;
  background: #ffffff;
  text-transform: uppercase;
  width: 100px;
}

.table-tools {
  display: flex;
  align-items: center;
  justify-content: left;
}

.visible {
  color: #343e5c;
  font-size: 13px;
}

.visible2 {
  color: #2754eb;
  font-size: 13px;
}

.hidden {
  color: #a1a7bd;
  font-size: 13px;
}

.schedule-name {
  display: flex;
  justify-content: left;
  align-items: center;
}

.tab-tools {
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: left;
  height: 25px;
  margin-left: 10px;
}

.icon-active {
  width: 22px;
  height: 22px;
  fill: #1979cf;
  cursor: pointer;
  transition: 0.3s;
  margin-left: 12px;
}

.icon-non-active {
  width: 22px;
  height: 22px;
  fill: #c4c4c4;
  cursor: pointer;
  transition: 0.3s;
  margin-left: 12px;
}

.button-close {
  display: flex;
  align-items: center;
  justify-content: right;
  width: 24px;
  margin-bottom: 2px;
}

.icon-close {
  width: 18px;
  height: 18px;
  fill: #c4c4c4;
  cursor: pointer;
  transition: 0.3s;
  padding-left: 5px;
}

.icon-close:hover {
  fill: #ff142c;
  transition: 0.3s;
}

.icon-close:active {
  fill: #bd0123;
}

:deep(.el-badge__content.is-fixed) {
  top: 3px;
  right: 16px;
}
</style>
