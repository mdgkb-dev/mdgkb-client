<template>
  <div class="card-item flex-column">
    <div class="flex-row">
      <div>
        <div
          class="doctor-name"
          @click="$router.push({ name: `DoctorPage`, params: { slug: educationalManager.doctor.employee.human.slug } })"
        >
          {{ educationalManager.doctor.employee.human.getFullName() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import EducationalManager from '@/classes/EducationalManager';

export default defineComponent({
  name: 'EducationalManagerCard',
  components: {},
  props: {
    educationalManager: { type: Object as PropType<EducationalManager>, required: true },
  },
  setup() {
    const errorImg = (event: Event) => {
      if (event.target) {
        (event.target as HTMLImageElement).src = require('@/assets/img/doctor-default.webp');
      }
    };

    return {
      errorImg,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
@import '@/assets/styles/elements/doctor-info-card.scss';

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
</style>
