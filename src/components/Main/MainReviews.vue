<template>
  <MainContainer
    v-if="mounted"
    header-title="Отзывы"
    footer-button-title="Все отзывы"
    footer-button-link="comments"
    background-color="white"
  >
    <div class="main-page-reviews">
      <!-- <div class="mobile1"><ReviewCard  v-for="item in reviews" :key="item.id" :item="item" @showMore="showMore(item)" /></div> -->
      <ReviewCard v-for="item in reviews" :key="item.id" :item="item" @show-more="showMore(item)" />
      <!-- <div class="mobile3"><ReviewCard  v-for="item in reviews.splice(0, 2)" :key="item.id" :item="item" @showMore="showMore(item)" /></div> -->
    </div>

    <el-dialog v-model="showDialog">
      <CommentCardMain v-if="dialogComment" :comment="dialogComment" />
    </el-dialog>
  </MainContainer>
</template>

<script lang="ts" setup>
import Comment from '@/classes/Comment';
import CommentsFiltersLib from '@/libs/filters/CommentsFiltersLib';

const showDialog: Ref<boolean> = ref(false);
const mounted = ref(false);
const reviews: Comment[] = CommentsStore.Items();
const dialogComment: Ref<Comment | undefined> = ref();

const showMore = (item: Comment) => {
  dialogComment.value = item;
  showDialog.value = true;
};

console.log(reviews);

onBeforeMount(async () => {
  const ftsp = new FTSP();
  ftsp.p.limit = 4;
  ftsp.setF(CommentsFiltersLib.onlyPositive());
  ftsp.setF(CommentsFiltersLib.onlyPublished());
  await CommentsStore.FTSP({ ftsp: ftsp, withCache: true });
  mounted.value = true;
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.main-page-reviews {
  display: flex;
  justify-content: space-between;
}

@media screen and (max-width: 650px) {
  .main-page-reviews {
    flex-direction: column;
    align-items: center;
  }
}
</style>
