<template>
  <div class="card-item flex-column">
    <div class="flex-row">
      <div class="favourite-icon">
        <div class="favor">
          <FavouriteIcon :domain-id="division.id" :domain-name="'division'" />
        </div>
      </div>
      <div class="flex-column right-side">
        <div class="division-line">{{ division.treatDirection.name }}</div>
        <div class="card-name" @click="$router.push(`/divisions/${division.slug}`)">
          {{ division.name }}
        </div>
        <div class="line">
          <div class="line-item"><Rating :comments="division.divisionComments" /></div>
          <button class="map-button">На карте</button>
        </div>
        <div class="spec-list"></div>
      </div>
    </div>
    <div class="info-block">
      <div class="contact-h3">
        <div class="item">
          <svg class="icon-time">
            <use xlink:href="#time"></use>
          </svg>
        </div>
        <div class="time-block">
          <div class="item">
            Время работы&nbsp;
            <div class="block-today">
              <p class="today">сегодня</p>
              :&nbsp;
              <div class="hidden-block">
                <div class="hidden-line">
                  <div class="hidden-item">
                    <font color="#0A216F"><b>сегодня</b></font
                    >: {{ division.timetable.getTodayWorkday().getTimetable() }}
                  </div>
                  <div v-if="division.timetable.getTodayWorkday().breaksExists" class="hidden-item-2">
                    Перерыв:
                    <ul v-if="division.timetable.getTodayWorkday().breaksExists" class="hidden-item-list">
                      <li v-for="item in division.timetable.getTodayWorkday().breakPeriods" :key="item.id">{{ item.getPeriod() }}</li>
                    </ul>
                  </div>
                </div>
                <div class="hidden-line-2">
                  <ul class="hidden-item-list-2">
                    <li v-for="item in division.timetable.getOnlyWorkdayObjects()" :key="item.id">
                      {{ item.getPeriodWithName() }}
                      <div v-if="item.breaksExists" class="hidden-item-2">
                        Перерыв:
                        <ul v-if="item.breaksExists" class="hidden-item-list">
                          <li v-for="period in item.breakPeriods" :key="period.id">{{ period.getPeriod() }}</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {{ division.timetable.getTodayWorkday().getTimetable() }}
          </div>
          <div v-if="division.timetable.getTodayWorkday().breaksExists" class="item">
            Перерыв:
            <ul v-if="division.timetable.getTodayWorkday().breaksExists" class="item-list">
              <li v-for="item in division.timetable.getTodayWorkday().breakPeriods" :key="item.id">&nbsp;{{ item.getPeriod() }}&nbsp;</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="contact-h3">
        <div class="item">
          <svg v-if="division.getAddress()" class="icon-map-marker">
            <use xlink:href="#map-marker"></use>
          </svg>
        </div>
        <div class="item">
          <a @click="$router.push(`/map/${division.id}`)">
            {{ division.address }}
          </a>
        </div>
      </div>
      <div class="contact-h3">
        <div class="item">
          <svg v-if="division.contactInfo.telephoneNumbers[0].number" class="icon-phone">
            <use xlink:href="#phone"></use>
          </svg>
        </div>
        <div class="item">{{ division.contactInfo.telephoneNumbers[0].number }}</div>
      </div>
      <div class="contact-h3">
        <div class="item">
          <svg v-if="division.contactInfo.emails[0].address" class="icon-email">
            <use xlink:href="#email"></use>
          </svg>
        </div>
        <div class="item">{{ division.contactInfo.emails[0].address }}</div>
      </div>
      <div class="contact-h3">
        <div class="icon-block">
          <svg class="icon-ruble">
            <use xlink:href="#ruble"></use>
          </svg>
          <svg class="icon-credit-card">
            <use xlink:href="#credit-card"></use>
          </svg>
          <svg class="icon-attention">
            <use xlink:href="#attention"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="division-card-footer">
      <button @click="$router.push('/appointments/oms')">Запись на прием</button>
    </div>
  </div>
  <svg width="0" height="0" class="hidden">
    <symbol id="phone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path
        d="M12 6.5H11C10.9996 6.1023 10.8414 5.721 10.5602 5.43978C10.279 5.15856 9.8977 5.0004 9.5 5V4C10.1628 4.00079 10.7982 4.26444 11.2669 4.73311C11.7356 5.20178 11.9992 5.8372 12 6.5Z"
      ></path>
      <path
        d="M14 6.5H13C12.9989 5.57207 12.6299 4.68244 11.9737 4.0263C11.3176 3.37015 10.4279 3.00106 9.5 3V2C10.6931 2.00132 11.8369 2.47585 12.6805 3.31948C13.5241 4.16311 13.9987 5.30693 14 6.5Z"
      ></path>
      <path
        d="M10.167 10.741L11.287 9.621C11.4369 9.47105 11.6275 9.36838 11.8352 9.32572C12.043 9.28306 12.2586 9.30228 12.4555 9.381L13.8195 9.927C14.0205 10.0074 14.1929 10.1463 14.3142 10.3256C14.4356 10.5049 14.5005 10.7165 14.5005 10.933V13.4135C14.5009 13.5609 14.4711 13.7069 14.4131 13.8424C14.3551 13.978 14.27 14.1002 14.1631 14.2018C14.0562 14.3033 13.9297 14.3819 13.7914 14.4329C13.653 14.4838 13.5057 14.506 13.3585 14.498C3.7975 13.903 1.8665 5.805 1.508 2.704C1.49063 2.5524 1.50556 2.39884 1.5518 2.25342C1.59805 2.108 1.67455 1.97402 1.77628 1.86029C1.87802 1.74656 2.00268 1.65566 2.14206 1.59356C2.28145 1.53146 2.43241 1.49958 2.585 1.5H5.0215C5.23803 1.5 5.4496 1.56487 5.62892 1.68625C5.80823 1.80764 5.94706 1.97996 6.0275 2.181L6.573 3.545C6.65172 3.74189 6.67094 3.95755 6.62828 4.16526C6.58562 4.37296 6.48295 4.56359 6.333 4.7135L5.213 5.8335C5.213 5.8335 5.834 10.1995 10.167 10.741Z"
      ></path>
    </symbol>
    <symbol id="email" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22H17V20H12C7.66 20 4 16.34 4 12C4 7.66 7.66 4 12 4C16.34 4 20 7.66 20 12V13.43C20 14.22 19.29 15 18.5 15C17.71 15 17 14.22 17 13.43V12C17 9.24 14.76 7 12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C13.38 17 14.64 16.44 15.54 15.53C16.19 16.42 17.31 17 18.5 17C20.47 17 22 15.4 22 13.43V12C22 6.48 17.52 2 12 2ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15Z"
      ></path>
    </symbol>

    <symbol id="time" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path
        d="M8 1C4.1402 1 1 4.1402 1 8C1 11.8598 4.1402 15 8 15C11.8598 15 15 11.8598 15 8C15 4.1402 11.8598 1 8 1ZM10.3051 11.2949L7.3 8.2898V3.8H8.7V7.7102L11.2949 10.3051L10.3051 11.2949Z"
      ></path>
    </symbol>

    <symbol id="map-marker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path
        d="M7.99923 0.888916C6.61487 0.890072 5.28722 1.439 4.30625 2.4158C3.32529 3.39261 2.77072 4.71791 2.76367 6.10225C2.76367 8.1778 3.92812 9.91558 4.78145 11.1822L4.93701 11.4134C5.78602 12.6439 6.69682 13.8306 7.66589 14.9689L8.00367 15.3645L8.34145 14.9689C9.31041 13.8305 10.2212 12.6438 11.0703 11.4134L11.2259 11.1778C12.0748 9.91114 13.2392 8.1778 13.2392 6.10225C13.2322 4.71714 12.677 3.39117 11.6951 2.41424C10.7131 1.43731 9.38435 0.888898 7.99923 0.888916ZM7.99923 8.44447C7.42259 8.44447 6.85889 8.27348 6.37943 7.95311C5.89997 7.63275 5.52628 7.1774 5.30561 6.64465C5.08493 6.1119 5.0272 5.52568 5.13969 4.96012C5.25219 4.39456 5.52987 3.87505 5.93762 3.46731C6.34537 3.05956 6.86487 2.78188 7.43043 2.66938C7.99599 2.55688 8.58221 2.61462 9.11496 2.83529C9.64771 3.05597 10.1031 3.42966 10.4234 3.90912C10.7438 4.38858 10.9148 4.95227 10.9148 5.52892C10.9148 6.30217 10.6076 7.04375 10.0608 7.59053C9.51406 8.1373 8.77248 8.44447 7.99923 8.44447Z"
      ></path>
      <path
        d="M8.00055 7.18665C8.91612 7.18665 9.65833 6.44444 9.65833 5.52887C9.65833 4.61331 8.91612 3.87109 8.00055 3.87109C7.08499 3.87109 6.34277 4.61331 6.34277 5.52887C6.34277 6.44444 7.08499 7.18665 8.00055 7.18665Z"
      ></path>
    </symbol>
    <symbol id="ruble" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M13.5 3H7V12H5V14H7V16H5V18H7V21H9V18H13V16H9V14H13.5C16.54 14 19 11.54 19 8.5C19 5.46 16.54 3 13.5 3ZM13.5 12H9V5H13.5C15.43 5 17 6.57 17 8.5C17 10.43 15.43 12 13.5 12Z"
      ></path>
    </symbol>
    <symbol id="credit-card" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M2 9H22M2 9V5.6C2 5.44087 2.06321 5.28826 2.17574 5.17574C2.28826 5.06321 2.44087 5 2.6 5H21.4C21.5591 5 21.7117 5.06321 21.8243 5.17574C21.9368 5.28826 22 5.44087 22 5.6V9H2ZM2 9V18.4C2 18.5591 2.06321 18.7117 2.17574 18.8243C2.28826 18.9368 2.44087 19 2.6 19H21.4C21.5591 19 21.7117 18.9368 21.8243 18.8243C21.9368 18.7117 22 18.5591 22 18.4V9H2Z"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </symbol>

    <symbol id="attention" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M12 22C13.3135 22.0017 14.6143 21.7438 15.8278 21.2412C17.0413 20.7385 18.1435 20.001 19.071 19.071C20.001 18.1435 20.7385 17.0413 21.2412 15.8278C21.7438 14.6143 22.0017 13.3135 22 12C22.0017 10.6865 21.7438 9.3857 21.2411 8.17222C20.7385 6.95875 20.001 5.85656 19.071 4.92901C18.1435 3.99902 17.0413 3.26151 15.8278 2.75885C14.6143 2.25619 13.3135 1.99831 12 2.00001C10.6865 1.99833 9.3857 2.25623 8.17222 2.75889C6.95875 3.26154 5.85656 3.99904 4.92901 4.92901C3.99904 5.85656 3.26154 6.95875 2.75889 8.17222C2.25623 9.3857 1.99833 10.6865 2.00001 12C1.99831 13.3135 2.25619 14.6143 2.75885 15.8278C3.26151 17.0413 3.99902 18.1435 4.92901 19.071C5.85656 20.001 6.95875 20.7385 8.17222 21.2411C9.3857 21.7438 10.6865 22.0017 12 22V22Z"
        stroke-width="2"
        stroke-linejoin="round"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16C13 15.7348 12.8946 15.4804 12.7071 15.2929C12.5196 15.1054 12.2652 15 12 15C11.7348 15 11.4804 15.1054 11.2929 15.2929C11.1054 15.4804 11 15.7348 11 16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17V17Z"
      ></path>
      <path d="M12 7.5V13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import FavouriteIcon from '@/components/FavouriteIcon.vue';
import Rating from '@/components/Rating.vue';
import IDivision from '@/interfaces/buildings/IDivision';

export default defineComponent({
  name: 'DivisionCard',
  components: {
    Rating,
    FavouriteIcon,
  },
  props: {
    division: { type: Object as PropType<IDivision>, required: true },
  },
});
</script>

<style lang="scss" scoped>
.info-block {
  height: 165px;
}

.card-item {
  max-width: 370px;
  min-height: 87%;
  position: relative;
}

.tag-link {
  margin: 2px;
  font-size: 10px;
  transition: all 0.2s;
  border-color: blue;
  border-radius: 20px;
  &:hover {
    background-color: blue;
    color: white;
    cursor: pointer;
  }
}

.icon-phone {
  width: 20px;
  height: 20px;
  fill: #2754eb;
}

.icon-email {
  width: 20px;
  height: 20px;
  fill: #2754eb;
}

.icon-time {
  margin-left: 1px;
  width: 20px;
  height: 20px;
  fill: #2754eb;
}

.icon-map-marker {
  margin-left: -1px;
  width: 23px;
  height: 23px;
  fill: #2754eb;
}

.icon-block {
  display: flex;
  justify-content: left;
  margin-left: 15px;
  height: 40px;
  align-items: center;
}

.icon-ruble {
  width: 24px;
  height: 24px;
  fill: #31ae5e;
  margin-left: 10px;
  &:hover {
    cursor: pointer;
    fill: lighten(#31af5e, 10%);
  }
}

.icon-credit-card {
  width: 30px;
  height: 30px;
  fill: #ffffff;
  stroke: #31ae5e;
  margin-left: 10px;
  &:hover {
    cursor: pointer;
    stroke: lighten(#31af5e, 10%);
  }
}

.icon-attention {
  width: 24px;
  height: 24px;
  fill: #ffffff;
  stroke: #31ae5e;
  margin-left: 10px;
  &:hover {
    cursor: pointer;
    stroke: lighten(#31af5e, 10%);
  }
}

.contact-h3 {
  display: flex;
  justify-content: left;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 12px;
  font-weight: lighter;
  color: #4a4a4a;
  align-content: center;
  text-align: center;
  margin-top: 5px;
}

.item {
  display: flex;
  flex-direction: row;
  padding-right: 10px;
  width: auto;
  align-items: center;
  text-align: left;
}

.card-name {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.2ex;
  min-height: 50px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.division-line {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.2ex;
  font-size: 11px;
  margin-bottom: 2px;
  color: #a3a5b9;
}

.line {
  display: flex;
  justify-content: space-between;
}

.line-item {
  display: block;
}

.map-button {
  height: 26px;
  background: #2754eb;
  border-radius: 40px;
  border: none;
  font-family: roboto;
  font-size: 1rem;
  color: #ffffff;
  margin-left: 5px;
  padding: 0 15px;
  text-align: center;
  &:hover {
    cursor: pointer;
    background-color: #133dcc;
  }
}

.division-card-footer {
  button {
    margin-top: 10px;
    border-radius: 20px;
    background-color: #31af5e;
    padding: 10px 20px;
    height: auto;
    letter-spacing: 2px;
    color: white;
    border: 1px solid rgb(black, 0.05);
    &:hover {
      cursor: pointer;
      background-color: lighten(#31af5e, 10%);
    }
  }
  text-align: center;
  padding: 4px 0 0px 0;
  margin-top: 10px;
}

.favourite-icon {
  position: absolute;
  right: 10px;
  top: 10px;
}

.favor {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: white;
  border-radius: 50%;
  border: 1px solid rgb(black, 0.1);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  width: 30px;
  height: 30px;
  &:hover {
    transform: scale(1.1);
  }
  .anticon {
    font-size: 20px;
    color: #bdc2d1;
  }
}

.item-list {
  list-style: none;
}

ul.item-list {
  padding: 0;
  margin: 0;
}

ul.item-list li {
  display: inline;
}

ul.hidden-item-list {
  padding: 0 0 0 20px;
  margin: 0;
}

ul.hidden-item-list-2 {
  padding: 0;
  margin: 0;
}

ul.hidden-item-list-2 li {
  display: block;
  padding: 0px;
  margin: 0px;
  padding: 5px 0 5px 0px;
}

ul.hidden-item-list li {
  display: block;
  padding: 0px;
  margin: 0px;
}

.time-block {
  display: block;
  justify-content: left;
}

.hidden-block {
  cursor: auto;
  display: none;
  position: absolute;
  left: 50px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  border-radius: 5px;
  border: 1px solid rgb(black, 0.1);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  padding: 5px;
  background: #ffffff;
  width: 200px;
}

.hidden-line {
  font-size: 12px;
  padding: 5px 0px;
}

.hidden-line-2 {
  display: flex;
  font-size: 14px;
  padding: 2px 0 0 0;
  justify-content: left;
}

.hidden-item {
  font-size: 14px;
  display: flex;
  flex-direction: row;
  width: auto;
}

.hidden-item-2 {
  font-size: 12px;
  display: flex;
  flex-direction: row;
  width: auto;
}

.today {
  color: #2754eb;
  cursor: pointer;
  margin: 0;
  padding: 0;
}

.today:hover {
  color: #0a216f;
}

.block-today {
  display: flex;
  position: relative;
}

.block-today:hover .hidden-block {
  display: block;
}
</style>
