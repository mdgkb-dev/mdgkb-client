<template>
  <el-rate
    :model-value="countRating(division.comments)"
    size="large"
    disabled
    void-color="#A1A7BD"
    disabled-void-color="#A1A7BD"
    :colors="['#FF4D3B', '#FF4D3B', '#FF4D3B']"
  >
  </el-rate>
  <a class="doctor-reviews" @click="$scroll('#reviews')">{{ buildNameNumbers(division.comments, ['отзыв', 'отзыва', 'отзывов']) }}</a>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Division from '@/classes/Division';
import buildNameNumbers from '@/services/buildNameNumbers';
import countRating from '@/services/countRating';
export default defineComponent({
  name: 'RatingBlock',
  props: {
    division: {
      type: Object as PropType<Division>,
      required: true,
    },
  },

  setup() {
    return { countRating, buildNameNumbers };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
:deep(.el-rate__icon) {
  margin: 0;
  font-size: 20px;
}
.el-rate {
  margin-bottom: 5px;
}
a {
  color: #2754eb;
  text-decoration: none;
  letter-spacing: 1px;
  font-weight: bold;
  font-size: 11px;
  &:hover {
    color: darken(#2754eb, 10%);
    cursor: pointer;
  }
}
</style>
