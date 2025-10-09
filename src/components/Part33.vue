<script setup>
import { ref } from 'vue'

// 成就清單
const achievements = [
  '你已解鎖「潛力待發者」成就！',
  '你已解鎖「暖身新手村」成就！',
  '你已解鎖「穩健前行者」成就！',
  '你已解鎖「鐵腿傳說」成就！'
]

// 隨機挑一個
const message = ref('')
function showRandomAchievement() {
  const randomIndex = Math.floor(Math.random() * achievements.length)
  message.value = achievements[randomIndex]
}

// 頁面載入時就顯示
showRandomAchievement()
</script>

<template>

  <div class="mt-100 part3_step">
<h2 class="mb-4 mt-5 green-color font50">\步數回顧/</h2>
<p class="font24">你的雙腳，今年踏遍了多少風景？</p>
<div class="step_img"><img src="@/assets/images/step.png" ></div>

<div class="step_warp">
<div class="step center mx-auto ">
        <span class="font-3 font96" >426萬</span>
        <span class="font-2 mt-5 font48">步</span>
    </div>
    <div class="font12 black mt-3">數據來源：統計至 2025/12/31 前</div>
</div>    

<div class="p3-rec mx-auto mb-4 mt-5 bear_step">
  <div class="row center">
  <div class="col-md-4  bear-left"> <img src="@/assets/images/bear_step.gif" ></div>
  <div class=" col-md-8 achievement">
    <div color="font28">{{ message }}</div >
  </div>
  <div class="tru"><img src="@/assets/images/tru.png" ></div>
  
  </div>
 </div>

 <p class="font24">你知道嗎？ <br>踏出越多步，FitBack App 就能為冒險儲備更多小樹點唷！</p>

  </div>
</template>

<style scoped>
.black{ color: black;}
</style>
