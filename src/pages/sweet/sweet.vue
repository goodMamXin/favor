<template>
  <view  style="width:100%;height: 100%;background-color:#fffffc;position:absolute;">
    <!-- 搜索框 -->    
    <view>
      <!--#BD1541 #db5a6b #f47983 #ffb3a7 #FFDBDB-->
      <nut-searchbar v-model="page.state.searchValue" @search="page.methods.mySearch">
        <template v-slot:leftin>
          <nut-icon size="14" name="search2"></nut-icon>
        </template>
        <template v-slot:rightout>
          <view class="searchBtn" @click="page.methods.mySearch">搜索</view>
        </template>
      </nut-searchbar>
    </view>

    <!-- 情话宝典 -->
    <view>   
      <!-- 导航-->
      <view>
        <nut-row>          
          <nut-col :span="8" v-for="item in navCol" :key="item.id">
            <view :class="item.id == clickId ? 'flex-content flex-content-light' : 'flex-content' " @click="reqData(item.id)">{{item.name}}</view>
          </nut-col>
        </nut-row> 
      </view>   
      <!-- 内容滚动 -->
      <view>
        <scroll-view :scroll-y="true" 
          style="height: 432px;" 
          @scrolltoupper="upper" @scrolltolower="lower" 
          @scroll="scroll" :scroll-top="scrollTop">            
            <view id="demo1" user-select='true' class="scroll-view-item" v-for="(item, index) in page.state.list" :key="index">{{item.content}}</view>            
        </scroll-view>
      </view>
    </view>

    <!-- 轮播图 -->    
    <view class="sample">
      <nut-swiper :init-page="swiperPage" :pagination-visible="true" pagination-color="#F2889B" auto-play="0">        
        <nut-swiper-item v-for="item in swiperData" :key="item">
          <img :src="item.imgURL" alt="" />
        </nut-swiper-item>
      </nut-swiper>
    </view>

    <!--
    <view class="container">
      <view class="category-left">
        <scroll-view scroll-y="true" style="height:100%">
          <block wx:for="{{category}}" wx:key="id">
          <view class="catgegory-item {{activeId === item.id?'active-item':''}}" data-id="{{item.id}}" bindtap="clickItem">{{item.name}}</view>
          </block>
        </scroll-view>
      </view>    
      <view class="category-right">
        <scroll-view scroll-y="true" style="height:100%" scroll-into-view="{{toView}}" scroll-with-animation="ture" bindscroll="scroll">
          <view class="categoty-detail">
          <block wx:for="{{content}}" wx:key="id">
            <view class="catefory-main">
              <view class="category-title" id="{{item.id}}">{{item.title}}</view>
              <view class="category-content">
                  <view class="content-item" wx:for="{{item.options}}" wx:for-item="i" wx:key="id">
                    <text>{{i.text}}</text>                                                      
                  </view>
              </view>
            </view> 
          </block>
          </view>
        </scroll-view>
      </view>
    </view>
    -->
  <!-- 轮播图 -->
  <!-- 
  <view class="sample">
    <swiper class="swiper" 	indicator-dots="{{swiperOptions.indicatorDots}}" indicator-color="{{swiperOptions.indicatorColor}}" indicator-active-color="{{swiperOptions.indicatorActiveColor}}" 	autoplay="{{swiperOptions.autoplay}}" interval="{{swiperOptions.interval}}" circular="{{swiperOptions.circular}}" vertical="{{swiperOptions.vertical}}">
      <block>
        <swiper-item wx:for="{{swiperData}}" wx:key="index">
          <image src="{{item.imgUrl}}" mode="widthFix" class="auto-img" swiper-img></image>
        </swiper-item>
      </block>
    </swiper>
  </view> 
   -->

</view> 
</template>

<script>
import { reactive, toRefs,ref,onMounted,getCurrentInstance } from 'vue';
import { eventCenter } from '@tarojs/taro'
import Taro from '@tarojs/taro'
export default {
  name: 'sweet',
  components: {
    
  },
  setup(){ //setup处于beforeCreate和created两个钩子函数之前
    const myFocus = function () {
      //console.log(event);
    };
    const page = {
      state : reactive({
        searchValue: "",
        msg: 'toast',
        type: 'text',
        show: false,
        cover: false,  
        duration:0,
        tabValue: '0',
        list:[
          {
            'id':1,
            'name':'元稹',
            'content':'曾经沧海难为水，除却巫山不是云。'
          },
          {
            'id':2,
            'name':'李商隐',
            'content':'身无彩凤双飞翼，心有灵犀一点通。'
          },
          {
            'id':3,
            'name':'李之仪',
            'content':'只愿君心似我心，定不负相思意。'
          },
          {
            'id':4,
            'name':'张仲素',
            'content':'相思一夜情多少，地角天涯未是长。'
          },
          {
            'id':5,
            'name':'秦观',
            'content':'两情若是久长时，又岂在朝朝暮暮。'
          },
          {
            'id':6,
            'name':'诗经',
            'content':'死生契阔，与子成说。执子之手，与子偕老。'
          },
          {
            'id':7,
            'name':'苏轼',
            'content':'但愿人长久，千里共婵娟。'
          },
          {
            'id':8,
            'name':'乐婉',
            'content':'相思似海深，旧事如天远。'
          },
        ]
      }),
      methods: {       
        mySearch: () => {          
          let value = page.state.searchValue;          
          if(value === ""){
            Taro.showToast({
              title: '请输入内容',
              icon: 'none'
            })
            return;
          }
          //console.log(value)
        },
        onClosed: () => console.log('closed'),               
      }
    };

    return { 
      page ,
      myFocus,
    };
  },
  data() {
    return {
        backgroundImg:require("../../images/login.png"),
        scrollTop: 0,
        toView: 'demo2',
        clickId:'1',
        navCol: [{'name':'开场搭讪','id':'1'},{'name':'幽默情话','id':'2'},{'name':'古风丽语','id':'3'}],
        swiperPage: '1',        
        swiperData:[ // 轮播图数据
          {
            imgURL:require('../../images/swiper-1.jpg')
          },
          {
            imgURL:require('../../images/swiper-2.jpg')
          },
          {
            imgURL:require('../../images/swiper-3.jpg')
          },
          {
            imgURL:require('../../images/swiper-4.jpg')
          }
        ],
      }
  },
  created() {
    console.log('create');
  },
  onShow(){     
    console.log(this.$store.state.user)
    this.$base.isLogin(); 
  },
  mounted() {
    // 请求数据
    let that = this ;
    // 加载数据（开发时暂停关闭后端请求，当上线时需开启）
    //that.reqData('1');
    // 打印登陆信息
    // console.log(this.$store.state.user)
    //setInterval与setTimeout的不同在于，但setInterval启动之后，当我们要跳转到别的页面时，我们需要手动停止。
    //停止的方法入上面代码所示使用clearInterval。在setInerval的函数体内进行判断是否停止循环。
    // 检验登陆
    /* let timer = setInterval(() => {      
      this.$base.isLogin();
    },200)  */ 
    //this.$base.isLogin();  
  },
  methods: {
    // 向上滚动
    upper(e) {
      //console.log('upper:', e)
    },
    // 向下滚动
    lower(e) {
      //console.log('lower:', e)
    },
    // 滚动事件
    scroll(e) {
      //console.log('scroll:', e)
    },
    reqData: function(param){
      //console.log(param);     
      this.clickId = param; 
      let that = this;
      //this.page.methods.openToast('loading','加载中',true);
      
      // 显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框(参见微信官方)
      Taro.showLoading({
        title: '加载中',
        mask: true // 是否显示透明蒙层，防止触摸穿透 。遮罩层颜色，默认透明 rgba(0,0,0,0)
      });      
      // 后端请求数据
      Taro.request({
        //url: 'https://api.apiopen.top/getJoke?page=1&count=2&type=video', //仅为示例，并非真实的接口地址        
        url:'/api/loveDictionary/find',
        data: {          
          resource: param,// 类型          
          page:1,
          count:20,
          type:'video'
        },
        method:'POST',
        header: {
          'content-type': 'application/json' // 默认值
          //'content-type':'application/x-www-form-urlencoded'//测试api
        },
        success: function (res) {
          // 关闭loading
          Taro.hideLoading();
          console.log(res.data);
          //var tmpArr = res.data;
          that.page.state.list = [];// 清空数据集
          that.page.state.list = res.data;
        },
        fail: function(error){
          //console.log(error)
          // 关闭loading
          Taro.hideLoading();
          // 提示请求错误
          Taro.showToast({ title: '网络异常，请稍后', icon: 'none'});
        }
      })
      setTimeout(function () {
        Taro.hideLoading()
      }, 2000)       
    }
  }
}
</script>

<style>
/*
使用@import引入样式文件，就算加scoped，其它没有引入的模块还是可以访问到你的样式，如果某个组件的类名一致，则就会被污染到。
如果不想被污染，修改引入方式。要是再写新的样式，要重新写一个新的style标签
// @import './index.scss';
*/
.scroll-view-item { 
    background: #FFf; 
    border-bottom:1px solid #f2f2f2;
    padding:8px 15px;
    font-size: 12px;
    font-weight: normal;
  }
  
  .flex-content {
    line-height: 40px;
    height: 40px;
    font-size: 14px;
    font-weight: normal; 
    text-align: center;
    cursor: pointer;  
    /* 
    color:#777;
    background: #FFDBDB;
    color: #797979; */
    /* background: #FFA5AE; 
    color:#797979;
    background: #F8ABA6;*/
    color:#fff;  
    background: #F2AEAE;
    border-top:1px solid #F5D7CB;
    border-bottom:1px solid #F5D7CB;
    border-left:1px solid #F5D7CB;
  }
  .flex-content-light {
      /* background: #FABEBE; */
      /* background: #FF777D; 
      background: #f58f98; */
      background:#f47983;
  }
  .searchBtn {
    cursor: pointer;
    color: #777;
  }
  .nut-swiper-item {
    line-height: 150px;  
  }
  .nut-swiper-item img {
    width: 100%;
    height: 100%;
  }


</style>
