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

// 平滑滾動到指定區塊
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
  // 初始鎖住滾動
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

// 預設顯示第一張
const currentImage = ref(images[0])
const isChanged = ref(false)

// 點圖片 → 換圖一次 + 滾動到第三區
function changeImageAndScroll() {
  if (!isChanged.value) {
    // 1️⃣ 換圖片
    currentImage.value = images[1]
    isChanged.value = true

    // 2️⃣ 延遲 0.5 秒後滾動（讓換圖動畫先顯示）
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
    <!-- 第1區 -->
    <section class="section all_warp " :style="{ background: colors[0] }">
      <div class="content">

        <KV />
        <div class="grasscenter ">
        <button class="login_btn center" @click="unlockScroll" :disabled="unlocked">
          <img src="../assets/images/login_btn.png"> 
        </button>
                  {{ unlocked ? '已啟動' : '往下探索' }}
        </div>

      <!-- <div class="grasscenter ">
        <div class="login_btn center" > <img src="../assets/images/login_btn.png"></div>
      <p class="mt-3 black">此為保戶頁</p>
      </div> -->

      </div>
    </section>

    <!-- 第2區 -->

    <section class="section all_warp " :style="{ background: colors[0] }">
      <div class="content">
        <Part2 />
        
      <div class="alarm"  >
     <transition name="fade" mode="out-in" >
      <img
        :key="currentImage"
        :src="currentImage"
        alt="白白"
        class="img"
        @click=" changeImageAndScroll"
      />
     </transition>
     </div>
        <!-- <button class="next-btn" @click="nextSection">下一步 ➜ 第三區</button> -->
      </div>
    </section>

     

    <!-- 第2-2區 -->
    <section  id="section3"    class="section all_warp" :style="{ background: colors[1] }">
      <div class="content">
        <Part22 />
        
   <transition name="fade" mode="out-in">
    
    </transition>
         <!-- <button class="next-btn" @click="changeImageAndScroll">下一步 ➜</button>  -->
      </div>
    </section>

 <div class="container overhide" >
        <div class="center_line clild_center cell_hide"><img src="@/assets/images/center_line.png"></div>
        <div class="center_line clild_center computer_hide"><img src="@/assets/images/center_line_cell.png"></div>
  </div> 

  <div class="part3 text-center ">
    <!-- 第3區 -->
    <section class="section all_warp " :style="{ background: colors[2] }">
      <div class="content">
         <h1><Part31 /></h1>
        <!-- <button class="next-btn" @click="nextSection">下一步 ➜ </button> -->
      </div>
    </section>

    <!-- 第4區 -->
    <section class="section all_warp " :style="{ background: colors[2] }">
      <div class="content">
        <h1><Part32 /></h1>
        <!-- <button class="next-btn" @click="nextSection">下一步 ➜ </button> -->
      </div>
    </section>

    <!-- 第5區 -->
    <section class="section all_warp " :style="{ background: colors[2] }">
      <div class="content">
          <h1><Part33 /></h1> 
        <!-- <button class="next-btn" @click="nextSection">下一步 ➜ </button> -->
      </div>
    </section>

    <!-- 第6區 -->
    <section class="section all_warp " :style="{ background: colors[2] }">
      <div class="content">
        <h1><Part35 /></h1> 
        <!-- <button class="next-btn" @click="nextSection">下一步 ➜</button> -->
      </div>
    </section>
</div>
    <!-- 第7區 -->
    <section class="section all_warp " :style="{ background: colors[2] }">
      <div class="content">
        <h1><Part4 /></h1>
        <p>🎉 恭喜你滑完所有區塊！</p>
      </div>
    </section>
  </main>
</template>

<script>
const colors = [
  'linear-gradient(135deg, #75C483, #75C483)',
  'linear-gradient(135deg, #ECFF9E, #ECFF9E)',
  'linear-gradient(135deg, #f5f5f5, #f5f5f5)',
  
]
</script>

<style scoped>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html, body {
  height: 100%;
  overflow: hidden;
}
.alarm{
    margin-top: -30px;   z-index: 5;}
.alarm img{
   margin-top: -250px !important;
   z-index: 5;
}

.content{ width: 100%;}

.center_line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1; /* 線比背景高，但比主圖片低 */
  display: flex;
  justify-content: center;
}

.section {
  /* height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  text-align: center;
   z-index: 5;
 

}
button{ border: 0px;
    background: none;
    
    
  }
/* .cta, .next-btn {
  margin-top: 24px;
  padding: 14px 28px;
  font-size: 18px;
  border: none;
  border-radius: 12px;
  background: #111;
  color: #fff;
  cursor: pointer;
  transition: 0.3s ease;
} */
.cta:hover:enabled, .next-btn:hover {
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
