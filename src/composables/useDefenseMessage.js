// src/composables/useDefenseMessage.js
import { ref, computed, watch } from 'vue'

// 🛡 全域共用防護力（可被多個組件共用）
const defenseValue = ref(0)

export function useDefenseMessage(revealed = null) {
  // 🔹 若有傳入 revealed，則自動監聽並計算防護力
  if (revealed) {
    watch(
      revealed,
      (val) => {
        const unlocked = val.filter(Boolean).length
        // 依解鎖數量換算百分比（共 6 個）
        defenseValue.value = Math.round((unlocked / 6) * 100)
      },
      { immediate: true, deep: true }
    )
  }

  // 🔹 自動依防護力回傳對應文字
  const message = computed(() => {
    const val = defenseValue.value
    if (val === 0) return '裝備還被冰封著，快去解鎖第一件吧！'
    if (val <= 17) return '好耶～有第一件了！再多點裝備更放心。'
    if (val <= 33) return '裝備升級中～再加幾樣就更全面啦！'
    if (val <= 50) return '一半達成！冒險的底氣越來越強囉！'
    if (val <= 67) return '不錯不錯～裝備已經很齊了，就差一點點！'
    if (val <= 84) return '哇！快滿裝啦～再補一件就完美出發'
    if (val >= 100) return '滿分大冒險家！全套裝備到手，放心衝吧！'
    return ''
  })

  // 🔹 可手動設定防護值（可選）
  const setDefenseValue = (val) => {
    if (val < 0) val = 0
    if (val > 100) val = 100
    defenseValue.value = val
  }

  return {
    message,
    defenseValue,
    setDefenseValue
  }
}
