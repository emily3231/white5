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


</script>

<template>
 <section class="part4 text-center">
    <div class="p4_bg"><img src="@/assets/images/p4_bg.png" ></div>

  
    <div class="mx-auto mb-4 p4_area">
        <div class="row center">
            <div class="p4-rec pt-200">
              <div class="row">
                <div class="col-md-3 col-6 ">
                  <p class="font24">我們認識了</p>
                  <h2 class="font65">26<spnp class="font34">年</spnp></h2>
                </div>
                <div class="col-md-3 col-6">
                  <p class="font24">防護力</p>
                  <h2 class="font65">84<spnp  class="font34">％</spnp></h2>
                </div>
               <div class="col-md-3 col-6">
                  <p class="font24">小數點累積</p>
                  <h2 class="font65">101<spnp  class="font34">點</spnp></h2>
                </div>
               <div class="col-md-3 col-6">
                  <p class="font24">FitBack健康吧</p>
                  <h2 class="font65">426<spnp  class="font34">萬步</spnp></h2>
                </div>
              </div>
            </div> 

          <div class="p4-img"><img src="@/assets/images/p4_top.png" ></div> 

          <div class="p4-rec mt-100 p-50">
            <div>我的新年新願是...
                <span class=" font-3 green-font">身體健康</span>
           </div>

          <select class="mt-3">
              <option>健康是最大財富，讓白白陪你一起守護。</option>
              <option>Dog</option>
              <option>Cat</option>
              <option>Hamster</option>
              <option>Parrot</option>
              <option>Spider</option>
              <option>Goldfish</option>
          </select>

          <div class="mt-5">
            <button class="green1_btn">儲存截圖</button>
            <button class="green1_btn">分享結果</button>
          </div> 

          <p class="mt-5">想更全面照顧自己？ 點我了解 <span class="green-color">國泰健康管理 </span>→</p>
          </div>

          <div class="font16 mt-5 gray-color ">若您想了解更多服務、或是繼續探索國泰的守護旅程，<br>可以從這些管道找到我們</div>

          <div class="p4-rec1 mt-5">
            <div class="row">
              <div class="col-4"> 
                <img src="@/assets/images/b-logo1.png" >
                <p class="mt-3 font12">
                  FitBack健康吧<br>健康任務與步數挑戰
                </p>
              </div>
              <div class="col-4">
                <img src="@/assets/images/b-logo2.png" >
                <p class="mt-3 font12">
                  國泰人壽官網<br>查詢保單與保障內容
                </p>
              </div>
              <div class="col-4">
                
                <img src="@/assets/images/b-logo3.png" >
                <p class="mt-3 font12">
                   國泰人壽App<br>一手掌握服務與通知
                </p>
              
              </div>
            </div>
          </div>

          <div class="mt-5"><img src="@/assets/images/b-logo.png" ></div>

          <div class="mt-5 footer font14">
          <a href=""> 關於我們</a>  ｜  
          <a href=""> 最新消息</a>  ｜  
          <a href="">服務據點</a>  ｜  
          <a href="">聯絡我們</a>
          </div>

      </div>
  </div>

</section>

</template>

<style scoped>
select{ width: 100%;}
</style>
