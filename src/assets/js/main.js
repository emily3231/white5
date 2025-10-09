import { ref, onMounted, onBeforeUnmount } from 'vue'

const unlocked = ref(false)
const content = ref(null)

function preventDefault(e) {
  e.preventDefault()
}
function preventKeyScroll(e) {
  const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ']
  if (keys.includes(e.key)) e.preventDefault()
}

function lockScroll() {
  document.body.style.overflow = 'hidden'
  window.addEventListener('wheel', preventDefault, { passive: false })
  window.addEventListener('touchmove', preventDefault, { passive: false })
  window.addEventListener('keydown', preventKeyScroll, { passive: false })
}

function unlockScroll() {
  if (unlocked.value) return
  unlocked.value = true

  window.removeEventListener('wheel', preventDefault, { passive: false })
  window.removeEventListener('touchmove', preventDefault, { passive: false })
  window.removeEventListener('keydown', preventKeyScroll, { passive: false })

  document.body.style.overflow = 'auto'
  content.value.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => lockScroll())
onBeforeUnmount(() => {
  // 清理事件
  window.removeEventListener('wheel', preventDefault, { passive: false })
  window.removeEventListener('touchmove', preventDefault, { passive: false })
  window.removeEventListener('keydown', preventKeyScroll, { passive: false })
})