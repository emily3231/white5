<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import KV from './components/KV.vue'
import Part2 from './components/Part2.vue'
import Part31 from './components/Part31.vue'
import Part32 from './components/Part32.vue'
import Part33 from './components/Part33.vue'
import Part35 from './components/Part35.vue'
import Part4 from './components/Part4.vue'


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
</script>

<template>
  <main>
    <!-- 第1區 -->
    <section class="section" :style="{ background: colors[0] }">
      <div class="content">
        <h1>按下按鈕開始滑動體驗</h1>
        <button class="cta" @click="unlockScroll" :disabled="unlocked">
          {{ unlocked ? '已啟動' : '開始' }}
        </button>
        <p class="hint">(按下後會自動滑到下一區，可用滾輪切換區塊)</p>
        <KV />
      </div>
    </section>

    <!-- 第2區 -->
    <section class="section" :style="{ background: colors[1] }">
      <div class="content">
        <Part2 />
        <button class="next-btn" @click="nextSection">下一步 ➜ 第三區</button>
      </div>
    </section>

    <!-- 第3區 -->
    <section class="section" :style="{ background: colors[2] }">
      <div class="content">
         <h1><Part31 /></h1>
        <button class="next-btn" @click="nextSection">下一步 ➜ 第四區</button>
      </div>
    </section>

    <!-- 第4區 -->
    <section class="section" :style="{ background: colors[3] }">
      <div class="content">
        <h1><Part32 /></h1>
        <button class="next-btn" @click="nextSection">下一步 ➜ 第五區</button>
      </div>
    </section>

    <!-- 第5區 -->
    <section class="section" :style="{ background: colors[4] }">
      <div class="content">
          <h1><Part33 /></h1> 
        <button class="next-btn" @click="nextSection">下一步 ➜ 第六區</button>
      </div>
    </section>

    <!-- 第6區 -->
    <section class="section" :style="{ background: colors[5] }">
      <div class="content">
        <h1><Part35 /></h1> 
        <button class="next-btn" @click="nextSection">下一步 ➜ 第七區</button>
      </div>
    </section>

    <!-- 第7區 -->
    <section class="section" :style="{ background: colors[6] }">
      <div class="content">
        <h1><Part4 /></h1>
        <p>🎉 恭喜你滑完所有區塊！</p>
      </div>
    </section>
  </main>
</template>

<script>
const colors = [
  'linear-gradient(135deg, #f6d365, #fda085)',
  'linear-gradient(135deg, #a18cd1, #fbc2eb)',
  'linear-gradient(135deg, #84fab0, #8fd3f4)',
  'linear-gradient(135deg, #fccb90, #d57eeb)',
  'linear-gradient(135deg, #ff9a9e, #fecfef)',
  'linear-gradient(135deg, #cfd9df, #e2ebf0)',
  'linear-gradient(135deg, #fddb92, #d1fdff)'
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
.section {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  text-align: center;
}
.cta, .next-btn {
  margin-top: 24px;
  padding: 14px 28px;
  font-size: 18px;
  border: none;
  border-radius: 12px;
  background: #111;
  color: #fff;
  cursor: pointer;
  transition: 0.3s ease;
}
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
