<template>
  <el-container direction="vertical">
    <div class="header-center">
      <h2>Сведения об организациях в сфере охраны здоровья</h2>
    </div>
    <el-input prefix-icon="el-icon-search" v-model="filter" placeholder="Найти организацию" class="filter" size="large" />
    <el-collapse v-model="activeName" accordion>
      <template v-for="(organization, item) in list" :key="organization.id">
        <el-collapse-item :name="item + 1">
          <template #title>
            <h3 class="collapseHeader">{{ organization.name }}</h3>
          </template>
          <el-row class="collapse-content-container">
            <el-col>
              <div v-if="organization?.contactInfo?.telephoneNumbers?.length">
                <h4>Телефоны:</h4>
                <div v-for="phone in organization?.contactInfo?.telephoneNumbers" :key="phone">
                  <span v-if="phone.description"> {{ phone.description }} : </span>
                  <span>{{ phone.number }}</span>
                </div>
              </div>
              <div v-if="organization?.contactInfo?.postAddresses?.length">
                <h4>Адреса:</h4>
                <div v-for="address in organization?.contactInfo?.postAddresses" :key="address">
                  <span v-if="address.description"
                    ><b>{{ address.description }} :</b>
                  </span>
                  <span> {{ address.address }}</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
      </template>
    </el-collapse>
  </el-container>
</template>

<script lang="ts">
import { ref, defineComponent, onBeforeMount, watch, computed } from 'vue';
import { useStore } from 'vuex';
import ISideOrganization from '@/interfaces/sideOrganization/ISideOrganization';
// import { yandexMap, ymapMarker } from 'vue-yandex-maps';

export default defineComponent({
  name: 'SideOrganizationsPage',
  components: {
    // yandexMap,
    // ymapMarker,
  },
  setup() {
    const store = useStore();
    const filter = ref('');
    const sideOrganizations = computed(() => store.getters['sideOrganizations/sideOrganizations']);
    const activeName = ref(1);

    // const allowMap = ref(false);

    // const openedOrganization = () => {
    //   allowMap.value = false;
    //   setTimeout(function () {
    //     allowMap.value = true;
    //   }, 500);
    // };

    // watch(sideOrganizations, openedOrganization);

    onBeforeMount(async () => {
      await store.dispatch('sideOrganizations/getAll');
    });

    const list = computed((): ISideOrganization[] => {
      if (filter.value) {
        return sideOrganizations.value.filter((o: ISideOrganization) => {
          if (o.name) return o.name.toLowerCase().includes(filter.value.toLowerCase());
        });
      } else {
        return sideOrganizations.value;
      }
    });

    return {
      filter,
      list,
      sideOrganizations,
      // allowMap,
      activeName,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/collapse.scss';
</style>
