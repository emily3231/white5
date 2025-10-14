import { ref, computed, watch } from 'vue'
import treasureClosed from '@/assets/images/treasure.png'
import treasureOpened from '@/assets/images/treasure_open.png'

const treasures = [
  {
    id: 1,
    label: '身體健康',
    closed: treasureClosed,
    opened: treasureOpened,
    wish: '我的新年新願是... 身體健康',
    title: '健康Fitback！',
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
    closed: treasureClosed,
    opened: treasureOpened,
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
    closed: treasureClosed,
    opened: treasureOpened,
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

// ✅ 單例 reactive 狀態
const selectedId = ref(Number(localStorage.getItem('selectedId')) || null)
const selectedBlessing = ref('') // ✅ 新增共用的祝福選擇

// ✅ 目前選中的寶箱
const currentTreasure = computed(() =>
  treasures.find(t => t.id === selectedId.value)
)

// ✅ 點擊切換選擇
function selectTreasure(id) {
  selectedId.value = id === selectedId.value ? null : id
}

// ✅ 儲存使用者選擇
watch(selectedId, (val) => {
  if (val !== null) localStorage.setItem('selectedId', val)
})

export function useTreasures() {
  return {
    treasures,
    selectedId,
    currentTreasure,
    selectTreasure,
    selectedBlessing, // ✅ 匯出共用狀態
  }
}
