<script setup>
import { ref, onMounted } from 'vue'
import { useTypingEffect } from '@/composables/useTypingEffect' // ✅ 共用打字特效

// 題庫
const bank = [
  {
    title: '題目一: 北極熊會感冒嗎？',
    prompt: '北極熊會感冒嗎？（Yes / No）',
    answer:
      '會的！北極熊也可能出現感冒或呼吸道疾病。雖然牠們生活在極寒環境，但生病一樣會削弱牠們的抵抗力。就像我們一樣，小病或許健保能支應，但若遇到額外支出，商業保險就是補足保障的後盾。'
  },
  {
    title: '題目二: 保險是不是投機？',
    prompt: '保險是不是投機？（Yes / No）',
    answer:
      '不是。保險是透過支付保費，把風險轉移給保險公司，讓大家分攤損失，避免個人承受重大財務壓力，與賭博追求獲利的本質不同。'
  },
  {
    title: '題目三: 保險是不是「老了」才重要？',
    prompt: '保險是不是「老了」才重要？（Yes / No）',
    answer:
      '保險應隨人生階段調整，例如年輕人重醫療險，成家後需壽險，退休則重長照與醫療保障。'
  },
  {
    title: '題目四: 北極熊是不是靠運氣生活？',
    prompt: '北極熊是不是靠運氣生活？（Yes / No）',
    answer:
      '不是的，北極熊不會原地等待食物到來，而是會巡視好幾個地點尋找食物。這種分散風險的行為，就像保險一樣，透過支付保費，把風險轉移給保險公司，讓大家分攤損失。'
  },
  {
    title: '題目五: 北極熊口渴會喝水嗎？',
    prompt: '北極熊口渴會喝水嗎？（Yes / No）',
    answer:
      '幾乎不會！北極熊不太需要喝水，分解脂肪的化學反應來獲取水份喔！保險就像牠的毛皮，隨著季節換裝、隨著人生階段調整，才是聰明熊的選擇！'
  }
]

// ✅ 共用打字特效 composable
const { displayedText, showCursor, cursorDimmed, typeText } = useTypingEffect(35, 400)

// ✅ 狀態
const phase = ref('intro') // intro → question → answer → reward
const currentQuestion = ref(null)
const isTyping = ref(false)

// ✅ 音效（可選）
const typeSound = new Audio('/sounds/type.mp3')
typeSound.volume = 0.1

// 點擊跳過
const skipTyping = () => {
  // 若正在打字，就立即顯示完整文字
  if (isTyping.value) {
    displayedText.value = displayedText.value // 保留現有內容
  }
}

// 隨機出題
function getRandomQuestion() {
  const index = Math.floor(Math.random() * bank.length)
  return bank[index]
}

// ✅ 流程控制
function toQuestion() {
  currentQuestion.value = getRandomQuestion()
  phase.value = 'question'
  startTyping(currentQuestion.value.prompt)
}

function answer() {
  phase.value = 'answer'
  startTyping(currentQuestion.value.answer, () => {
    setTimeout(() => (phase.value = 'reward'), 1000)
  })
}

function restart() {
  phase.value = 'intro'
  startIntro()
}

// ✅ 啟動打字（帶音效）
function startTyping(text, callback) {
  displayedText.value = ''
  isTyping.value = true
  typeText(text)
  playTypingSound()
  setTimeout(() => {
    isTyping.value = false
    if (callback) callback()
  }, text.length * 35 + 400) // 根據字數估算結束時間
}

// ✅ 開場白
function startIntro() {
  startTyping('我是企鵝先生，白白的好友兼情境導演～現在，要來問你一個問題：你準備好了嗎？')
}

function playTypingSound() {
  const soundClone = typeSound.cloneNode()
  soundClone.play().catch(() => {})
}

onMounted(() => startIntro())


const emit = defineEmits(['goNextSection']) // ✅ 定義可發送事件

function goNext() {
  emit('goNextSection') // ✅ 通知父層 Home.vue
}
</script>

<template>
  <div class="part3-q">
    <h2 class="mb-4 green-color font50 c-font">＼問問題挑戰／</h2>
    <p class="font24 black-color c-font">嘿！想要寶物嗎？先答我一題！</p>

    <div class="bear3-3"><img src="@/assets/images/bear3-3.png" /></div>
    <div class="penguin3"><img src="@/assets/images/penguin3.gif" /></div>

    <div class="">
         <div class="point_left"><img src="@/assets/images/point.png" /></div>
         <div class="point_right">
            <img src="@/assets/images/point.png">
        </div>
      <div class="quiz">
        <!-- 開場 -->
        <section class="p3-rec" v-if="phase === 'intro'">
          <p class="text c-font" @click="skipTyping">
            {{ displayedText }}
            <!-- <span v-if="showCursor" class="cursor" :class="{ dim: cursorDimmed }">|</span> -->
          </p>
          <button class="green_btn c-font" @click="toQuestion">開始作答</button>
        </section>

        <!-- 題目 -->
        <section class="p3-rec" v-else-if="phase === 'question'">
          <h3 class="c-font">{{ currentQuestion.title }}</h3>
          <p class="text c-font" @click="skipTyping">
            {{ displayedText }}
            <!-- <span v-if="showCursor" class="cursor" :class="{ dim: cursorDimmed }">|</span> -->
          </p>
          <div class="buttons">
            <button class="green_btn c-font" @click="answer">Yes</button>
            <button class="green_btn c-font" @click="answer">No</button>
          </div>
        </section>

        <!-- 解答 -->
        <section  class="p3-rec" v-else-if="phase === 'answer'">
          <p class="text c-font" @click="skipTyping">
            {{ displayedText }}
            <!-- <span v-if="showCursor" class="cursor" :class="{ dim: cursorDimmed }">|</span> -->
          </p>
        </section>

        <!-- 獎勵 -->
        <section v-else-if="phase === 'reward'" class="reward">

          <div  class="p3-rec">
          <h2 class="c-font">恭喜你！</h2>
          <p class="c-font">你獲得了「1 點小樹點數」！</p>
              <div class="next-icon c-font" @click="goNext">下一步 ▼ </div>
          </div>

     <!-- <div class="penguin"> -->
      <div class="penguin3-1">
     
        <div class="penguin3-1"><img src="@/assets/images/penguin3-1.png" /></div>
      </div>
      <div class="center">
        <div class="key"><img src="@/assets/images/penguin_left.png" /></div>
        <div class="point"><img src="@/assets/images/penguin_right.png" /></div>
        <p class="font24 n-font black-color">答得漂亮，補給到手，繼續走！</p>

      </div>
    <!-- </div> -->
          
          <!-- <img src="@/assets/images/point.png" class="reward-img" />
          <button class="green_btn" @click="restart">再玩一次</button> -->
        </section>

        
      </div>
    </div>

   
  </div>
</template>

<style scoped>
.cursor {
  display: inline-block;
  width: 8px;
  animation: blink 0.8s infinite;
}
.cursor.dim {
  opacity: 0.3;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
/* .reward {
  text-align: center;
  animation: fadeIn 0.8s ease;
}
.reward-img {
  width: 200px;
  margin: 20px auto;
  display: block;
} */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
