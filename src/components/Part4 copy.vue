<script setup>
import { ref, computed } from 'vue'

// 三個主題（含圖片、標題、文字、祝福語）
const treasures = [
  {
    id: 1,
    label: '身體健康',
    closed: 'https://picsum.photos/id/1011/200/150',
    opened: 'https://picsum.photos/id/1015/200/150',
    wish: '我的新年新願是... 身體健康',
    title: '健康 Fitback！',
    text: '你健康不難，難的是你不動～Fit一下，回饋馬上來！',
    blessings: [
      '把每一步都走成祝福，走成好體力',
      '精神滿滿 活力旺',
      '健康是最好的禮物，願它永遠伴隨你',
      '平安喜樂 健康強',
      '健康如同堅固的盾牌，守護你遠離風雨',
    ],
  },
  {
    id: 2,
    label: '環遊世界',
    closed: 'https://picsum.photos/id/1011/200/150',
    opened: 'https://picsum.photos/id/1039/200/150',
    wish: '我的新年新願是... 環遊世界',
    title: '網路投保！',
    text: '旅程精彩，計畫周全更安心～衝景點的同時，也記得幫自己多一層準備！',
    blessings: [
      '把探索世界的勇氣，當成最美的祝福',
      '眼界寬廣 心歡暢',
      '世界很大，每一步都是新的冒險',
      '步步高升 行萬里',
      '願世界的美麗，成為你人生的養分',
    ],
  },
  {
    id: 3,
    label: '安心守護',
    closed: 'https://picsum.photos/id/1011/200/150',
    opened: 'https://picsum.photos/id/1050/200/150',
    wish: '我的新年新願是... 安心守護',
    title: '保險視圖',
    text: '多一點準備，就能多一點安心，讓每一步都走得更穩。',
    blessings: [
      '平安不打烊，守護全年無休',
      '家和萬事 平安到',
      '願你身邊總有溫暖的守護，如同堅實後盾',
      '守護相隨 無所懼',
      '願你的人生無論風雨，都有保障相隨',
    ],
  },
]

// 當前選擇的主題
const selectedId = ref(null)

// 目前選中的主題
const currentTreasure = computed(() =>
  treasures.find(t => t.id === selectedId.value)
)

// 點擊切換主題
function selectTreasure(id) {
  selectedId.value = id === selectedId.value ? null : id
}

// 模擬「儲存截圖」
function saveScreenshot() {
  alert('📸 已儲存截圖！（可整合 html2canvas）')
}

// 模擬「分享功能」
function shareResult() {
  alert('📤 已分享至 FB / IG！（可整合分享 API）')
}
</script>

<template>
  <div class="wrap">
    <!-- 上方三個主題 -->
    <div class="treasure-list">
      <div
        v-for="t in treasures"
        :key="t.id"
        class="treasure-item"
      >
        <img
          :src="selectedId === t.id ? t.opened : t.closed"
          :alt="t.label"
          class="treasure-img"
          @click="selectTreasure(t.id)"
        />

        <button
          class="btn"
          :class="{ active: selectedId === t.id }"
          @click="selectTreasure(t.id)"
        >
          {{ selectedId === t.id ? '已打開：' + t.label : '打開 ' + t.label }}
        </button>
      </div>
    </div>

    <!-- 下方內容 -->
    <transition name="fade" mode="out-in">
      <div v-if="currentTreasure" class="text-box fade-in">
        <!-- 對話框 1：願望 -->
        <div class="bubble bubble-left">
          <p>{{ currentTreasure.wish }}</p>
        </div>

        <!-- 對話框 2：主題內容 -->
        <div class="bubble bubble-right">
          <h3>{{ currentTreasure.title }}</h3>
          <p>{{ currentTreasure.text }}</p>
        </div>

        <!-- 下拉選單 -->
        <h4 class="dropdown-title">選一個祝福吧 💫</h4>
        <select class="dropdown">
          <option v-for="(b, i) in currentTreasure.blessings" :key="i">
            {{ b }}
          </option>
        </select>

        <!-- 兩顆按鈕 -->
        <div class="bottom-btns">
          <button class="action-btn" @click="saveScreenshot">📸 儲存截圖</button>
          <button class="action-btn" @click="shareResult">📤 分享結果</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.wrap {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.treasure-list {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.treasure-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.treasure-img {
  width: 200px;
  height: 150px;
  border-radius: 10px;
  object-fit: cover;
  border: 2px solid #ccc;
  cursor: pointer;
  transition: transform 0.3s, border-color 0.3s;
}

.treasure-img:hover {
  transform: scale(1.05);
  border-color: #3b82f6;
}

.btn {
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.btn:hover {
  background: #f3f4f6;
}
.btn.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.text-box {
  max-width: 600px;
  margin: 0 auto;
  background: #f8fafc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

/* 對話框樣式 */
.bubble {
  position: relative;
  display: inline-block;
  padding: 15px 20px;
  border-radius: 20px;
  margin: 10px 0;
  max-width: 80%;
  text-align: left;
  line-height: 1.5;
}
.bubble-left {
  background: #e0f2fe;
  align-self: flex-start;
}
.bubble-right {
  background: #dbeafe;
  align-self: flex-end;
}
.bubble-left::after {
  content: '';
  position: absolute;
  left: -8px;
  top: 15px;
  border: 8px solid transparent;
  border-right-color: #e0f2fe;
}
.bubble-right::after {
  content: '';
  position: absolute;
  right: -8px;
  top: 15px;
  border: 8px solid transparent;
  border-left-color: #dbeafe;
}

.dropdown-title {
  font-weight: bold;
  color: #1e3a8a;
  margin-top: 15px;
}

.dropdown {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin: 10px 0 20px;
}

/* 兩顆底部按鈕 */
.bottom-btns {
  display: flex;
  justify-content: center;
  gap: 20px;
}
.action-btn {
  padding: 10px 20px;
  border-radius: 25px;
  border: none;
  background: #2563eb;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  transition: 0.2s;
}
.action-btn:hover {
  background: #1e40af;
}

/* 動畫 */
.fade-in {
  animation: fadeIn 0.4s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
