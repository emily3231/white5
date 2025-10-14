<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import KV from '../components/KV.vue'
import Part2 from '../components/Part2.vue'
import Part22 from '../components/Part22.vue'
import Part31 from '../components/Part31.vue'
import Part32 from '../components/Part32.vue'
import Part33 from '../components/Part33.vue'
import Part34 from '../components/Part34.vue'
import Part35 from '../components/Part35.vue'
import Part4 from '../components/Part4.vue'
import Part41 from '../components/Part41.vue'


const sections = ref([])
const currentIndex = ref(0)
const unlocked = ref(false)
let isScrolling = false

// 鎖定滾動事件
function preventDefault(e) {
  e.preventDefault()
}
function preventKeyScroll(e) {
  const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ']
  if (keys.includes(e.key)) e.preventDefault()
}

// 平滑滾動
function scrollToSection(index) {
  const target = sections.value[index]
  if (target) target.scrollIntoView({ behavior: 'smooth' })
}

// 滾輪事件（僅解鎖後）
// function handleScroll(e) {
//   if (!unlocked.value) return
//   e.preventDefault()
//   if (isScrolling) return
//   isScrolling = true

//   if (e.deltaY > 0) {
//     currentIndex.value = Math.min(currentIndex.value + 1, sections.value.length - 1)
//   } else {
//     currentIndex.value = Math.max(currentIndex.value - 1, 0)
//   }

//   scrollToSection(currentIndex.value)
//   setTimeout(() => (isScrolling = false), 800)
// }

// 按鈕解鎖 + 自動滑到第二區
function unlockScroll() {
  if (unlocked.value) return
  unlocked.value = true

  // 移除滾動封鎖事件
  window.removeEventListener('wheel', preventDefault, { passive: false })
  window.removeEventListener('touchmove', preventDefault, { passive: false })
  window.removeEventListener('keydown', preventKeyScroll, { passive: false })

  // 啟用滾輪控制
  // window.addEventListener('wheel', handleScroll, { passive: false })

  // 滑到第2區
  currentIndex.value = 1
  scrollToSection(currentIndex.value)
}

// 下一步按鈕
function nextSection() {
  if (currentIndex.value < sections.value.length - 1) {
    currentIndex.value++
    scrollToSection(currentIndex.value)
  }
}

// 掛載 / 卸載
onMounted(() => {
  sections.value = Array.from(document.querySelectorAll('.section'))
  window.addEventListener('wheel', preventDefault, { passive: false })
  window.addEventListener('touchmove', preventDefault, { passive: false })
  window.addEventListener('keydown', preventKeyScroll, { passive: false })
})
onBeforeUnmount(() => {
  window.removeEventListener('wheel', preventDefault, { passive: false })
  window.removeEventListener('touchmove', preventDefault, { passive: false })
  window.removeEventListener('keydown', preventKeyScroll, { passive: false })
  window.removeEventListener('wheel', handleScroll, { passive: false })
})

// 兩張圖片
const images = [
  new URL('../assets/images/alert_light.png', import.meta.url).href,
  new URL('../assets/images/alert.png', import.meta.url).href
]

const currentImage = ref(images[0])
const isChanged = ref(false)

// 點圖片 → 換圖一次 + 滾動到第三區
function changeImageAndScroll() {
  if (!isChanged.value) {
    currentImage.value = images[1]
    isChanged.value = true
    setTimeout(() => {
      const section = document.getElementById('section3')
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
      }
    }, 500)
  }
}

// 一開始鎖定 alarm
const isLocked = ref(true)

// 監聽 Part2 傳回的 nextText
const handleNextText = () => {
  isLocked.value = false // 解鎖 alarm
}

// 點擊 alarm 的動作
const clickAlarm = () => {
  if (isLocked.value) return // 被鎖時不能點
  alert('Alarm 被點了！') // 測試用
}

// ✅ 按下 Part22 的 next-icon → 到 section31 後只能往上滾
function scrollToSection31() {
  const section = document.getElementById('section31')
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
    scrollMode.value = 'up' // ✅ 設定只能往上滾
  }
}

//  按下 Part31 的 
function scrollToSection32() {
  const section = document.getElementById('section32')
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
    scrollMode.value = 'up' // ✅ 設定只能往上滾
  }
}

//  按下 Part32 的 
function scrollToSection33() {
  const section = document.getElementById('section33')
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
    scrollMode.value = 'up' // ✅ 設定只能往上滾
  }
}


//  按下 Part33 的 
function scrollToSection34() {
  const section = document.getElementById('section34')
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
    scrollMode.value = 'up' // ✅ 設定只能往上滾
  }
}
//  按下 Part34 的 
function scrollToSection35() {
  const section = document.getElementById('section35')
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
    scrollMode.value = 'up' // ✅ 設定只能往上滾
  }
}
//  按下 Part35 的 
function scrollToSection4() {
  const section = document.getElementById('section4')
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
    scrollMode.value = 'up' // ✅ 設定只能往上滾
  }
}

//  按下 Part41 的 
function scrollToSection41() {
  const section = document.getElementById('section41')
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
    scrollMode.value = 'up' // ✅ 設定只能往上滾
  }
}
</script>

<template>
  <main>

   
    <div class="all all_warp"> <!--  背景中線：固定於畫面最底層 -->

    <div class="container overhide">
      <div class="center_line clild_center cell_hide">
        <img src="@/assets/images/center_line.png" alt="center line" />
      </div>
      <div class="center_line clild_center computer_hide">
        <img src="@/assets/images/center_line_cell.png" alt="center line cell" />
      </div>
    </div>

    <!-- 第1區 -->
    <section class="section all_warp" :style="{ background: colors[0] }">
      <div class="content">
        <div class="import"><KV /></div>
        <div class="grasscenter">
          <div class="center">
            <div class="btn_y_wrap">
              <button class="btn_y  c-font" @click="unlockScroll" :disabled="unlocked">
                {{ unlocked ? '已啟動' : 'START 開始' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 第2區 -->
    <section  class="section all_warp section2" :style="{ background: colors[0] }"> 
      <div class="content">
        <div class="import" style="height: 818px"><Part2 @nextText="handleNextText" />
         
        </div>
        <div
            class="alarm"
            :style="{ opacity: isLocked ? 0.5 : 1, pointerEvents: isLocked ? 'none' : 'auto' }"
          >
            <transition name="fade" mode="out-in">
              <img
                :key="currentImage"
                :src="currentImage"
                alt="白白"
                class="img"
                @click="changeImageAndScroll"
              />
            </transition>
          </div>
        <transition name="fade" mode="out-in">
   
    </transition>
      </div>

           <div class="center" style="position: absolute;
    top: 350px;">
           <div class="bear1 center" >
             <img src="@/assets/images/bear1.gif">
           </div>
        </div>
         <div class="bg_green_top"><img src="@/assets/images/bg_green_top.png"></div>
    </section>

    <!-- 第2-2區 -->
    <section  id="section3" class="section all_warp" :style="{ background: colors[1] }">
      <div class="content">
        <div class="import"> <Part22 @nextText="handleNextText" @goNextSection="scrollToSection31" />
        </div>
      </div>
    </section>


    <div  class="">
       <!-- 第31區 -->
      <section  id="section31" class="section all_warp" :style="{ background: colors[2] }">
        <div class="bg_green_lower"><img src="@/assets/images/bg_green_lower.png"></div>
        <div class="content"><Part31 @nextText="handleNextText" @goNextSection="scrollToSection32" /></div>
      </section>
      <!-- 第32區 -->
      <section id="section32" class="section all_warp" :style="{ background: colors[2] }">
        <div class="content"><Part32 @nextText="handleNextText" @goNextSection="scrollToSection33" /></div>
      </section>
      <!-- 第33區 -->
      <section id="section33"  class="section all_warp" :style="{ background: colors[2] }">
        <div class="content"><Part33 @nextText="handleNextText" @goNextSection="scrollToSection34" /></div>
      </section>
       <!-- 第34區 -->
      <section id="section34"  class="section all_warp" :style="{ background: colors[2] }">
        <div class="content"><Part34 @nextText="handleNextText" @goNextSection="scrollToSection35" /></div>
      </section>
      <!-- 第35區 -->
      <section id="section35"  class="section all_warp" :style="{ background: colors[2] }">
        <div class="content"><Part35 @nextText="handleNextText" @goNextSection="scrollToSection4" /></div>
      </section>
    </div>

    <!-- 第4區 -->
    <section  id="section4"  class="section all_warp" :style="{ background: colors[2] }">
      <div class="content">
       <Part4 @nextText="handleNextText" @goNextSection="scrollToSection41" />
      </div>
    </section>
    <!-- 第41區 -->
    <section id="section41"   class="section all_warp" :style="{ background: colors[2] }">
      <div class="content">
        <div class="import"><Part41 /></div>
      </div>
    </section>
    </div>
  </main>
</template>

<script>
const colors = [
  'linear-gradient(135deg, #75C483, #75C483)',
  'linear-gradient(135deg, #ECFF9E, #ECFF9E)',
  'linear-gradient(135deg, #f5f5f5, #f5f5f5)'
]
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
  overflow: hidden;
}



/* 手機切換用 */
.cell_hide {
  display: block;
}
.computer_hide {
  display: none;
}

@media (max-width: 768px) {
  .cell_hide {
    display: none;
  }
  .computer_hide {
    display: block;
  }
}




/* 主要區塊 */

.section {
 /* //height: 100vh;    */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  text-align: center;
  height: auto; 
}
/* @media (max-width: 768px) {
  .section {
  height: auto; }
} */
.content {
  width: 100%;

}
.bg_green_top{   
   position: absolute;
   bottom: 0px;
  
  }
   /* .bg_green_top img{ height: 700px;}     */

.alarm {
  margin-top: -200px;
  z-index: 5;
  cursor: pointer;
}
.alarm img {
  margin-top: -250px !important;
  z-index: 5;
}

.cta:hover:enabled,
.next-btn:hover {
  background: #333;
  transform: scale(1.05);
}
.cta:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.hint {
  margin-top: 12px;
  font-size: 16px;
  opacity: 0.9;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
