<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// ======== 第一組（固定 2018） ========
const digits1 = ref(['0', '0', '0', '0'])
const target1 = '2018'
const hasPlayed1 = ref(false)

// ======== 第二組（可任意數字，例如 38900） ========
const target2 = '3001' // 👉 你可以改這裡，例如 '125000'、'4800'
const formattedTarget2 = target2.replace(/\B(?=(\d{3})+(?!\d))/g, ',') // 自動加逗號
const digits2 = ref(formattedTarget2.split('').map(c => (c === ',' ? ',' : '0')))
const hasPlayed2 = ref(false)

let observer = null

// ======== 共用滾動函式 ========
const startRolling = (digits, target, hasPlayed) => {
  if (hasPlayed.value) return
  hasPlayed.value = true

  const cleanTarget = target.replace(/,/g, '')
  const chars = target.split('')

  let digitIndex = 0
  chars.forEach((char, i) => {
    if (char === ',') return // 跳過逗號

    let count = 0
    const final = parseInt(cleanTarget[digitIndex])
    digitIndex++

    const speed = 50 + i * 80
    const interval = setInterval(() => {
      count = (count + 1) % 10
      digits.value[i] = count.toString()
    }, speed)

    setTimeout(() => {
      clearInterval(interval)
      digits.value[i] = final.toString()
    }, 2500 + i * 400)
  })
}

// ======== IntersectionObserver 監看兩組 ========
onMounted(() => {
  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear')

          if (entry.target.classList.contains('counter1')) {
            startRolling(digits1, target1, hasPlayed1)
          } else if (entry.target.classList.contains('counter2')) {
            startRolling(digits2, formattedTarget2, hasPlayed2)
          }
        }
      })
    },
    { threshold: 0.3 }
  )

  document.querySelectorAll('.counter').forEach(el => observer.observe(el))
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})

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

const emit = defineEmits(['nextText', 'goNextSection'])

function goNext() {
  emit('goNextSection') // 讓父元件（Home.vue）知道「要滾動下一區」
}
</script>

<template>
    <div class="numbers-container">
    <div
      v-for="(group, idx) in groups"
      :key="idx"
      class="counter"
      :data-index="idx"
    >
      <template v-for="(d, i) in group.display" :key="i">
        <!-- 第二組在千位後加逗號 -->
        <span v-if="idx === 1 && i === group.commaAt" class="comma">,</span>
        <span class="digit">{{ d }}</span>
           <span v-if="showCursor" class="cursor" :class="{ dim: cursorDimmed }">|</span>
      </template>
    </div>
  </div>
 <div class="part2_center">

           <div class="start_year center ">
              <img src="../assets/images/start_year.png">
              <div class="start_year_text ">
                <h2 class="counter counter1">     
                  <span v-for="(d, i) in digits1" :key="i" class="digit">{{ d }}</span>
                  <span class="font36">年起</span></h2>
              </div>
           </div>
            <div class="bag"><img src="../assets/images/bag.png"></div>
           <div class="txt2 mt-4 font28">
            我們已經並肩走過<br>
            <h2 class="font96 mt-4 font96">
               <div class="counter counter2">
                <span
                  v-for="(d, i) in digits2"
                  :key="i"
                  :class="{ comma: d === ',' }"
                >
                  {{ d }}
                </span> 
                <span class="font48">天</span>

              </div>
               
         

            </h2>

            <div class="mt-4 font28">每一步都記錄在這趟冒險的地圖上<br>
            背起行囊，
            <span class="green-color">出發吧！
                <div class="next-icon c-font" @click="goNext"> ▼ </div>
            </span>
            <br>
            </div>
             
           </div>
             <div class="bear_bag" ><img src="../assets/images/bear_bag.gif"></div>

            <div class="part2_lower n-font" >
            <div class="fonr24" >
              我們的年度冒險 現在開始！</div>
             <div class="font12">
            數據來源：統計至 2025/12/31 前  </div>
             </div>
           
          
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

/* 淡入淡出 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.numbers-container {
  /* display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  margin: 150px 0; */
}



</style>
