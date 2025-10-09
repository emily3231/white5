<script setup>
import html2canvas from 'html2canvas'
import KV from '../components/KV.vue'

// 1️⃣ 儲存截圖
const saveScreenshot = async () => {
  const target = document.querySelector('.capture-area')
  if (!target) {
    alert('找不到截圖區塊')
    return
  }

  try {
    const canvas = await html2canvas(target, { useCORS: true, scale: 2 })
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9)

    const link = document.createElement('a')
    link.href = dataUrl
    link.download = 'my_screenshot.jpg'
    link.click()
  } catch (err) {
    console.error('截圖錯誤', err)
  }
}

// 2️⃣ 截圖並分享圖片
const shareScreenshot = async () => {
  const target = document.querySelector('.capture-area')
  if (!target) {
    alert('找不到截圖區塊')
    return
  }

  try {
    const canvas = await html2canvas(target, { useCORS: true, scale: 2 })
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9))

    if (!blob) {
      alert('無法生成圖片')
      return
    }

    const file = new File([blob], 'screenshot.jpg', { type: 'image/jpeg' })

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: '我的成果截圖',
        text: '快來看看我的成果！',
        files: [file],
      })
      console.log('圖片分享成功')
    } else if (navigator.share) {
      await navigator.share({
        title: '我的成果頁',
        text: '快來看看我的成果！',
        url: 'https://emily3231.github.io/white4/home'
      })
      console.log('連結分享成功（無圖片）')
    } else {
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'screenshot.jpg'
      link.click()
      URL.revokeObjectURL(url)
      alert('此瀏覽器不支援分享，已改為下載圖片')
    }
  } catch (err) {
    console.error('截圖或分享失敗', err)
  }
}

// 3️⃣ 分享網址
const shareLink = async () => {
  const shareUrl = 'https://emily3231.github.io/white4/home'
  const shareTitle = '我的成果頁'
  const shareText = '快來看看我的成果吧～'

  if (navigator.share) {
    try {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl,
      })
      console.log('連結分享成功')
    } catch (err) {
      console.log('使用者取消或分享失敗', err)
    }
  } else {
    await navigator.clipboard.writeText(shareUrl)
    alert(`此瀏覽器不支援分享功能\n已複製網址：${shareUrl}`)
  }
}
</script>

<template>
  <div class="container">
    <div class="btn-group">
      <button @click="saveScreenshot">📸 儲存截圖</button>
      <button @click="shareScreenshot">📤 截圖並分享</button>
      <button @click="shareLink">🔗 分享網址</button>
    </div>

    <div class="capture-area">
      <h2>🎨 我的網頁截圖範例</h2>
      <p>這區的內容會被截圖、儲存或分享。</p>
      <KV />
    </div>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  margin-top: 40px;
}
.btn-group {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
button {
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 25px;
  background-color: #4a90e2;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}
button:hover {
  background-color: #357ab8;
}
.capture-area {
  margin-top: 20px;
  padding: 20px;
  background: #f0f8ff;
  border-radius: 10px;
  border: 2px dashed #ccc;
  display: inline-block;
}
</style>
