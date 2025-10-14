import { ref, onUnmounted } from 'vue'

/**
 * 打字特效 composable（含閃爍游標 |）
 * @param {number} speed - 打字速度 (毫秒)
 * @param {number} cursorBlink - 游標閃爍間隔 (毫秒)
 */
export function useTypingEffect(speed = 60, cursorBlink = 500) {
  const displayedText = ref('')
  const isTyping = ref(false)
  const typingIndex = ref(0)
  const showCursor = ref(true)
  const cursorDimmed = ref(false) // ✅ 控制游標亮/淡

  let typingTimer = null
  let cursorTimer = null

  /** 啟動打字特效 */
  function typeText(fullText) {
    clearInterval(typingTimer)
    displayedText.value = ''
    typingIndex.value = 0
    isTyping.value = true
    showCursor.value = true
    cursorDimmed.value = false // 打字中游標亮起

    const plain = fullText.replace(/<br\s*\/?>/gi, '\n')

    typingTimer = setInterval(() => {
      if (typingIndex.value < plain.length) {
        displayedText.value += plain[typingIndex.value]
        typingIndex.value++
      } else {
        clearInterval(typingTimer)
        isTyping.value = false
        // 打完 → 游標變淡
        cursorDimmed.value = true
      }
    }, speed)
  }

  /** 游標閃爍動畫 */
  cursorTimer = setInterval(() => {
    showCursor.value = !showCursor.value
  }, cursorBlink)

  /** 清理計時器 */
  onUnmounted(() => {
    clearInterval(typingTimer)
    clearInterval(cursorTimer)
  })

  return {
    displayedText,
    isTyping,
    showCursor,
    cursorDimmed,
    typeText
  }
}
