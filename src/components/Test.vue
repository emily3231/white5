<template>
  <section class="section all_warp section2">
    <!-- 背景層 -->
    <div class="bg_green_top">
      <img src="@/assets/images/bg_green_top.png" />
    </div>

    <!-- 白白圖片（要在後層） -->
    <transition name="fade" mode="out-in">
      <img
        :key="currentImage"
        :src="currentImage"
        alt="白白"
        class="img behind-bg"
        @click="changeImageAndScroll"
      />
    </transition>
  </section>
</template>

<style scoped>
.bg_green_top {
  position: relative;
  z-index: 10; /* 背景在上方 */
}

.behind-bg {
  position: relative;
  z-index: 5; /* 白白在下方 */
}
</style>
