<template>
	<view class="noticeViewContainer">    
    <view class="contentContainer">
      <view class="title">{{detail_info_title}}</view>
      <view class="info">
        <view>
          <img :src="state.headerImg"/>
          <view class="username">{{detail_info.fromUser}}</view>
        </view>
        <view class="time">{{detail_info_createTime}}</view>
      </view>
      <view class="content">{{detail_info.content}}</view>
    </view>   
  </view>    
</template>

<script>
import { reactive } from 'vue';
import { eventCenter } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import {mapState} from 'vuex'

export default {
  name: 'noticeDetail',
  components: {},    
  setup(){
    const state = reactive({
      visible:false,      
      headerImg: require('../../icon/logo.png'),  
      none: require('../../images/none.png')
    });    
    const handleClick = (type, msg, cover = false) => {      
      //state.searchValue = "";
    };
    return {
      state, handleClick
    }
  },
  data() {
    return {   
        showNoData:false , 
        noReTurnData:false,       
        activeIndex: -1,
        inputLength:0,
        msgVal:'',
        inputValue:'',
        windowWidth: Taro.getSystemInfoSync().windowWidth,//可获得屏幕宽度
        windowHeight: Taro.getSystemInfoSync().windowHeight,//可获得屏幕高度
        keyHeight: 0,
        scrollHeight: '0px',
        topNum:0,
        inputBottom: 0,
        toView:"",
        uid:0,
        card_height:'0',
        nodata_height:'0',
        footer_height:'0',        
        detail_info:
          {
            id:1000,
            parentId:1,
            uid:99,
            fromUser:'匀曜',
            title: '因为有你，我每天都能过情人节',       
            content:'情人节的这天，空气中仿佛都弥漫着玫瑰花的清香，爱的寄语。感恩岁月，让我们相遇；感恩时光，让我们相爱；感恩爱情，让我们相守。生活有时就像一碗白开水，自从我与你那次邂逅，认识了你，我才品到了白开水的甘甜。因为有你，我的生活有了阳光和雨露，有了希望与未来。没有遇到你时，我的人生处处都充满了孤寂；自从遇到你，我的生活中仿佛多了一束光亮，温暖而又明媚。从此我爱上了你，尔后我们又风雨同舟，同甘共苦，相依相伴，有了你相伴同行，我的心里踏实安逸；因为有你，我对未来充满了期许，有了更美好的憧憬。四季日夜，有你陪伴，我幸福我欣慰，有你陪伴，每天都过情人节！',     
            createTime:'2022-05-21',
            hasRead:false,
            type:1
          }
    }
  },
  computed: {
    num() {
        // 获取store里的stage的count值
        return this.$store.state.count;
    },
    // 映射store.js state里的数据
    ...mapState({        
        detail_info_id: (state) => state.notice_id,
        detail_info_title: (state) => state.notice_title,
        detail_info_createTime: (state) => state.notice_createTime
    }),/*
    detail_info_id() {
      return this.$store.state.notice_id; //获取仓库的notice_id
    },
    detail_info_title() {
      return this.$store.state.notice_title; //获取仓库的notice_id
    }*/
  },
  mounted() {    
    //let that = this;
    /*
      解决vue刷新页面以后丢失store的数据问题
      https://www.bianchengquan.com/article/266931.html
    */    
    //console.log(this.$store.state) 
    // 取值时：把获取到的Json字符串转换回对象
    let noticeJsonStr = sessionStorage.getItem('notice'); 
    //console.log(noticeJsonStr)     
    console.log(JSON.parse(noticeJsonStr)) 
    // 在页面加载时读取sessionStorage里的状态信息
    if (noticeJsonStr) {
      this.$store.replaceState(
        //Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。
        //语法：Object.assign(target, …sources)   
        Object.assign(this.$store.state, JSON.parse(noticeJsonStr)) //合并 
      )
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    // beforeunload事件在页面刷新时先触发
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('notice', JSON.stringify(this.$store.state))
    })
  },
  watch: {//使用这个属性，可以监视 data 中指定数据的变化
    msgVal: function(newVal, oldVal) {      
      let that = this;
      let count = that.msgVal.length;
      that.inputLength = count; 
    }
  },  
  methods: {
    makeId: function(index) {
      return 'msg-' + index
    },    
    // 发送消息
    sendReturnMsg() {
      let that = this;
      let bulletVal = this.inputValue;   
      //console.log(bulletVal)   
      if(bulletVal) {
        //Taro.showToast({ title: '发送成功', icon: 'success'}); 
        let new_msg = {
          id:new Date(),
          uid:168,
          from:this.makeRandom(1,3),
          expectation:bulletVal,
          uimg: require('../../images/tsy.png'),
          createTime:this.formatDate('yyyyMMddHHmm')
        };
        console.log(new_msg.from)
        // 追加回复
        this.msglist.push(new_msg);
        // 发送消息之后自动的滚动到底部就是滚动到最后一条数据。遍历数据的时候给每条数据添加一个id，设置scroll-into-view的值为最后一条数据的id
        //this.toView = 'msg-' + (this.msglist.length -1);
        this.$nextTick(function(){
          this.toView = 'msg-' + (this.msglist.length -1);
        });
        this.inputValue = '' ;                 
        // 异步保存
        /*
        Taro.request({       
          url:'/api/loveDictionary/find',
          data: {          
            msg: bulletVal,
          },
          method:'POST',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            // 关闭loading
            Taro.hideLoading();
            console.log(res.data);
            that.state.myReturnMsg = [];// 清空数据集
            that.state.myReturnMsg = res.data;
          },
          fail: function(error) {            
            // 关闭loading
            Taro.hideLoading();
            // 提示请求错误
            Taro.showToast({ title: '保存异常，请稍后', icon: 'error'});    
            that.noReTurnData = true       
          }
        });
        this.inputValue = '';*/
      }else { // 不为空提示 
        Taro.showToast({ title: '请输入内容', icon: 'error'});
      }
    },
    formatDate(type) {      
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1 < 10? '0' + (new Date().getMonth() + 1): new Date().getMonth() + 1;
      let dd = new Date().getDate()< 10? '0' + new Date().getDate(): new Date().getDate();
      let hh = new Date().getHours()< 10? '0' + new Date().getHours(): new Date().getHours();
      let mf = new Date().getMinutes()<10? '0' + new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds()<10? '0' + new Date().getSeconds() : new Date().getSeconds();
      let time = '';
      if(type == 'yyyyMMdd') {
          time = yy+'-'+mm+'-'+dd;
      } else {
          time = yy+'-'+mm+'-'+dd+' '+hh+':'+mf;
      }
      return time
    },
    makeRandom(min, max) { //生成 [min,max] 的随机数 原理是 随机数和最大值减最小值的差相乘 最后再加上最小值
      //Math.random() 返回 0 ~ 1 之间的随机数，包含 0 不包含 1
      //Math.ceil(x) 对 x 进行上舍入，即向上取整。例如：Math.ceil(1.6) 返回2
      //Math.floor(x) 对 x 进行下舍入，即向下取整。例如：Math.floor(1.6) 返回1
      return Math.floor(Math.random() * (max - min)) + min;    
    },
  }
}
</script>

<style>
.noticeViewContainer {
    position:absolute;
    width: 100%;
    min-height: 100%;
    overflow: auto;
    color:#666;
}
.noticeViewContainer .contentContainer {  
  font-size: 14px;
  padding: 10px;  
}
.noticeViewContainer .contentContainer .title {    
  margin-bottom: 15px;
  color: #DB9393;
  word-wrap: break-word;
  text-align: justify;
  line-height: 30px;
  font-size: 16px;
  font-weight: bold;
}
.noticeViewContainer .contentContainer .info {    
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
}

.info img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-right: 8px;
  border-radius: 50%;
}
.info .username {
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
}
.info .time {
  color:#bbb;  
}
.noticeViewContainer .contentContainer .content {
  word-wrap: break-word;
  text-align: justify;
  line-height: 30px;
  font-size: 16px;
  color: #333;
}

.nodata {
  background-color: #fff;
}
.nut-empty-description {    
    color: #999;
}



</style>
