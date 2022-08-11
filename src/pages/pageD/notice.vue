<template>
	<view class="noticeViewContainer">    
    <view class="msgContainer" v-for="(item,index) in noticelist" :key="index"  @click="viewRead(item)">
      <view class="noticeBox">
        <view class="noticeTop">
          <view class="noticebadge"><nut-badge :value="0" top="-5" dot :color="item.hasRead? '#bbb' : '#fa2c19'"> </nut-badge></view>
          <view class="noticeContent">{{item.expectation}}</view>
        </view>
        <view class="noticeTime">{{item.createTime}}</view>
      </view>
    </view>   
  </view>    
</template>

<script>
import { reactive } from 'vue';
import { eventCenter } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import {mapState} from 'vuex'

export default {
  name: 'notice',
  components: {},    
  setup(){
    const state = reactive({
      visible:false,      
      headerImg: require('../../images/tsy.png'),  
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
        noticelist:[
          {
            id:1000,
            parentId:1,
            uid:99,
            fromUser:'系统消息',
            expectation: '因为有你，我每天都能过情人节',            
            createTime:'2022-05-21 09:38',
            hasRead:false,
            type:1
          },
          {
            id:1001,
            parentId:2,
            uid:99,
            fromUser:'系统消息',
            expectation: '谁送我山水一程又一程，谁共我风雪一更又一更。',            
            createTime:'2022-05-20 08:30',
            hasRead:false,
            type:1 
          },
          {
            id:1002,
            parentId:3,
            uid:99,
            fromUser:'系统消息',
            expectation: '我喜欢你，哪怕四海升平，天地不仁，终不忘你。我喜欢你，哪怕海枯石烂，天崩地裂，终不负你。',            
            createTime:'2022-05-20 08:30',
            hasRead:true,
            type:1
          },
          {
            id:1003,
            parentId:4,
            uid:99,
            fromUser:'系统消息',
            expectation: '江山若深情，何故换风景。红尘若柔情，何必扰心境。',            
            createTime:'2022-05-15 14:55',
            hasRead:false,
            type:1
          },
          {
            id:1004,
            parentId:5,
            uid:99,
            fromUser:'系统消息',
            expectation: '余生愿与你坐看青山，卧观星宇。与朝霞为伴，夜露为亲。依山观澜，檐下听雨。',            
            createTime:'2022-02-28 23:06',
            hasRead:true,
            type:1
          },
          {
            id:1005,
            parentId:6,
            uid:99,
            fromUser:'系统消息',
            expectation: '你是我今生渡不过的劫，在彼岸守候三载浮生未歇。',            
            createTime:'2022-02-25 13:45',
            hasRead:true,
            type:1
          },
          {
            id:1006,
            parentId:7,
            uid:99,
            fromUser:'系统消息',
            expectation: '一川云水，一朵彼岸，流年于指尖散落，一影碎念，一场风花，浅吟低唱成曲。',            
            createTime:'2022-01-01 09:29',
            hasRead:true,
            type:1
          }
        ]   
    }
  },
  computed: {
    num() {
        // 获取store里的stage的count值
        return this.$store.state.count;
    },
    // 映射store.js state里的数据
    ...mapState({
        count: (state) => state.count,
        list: (state) => state.testlist,
    })
  },
  mounted() {    
    let that = this;    
    //var userJsonStr = sessionStorage.getItem('user');     
    //console.log(JSON.parse(userJsonStr))    
    /*
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('notice')) {
      this.$store.replaceState(
        //Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。
        //语法：Object.assign(target, …sources)
        Object.assign(this.$store.state.notice,JSON.parse(userJsonStr))
      )
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    // beforeunload事件在页面刷新时先触发
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('notice', JSON.stringify(this.$store.state))
    })*/
  },
  watch: {//使用这个属性，可以监视 data 中指定数据的变化
    msgVal: function(newVal, oldVal) {
      //console.log('new:'+ newVal)  
      let that = this;
      let count = that.msgVal.length;
      that.inputLength = count; 
    }
  },  
  methods: {
    makeId: function(index) {
      return 'msg-' + index
    },
    viewRead: function(item) {
      //console.log(item)
      let that = this;
      let targetUrl = item.type; //1 = 系统通知，2 = 用户消息
      let beforNoticeList = that.noticelist ;
      let afterNoticeList = [] ;
      if(targetUrl == 1) {
        //修改为已读
        for(var i in beforNoticeList) { //得到单个{}
          //console.log(i)
          //console.log(beforNoticeList[i])
          let noticeObj = {
            id: beforNoticeList[i].id,
            parentId: beforNoticeList[i].parentId,
            uid: beforNoticeList[i].uid,
            fromUser:beforNoticeList[i].fromUser,
            expectation: beforNoticeList[i].expectation,            
            createTime: beforNoticeList[i].createTime,
            hasRead:beforNoticeList[i].hasRead? true : item.id == beforNoticeList[i].id ? true : false,
            type:beforNoticeList[i].type
          }
          afterNoticeList.push(noticeObj)
        }
        that.noticelist = afterNoticeList;
        //异步保存
        /*
        Taro.request({       
          url:'/api/loveDictionary/find',
          data: {          
            id: item.id,
          },
          method:'POST',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            // 关闭loading
            //Taro.hideLoading();
            console.log(res.data);
            //var tmpArr = res.data;
          },
          fail: function(error) {            
            // 关闭loading
            //Taro.hideLoading();
            // 提示请求错误
            Taro.showToast({ title: '请求异常，请稍后再试', icon: 'none'}); 
            //that.state.submsglist = [];
            //that.state.myReturnMsg = [];
            //that.noReTurnData = true;          
          }
        });*/
        //存入sessionStorage
        let notice = {
          notice_id: item.id,
          notice_title: item.expectation,
          notice_createTime: item.createTime
        }        
        this.$store.replaceState(
          Object.assign(this.$store.state, notice)
        );
        sessionStorage.setItem('notice', JSON.stringify(notice));
        //跳转到阅读页面        
        Taro.navigateTo({
          url:'/pages/pageD/noticeDetail'
        })
      }     
    },
    showReturnBox(index,id) {
      let that = this;
      //console.log(index + '--' + id);
      //点击显示再点击隐藏
      this.activeIndex = this.activeIndex == index ? -1 : index;   
      //console.log('this.activeIndex = ' + this.activeIndex);  
      if(this.activeIndex == index) {
        let param_id = id;
        console.log('执行异步请求...'); 
        //加载回应数据
        Taro.showLoading({
          title: '加载中',
          mask: true // 是否显示透明蒙层，防止触摸穿透 。遮罩层颜色，默认透明 rgba(0,0,0,0)
        });      
        // 后端请求数据
        Taro.request({       
          url:'/api/loveDictionary/find',
          data: {          
            id: param_id,
          },
          method:'POST',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            // 关闭loading
            Taro.hideLoading();
            console.log(res.data);
            //var tmpArr = res.data;
          },
          fail: function(error) {            
            // 关闭loading
            Taro.hideLoading();
            // 提示请求错误
            Taro.showToast({ title: '请求异常，请稍后', icon: 'error'}); 
            //that.state.submsglist = [];
            //that.state.myReturnMsg = [];
            //that.noReTurnData = true;          
          }
        });
        /*
        setTimeout(function () {
          Taro.hideLoading()
        }, 2000) */
      }
    },
    showReturnDialog() {
      this.state.visible = true;
    },
    // 关闭回应TA弹框
    coloseReturnDialog() {
      this.state.visible = false; 
      this.msgVal = ''
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
.noticeViewContainer .msgContainer {  
  font-size: 14px;
  padding: 10px;  
}
.msgContainer .noticeBox {
  width:100%;
  border-bottom: 1px solid #e7e7e7;
}
.msgContainer .noticeTop { 
  display: flex;
  align-items: center;
}
.noticeTop .noticeContent {
  margin-left:15px;
}
.noticeTime {
  color:#bbb;
  font-size: 12px;
  margin-left:15px;
  padding: 5px 0px 8px 0px;
}
.nodata {
  background-color: #fff;
}
.nut-empty-description {    
    color: #999;
}



</style>
