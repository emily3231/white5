<script setup>
import { ref } from 'vue'
import { useTreasures } from '@/composables/useTreasures'
import { useDefenseMessage } from '@/composables/useDefenseMessage'

const { selectedBlessing } = useTreasures()

// ✅ 共用寶箱狀態（跟 Part35 同步）
const { currentTreasure, treasures } = useTreasures()

// ✅ 防護力顯示邏輯（只有一組）
const revealed = ref([true, false, false, false, true, false])
const { message, defenseText, defenseValue } = useDefenseMessage(revealed)

</script>


<template>
  <section class="s1">
    <div class="s1_bg">
        <img src="@/assets/images/send.png" > 

        <!-- <div class="row center">
        <div class="s-logo ">
            <span class="s-logo1"><img src="@/assets/images/b-logo.png" > </span>
            <span class="s-logo2"><img src="@/assets/images/logo_white.png" > </span>
        </div> 
    </div>-->

    </div>

  
   
    <div class="sl_center  mx-auto  row center ">

      

        <div class="s1_rec">
            <div>2026年！<br>
            我的 新年新願望 是...</div>
                <div class=" font-3 green-font"> {{ currentTreasure?.label || '請先解鎖願望' }}
                </div>
                 <div class="share">
    <div class="hope">
      {{ selectedBlessing || '請先選擇一則祝福語' }}
    </div>
  </div>

    </div>  

        <div class="s1_rec_footer">
        <p>\ 走路健康又能賺小樹點的活動早就開始啦 /<br>
        快來下載 國泰 FitBack 兌換點數</p>
        </div>
      <div class="p4-rec">
          <div class="row mt-5">
            <!-- 認識幾年 -->
            <div class="col-md-4 ">
              <p class="font24">我們認識了</p>
              <h2 class="font48">26<span class="font24">年</span></h2>
            </div>

            <!-- ✅ 顯示百分比 -->
            <div class="col-md-4 ">
              <p class="font24">防護力</p>
              <p class="font48 green-font">{{ defenseValue }}%</p>
            </div>

            <!-- 健康步數 -->
            <div class="col-md-4 ">
              <p class="font24">FitBack健康吧</p>
              <h2 class="font48">426<span class="font24">萬步</span></h2>
            </div>
          </div>
        </div>
    </div>      

      




</section>
 
</template>
<style>
.s1_rec{ width: 90%;}
.p4-rec{ width: 90%; margin-bottom: 30px;}
</style>

