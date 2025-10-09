<script setup>
import { ref } from 'vue'

const texts = [
  '我是白白！來自北極。<br>冰山的家變小了，所以我出發去旅行。',
  '一路上，我發現了許多故事，也想帶著你一起看看。願這段回顧成為一場療癒的旅程，帶著希望與勇氣走向未來。'
]

const currentIndex = ref(0)

function nextText() {
  if (currentIndex.value < texts.length - 1) {
    currentIndex.value++
  }
}
</script>

<template>
 <div class="part2_center">

           <div class="start_year center ">
              <img src="../assets/images/start_year.png">
              <div class="start_year_text ">
                <h2 class="font64">2008<span class="font36">年起</span></h2>
              </div>
           </div>
            <div class="bag"><img src="../assets/images/bag.png"></div>
           <div class="txt2 mt-4 font28">
            我們已經並肩走過<br>
            <h2 class="font96 mt-4 font96">9,805<span class="font48">天</span>

            </h2>

            <div class="mt-4 font28">每一步都記錄在這趟冒險的地圖上<br><br>
            背起行囊，出發吧！<br>
            </div>
             
           </div>
             <div class="bear_bag" ><img src="../assets/images/bear_bag.gif"></div>

            <div class="part2_lower" >
            <div class="fonr24" >
              我們的年度冒險 現在開始！</div>
             <div class="font12">
            數據來源：統計至 2025/12/31 前  </div>
             </div>
           
          
</div>

  
</template>

<style scoped>

.container {
  text-align: center;
  margin-top: 150px;
  font-size: 1rem;
  line-height: 1.8;
}


.text {
  white-space: pre-line; /* 保留換行格式 */
  color: black;
}

.p2_rec{ 
  width: 100% !important;
max-width:100%!important;
}

/* 倒三角 icon */
.next-icon {
  margin-top: 40px;
  font-size: 1rem;
  color: black;
  cursor: pointer;
  animation: float 1.2s ease-in-out infinite;
  transition: transform 0.2s, opacity 0.3s;
}

.next-icon:hover {
  transform: scale(1.2);
}

/* 上下浮動動畫 */
@keyframes float {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(10px); }
  100% { transform: translateY(0); }
}

/* 淡入淡出 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
