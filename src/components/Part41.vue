<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router' // ✅ 補上這行
import { useTreasures } from '@/composables/useTreasures'
import { useDefenseMessage } from '@/composables/useDefenseMessage'

// ✅ 共用寶箱狀態（與 Part35 同步）
const { currentTreasure, selectedBlessing } = useTreasures()

// blessings 列表
const blessings = computed(() => currentTreasure.value?.blessings || [])

// 選擇祝福語
const handleSelect = (e) => {
  selectedBlessing.value = e.target.value
}

// 跳轉到 Share.vue
const router = useRouter()
const goToShare = () => {
  if (selectedBlessing.value) router.push('/send')
}

// ✅ 共用防護狀態（與 Part31 同步）
const { message, defenseValue } = useDefenseMessage()
</script>

<template>
  <section >
    <div >
      <div class="row center">

        <div class="p4-rec  p-50">

          <div class=" wish1" >
          <div class="row">
           <div class="col-md-5"> <div class="wish2" >我的新年新願是...</div >
           </div>
           <div  class="font65 green-font col-md-7">
              {{ currentTreasure?.label || '請到上一頁解鎖願望' }}
            </div >
          </div>
          </div>

          <!-- ✅ 改為獨立段落結構 -->
          <div class="mt-3">
            <select class="mt-3" @change="handleSelect">
              <option value="">請選擇祝福語</option>
              <option
                v-for="(b, i) in blessings"
                :key="i"
                :value="b"
              >
                {{ b }}
              </option>
            </select>

            <p v-if="selectedBlessing" class="preview">
              <!-- 你選擇的是：<strong>{{ selectedBlessing }}</strong> -->
            </p>
          </div>

          <div class="mt-5">
        
            <button
              class="green1_btn"
              :disabled="!selectedBlessing"
              @click="goToShare"
            >
              分享結果
            </button>
          </div>

          <p class="mt-5">
            動起來更健康！一起紀錄健康生活.
            <span class="green-color">Fitback App </span> →
          </p>
        </div>

        <div class="font16 mt-5 gray-color">
         了解更多服務、或繼續探索國泰的守護旅程，可以從這些管道聯繫我們，<br />
          國泰人壽很樂意為你服務
        </div>

        <div class="p4-rec1 mt-5">
          <div class="row">
            <div class="col-4">
              <img src="@/assets/images/b-logo1.png" />
              <p class="mt-3 font12">
                FitBack健康吧<br />健康任務與步數挑戰
              </p>
            </div>
            <div class="col-4">
              <img src="@/assets/images/b-logo2.png" />
              <p class="mt-3 font12">
                國泰人壽官網<br />查詢保單與保障內容
              </p>
            </div>
            <div class="col-4">
              <img src="@/assets/images/b-logo3.png" />
              <p class="mt-3 font12">
                國泰人壽App<br />一手掌握服務與通知
              </p>
            </div>
          </div>
        </div>

        <div class="mt-5"><img src="@/assets/images/b-logo.png" /></div>

        <div class="mt-5 footer font14">
          <a href="">關於我們</a> ｜  
          <a href="">最新消息</a> ｜  
          <a href="">服務據點</a> ｜  
          <a href="">聯絡我們</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>



</style>
