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

/* -----------------------------------------
   狀態控制
----------------------------------------- */
const sections = ref([])
const currentIndex = ref(0)
let isScrolling = false
const unlocked = ref(false)

// 每一區的鎖定狀態（true=鎖住）
const lockedSections = ref([])

// 手機觸控位置
let touchStartY = 0
let touchEndY = 0

onMounted(() => {
  sections.value = Array.from(document.querySelectorAll('.section'))
  lockedSections.value = sections.value.map(() => true)
  lockedSections.value[0] = false // 第一區可動

  window.addEventListener('wheel', handleScroll, { passive: false })
  window.addEventListener('touchstart', handleTouchStart, { passive: false })
  window.addEventListener('touchmove', handleTouchMove, { passive: false })
})
onBeforeUnmount(() => {
  window.removeEventListener('wheel', handleScroll, { passive: false })
  window.removeEventListener('touchstart', handleTouchStart, { passive: false })
  window.removeEventListener('touchmove', handleTouchMove, { passive: false })
})

/* -----------------------------------------
   滾動控制邏輯（桌機 + 手機）
----------------------------------------- */
function scrollToSection(index) {
  const target = sections.value[index]
  if (target) target.scrollIntoView({ behavior: 'smooth' })
}

function handleScroll(e) {
  e.preventDefault()
  if (isScrolling) return
  isScrolling = true

  const direction = e.deltaY > 0 ? 'down' : 'up'
  scrollControl(direction)
  setTimeout(() => (isScrolling = false), 800)
}

function handleTouchStart(e) {
  touchStartY = e.touches[0].clientY
}

function handleTouchMove(e) {
  touchEndY = e.touches[0].clientY
  const deltaY = touchStartY - touchEndY
  if (Math.abs(deltaY) < 30) return // 避免誤觸
  e.preventDefault()
  if (isScrolling) return
  isScrolling = true

  const direction = deltaY > 0 ? 'down' : 'up'
  scrollControl(direction)
  setTimeout(() => (isScrolling = false), 800)
}

function scrollControl(direction) {
  if (direction === 'down') {
    // 下滑只能到已解鎖的下一區
    if (!lockedSections.value[currentIndex.value + 1]) {
      currentIndex.value = Math.min(currentIndex.value + 1, sections.value.length - 1)
      scrollToSection(currentIndex.value)
    }
  } else {
    // 上滑永遠允許
    if (currentIndex.value > 0) {
      currentIndex.value = Math.max(currentIndex.value - 1, 0)
      scrollToSection(currentIndex.value)
    }
  }
}

/* -----------------------------------------
   START 解鎖第2區
----------------------------------------- */
function unlockScroll() {
  if (unlocked.value) return
  unlocked.value = true
  lockedSections.value[1] = false // ✅ 解鎖 section2
  currentIndex.value = 1
  scrollToSection(1)
}

/* -----------------------------------------
   Alarm 區邏輯
----------------------------------------- */
const isLocked = ref(true)
const images = [
  new URL('../assets/images/alert_light.png', import.meta.url).href,
  new URL('../assets/images/alert.png', import.meta.url).href
]
const currentImage = ref(images[0])
const isChanged = ref(false)

function handleNextText() {
  isLocked.value = false // ✅ Part2 打完字後解鎖 alarm
}

function changeImageAndScroll() {
  if (isLocked.value) return
  if (!isChanged.value) {
    currentImage.value = images[1]
    isChanged.value = true
    const nextIndex = currentIndex.value + 1
    lockedSections.value[nextIndex] = false // ✅ 解鎖 section3
    setTimeout(() => {
      const section = document.getElementById('section3')
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
        currentIndex.value = nextIndex
        // 再鎖住之後的
        for (let i = nextIndex + 1; i < lockedSections.value.length; i++) {
          lockedSections.value[i] = true
        }
      }
    }, 500)
  }
}

/* -----------------------------------------
   各 goNext 控制
----------------------------------------- */
function goNext(fromId, toId) {
  const nextSection = document.getElementById(toId)
  const fromIndex = sections.value.findIndex(s => s.id === fromId)
  const toIndex = sections.value.findIndex(s => s.id === toId)
  if (nextSection && fromIndex >= 0 && toIndex >= 0) {
    lockedSections.value[toIndex] = false // ✅ 解鎖下一區
    
    nextSection.scrollIntoView({ behavior: 'smooth' })
    currentIndex.value = toIndex
    // 再鎖後面的
    for (let i = toIndex + 1; i < lockedSections.value.length; i++) {
      lockedSections.value[i] = true
    }
  }
}
</script>

<template>
  <main>
    <div class="all all_warp">

      <!-- 背景中心線


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

    <!-- 第2區 (Alarm) -->
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
        <div class="import"> <Part22 @goNextSection="() => goNext('section3', 'section31')" />
        </div>
      </div>
    </section>


    <div  class="">
       <!-- 第31區 -->
      <section  id="section31" class="section all_warp" :style="{ background: colors[2] }">
        <div class="bg_green_lower"><img src="@/assets/images/bg_green_lower.png"></div>
        <div class="content"> <Part31 @goNextSection="() => goNext('section31', 'section32')" /></div>
      </section>
      <!-- 第32區 -->
      <section id="section32" class="section all_warp" :style="{ background: colors[2] }">
        <div class="content"> <Part32 @goNextSection="() => goNext('section32', 'section33')" /></div>
      </section>
      <!-- 第33區 -->
      <section id="section33"  class="section all_warp" :style="{ background: colors[2] }">
        <div class="content"><Part33 @goNextSection="() => goNext('section33', 'section34')" /></div>
      </section>
       <!-- 第34區 -->
      <section id="section34"  class="section all_warp" :style="{ background: colors[2] }">
        <div class="content"><Part34 @goNextSection="() => goNext('section33', 'section35')" /></div>
      </section>
      <!-- 第35區 -->
      <section id="section35"  class="section all_warp" :style="{ background: colors[2] }">
        <div class="content"><Part35 @goNextSection="() => goNext('section35', 'section4')" /></div>
      </section>
    </div>

    <!-- 第4區 -->
    <section  id="section4"  class="section all_warp" :style="{ background: colors[2] }">
      <div class="content">
       <Part4 @goNextSection="() => goNext('section4', 'section41')" />
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
