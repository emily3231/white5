<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTreasures } from '@/composables/useTreasures'
import { useDefenseMessage } from '@/composables/useDefenseMessage'
import { useTypingEffect } from '@/composables/useTypingEffect' // ✅ 正確引入打字特效

// ✅ 寶箱 composable
const { treasures, selectedId, currentTreasure, selectTreasure } = useTreasures()

// ✅ 控制哪個按鈕被啟用
const activeIndex = ref(null)

// ✅ 隱藏寶藏
const showTreasure = ref(false) 

function handleButtonClick(index, id) {
  activeIndex.value = index // 當前按鈕啟用
  selectTreasure(id)        // 同時觸發原本的寶箱行為
  showTreasure.value = true 
}

// ✅ 防護力狀態（與 Part31 共用）
const revealed = ref([true, false, false, false, true, false])
const { message, defenseValue } = useDefenseMessage(revealed)

// ✅ 打字特效 composable
const { displayedText, showCursor, cursorDimmed, typeText } = useTypingEffect(60, 500)

// ✅ 進場動畫用
const isVisible = ref(false)
const imgRef = ref(null)

// ✅ 初始化與觀察器
onMounted(() => {
  // 打字文字開始
   typeText('鑰匙在手，寶藏在前，開啟屬於你的 </br><span style="color:#2BDF21;">新年新願望！</span>')
  
   // 觀察 health 圖片進場
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        } else {
          isVisible.value = false
        }
      })
    },
    { threshold: 0.3 }
  )

  if (imgRef.value) observer.observe(imgRef.value)

  onUnmounted(() => observer.disconnect())
})

const emit = defineEmits(['nextText', 'goNextSection'])

function goNext() {
  emit('goNextSection') // 讓父元件（Home.vue）知道「要滾動下一區」
}
</script>

<template>
  <div class="pt-100 part3_treasure text-center">
    <h2 class="mb-4 mt-5 font50 green-color c-font">\\解鎖 寶藏 時刻//</h2>

    <div class="p3-rec mb-5">
      <div class="row">
      
      <div class="key1"><img src="@/assets/images/penguin_left.png" /></div>

      <!-- ✅ 打字特效文字 -->
      <div class="font28 mb-3 c-font typing-text">
       <p v-html="displayedText"></p>
        <!-- <span v-if="showCursor" class="cursor" :class="{ dim: cursorDimmed }">|</span> -->
      </div>
      </div>
      <!-- ✅ 寶箱群組 -->
        <div class="row ">
    <div v-for="(t, index) in treasures" :key="t.id" class="col-md-4 text-center">
      <img
        :src="selectedId === t.id ? t.opened : t.closed"
        :alt="t.label"
        class="treasure-img"
      />

      <!-- ✅ 多個互斥按鈕 -->
      <button
        class="mt-3 btn font26 c-font green_btn1"
        :class="{ active: activeIndex === index }"
        @click="handleButtonClick(index, t.id)"
      >
        {{ t.label }}
      </button>
    </div>
  </div>
    </div>

<!-- ✅ 顯示寶藏內容 -->

<div v-if="showTreasure && currentTreasure" class="text-box fade-in health ">
  <h2 class="green-font font96">{{ currentTreasure.title }}</h2>
  <p class="font24 nfont">{{ currentTreasure.text }}</p>
  <div class="next-icon c-font" @click="goNext"> 下一步▼ </div>
</div>

    
  </div>
</template>

<style scoped>
.green_btn1 {
  background: #fff;
  border: 2px solid #2BDF21;
  color: #2BDF21;
  border-radius: 30px;
  padding: 10px 25px;
  transition: all 0.3s ease;
}
.green_btn1:hover {
  background: #2BDF21;
  color: white;
}
.green_btn1.active {
  background: #2BDF21;
  color: white;
  box-shadow: 0 0 10px #2BDF21;
}
.typing-text {
  min-height: 70px;
  line-height: 1.6;
}

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

/* ✅ 寶箱區 */


.treasure-img {
  width: 120px;
  height: 120px;
  transition: transform 0.3s ease;
}

.treasure-img:hover {
  transform: scale(1.1);
}
</style>
