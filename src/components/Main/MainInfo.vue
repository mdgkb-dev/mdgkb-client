<template>
  <div class="info-main-container">
    <div class="container">
      <div class="info-container">
        <div class="info-container-left">
          <h2>Морозовская - крупнейшая в России и Европе детская больница с вековой историей</h2>
          <p>
            На сегодняшний день медицинская помощь, которую получают пациенты в Морозовской больнице, ничем не отличается от той, которую
            они могли бы получить в любой другой стране мира.
          </p>
          <p>
            С 2015 года Морозовская детская больница получила лицензию на осуществление образовательной детальности и стала Центром
            постдипломного педиатрического образования. Морозовская больница является клинической базой для 15 кафедр трех медицинских ВУЗов
            города Москвы (РНИМУ имени Н. И. Пирогова, РМАНПО, Университета Дружбы Народов).
          </p>
          <div class="info-container-left-icons">
            <div class="info-container-left-icons-item">
              <component :is="require(`@/assets/img/main-page/icons/4.svg`).default" />
              <h4>31</h4>
              <span>профиль медицинской помощи</span>
            </div>
            <div class="info-container-left-icons-item">
              <component :is="require(`@/assets/img/main-page/icons/2.svg`).default" />
              <h4>48</h4>
              <span>отделений</span>
            </div>
            <div class="info-container-left-icons-item">
              <component :is="require(`@/assets/img/main-page/icons/3.svg`).default" />
              <h4>700</h4>
              <span>врачей</span>
            </div>
            <div class="info-container-left-icons-item">
              <component :is="require(`@/assets/img/main-page/icons/1.svg`).default" />
              <h4>45</h4>
              <span>медицинких специаль-<br />ностей</span>
            </div>
          </div>
        </div>
        <div class="info-container-right">
          <el-carousel
            ref="carouselRef"
            v-touch:swipe="(direction) => $carouselSwipe(direction, carouselRef)"
            trigger="click"
            height="100%"
            width="auto"
            :interval="5000"
            indicator-position="inside"
          >
            <el-carousel-item>
              <img src="@/assets/img/main-page/templates/main-info.webp" />
            </el-carousel-item>
            <el-carousel-item>
              <img src="@/assets/img/main-page/templates/main-info.webp" style="transform: scaleX(-1)" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'MainPage',
  setup() {
    const carouselRef = ref();
    return {
      carouselRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.info-main-container {
  background-color: white;
}
.info-container {
  padding: 25px 0;
  display: flex;
  align-items: flex-start;
  letter-spacing: 1px;
  &-left {
    display: flex;
    flex-direction: column;
    flex: 50%;
    margin: 0 15px;
    h2 {
      font-size: 28px;
      margin: 0;
      margin-bottom: 15px;
    }
    p {
      font-size: 12px;
      margin-bottom: 15px;
    }
    &-icons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      grid-gap: 25px 80px;
      align-self: center;
      svg {
        font-size: 50px;
        height: 50px;
        fill: #2754eb;
      }
      &-item {
        h4 {
          margin: 0;
          font-size: 43px;
          color: #2754eb;
        }
        max-width: 150px;
        display: flex;
        justify-content: flex-start;
        text-align: center;
        font-size: 14px;
        flex-direction: column;
      }
    }
  }
  &-right {
    flex: 50%;
    margin: 0 15px;
    img {
      height: 100%;
      width: 100%;
    }
  }
}

.el-carousel,
.el-carousel__container,
.el-carousel__item {
  // background-color: gray;
  border-radius: 5px;
}

.el-carousel {
  height: 620px;
}

@media screen and (max-width: 980px) {
  .info-container {
    display: block;
  }
}

@media screen and (max-width: 480px) {
  .info-container {
    padding: 25px 0;
    display: block;
    align-items: flex-start;
    letter-spacing: 1px;
    &-left {
      display: flex;
      flex-direction: column;
      flex: 50%;
      margin: 0 15px;
      h2 {
        font-size: 16px;
        margin: 0;
        margin-bottom: 15px;
      }
      p {
        font-size: 12px;
        margin-bottom: 15px;
      }
      &-icons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-gap: 25px 80px;
        align-self: center;
        svg {
          font-size: 50px;
          height: 50px;
          fill: #2754eb;
        }
        &-item {
          margin: 20px -30px;
          h4 {
            margin: 0;
            font-size: 43px;
            color: #2754eb;
          }
          max-width: 150px;
          display: flex;
          justify-content: flex-start;
          text-align: center;
          font-size: 14px;
          flex-direction: column;
        }
      }
    }
    &-right {
      display: none;
    }
  }
}
</style>
