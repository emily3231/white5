<script setup>
import { ref, watch, nextTick } from 'vue'
import { useTypingEffect } from '@/composables/useTypingEffect'

// ✅ 共用打字特效 composable
const { displayedText, isTyping, typeText } = useTypingEffect(60) // 每字間隔 60ms

// ✅ 向父層傳事件
const emit = defineEmits(['nextText'])

// ✅ 文字陣列
const texts = [
  '我是白白！來自北極。<br>冰山的家變小了，所以我出發去旅行。',
  '一路上，我發現了許多故事，也想帶著你一起看看。願這段回顧成為一場療癒的旅程，帶著希望與勇氣走向未來。'
]

const currentIndex = ref(0)

// ✅ 初始化：打第一段
typeText(texts[currentIndex.value])

// ✅ 點擊倒三角：切換文字
function handleNext() {
  if (currentIndex.value < texts.length - 1) {
    currentIndex.value++
    typeText(texts[currentIndex.value])
  }
}

// ✅ 當進入最後一段時 → 等打完 + 停留 2 秒 → 觸發外層事件
watch(currentIndex, async (newIndex) => {
  await nextTick()
  if (newIndex === texts.length - 1) {
    const checkDone = setInterval(() => {
      if (!isTyping.value) {
        clearInterval(checkDone)
        setTimeout(() => {
          emit('nextText') // 通知外層解鎖
        }, 2000)
      }
    }, 500)
  }
})
</script>
<template>
  <div class="container">
    <div class="p2_rec">
      <transition name="fade" mode="out-in">
        <!-- 使用打字效果的文字 -->
        <p :key="currentIndex" class="text ">{{ displayedText }}</p>
      </transition>

      <!-- 顯示倒三角（打完才出現） -->
      <transition name="fade">
        <div
          v-if="!isTyping && currentIndex < texts.length - 1"
          class="next-icon"
          @click="handleNext"
        >
          ▼
        </div>
      </transition>
    </div>
    </div>
        <div class="center">
           <!-- <div class="bear1 center">
             <img src="@/assets/images/bear1.gif">
           </div> -->
        </div>

    

      

  
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
