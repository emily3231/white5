<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import KV from '../components/KV.vue'
import Part2 from '../components/Part2.vue'
import Part22 from '../components/Part22.vue'
import Part31 from '../components/Part31.vue'
import Part32 from '../components/Part32.vue'
import Part33 from '../components/Part33.vue'
import Part35 from '../components/Part35.vue'
import Part4 from '../components/Part4.vue'


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
function handleScroll(e) {
  if (!unlocked.value) return
  e.preventDefault()
  if (isScrolling) return
  isScrolling = true

  if (e.deltaY > 0) {
    currentIndex.value = Math.min(currentIndex.value + 1, sections.value.length - 1)
  } else {
    currentIndex.value = Math.max(currentIndex.value - 1, 0)
  }

  scrollToSection(currentIndex.value)
  setTimeout(() => (isScrolling = false), 800)
}

// 按鈕解鎖 + 自動滑到第二區
function unlockScroll() {
  if (unlocked.value) return
  unlocked.value = true

  // 移除滾動封鎖事件
  window.removeEventListener('wheel', preventDefault, { passive: false })
  window.removeEventListener('touchmove', preventDefault, { passive: false })
  window.removeEventListener('keydown', preventKeyScroll, { passive: false })

  // 啟用滾輪控制
  window.addEventListener('wheel', handleScroll, { passive: false })

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
              <button class="btn_y font44 c-font" @click="unlockScroll" :disabled="unlocked">
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
        <div class="import" style="height: 818px"><Part2 />
         
        </div>
        <div class="alarm">
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
      </div>
         <div class="bg_green_top"><img src="@/assets/images/bg_green_top.png"></div>
    </section>

    <!-- 第2-2區 -->
    <section  id="section3" class="section all_warp" :style="{ background: colors[1] }">
      <div class="content">
        <div class="import"><Part22 /></div>
      </div>
    </section>

    <!-- 第3～6區 -->
    <div  class="">
      <section class="section all_warp" :style="{ background: colors[2] }">
        <div class="bg_green_lower"><img src="@/assets/images/bg_green_lower.png"></div>
        <div class="content"><div class="import"><Part31 /></div></div>
      </section>

      <section class="section all_warp" :style="{ background: colors[2] }">
        <div class="content"><div class="import"><Part32 /></div></div>
      </section>

      <section class="section all_warp" :style="{ background: colors[2] }">
        <div class="content"><div class="import"><Part33 /></div></div>
      </section>

      <section class="section all_warp" :style="{ background: colors[2] }">
        <div class="content"><div class="import"><Part35 /></div></div>
      </section>
    </div>

    <!-- 第7區 -->
    <section class="section all_warp" :style="{ background: colors[2] }">
      <div class="content">
        <div class="import"><Part4 /></div>
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  text-align: center;
}

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
</style>
