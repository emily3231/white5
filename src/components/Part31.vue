<script setup>
import { ref, nextTick, onMounted } from 'vue'
import iceRed from '@/assets/images/ice_rec.png'
import { useDefenseMessage } from '@/composables/useDefenseMessage'
import { useTypingEffect } from '@/composables/useTypingEffect'

// ✅ 打字特效 composable
const { displayedText, isTyping, typeText } = useTypingEffect(60)

const revealed = ref([true, false, false, false, true, false])
// 🛡 使用共用防護力 composable（會根據 revealed 自動更新）
const { message, defenseValue } = useDefenseMessage(revealed)

// 🔹 狀態控制
const step = ref(0)
const showOptions = ref(false)


const showNext = ref(false)

// ✅ 兩段文字
const texts = [
  '我是黑黑！白白的好朋友，也是這場回顧旅程中的守護員，只有準備好的人，才能往下一段走。',
  '準備好了嗎？來挑選你的冒險裝備吧！'
]

const currentIndex = ref(0)

// 🔹 第一步：元件載入時先打第一段
onMounted(() => {
  typeText(texts[currentIndex.value])
})

// 🔹 使用者點 ▼ 時才繼續打第二段（或進下一階段）
const nextText = () => {
  if (currentIndex.value === 0) {
    currentIndex.value = 1
    typeText(texts[currentIndex.value])
  } else {
    step.value = 1 // 第二段結束 → 進入下一階段
  }
}



// 🔹 顯示保險選項
function toggleOptions() {
  showOptions.value = true
  showNext.value = true 
  revealed.value = revealed.value.map(() => Math.random() > 0.5)

  nextTick(() => {
    const items = document.querySelectorAll('.ice-item')
    items.forEach((item, i) => {
      item.style.animationDelay = `${i * 0.15}s`
      item.classList.add('drop-in')
    })
  })
}

const emit = defineEmits(['goNextSection']) // ✅ 定義可發送事件

function goNext() {
  emit('goNextSection') // ✅ 通知父層 Home.vue
}
</script>

<template>
  <div class="part3-ckeck">
    <div class="part3-1 container">
      <h2 class="mb-4 green-color font50 c-font">＼探險裝備檢查／</h2>
      <div class="bear3-1">
        <img src="@/assets/images/bear3-1.gif" alt="熊裝備" />
      </div>
    </div>

    <div>
      <transition name="fade" mode="out-in">
        <div :key="step">
          <!-- 第一階段：黑黑說話 -->
          <div class="p3-rec" v-if="step === 0">
            <p class="text c-font" v-html="displayedText"></p>
            <div
              v-if="!isTyping"
              class="next-icon c-font"
              @click="nextText"
            >
              ▼
            </div>
          </div>

          <!-- 第二階段：顯示裝備 -->
          <div class="p3-rec" v-else>
            <p class="text c-font" v-html="displayedText"></p>

            <div class="button-group c-font">
              <button class="green_btn" @click="toggleOptions">你擅長的</button>
              <button class="green_btn" @click="toggleOptions">需補強的</button>
            </div>
               <!-- ▼ 只有在按過按鈕之後才出現 -->
            <div v-if="showNext" class="next-icon c-font" @click="goNext">▼</div>
            </div>

            <!-- 保險項目 -->
            <transition name="fade">
              <div v-if="showOptions" class="p3-ice mx-auto mb-4 row">
                <div
                  v-for="(option, i) in ['重疾','長照','壽險','醫療','意外','癌症']"
                  :key="i"
                  class="col-4 "
                >
                  <div class="ice_rec">
                    <img
                      v-if="revealed[i]"
                      :src="iceRed"
                      class=""
                    />
                    <div
                      class="ice_text"
                      :class="{ small: revealed[i] }"
                    >
                      {{ option }}
                    </div>
                  </div>
                </div>

                <p class="black-color mt-3 font24 n-font">
                  {{ message }}　    <!-- <span >{{ defenseValue }}%</span>  -->
                </p>
             


                <div class="hat_container">
                  <div class="hat">
                    <img src="@/assets/images/bear3-2_hat.png" />
                  </div>
                  <div class="bear3-2">
                    <img src="@/assets/images/bear3-2.png" />
                  </div>
                </div>
              </div>
            </transition>
        
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>



small{ font-weight: 0.6rem;}
</style>
