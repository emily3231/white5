<script setup>

</script>

<template>
  <section class="all_warp ">
    <!-- 天空 -->
    <div class="sky_wrap">
      <div class="bg-wrap"><img src="../assets/images/bg1.png"></div>
      
    <div class="container" >
      <div class="logo"><img src="../assets/images/logo.png"></div>
      <div class="text2025"><img src="../assets/images/2025.png"></div>
      <div class="title"><img src="../assets/images/title.png"></div>
      <div class="ice"><img src="..//assets/images/ice.png"></div> 
    </div>

    </div> 
    <!-- 草地 -->
    <div class="grass-wrap"><img src="../assets/images/bg2.png"></div> 

    <div class="grasstop ">
    <div class="left_tree1"> 
      
    <img src="../assets/images/tree_left.png">
    <span class="star"><img src="../assets/images/star.png"></span>
    </div>
    <div class="right_tree1">
      <span class="star"><img src="../assets/images/star.png"></span>
     <img src="../assets/images/tree_right.png">
    
    </div>

    <div class="container">
      <div class="penguin1"><img src="../assets/images/penguin.png"></div>
      <div class="hug1"><img src="../assets/images/hug.png"></div>
      <div class="bacbac1"><img src="../assets/images/bacbac.png"></div>
    </div>

    </div> 



  </section>
</template>

<style scoped>


.left_tree1 {
  position: absolute;
  left: 0px; 
  top: 300px;
  z-index: 10;
  opacity: 1;
}

.right_tree1 {
  position: absolute;
  right: 0px; 
  top: 300px;
  z-index: 10;
  opacity: 1;
}




.ice{animation: none;
  animation-delay: none;}

.penguin1 {
  position: absolute;
  top: 600px;
  left: 26%;
  z-index: 10;
  opacity: 1;
}

.hug1{
  position: absolute;
  top: 500px;
  left: 58%;
  z-index: 10;
  opacity: 1;
}

.bacbac1 {
  position: absolute;
  top: 600px;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.1);
  animation:
    bacbacMove 1.8s ease-out forwards, /* 放大進場 */
    bacbacJump 2s ease-in-out infinite; /* 跳躍循環，延遲進場後開始 */
  z-index: 50;
  opacity: 0;
}


/* ✅ 跳躍動畫 */
@keyframes bacbacJump {
  0%,
  100% {
 transform: translate(-50%, -60%) scale(1.02, 0.98); /* 空中 */
  }

  80% {
    transform: translate(-50%, -50%) scale(1.05, 0.95) translateY(0); /* 著地 */
  }
}


@media (max-width: 1200px) {

 .right_tree1{ scale: 0.7; right: -80px; top:160px;}
.left_tree1{ scale: 0.7; left: -73px; top:200px;}
.ice1{ top:350px;}
.penguin1{
    top:450px;
scale: 0.7;
}
.hug1{ 
 top:350px;
scale: 0.7;
}
.bacbac1{ 
 top:450px;
scale: 0.7;
left: 50%;
}

}


@media (max-width:768px) {

  .left_tree1{ 
position: absolute; 
/* left: 12px; */
top:20px;
scale: 0.5;
left: -210px;
vertical-align: left; /* 垂直置中 */
}
.right_tree1{ 
position: absolute; 

/* right: 10%; */
top:0px;
scale: 0.5;
right: -230px;
z-index: 10;
}

.penguin1{
    top:300px;
 left: 12%;
scale: 0.6;
}

.hug1{ 
 top:270px;
 left: 58%;
scale: 0.5;

}
.bacbac1{ 
top:300px;
scale: 0.6;
left: 45%;
}
}
</style>
