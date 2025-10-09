<script setup>
import { ref, computed } from 'vue'
import treasureClosed from '@/assets/images/treasure.png'
import treasureOpened from '@/assets/images/treasure_open.png'

// 三個選項（每個都有圖、標題、文字）
const treasures = [
  {
    id: 1,
    label: '身體健康',
    closed: treasureClosed,
    opened: treasureOpened,
    title: '健康 Fitback！',
    text: '你健康不難，難的是你不動～Fit一下，回饋馬上來！',
  },
  {
    id: 2,
    label: '環遊世界',
    closed: treasureClosed,
    opened: treasureOpened,
    title: '網路投保！',
    text: '旅程精彩，計畫周全更安心～衝景點的同時，也記得幫自己多一層準備！',
  },
  {
    id: 3,
    label: '安心守護',
    closed: treasureClosed,
    opened: treasureOpened,
    title: '保險視圖',
    text: '多一點準備，就能多一點安心，讓每一步都走得更穩。',
  },
]

// 紀錄目前選擇的 id（一次只能選一個）
const selectedId = ref(null)

// 點擊切換
function selectTreasure(id) {
  selectedId.value = id === selectedId.value ? null : id
}

// 取得目前選中的選項
const currentTreasure = computed(() =>
  treasures.find(t => t.id === selectedId.value)
)
</script>

<template>
  <div class="pt-100 part3_treasure">
    <h2 class="mb-4 mt-5 font50 green-color ">\\解鎖 寶藏 時刻//</h2>

    <div class="p3-rec">
      <div class="font28 mb-3">鑰匙在手，寶藏在前<br>
開啟屬於你的 <span class="green-color">新年新願望！</span></div>
      <div class="treasure-list">
        <div v-for="t in treasures" :key="t.id" class="treasure-item">
          <!-- 上方圖片 -->
          <img
            :src="selectedId === t.id ? t.opened : t.closed"
            :alt="t.label"
            class="treasure-img"
          />

          <!-- 按鈕 -->
          <button
            class="btn"
            :class="{ active: selectedId === t.id }"
            @click="selectTreasure(t.id)"
          >
            {{ selectedId === t.id ? '已打開：' + t.label : '打開 ' + t.label }}
          </button>
        </div>
      </div>
  </div>

      <!-- 下方顯示標題與文字 -->
      <div v-if="currentTreasure" class="text-box fade-in nfont">
        <h2>{{ currentTreasure.title }}</h2>
        <p>{{ currentTreasure.text }}</p>
      </div>

      <div class="mt-5 three"> <img src="@/assets/images/health.png" ></div>
        <p class="mt-5 mb-5 font24 nfont"> 恭喜你完成冒險！<br> 在這段旅程裡，你也為自己找到新的方向與療癒的補給。</p>
    </div>

</template>

<style scoped>


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
  width: 33.333;
  height: 150px;
  border-radius: 10px;
  object-fit: cover;
}

.treasure-img:hover {
  transform: scale(1.05);
  border-color: #2BDF21;
}

.btn {
  width: 200px;
    height: 60px;
    background: #fff;
    border: #2BDF21 2px solid;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn:hover {
  background: #f3f4f6;
}

.btn.active {
  background: #2BDF21;
  color: white;
  border-color: #2BDF21;
}

.text-box {

  margin: 0 auto;
}

.text-box h2 {
  margin: 0 0 10px;
  color: #2BDF21;
 font-size: 96px;

}

.text-box p {
  margin: 0;
  color: #000;
  font-size: 24px;
}

.fade-in {
  animation: fadeIn 0.4s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}



</style>
