<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goToHome() {
  router.push('/home')
}
</script>

<template>

<section class="">
<!-- 天空 -->
<div class="sky_wrap">
  <img src="@/assets/images/p4_bg.png">
</div>  

<div class="login_wrap">
  <div class="container ">
<div class="bears_login">
  
  <img src="@/assets/images/p4_top.png">

</div>


  <div class="login_btn1" >
  <div class="center" > 
  <div class="col-6 font-c font36">
      <button @click="goToHome" class="btn_y">保戶</button>   
  </div> 
  <div class="col-6 font-c font36"> 
      <button @click="$router.push('/new')" class="btn_y">非保戶</button>
  </div>
  </div>

  <p class="mt-3">冒險已經展開，快跟白白一起出發！</p>
</div> 


<div class="grasslower1">
  <div class=" row">
  <div class="col-6 qrcode center"><img src="@/assets/images/qrcode.png"></div>
  <div class="col-6 logo2 center"><img src="@/assets/images/logo2.png"></div>
  </div>
</div>
</div> 
</div>

<div class="mt-5 mb-5 info container ">
<h2 style=" text-align: center; font-weight: bold; ">
    活動資訊<br><br><br>
活動期間：民國（下同）115年2月1日起至115年4月30日止。<br>
活動對象：於活動前或活動期間註冊國泰人壽會員者，並於活動期間至少成功登入年度回顧活動一次者。<br>
活動辦法：活動對象於活動期間內，透過檢視個人年度回顧網頁，即可獲得抽獎機會乙次，獎項為小樹點(生活)80點，中獎名額共計2,000名。<br>
註：得獎者聯絡資料以本公司留存之最新資料為準，如本公司查無email、非正確格式、電子信箱遭退信或拒收，視同放棄得獎機會。<br>
</h2>



活動注意事項(範例)
<ol>  
<li>符合本活動資格者，每一身分證字號僅限獲得一次抽獎機會，及僅限中獎一次，中獎時須為國泰人壽App用戶，始符合中獎資格。</li>
<li>本公司將於活動結束後二個月內，於官網最新消息公布得獎名單，並另以國泰人壽App會員註冊之Email通知得獎者，得獎者須自行按照序號兌換，請於期限內使用完畢逾期不補。</li>
<li>本活動獎項將以電子序號形式兌換小樹點(生活) ，電子序號一經完成兌換後，恕無法退換。中獎人不得以任何理由要求更換其他產品、更換獎項或轉讓予他人，亦不得要求變換或折換等值現金或以其他方式領取。如遇產品缺貨或不可抗力事由導致獎項內容變更，本公司有權變更獎項，改由等值商品取代。</li>
<li>請用戶下載「國泰優惠CUBE Rewards App」，即可兌換小樹點。</li>
<li>小樹點(生活) 1點=新台幣1元。小樹點(生活)是「國泰優惠CUBE Rewards App」所 提供生活饗樂的必備點數。從國泰人壽App授權綁定國泰優惠CUBE Rewards App 後，你可以靈活運用點數兌換商品、禮券、購物、停車折抵等超多好康。</li>
<li>本公司〈扣繳義務人〉給付參與人〈納稅義務人〉之全年給付所得總額超過新臺幣 1,000元〈含〉以上，本公司將依稅法相關規定申報年度個人所得。參與人參加本活動而需支付之任何稅捐係屬其依稅法之規定所須履行之義務，概與本公司無關，如有其他未盡事宜悉依稅法相關規定辦理。</li>
<li>參與人於參加活動時，即同意接受本活動注意事項規範；本活動之投保紀錄、服務 接觸次數、「FitBack健康吧」等資料，以本公司電腦系統紀錄與本公司認定為準；本公司有權檢視各項紀錄，若參與人資格不符合、違反本活動規定事項或涉及不正當得利及非法行為者，本公司得排除其參與活動及中獎資格，並得依法主張相關權利。若有任何因為電腦、網路、電話、技術或不可歸責於本公司之事由，而使參與人之資料有遺失、錯誤、無法辨識或毀損情況，本公司不負任何法律責任，參與人亦不得因此異議。</li>
<li>個資告知事項：參與人瞭解及同意本公司為本活動及行銷之需要蒐集、處理及利用其個人資料。本公司係基於遵守我國法令規定、提供本網路查詢服務或參與人可能需要本公司金融商品或服務資訊等特定目的，本於誠實信用原則及必要性原則蒐集、處理或利用參與人於本網路登載及後續基於上開特定目的與本公司往來之個人資料。 除事先取得參與人同意或法令另有規定外，本公司處理或利用上開資料之期間、地區、對象及方式，將限於達成上開特定目的之必要範圍內為之。</li>
<li>本公司保留隨時變更及終止本活動之權利，並於本公司官網公告之。若有其他未盡事宜，悉依本公司相關規定或解釋為準。</li>
<li>如有疑問請洽本公司客服專線，市話請撥打免付費專線：0800-036-599，手機請改撥付費電話：02-21626201或網路電話(路徑：本公司官網首頁>問題與聯繫客服>聯絡我們>24小時客服電話>撥打網路電話)。</li>
</ol>  

</div> 

</section>

 
 <!-- <div class="login-page">
    <button @click="goToHome" class="login-btn">Login</button>
       <button @click="$router.push('/new')">前往 New 頁面</button>
  </div> -->
</template>

<style scoped>









</style>
