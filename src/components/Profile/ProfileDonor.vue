<template>
  <el-card v-if="mounted">
    <template #header><h3 style="text-align: center; margin: 0">Донорство крови</h3></template>
    <div class="wrapper">
      <template v-for="rule in donorRules" :key="rule.id">
        <DonorRuleCard :donor-rule="rule" @removeFromUser="removeRule(rule.id)" @showRule="showRule(rule)" />
      </template>
    </div>

    <el-dialog v-model="visible" width="40%" :top="'5vh'" lock-scroll="true">
      <div class="scale-image-container">
        <img
          v-if="currentRule.image.fileSystemPath"
          class="scale-image"
          :src="currentRule.image.getImageUrl()"
          alt="donor-rule"
          @error="errorImg"
        />
      </div>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import DonorRule from '@/classes/DonorRule';
import User from '@/classes/User';
import DonorRuleCard from '@/components/DonorRules/DonorRuleCard.vue';

export default defineComponent({
  name: 'ProfileDonor',
  components: { DonorRuleCard },

  setup() {
    const store = useStore();
    const mounted = ref(false);
    const userId: ComputedRef<string> = computed(() => store.getters['auth/user']?.id);
    const user: ComputedRef<User> = computed(() => store.getters['users/item']);
    const donorRules: ComputedRef<DonorRule[]> = computed(() => {
      return user.value.getDonorRules();
    });
    const currentRule: Ref<DonorRule> = ref(new DonorRule());
    const visible: Ref<boolean> = ref(false);

    const loadUser = async () => {
      await store.dispatch('users/get', userId.value);
      mounted.value = true;
    };

    const removeRule = async (ruleId: string) => {
      user.value.removeDonorRule(ruleId);
      await store.dispatch('donorRules/deleteFromUser', ruleId);
    };

    const showRule = (rule: DonorRule) => {
      currentRule.value = rule;
      visible.value = !visible.value;
    };

    onMounted(loadUser);

    return {
      user,
      removeRule,
      mounted,
      donorRules,
      currentRule,
      visible,
      showRule,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: calc(100% - 60px);
  overflow: hidden;
  overflow-y: auto;
}

.el-card {
  margin-bottom: 10px;
}
.scale-image {
  width: 100%;
  height: 100%;
}
</style>
