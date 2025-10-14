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


<style scoped>

:root {
  --tree-w: clamp(180px, 26vw, 340px);
  --bear-w: clamp(90px, 13vw, 170px);
  --subtree-w: clamp(110px, 15vw, 200px);
  --ground-w: 100%;
}


.main{ padding-bottom: 200px;}
/* 場景容器 */
.scene1 {
  position: relative;
  width: min(92vw, 1100px);
  aspect-ratio: 16 / 9;
  margin: 0 auto;
  /* overflow: hidden; */
  background: transparent;

}

/* ✅ health 圖放大動畫 */
.three img {
  /* width: 200px; */
  transform: scale(0.5);
  opacity: 0.5;
  transition: transform 0.8s ease, opacity 0.8s ease;
   position: absolute;
   left: 35%; 
  bottom: 9%; 
  width: var(--tree-w);
  transform-origin: bottom center;
  z-index: 3;


}

.three img.visible {
  transform: scale(1.5);
  opacity: 1;
}



/* 地板 */
.ground {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: var(--ground-w);
  z-index: 2;
}


/* 小樹背景層 */
.subtree {
  position: absolute;
  width: var(--subtree-w);
  z-index: 1;
  pointer-events: none;
   animation: float_right 3.5s ease-in-out infinite;
}

/* ✅ 右邊 */
.three-left {
  top: 60%;
  right: 20%;
  transform: translateY(0);
   z-index: 5;
   animation: float_left 3.5s ease-in-out infinite;
}

/* ✅ 左邊*/
.three-right {
  top:60%;
  left: 25%;
  transform: translateY(0);
  z-index: 5;
}
/* 小樹浮動動畫 */
/* .float {
  animation: float 3.5s ease-in-out infinite;
} */
@keyframes float_left {
  0% {
    transform: translateY(0) translateX(var(--shift, 0));
  }
  50% {
    transform: translateY(-100px) translateX(var(--shift, 0));
  }
  100% {
    transform: translateY(0) translateX(var(--shift, 0));
  }
}
@keyframes float_right {
  0% {
    transform: translateY(0) translateX(var(--shift, 0));
  }
  50% {
    transform: translateY(-10px) translateX(var(--shift, 0));
  }
  100% {
    transform: translateY(0) translateX(var(--shift, 0));
  }
}

/* 熊（前景） */
.bear {
  position: absolute;
  left: 50%;
  width: var(--bear-w);
  z-index: 4;
  pointer-events: none;
}

.bear-right {
  bottom: 13%;
  transform: translate(110%, 0%);
}
.bear-left {
  bottom: 7%;
  transform: translate(-220%, 0%);
}

/* 手機微調 */
@media (max-width: 640px) {
  .bear-right {
    bottom: 10%;
    transform: translate(90%, 5%);
  }
  .bear-left {
    bottom: 6%;
    transform: translate(-180%, 5%);
  }
  .three-left {
    transform: translate(120%, -10%);
  }
  .three-right {
    transform: translate(-180%, -5%);
  }
}
</style>
