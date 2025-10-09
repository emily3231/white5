<script setup>
import html2canvas from 'html2canvas'

// 截圖自己頁面
const captureScreenshot = async () => {
  const target = document.querySelector('.capture-area')
  if (!target) {
    alert('找不到截圖區塊')
    return
  }

  const canvas = await html2canvas(target, { useCORS: true, scale: 2 })
  const dataUrl = canvas.toDataURL('image/jpeg', 0.9)

  const link = document.createElement('a')
  link.href = dataUrl
  link.download = 'my_screenshot.jpg'
  link.click()
}

// 分享網址
const shareResult = async () => {
  const shareUrl = 'https://your-result-page.com' // ← 你想分享的網址
  const shareTitle = '我的成果頁'
  const shareText = '快來看看我的成果！'

  if (navigator.share) {
    try {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl
      })
      console.log('分享成功')
    } catch (err) {
      console.log('使用者取消或分享失敗', err)
    }
  } else {
    // 備用：瀏覽器不支援分享
    await navigator.clipboard.writeText(shareUrl)
    alert(`此瀏覽器不支援分享功能\n已自動複製連結：${shareUrl}`)
  }
}
</script>

<template>
  <div class="container">
    <div class="btn-group">
      <button @click="captureScreenshot">📸 儲存截圖</button>
      <button @click="shareResult">🔗 分享結果</button>
    </div>

    <div class="capture-area">
      <h2>這是我的成果畫面</h2>
      <p>點擊「儲存截圖」會將此區保存為 JPG。</p>
      <img src="https://picsum.photos/400/200" alt="示意圖" />
    </div>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  margin-top: 40px;
}
.btn-group button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
.capture-area {
  margin-top: 30px;
  padding: 20px;
  background: #f0f8ff;
  border: 2px dashed #ccc;
  border-radius: 10px;
  display: inline-block;
}
</style>
