<script setup>
import { ref, nextTick } from 'vue'
import iceRed from '@/assets/images/ice_rec.png' // ← 匯入遮罩圖

const step = ref(0)
const showOptions = ref(false)
const revealed = ref([])

const introText =
  '我是黑黑！白白的好朋友，也是這場回顧旅程中的守護員，只有準備好的人，才能往下一段走。'

const topOptions = ['重疾', '長照', '壽險']
const bottomOptions = ['醫療', '意外', '癌症']
const allOptions = [...topOptions, ...bottomOptions]

// 進入第二階段
function nextStep() {
  step.value = 1
}

// 按鈕 → 顯示保險選項並隨機覆蓋圖片
function toggleOptions() {
  showOptions.value = true
  revealed.value = allOptions.map(() => Math.random() > 0.5)

  nextTick(() => {
    const items = document.querySelectorAll('.option')
    items.forEach((item, i) => {
      item.style.animationDelay = `${i * 0.15}s`
      item.classList.add('drop-in')
    })
  })
}
</script>

<template>
  <div class="bg_green_lower"><img src="@/assets/images/bg_green_lower.png"></div>

  <div class="part3-1 container mt-100 part3-ckeck">
     <h2 class="mb-4 green-color font50">\探險裝備檢查/</h2>
    <div class="bear3-1" ><img src="@/assets/images/bear3-1.gif" alt="熊裝備"></div>
  </div>


  <div class="part3-1 container">
    
    <transition name="fade" mode="out-in">
       
      <div :key="step">
        <!-- 第一階段：黑黑登場 -->
       
        
        <template v-if="step === 0">
          <p class="text" v-html="introText"></p>
          <div class="next-icon" @click="nextStep">▼</div>
        </template>

        <!-- 第二階段：顯示按鈕與保險選項 -->
         
        <template v-else>
          <p class="text" v-html="introText"></p>

          <div class="button-group">
            <button class="green_btn" @click="toggleOptions">你擅長的</button>
            <button class="green_btn" @click="toggleOptions">需補強的</button>
          </div>

          <transition name="fade">
            <div v-if="showOptions" class="options">
              <div class="row top">
                <div
                  v-for="(item, index) in topOptions"
                  :key="'top-' + index"
                  class="option"
                >
                  <!-- 遮罩圖片 -->
                  <img
                    v-if="!revealed[index]"
                    :src="iceRed"
                    alt="ice cover"
                    class="cover-image"
                  />
                  <span :class="{ small: !revealed[index], faded: !revealed[index] }">
                    {{ item }}
                  </span>
                </div>
              </div>

              <div class="row bottom">
                <div
                  v-for="(item, index) in bottomOptions"
                  :key="'bottom-' + index"
                  class="option"
                >
                  <img
                    v-if="!revealed[index + 3]"
                    :src="iceRed"
                    alt="ice cover"
                    class="cover-image"
                  />
                  <span :class="{ small: !revealed[index + 3], faded: !revealed[index + 3] }">
                    {{ item }}
                  </span>
                </div>
              </div>
            </div>
          </transition>
        </template>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  margin-top: 150px;
  font-size: 1.5rem;
  line-height: 1.8;
}

.text {
  white-space: pre-line;
  margin-bottom: 40px;
}

/* ▼ 倒三角 */
.next-icon {
  font-size: 2rem;
  color: #000;
  cursor: pointer;
  animation: float 1.2s ease-in-out infinite;
  transition: transform 0.2s;
}
.next-icon:hover {
  transform: scale(1.2);
}
@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(10px); }
  100% { transform: translateY(0); }
}

/* 按鈕樣式 */
.button-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
}
.btn {
  background-color: #000;
  color: #fff;
  padding: 12px 24px;
  font-size: 1.2rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
}
.btn:hover {
  background-color: #333;
}

/* 保險選項 */
.options {
  margin-top: 20px;
  overflow: hidden;
}
.row {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 15px 0;
}
.option {
  position: relative;
  background-color: #f2f2f2;
  padding: 20px 35px;
  border-radius: 12px;
  font-weight: bold;
  opacity: 0;
  transform: translateY(-30px);
  overflow: hidden;
}

/* 遮罩圖片效果 */
.cover-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.75;
  z-index: 1;
  filter: brightness(0.8) blur(1px);
  transition: opacity 0.5s ease;
}

.option span {
  position: relative;
  z-index: 2;
  transition: 0.5s;
}
.option span.small {
  font-size: 1rem;
}
.option span.faded {
  opacity: 0.6;
}

/* 掉落動畫 */
@keyframes drop {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  80% {
    opacity: 1;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.drop-in {
  animation: drop 0.6s ease-out forwards;
}

/* 淡入動畫 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
