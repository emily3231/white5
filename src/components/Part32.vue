<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

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
      '不是的，北極熊不會原地等待食物到來，而是會巡視好幾個地點尋找食物。這種分散風險的行為，就像保險一樣，透過支付保費，把風險轉移給保險公司，讓大家分攤損失，避免個人承受重大財務壓力。'
  },
  {
    title: '題目五: 北極熊口渴會喝水嗎？',
    prompt: '北極熊口渴會喝水嗎？（Yes / No）',
    answer:
      '幾乎不會！北極熊不太需要喝水，分解脂肪的化學反應來獲取水份喔！保險就像牠的毛皮，隨著季節換裝，隨著人生階段調整，才是聰明熊的選擇！'
  }
]

// 狀態
const phase = ref('intro') // intro → question → answer → reward
const currentQuestion = ref(null)
const displayText = ref('')
const isTyping = ref(false)
const fullText = ref('')
const charIndex = ref(0)
const speed = 35
let timer = null

// 打字音效
const typeSound = new Audio('/sounds/type.mp3')
typeSound.volume = 0.15

function startTypewriter(text, callback) {
  clearTimer()
  fullText.value = text
  displayText.value = ''
  charIndex.value = 0
  isTyping.value = true

  timer = setInterval(() => {
    if (charIndex.value < fullText.value.length) {
      displayText.value += fullText.value.charAt(charIndex.value)
      charIndex.value++

      try {
        const soundClone = typeSound.cloneNode()
        soundClone.play().catch(() => {})
      } catch {}
    } else {
      stopTypewriter()
      if (callback) callback()
    }
  }, speed)
}

function skipTypewriter() {
  if (!isTyping.value) return
  displayText.value = fullText.value
  stopTypewriter()
}

function stopTypewriter() {
  isTyping.value = false
  clearTimer()
}

function clearTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function getRandomQuestion() {
  const index = Math.floor(Math.random() * bank.length)
  return bank[index]
}

// 流程控制
function toQuestion() {
  currentQuestion.value = getRandomQuestion()
  phase.value = 'question'
  startTypewriter(currentQuestion.value.prompt)
}

function answer() {
  phase.value = 'answer'
  startTypewriter(currentQuestion.value.answer, () => {
    // 顯示完答案後進入送禮畫面
    setTimeout(() => {
      phase.value = 'reward'
    }, 1000)
  })
}

function restart() {
  phase.value = 'intro'
  displayText.value = ''
  startIntro()
}

function startIntro() {
  startTypewriter('我是企鵝先生，白白的好友兼情境導演～現在，要來問你一個問題：你準備好了嗎？')
}

onMounted(() => startIntro())
onBeforeUnmount(() => clearTimer())
</script>

<template>
  <div class=" part3-q">
    <h2 class="mb-4 green-color font50 pt-100 c-font">＼問問題挑戰／</h2>
    <p class="font24 black-color  c-font">嘿！想要寶物嗎？先答我一題！</p>
    <div class="bear3-3"><img src="@/assets/images/bear3-3.png" ></div>

    <div class="penguin3"><img src="@/assets/images/penguin3.gif" /></div>
    <div class="point_right"><img src="@/assets/images/point.png" /></div>
     
  <div class="p3-rec">
    <div class="quiz">
      <!-- 開場 -->
      <section v-if="phase === 'intro'">
        <p class="text" @click="skipTypewriter">{{ displayText }}</p>
        <button class="green_btn  c-font" @click="toQuestion" :disabled="isTyping">開始作答</button>
      </section>

      <!-- 題目 -->
      <section v-else-if="phase === 'question'">
        <h3>{{ currentQuestion.title }}</h3>
        <p class="text c-font" @click="skipTypewriter">{{ displayText }}</p>
        <div class="buttons ">
          <button class="green_btn c-font" @click="answer" :disabled="isTyping">Yes</button>
          <button class="green_btn c-font" @click="answer" :disabled="isTyping">No</button>
        </div>
      </section>

      <!-- 解答 -->
      <section v-else-if="phase === 'answer'">
        <p class="text" @click="skipTypewriter">{{ displayText }}</p>
      </section>

      <!-- 結束送東西 -->
      <section v-else-if="phase === 'reward'" class="reward">
        <h2 class=" c-font"> 恭喜你！</h2>
        <p class=" c-font">你獲得了「1 點小樹點數」！</p>
        <img src="@/assets/images/point.png" class="reward-img" />
        <button class="green_btn" @click="restart">再玩一次</button>
      </section>
    </div>
    </div>
         <div class="penguin">
            <div class="penguin3-1">
                <div class="point_left">
                  <img src="@/assets/images/point.png" >
                </div> 
                <div class="penguin3-1">
                 <img src="@/assets/images/penguin3-1.png" >
                </div>
              </div>

              <div class="center">
              <div class="key"><img src="@/assets/images/penguin_left.png" ></div>
              <div class="point">
                <!-- <div class=" font24 nfont">\ 恭喜獲得 1點小樹點 /</div> -->
                <img src="@/assets/images/penguin_right.png" ></div>
              <p class="font24 c-font black-color">答得漂亮，補給到手，繼續走！</p>
          </div>
        </div>
  </div>

</template>

<style scoped>
.point{ color: black;}
/* .penguin3-1 img{ width: 258px;} */
.reward {
  text-align: center;
  animation: fadeIn 0.8s ease;
}
.reward-img {
  width: 200px;
  margin: 20px auto;
  display: block;
}
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
