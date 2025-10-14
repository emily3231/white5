<script setup>
import { ref, onMounted } from 'vue'
import { useTypingEffect } from '@/composables/useTypingEffect'

// 成就清單
const achievements = [
  '你已解鎖「潛力待發者」成就！',
  '你已解鎖「暖身新手村」成就！',
  '你已解鎖「穩健前行者」成就！',
  '你已解鎖「鐵腿傳說」成就！'
]

const { displayedText, showCursor, cursorDimmed, typeText } = useTypingEffect(60, 500)
const isTypingDone = ref(false) // 控制「下一步」出現

async function showRandomAchievement() {
  isTypingDone.value = false
  const randomIndex = Math.floor(Math.random() * achievements.length)
  const text = achievements[randomIndex]

  // 打字特效
  await typeText(text)

  // ✅ 延遲 2 秒再出現「下一步」
  setTimeout(() => {
    isTypingDone.value = true
  }, 2000)
}

onMounted(() => {
  showRandomAchievement()
})

const emit = defineEmits(['goNextSection'])
function goNext() {
  emit('goNextSection')
}
</script>


<template>
  <div class="mt-150 part3_step text-center">
    <h2 class="mb-4 mt-5 green-color font50 c-font">＼步數回顧／</h2>
    <p class="font24 black-color c-font">你的雙腳，今年踏遍了多少風景？</p>

    <div class="step_img"><img src="@/assets/images/step.png" /></div>

    <div class="step_warp">
      <div class="step center mx-auto">
        <span class="font-3 font96">426萬</span>
        <span class="font-2 mt-5 font48">步</span>
      </div>
      <div class="font12 black mt-3">數據來源：統計至 2025/12/31 前</div>
    </div>

    <div class="p3-rec mx-auto mb-4 mt-5 bear_step">
      <div class="row center align-items-center">
        <div class="col-md-4 bear-left">
          <img src="@/assets/images/bear_step.gif" />
        </div>
        <div class="col-md-8 achievement">
          <p class="font28 c-font black" @click="showRandomAchievement">
            {{ displayedText }}
            
          </p>
              <transition name="fade-in">
            <div
              v-if="isTypingDone"
              class="next-icon c-font"
              @click="goNext"
            >
              下一步 ▼
            </div>
          </transition>
            <!-- <span
              v-if="showCursor"
              class="cursor"
              :class="{ dim: cursorDimmed }"
            >|</span> -->
            
        </div>
        <div class="tru">
          <img src="@/assets/images/tru.png" />
        </div>
      </div>
    </div>

    <p class="font24 black-color n-font">
      你知道嗎？<br />
      踏出越多步，FitBack App 就能為冒險儲備更多小樹點唷！
    </p>
  </div>
</template>

<style scoped>
.next-icon { text-align: left;}
.black {
  color: black;
}

.cursor {
  display: inline-block;
  width: 8px;
  animation: blink 0.8s infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.cursor.dim {
  opacity: 0.3;
}
.bear-left img {
  max-width: 220px;
}



.achievement {
  text-align: left;
}

.tru img {
  width: 80px;
  margin-top: 10px;
}

/* ✅ 淡入動畫 */
.fade-in-enter-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.fade-in-leave-active {
  transition: opacity 0.4s ease;
}
.fade-in-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-in-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
