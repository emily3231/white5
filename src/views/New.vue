<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// 各區元件
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
let scrollReleased = false // ✅ 新增狀態：是否已完全解除滾輪鎖定

// 🔒 初始鎖定所有滾動操作
function preventDefault(e) {
  e.preventDefault()
}
function preventKeyScroll(e) {
  const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ']
  if (keys.includes(e.key)) e.preventDefault()
}

// ✅ 平滑滾動到指定區塊（暫時解除 → 完成後恢復）
function scrollToSection(index) {
  const target = sections.value[index]
  if (!target) return

  // 暫時解除滾輪事件，避免動畫干擾
  window.removeEventListener('wheel', handleScroll, { passive: false })
  target.scrollIntoView({ behavior: 'smooth' })

  // 🕒 約 1 秒後恢復滾輪控制（除非到最後一區）
  setTimeout(() => {
    if (!scrollReleased && unlocked.value && currentIndex.value < sections.value.length - 1) {
      window.addEventListener('wheel', handleScroll, { passive: false })
    }
  }, 1000)
}

// 🌀 滾輪控制（上下切換）
function handleScroll(e) {
  if (!unlocked.value || scrollReleased) return // 若尚未解鎖或已釋放自由滾動則忽略
  e.preventDefault()
  if (isScrolling) return
  isScrolling = true

  if (e.deltaY > 0) {
    currentIndex.value = Math.min(currentIndex.value + 1, sections.value.length - 1)
  } else {
    currentIndex.value = Math.max(currentIndex.value - 1, 0)
  }

  scrollToSection(currentIndex.value)

  // ✅ 若滾到最後一區 → 自動解除滾輪鎖定
  if (currentIndex.value === sections.value.length - 1) {
    releaseScrollLock()
  }

  setTimeout(() => (isScrolling = false), 800)
}

// 🔓 解鎖滾輪 → 開啟分段滾動
function unlockScroll() {
  if (unlocked.value) return
  unlocked.value = true

  // 移除初始鎖定
  window.removeEventListener('wheel', preventDefault, { passive: false })
  window.removeEventListener('touchmove', preventDefault, { passive: false })
  window.removeEventListener('keydown', preventKeyScroll, { passive: false })

  // 啟用滾輪控制
  window.addEventListener('wheel', handleScroll, { passive: false })

  // 自動滾到第2區
  currentIndex.value = 1
  scrollToSection(currentIndex.value)
}

// ⏭ 下一步按鈕控制滾動
function nextSection() {
  if (currentIndex.value < sections.value.length - 1) {
    currentIndex.value++
    scrollToSection(currentIndex.value)
    // 到最後一區也要釋放滾輪
    if (currentIndex.value === sections.value.length - 1) {
      releaseScrollLock()
    }
  }
}

// ✅ 解除所有滾輪鎖定 → 可自由滾動
function releaseScrollLock() {
  if (scrollReleased) return
  scrollReleased = true
  window.removeEventListener('wheel', handleScroll, { passive: false })
  window.removeEventListener('keydown', preventKeyScroll, { passive: false })
  console.log('🟢 已到最後一區，自由滾動已開啟')
}

// 掛載 / 卸載事件
onMounted(() => {
  sections.value = Array.from(document.querySelectorAll('.section'))
  // 初始完全鎖定滾輪
  window.addEventListener('wheel', preventDefault, { passive: false })
  window.addEventListener('touchmove', preventDefault, { passive: false })
  window.addEventListener('keydown', preventKeyScroll, { passive: false })
})
onBeforeUnmount(() => {
  // 清理所有事件
  window.removeEventListener('wheel', preventDefault, { passive: false })
  window.removeEventListener('touchmove', preventDefault, { passive: false })
  window.removeEventListener('keydown', preventKeyScroll, { passive: false })
  window.removeEventListener('wheel', handleScroll, { passive: false })
})

// 圖片互動部分（原封不動）
const images = [
  new URL('../assets/images/alert_light.png', import.meta.url).href,
  new URL('../assets/images/alert.png', import.meta.url).href
]
const currentImage = ref(images[0])
const isChanged = ref(false)

function changeImageAndScroll() {
  if (!isChanged.value) {
    currentImage.value = images[1]
    isChanged.value = true
    setTimeout(() => {
      const section = document.getElementById('section3')
      if (section) section.scrollIntoView({ behavior: 'smooth' })
    }, 500)
  }
}
</script>

<template>
  <main>
    <!-- 第1區 -->
    <section class="section all_warp" :style="{ background: colors[0] }">
      <div class="content">
        <KV />
        <div class="grasscenter">
          <button class="login_btn center" @click="unlockScroll" :disabled="unlocked">
            <img src="../assets/images/login_btn.png" />
          </button>
          {{ unlocked ? '已啟動' : '往下探索' }}
        </div>
      </div>
    </section>

    <!-- 第2區 -->
    <section class="section all_warp" :style="{ background: colors[0] }">
      <div class="content">
        <Part2 />
        <div class="alarm center">
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
        <!-- <button class="next-btn" @click="nextSection">下一步 ➜</button> -->
      </div>
    </section>

    <!-- 第2-2區 -->
    <section id="section3" class="section all_warp" :style="{ background: colors[1] }">
      <div class="content">
        <Part22 />
        <button class="next-btn" @click="nextSection">下一步 ➜</button>
      </div>
    </section>

    <!-- 第3～6區 -->
    <div class="part3 text-center">
      <section class="section all_warp" :style="{ background: colors[2] }">
        <div class="content">
          <Part31 />
          <button class="next-btn" @click="nextSection">下一步 ➜</button>
        </div>
      </section>

      <section class="section all_warp" :style="{ background: colors[2] }">
        <div class="content">
          <Part32 />
          <button class="next-btn" @click="nextSection">下一步 ➜</button>
        </div>
      </section>

      <section class="section all_warp" :style="{ background: colors[2] }">
        <div class="content">
          <Part33 />
          <button class="next-btn" @click="nextSection">下一步 ➜</button>
        </div>
      </section>

      <section class="section all_warp" :style="{ background: colors[2] }">
        <div class="content">
          <Part35 />
          <button class="next-btn" @click="nextSection">下一步 ➜</button>
        </div>
      </section>

      <!-- 第7區 -->
      <section class="section all_warp" :style="{ background: colors[2] }">
        <div class="content">
          <Part4 />
          <p>🎉 恭喜你滑完所有區塊！</p>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
// 顏色定義
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


/* .section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
} */


button {
  border: 0;
  background: none;
}
.next-btn {
  margin-top: 40px;
  background: #fff;
  color: #333;
  border-radius: 20px;
  padding: 10px 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}
.next-btn:hover {
  transform: scale(1.05);
  background: #333;
  color: #fff;
}

</style>
