<script setup>
import { ref } from 'vue'

const texts = [
  '我是白白！來自北極。<br>冰山的家變小了，所以我出發去旅行。',
  '一路上，我發現了許多故事，也想帶著你一起看看。願這段回顧成為一場療癒的旅程，帶著希望與勇氣走向未來。'
]

const currentIndex = ref(0)

function nextText() {
  if (currentIndex.value < texts.length - 1) {
    currentIndex.value++
  }
}
</script>

<template>
  <div class="container">
     <div class="p2_rec ">
    <transition name="fade" mode="out-in">
      <!-- 使用 v-html 讓 <br> 被解析 -->
      <p :key="currentIndex" class="text" v-html="texts[currentIndex]"></p>
    </transition>

    <!-- 只在第一段顯示倒三角 -->
    <transition name="fade" >
      <div
        v-if="currentIndex === 0"
        class="next-icon"
        @click="nextText"
      >
        ▼
      </div>

    </transition>
</div>
</div>

        <div class="center">
           <div class="bear1 center">
             <img src="@/assets/images/bear1.gif">
           </div>
        </div>

        <div class="bg_green_top"><img src="@/assets/images/bg_green_top.png"></div>

  
</template>

<style scoped>
.container {
  text-align: center;
  margin-top: 150px;
  font-size: 1rem;
  line-height: 1.8;
}


.text {
  white-space: pre-line; /* 保留換行格式 */
  color: black;
}

.p2_rec{ 
  width: 100% !important;
max-width:100%!important;
}

/* 倒三角 icon */
.next-icon {
  margin-top: 20px;
  font-size: 1rem;
  color: black;
  cursor: pointer;
  animation: float 1.2s ease-in-out infinite;
  transition: transform 0.2s, opacity 0.3s;
}

.next-icon:hover {
  transform: scale(1.2);
}

/* 上下浮動動畫 */
@keyframes float {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(10px); }
  100% { transform: translateY(0); }
}

/* 淡入淡出 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
