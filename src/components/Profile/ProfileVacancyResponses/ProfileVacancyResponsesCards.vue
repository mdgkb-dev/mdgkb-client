<template>
  <CollapseContainer>
    <template #default="scope">
      <CollapseItem v-for="vacancyResponse in user.vacancyResponses" :key="vacancyResponse.id"
        :title="`${vacancyResponse.vacancy.title}`" :tab-id="vacancyResponse.id" :collapsed="false"
        :active-id="scope.activeId" :show-tools-on-hover="false">
        <template #tools>
          <div class="order-date" style="margin-right: 5px">
            {{ $dateTimeFormatter.format(vacancyResponse.formValue.createdAt, {
              day: '2-digit', month: 'long', year:
                'numeric'
            }) }}
          </div>
          <el-tag v-if="vacancyResponse.formValue.formStatus.label" size="small"
            :style="`background-color: inherit; color: ${vacancyResponse.formValue.formStatus.color}; border-color: ${vacancyResponse.formValue.formStatus.color}`">{{
              vacancyResponse.formValue.formStatus.label }}</el-tag>
        </template>
        <template #inside-content>
          <div class="margin-container">
            <div class="position">
              <div class="flex">
                <PButton skin="profile" v-for="item in vacancyResponse.formValue.getUserActions()" :key="item.id"
                  :text="item.childFormStatus.userActionName" margin="0 10px 0 0" width="120px"
                  @click="updateFormStatus(vacancyResponse, item.childFormStatus)" />
              </div>
            </div>
          </div>
        </template>
      </CollapseItem>
    </template>
  </CollapseContainer>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount } from 'vue';

import FormStatus from '@/classes/FormStatus';
import User from '@/classes/User';
import VacancyResponse from '@/classes/VacancyResponse';
import CollapseContainer from '@/services/components/Collapse/CollapseContainer.vue';
import CollapseItem from '@/services/components/Collapse/CollapseItem.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'ProfileVacancyResponsesCards',
  components: {
    CollapseContainer,
    CollapseItem,
  },
  setup() {
    const user: ComputedRef<User> = computed(() => Provider.store.getters['users/item']);
    const formStatuses: ComputedRef<FormStatus[]> = computed<FormStatus[]>(() => Provider.store.getters['formStatuses/items']);

    const updateFormStatus = async (application: VacancyResponse, status: FormStatus) => {
      if (status.isCancelled()) {
        await Provider.router.push(`/profile/vacancy-responses/cancel/${application.id}`);
        return;
      }
      if (status.isClarified()) {
        await Provider.router.push(`/profile/vacancy-responses/${application.id}`);
        return;
      }
      if (status.isEditable) {
        application.formValue.setStatus(status, formStatuses.value);
      }
      await Provider.store.dispatch('formValues/update', application.formValue);
    };

    onBeforeMount(async () => {
      await Provider.store.dispatch('formStatuses/getAll');
    });

    onBeforeUnmount(async () => {
      user.value.setVacancyResponsesViewed();
      await Provider.store.dispatch('formValues/updateMany', user.value.getVacancyResponsesFormValues());
    });

    return {
      user,
      updateFormStatus,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.main-component {
  position: relative;
}

.line-title {
  width: 100%;
  margin-top: 16px;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  letter-spacing: 1px;
  color: #343e5c;
}

.item {
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 1px;
  font-weight: normal;
  margin-top: 10px;
}

.price {
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 1px;
  font-weight: bold;
  margin-top: 10px;
}

.line-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.price-block {
  display: block;
}

.price-pc {
  font-size: 18px;
  width: 60px;
}

.name {
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 14px;
  color: #343e5c;
  margin-right: 10px;
}

.small-title {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
  height: 20px;
  color: #a1a7bd;
  font-size: 11px;
  letter-spacing: 1px;
}

.quantity {
  display: flex;
  align-items: center;
  justify-content: right;
  width: 100%;
  height: 12px;
  color: #a1a7bd;
  font-size: 11px;
  letter-spacing: 1px;
  white-space: nowrap;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}

.image-box {
  display: block;
  width: 50px;
  height: 50px;
  overflow: hidden;
  margin: 5px;
  position: relative;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
}

.left {
  display: flex;
  min-width: 50%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.order-date {
  font-weight: normal;
  margin-left: 5px;
}

.margin-container {
  padding: 10px;
}

.scroll {
  width: 100%;
  max-height: 50vh;
  overflow: hidden;
  overflow-y: auto;
}

.position {
  display: flex;
  align-items: center;
  justify-content: right;
  width: 100%;
  margin-bottom: 10px;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: right;
  width: auto;
}

.total-price {
  font-size: 18px;
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 1px;
  font-weight: bold;
  margin-top: 16px;
}

.price-pc {
  display: flex;
  justify-content: right;
  align-items: center;
  font-size: 14px;
  width: auto;
  font-weight: bold;
}

.menu-shadow {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 960px) {
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-top: 0px;
  }

  .line-title {
    margin-top: 0px;
  }

  .total-price {
    margin-top: 0px;
  }

  .order-date {
    display: none;
  }
}

@media screen and (max-width: 540px) {
  .margin-container {
    padding: 10px 5px;
  }

  .flex {
    margin-top: 0px;
  }

  .price-pc {
    display: flex;
    justify-content: right;
    align-items: center;
    font-size: 14px;
    width: auto;
    font-weight: bold;
  }
}

.card-container {
  background-color: #f9fafb;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  padding: 16px;
}
</style>
