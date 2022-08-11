<template>
	<view class="tempView"> 
    <!-- 头像部分-->    
    <view class="header">
      <view class="uimg">
        <image :src="uimg" class="uavatar"></image>
      </view>
      <view class="uinfo">
        <view class="uname">玄心</view>
        <view class="word">红尘无限好，从此不羡仙。</view>
      </view>
    </view>
    
    <!-- 许愿币-->
    <view class="balance">
      <image class="pay-img" src="../../images/pay.png"></image>
      <view class="pay-info">
        <view class="balance-items">
          <view class="balance-text">许愿币余额:</view>
          <view><text class="balance-count">{{wishMoney}}</text>个</view>
        </view>
        <view class="pay-op">          
          <view class="pay-do">充值</view>
          <view class="pay-detail">充值明细</view>
        </view>
      </view>
    </view>
    <view style="background-color:#f2f2f2;">
      <view>
          <nut-cell title="完善资料" icon="edit" round-radius="0" is-link @click="toview(1)"></nut-cell>           
      </view>  
      <view>
          <nut-cell title="我的许愿" icon="addfollow" round-radius="0" is-link @click="toview(2)"></nut-cell>
      </view> 
      <view>
          <nut-cell title="我的回应" icon="dongdong" round-radius="0" is-link @click="toview(3)"></nut-cell>
      </view> 
      <view>
          <nut-cell title="赚许愿币" icon="share" round-radius="0" is-link @click="toview(4)"></nut-cell>
      </view> 
      <view>
          <nut-cell title="联系我们" icon="voice" round-radius="0" is-link @click="toview(5)"></nut-cell>
      </view> 
      <view>
          <nut-cell title="注销账户" icon="scan2" round-radius="0" is-link @click="toview(6)"></nut-cell>
      </view>  
    </view>
  </view>    
</template>

<script>
import { reactive, toRefs } from 'vue';
import { eventCenter } from '@tarojs/taro'
import Taro from '@tarojs/taro'

export default {
  name: 'my',
  components: {
    
  },
  setup(){
    const state = reactive({
      searchValue: ""
    });

    const handleClick = (type, msg, cover = false) => {      
      //state.searchValue = "";
    };

    return {
      ...toRefs(state),
      handleClick
    }
  },
  data() {
    return {        
        uimg:require('../../images/mm.jpg'),
        wishMoney:8
    }
  },
  methods: {
    // 跳转到修改资料
    toview: function(index){
      if(index == 1) {
        Taro.navigateTo({
          url:'/pages/pageA/modifyInfo'
        })
      } 
      if(index == 2) {
        Taro.navigateTo({
          url:'/pages/pageB/mywish'
        })
      }  
      if(index == 3) {
        Taro.navigateTo({
          url:'/pages/pageC/myreturn'
        })
      }     
    }
  }
}
</script>

<style>
.tempView {
    position:absolute;
    width: 100%;
    height: 100%;
    background-color: #f2f2f2;
}
.header {
    width: 100%;   
    background-color: #fff;
    padding: 10px;    
}
.uimg {
    float: left;   
    border-radius: 5px;       
}
.uavatar {
    background-color: #105762;    
    width: 80px;
    height: 80px;
    padding:0px;
    margin:0px;   
    border-radius: 5px;
}
.uinfo {        
    margin-left: 90px;    
    height: 80px;   
    width: 100%;    
}
.uname {
    color: #666;
    font-size: 18px;
    height: 40px;
    line-height: 40px;
    width: 100%;
}
.header .uinfo .word {
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    width: 100%;
    color: #999;
}
.balance{
    width: 100%;
    color: #888;   
    background-color: #fff;    
    padding: 10px;
    display: flex; 
    display: -webkit-flex;
    margin-top: 10px;    
}
.pay-img{ 
    color: #91213d;
    width: 84.5px;
    height: 100px;
}
.balance-items{            
    display: flex; 
    display: -webkit-flex;    
    height: 60px;       
    line-height: 60px;
}
.balance-count {
    font-weight: bold;
    color: #ff9e0d;
    padding:0px 5px;
}
.pay-info {        
    width: 100%;    
    padding-left: 10px;   
}
.pay-op {
    display: flex; 
    display: -webkit-flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 35px;
    color: #fff;
    font-size: 16px;
    cursor: pointer; 
}
.pay-do {
    background: linear-gradient(135deg,#26bf26 0%,#27c530 45%,#28cf3f 83%,#29d446 100%);
    text-align: center;
    border-radius: 4px;                
    padding: 6px 12px;    
}
.pay-detail {                
    background: linear-gradient(135deg,#26bf26 0%,#27c530 45%,#28cf3f 83%,#29d446 100%);  
    text-align: center;
    border-radius: 4px;
    padding: 6px 12px;   
    margin-left: 10px;
}

</style>
