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


const emit = defineEmits(['nextText', 'goNextSection'])
function goNext() {
  emit('goNextSection') // 讓父元件（Home.vue）知道「要滾動下一區」
}

</script>

<template>
  <section class="part4 text-center">
    <div class="p4_bg"><img src="@/assets/images/p4_bg.png" /></div>

  
    <div class="mx-auto mb-4 p4_area">
      <div class="row center">
      
        <div class="p4-rec pt-200">
          <div class="row">
            <!-- 認識幾年 -->
            <div class="col-md-4 ">
              <p class="font24">我們認識了</p>
              <h2 class="font65">26<span class="font34">年</span></h2>
            </div>

            <!-- ✅ 顯示百分比 -->
            <div class="col-md-4 ">
              <p class="font24">防護力</p>
              <p class="font65 green-font">{{ defenseValue }}%</p>
            </div>

            <!-- 健康步數 -->
            <div class="col-md-4 ">
              <p class="font24">FitBack健康吧</p>
              <h2 class="font65">426<span class="font34">萬步</span></h2>
            </div>
          </div>
          <div
    style=""
    class="next-icon c-font"
    @click="goNext"
  >
    下一步 ▼
  </div>
        </div>
 
        <div class="p4-img"><img src="@/assets/images/p4_top.png" /></div>
      </div>
      
    </div>
  </section>
</template>

<style scoped>
select {
  padding: 10px;
  border-radius: 6px;
  font-size: 16px;
  width: 70%;
}
.preview {
  margin-top: 10px;
  font-size: 18px;
  color: #333;
}
.green1_btn {
  margin: 5px;
  background: #3dbb9d;
  color: #fff;
  border: none;
  padding: 10px 25px;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}
.green1_btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.green1_btn:hover:not(:disabled) {
  background: #2fa081;
}
</style>
