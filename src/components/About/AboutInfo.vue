<template>
  <div v-if="sum > 0" :class="{ fixed: scrollOffset >= 90 }">
    <el-card style="max-width: 1344px; margin: 0 auto">
      <div class="sum-card">
        <div class="sum">Сумма: {{ sum }} рублей.</div>
        <h2 v-if="scrollOffset >= 150" style="margin: 0">Выбранные платные услуги</h2>
        <el-button @click="clearSelectedService()">Очистить выбор</el-button>
      </div>
    </el-card>
  </div>

  <el-container direction="vertical">
    <h1 style="text-align: center">{{ division.name }}</h1>
    <el-card>
      <template #header>Общая информация</template>
      <div v-html="division.info"></div>
    </el-card>
    <el-card>
      <template #header>Врачи</template>
      <el-row>
        <el-col :span="12" v-for="item in division.doctors" :key="item.id" class="doctors-wrapper">
          <DoctorInfoCard :doctor="item" :division="division" />
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <template #header>Фото + 3D экскурсия</template>
      <div>
        <div class="gallery-container" v-if="division.name === 'Гинекологическое отделение'">
          <el-carousel arrow="always" :interval="2000" indicator-position="outside">
            <el-carousel-item v-for="image in images" :key="image">
              <img :src="require(`@/assets/gin/${image}.jpg`)" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </el-card>
    <el-card v-if="division.name === 'Гинекологическое отделение'">
      <template #header>Исследования</template>
      <div>
        <ul>
          <li>вагиноскопия</li>
          <li>цервикоскопия</li>
          <li>кольпоскопия</li>
          <li>гистероскопия</li>
          <li>ультразвуковое исследование (отделение лучевой диагностики)</li>
          <li>компьютерная томография (отделение лучевой диагностики)</li>
        </ul>
      </div>
    </el-card>

    <el-card v-if="division.name === 'Гинекологическое отделение'">
      <template #header>Манипуляции</template>
      <div>
        <ul>
          <li>удаление инородных тел влагалища</li>
          <li>восстановление девственной плевы</li>
          <li>удаление новообразований влагалища</li>
          <li>пункция, дренирование гематом и абсцессов наружных половых органов</li>
          <li>рассечение синехий малых половых губ</li>
          <li>пункция, дренирование гематом и абсцессов молочных желез</li>
          <li>удаление доброкачественных новообразований молочных желез</li>
          <li>диагностическая лапароскопия</li>
          <li>лапароскопическая аднексэктомия</li>
          <li>лапароскопичексая цистэктомия, удаление параовориальных кист</li>
          <li>лапароскопическая тубэктомия</li>
          <li>лапароскопическая оофорэктомия</li>
          <li>лапароскопическая деторсия и фиксация придатков при перекруте придатков матки</li>
          <li>лапароскопическая биопсия органов малого таза</li>
          <li>лапароскопическое удаление гонад, гонадных тяжей</li>
          <li>лапароскопическое удаление добавочного рога матки</li>
          <li>лапарокопическая электрокоагуляция (каутеризация яичников)</li>
          <li>лапароскопическая клиновидная резекция яичников</li>
          <li>лапароскопическое рассечение и иссечение спаек женских половых органов</li>
          <li>разделение внутриматочных синехий</li>
          <li>иссечение внутриматочной перегородки</li>
          <li>восстановление вульвы и промежности</li>
          <li>восстановление влагалищной стенки</li>
          <li>удаление новообразований половых губ</li>
          <li>феминизирующая пластика наружных гениталей</li>
          <li>резекция малых половых губ</li>
          <li>операции на клиторе</li>
          <li>реконстукция влагалища</li>
          <li>иссечение и закрытие свища женских половых органов</li>
          <li>рассечение девственной плевы</li>
        </ul>
      </div>
    </el-card>

    <el-card v-if="division.name !== 'Гинекологическое отделение'">
      <template #header>Специализация</template>
      <div></div>
    </el-card>
    <el-card v-if="division.name !== 'Гинекологическое отделение'">
      <template #header>Нозологии</template>
      <div></div>
    </el-card>
    <el-card>
      <template #header>Услуги-прайс</template>
      <el-collapse accordion v-if="division.name === 'Гинекологическое отделение'">
        <PaidService ref="ginService" :title="'Открыть список'" @selectService="selectServiceGin" v-model:services="ginDiv" />
      </el-collapse>
      <el-collapse accordion v-if="division.name === 'Оториноларингологическое отделение'">
        <PaidService
          v-if="division.name === 'Оториноларингологическое отделение'"
          ref="otoService"
          :title="'Оториноларингологическое отделение'"
          @selectService="selectServiceOto"
          v-model:services="otoDiv"
        />
      </el-collapse>
    </el-card>
    <!--    <el-card>-->
    <!--      <template #header>Врачебный состав</template>-->
    <!--      <div></div>-->
    <!--    </el-card>-->
    <el-card v-if="division.name === 'Гинекологическое отделение'">
      <template #header>Госпитализации</template>
      <div>
        <p><b>Ответственный сотрудник:</b> Лебедева Юлия Владимировна — врач-педиатр</p>

        <p><b>Телефон:</b> +7 (495) 653-90-34</p>

        <p><b>Электронная почта:</b> 9598800@morozdgkb.ru</p>

        <p><b>График работы:</b> пн.-чт. — 09:00-16:00</p>
      </div>
    </el-card>
    <el-card v-if="division.name === 'Гинекологическое отделение'">
      <template #header>Распорядок дня</template>
      <div>
        <h4>РАСПОРЯДОК ДНЯ:</h4>

        <p>
          Посещение пациентов 11:00-13:00 и 17:00-19:00 ежедневно, включая выходные и праздничные дни. Допускаются родители и законные
          представители. Дети до 18 лет на посещение не допускаются.
        </p>

        <h4>ВНУТРЕННИЙ РАСПОРЯДОК ДНЯ В ОТДЕЛЕНИИ:</h4>
        <ul>
          <li>7:00 Подъем, измерение температуры</li>
          <li>7:00-8:00 Гигиенические процедуры</li>
          <li>8:00-9:00 Осмотр врачей</li>
          <li>9:00-9:30 Медицинские процедуры</li>
          <li>9:30-10:00 Завтрак, проветривание палат</li>
          <li>10:00-10:20 Раздача лекарств</li>
          <li>10:20-11:20 Обход врачей</li>
          <li>11:20-12:30 Досуг детей</li>
          <li>12:30-13:00 Обед, проветривание палат</li>
          <li>13:00-13:30 Раздача лекарств</li>
          <li>14:00-16:00 Тихий час</li>
          <li>16:00-16:10 Измерение температуры</li>
          <li>16:10-16:30 Полдник</li>
          <li>16:30-18:00 Досуг детей</li>
          <li>18:00-18:30 Ужин, проветривание палат</li>
          <li>18:30-18:45 Раздача лекарств</li>
          <li>18:45-19:30 Медицинские процедуры</li>
          <li>19:30-21:00 Гигиенические процедуры, подготовка ко сну</li>
          <li>21:00-07:00 Сон</li>
        </ul>
      </div>
    </el-card>
    <el-card>
      <template #header>Контакты</template>
      <div v-if="division.phone">Телефон: {{ division.phone }}</div>
      <div v-if="division.email">Email: {{ division.email }}</div>
      <div v-if="division.address">Адрес: {{ division.address }}</div>
    </el-card>
  </el-container>
</template>

<script lang="ts">
import IDivision from '@/interfaces/buildings/IDivision';
import { defineComponent, onMounted, onUnmounted, PropType, ref } from 'vue';
import IPaidService from '@/interfaces/IPaidService';
import { ginDiv } from '@/components/PaidServices/ginDiv';
import { otoDiv } from '@/components/PaidServices/otoDiv';
import PaidService from '@/components/PaidServices/PaidService.vue';
import DoctorInfoCard from '@/components/DoctorInfoCard.vue';

export default defineComponent({
  name: 'AboutInfo',
  components: { PaidService, DoctorInfoCard },
  props: {
    division: {
      type: Object as PropType<IDivision>,
      required: true,
    },
  },
  setup() {
    let sum = ref(0);
    const ginService = ref();
    const otoService = ref();
    const scrollOffset = ref(0);
    const previousOffset = ref(0);
    const rememberedOffset = ref(0);
    let selectedServiceGin: IPaidService[] = [];
    let selectedServiceOto: IPaidService[] = [];

    const images = ['Общая1', 'Общая2', 'DSC02826'];
    const calcSum = () => {
      sum.value = 0;
      selectedServiceGin.forEach((s) => (sum.value = Number(s.price) + sum.value));
      selectedServiceOto.forEach((s) => (sum.value = Number(s.price) + sum.value));
    };

    const selectServiceGin = (services: IPaidService[]) => {
      selectedServiceGin = services;
      calcSum();
    };

    const selectServiceOto = (services: IPaidService[]) => {
      selectedServiceOto = services;
      calcSum();
    };
    const clearSelectedService = () => {
      if (ginService.value) ginService.value.clearSelection();
      if (otoService.value) otoService.value.clearSelection();
      sum.value = 0;
    };

    const handleScroll = () => {
      if (scrollOffset.value > previousOffset.value && rememberedOffset.value != 0) {
        rememberedOffset.value = 0;
      }
      previousOffset.value = scrollOffset.value;
      scrollOffset.value = window.scrollY;
    };

    const getImage = (image: string) => {
      return `@/assets/gin/${image}`;
    };

    onMounted(() => window.addEventListener('scroll', handleScroll));
    onUnmounted(() => window.removeEventListener('scroll', handleScroll));

    return {
      images,
      getImage,
      clearSelectedService,
      ginService,
      otoService,
      sum,
      selectServiceOto,
      selectServiceGin,
      ginDiv,
      otoDiv,
      scrollOffset,
      previousOffset,
      rememberedOffset,
    };
  },
});
</script>

<style scoped>
.el-card {
  border-radius: 15px;
  color: #4a4a4a;
  margin-bottom: 10px;
  font-size: 14px;
  /* width: 800px; */
}

:deep(.el-card__header) {
  font-weight: 400;
  text-transform: uppercase;
  font-size: 0.8rem;
}

.sum {
  height: 100%;
  display: flex;
  align-items: center;
}

.sum-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fixed {
  position: fixed;
  top: 57px;
  left: 0;
  width: 100%;
  z-index: 100;
}

.spacer {
  width: 100%;
  height: 80px;
}
.doctors-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.header-center {
  text-align: center;
}
.filter {
  border-radius: 20px;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
}

.collapseHeader {
  padding-left: 10px;
  line-height: 15px;
}

.el-collapse-item {
  background-color: white;
  margin-bottom: 20px;
  padding: 4px;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
}
:deep(.el-collapse-item__wrap) {
  border-bottom: none;
}

:deep(.el-collapse-item__header) {
  height: 32px;
}
:deep(.el-collapse-item__header, .el-collapse-item__wrap) {
  border: none;
}

.collapse-content-container {
  margin-left: 10px;
}
:deep(.el-collapse) {
  border-top: none !important;
}
</style>
