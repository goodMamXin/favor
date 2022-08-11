<template>
	<view class="tempViewContainer">
    <view class="msgContainer">
      <!-- <view class="card" ref="card">回应是心灵传递的桥梁，是爱意表达的彩虹</view> -->
      <view class="nodata" v-show="showNoData" ref="nodata"><nut-empty description="没找到数据，快去许愿吧"></nut-empty></view>
      <scroll-view scroll-y="true" :scroll-into-view='toView' scroll-with-animation="true" :style="{height:scrollHeight}">
        <view id="chatBox" ref="messageContainer">
          <block v-for="(item,index) in msglist" :key="index">
            <!-- <view style="text-align: center;">2022-05-19 20:45</view>           -->             
            <view v-if="item.msg_type == 2" class="msg msg-left" :id='makeId(index)'> 
              <view class="img-wrapper"> 
                <image class="img" :src="item.msg_fromUserImg" /> 
              </view> 
              <view class="message-wrapper message-wrapper-left"> 
                <view class="message">{{ item.msg_expectation }}</view> 
              </view> 
            </view>  
            <view v-else class="msg msg-right" :id='makeId(index)'> 
              <view class="img-wrapper"> 
                <image class="img" :src="item.msg_fromUserImg" /> 
              </view> 
              <view class="message-wrapper message-wrapper-right">
                <view class="message">{{ item.msg_expectation }}</view> 
              </view> 
            </view>              
          </block>     
        </view>   
        <view class='placeholder-view'></view>        
      </scroll-view>
      <view class="footer" ref="footer">     
        <!--   
        <nut-searchbar v-model="inputValue" placeholder="请输入内容" @focus="onFocus" input-background="#F8ECDE">
          <template v-slot:rightout>
            <view style="color:#AB2849" @click="sendReturnMsg">发送</view>
          </template>
        </nut-searchbar>
        -->
        <view class="sendView">   
          <view class="sview">      
          <nut-row>
            <nut-col :span="20">
              <input class="msginput" v-model="inputValue" auto-focus cursor-spacing="10" confirm-type="send" placeholder="请输入内容"/>
            </nut-col>
            <nut-col :span="4">
              <view class="msgbtn" @click="sendReturnMsg">发送</view>
            </nut-col>
          </nut-row>
          </view> 
        </view>
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
  name: 'myreturn',
  components: {},    
  setup(){    
    const state = reactive({
      visible:false,      
      uimg: require('../../images/tsy.png'),  
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
        msg_type:"",
        msg_openid:"",
        msg_fromUserId:'',
        msglist:[
          {
            msg_id:1000,
            msg_parentId:2,            
            msg_fromUserId:99,
            msg_fromUserName:'韵儿',
            msg_fromUserImg: require('../../images/tsy.png'),
            msg_expectation: '想找个广东的，要顾家，宠老婆，又懂浪漫的男朋友，非诚勿扰！谢谢！',            
            msg_createTime:'2022-05-08 20:08',
            msg_type:'2',//别人
          },
          {
            msg_id:1001,
            msg_parentId:3,            
            msg_fromUserId:100,
            msg_fromUserName:'风尘中的酒',
            msg_fromUserImg: require('../../images/tsy.png'),
            msg_expectation: '即许一人以偏爱，愿尽余生之慷慨。',            
            msg_createTime:'2022-05-17 16:45',
            msg_type:'1',//我
          }
        ]    
    }
  },
  computed: {
    num() {        
        return this.$store.state.count;
    },
    // 映射store.js state里的数据
    ...mapState({
        count: (state) => state.count
    })
  },
  mounted() {    
    //获取sessionStorage中的数据
    let that = this;
    let user = sessionStorage.getItem('user');   
    console.log(user)
    //判断是否登陆    
    if(!user) { //未登陆      
      console.log('未登陆');
      Taro.showModal({
        title: '提示',
        content: '你的登陆信息已失效，请重新登陆',
        showCancel:false,
        success (res) {
          if (res.confirm) {
            //console.log('用户点击确定')
            Taro.navigateTo({
              url:'/pages/index/index'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      Taro.navigateTo({
        url:'/pages/index/index'
      })
      return false;
    }
    //console.log(this.$store.state)    
    let msgJsonStr = sessionStorage.getItem('msg'); 
    //console.log(msgJsonStr)
    if (msgJsonStr) {
      this.$store.replaceState(  
        Object.assign(this.$store.state, JSON.parse(msgJsonStr)) //合并 
      )
      //sessionStorage.clear();
      //填充数据
      let fromArrData = [];
      let fromObj = JSON.parse(msgJsonStr);
      console.log(fromObj)   
      fromArrData.push(fromObj);
      //console.log(fromArrData)
      that.msglist = fromArrData;
      that.msg_type = fromObj.msg_type;      
      that.msg_fromUserId = fromObj.msg_fromUserId;//愿主id
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    // beforeunload事件在页面刷新时先触发
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('msg', JSON.stringify(this.$store.state))
    })
    //根据parentId（指许愿id）获取聊天记录
    //console.log(msgJsonStr) 
    let parent_id = JSON.parse(msgJsonStr).msg_parentId;
    //console.log(parent_id)
    

    /*
    // 显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框(参见微信官方)
    Taro.showLoading({
      title: '加载中',
      mask: true // 是否显示透明蒙层，防止触摸穿透 。遮罩层颜色，默认透明 rgba(0,0,0,0)
    });    
    // 后端请求数据    
    Taro.request({       
      url:'/api/loveDictionary/find',
      data: {          
        id: parent_id,
      },
      method:'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 关闭loading
        Taro.hideLoading();
        console.log(res.data);
        var tmpArr = res.data;
        that.msglist = tmpArr;
      },
      fail: function(error) {            
        // 关闭loading
        Taro.hideLoading();
        // 提示请求错误
        Taro.showToast({ title: '请求异常，请稍后', icon: 'none'}); 
        //that.state.submsglist = [];
        //that.state.myReturnMsg = [];
        //that.noReTurnData = true;          
      }
    });*/

    //console.log('windowHeight = '+that.windowHeight)
    //console.log('windowWidth = '+that.windowWidth)
    // 注意：要在元素渲染出来才能获取元素的高度    
    // 使用 Taro.nextTick 模拟 setData 已结束，节点已完成渲
    setTimeout(() => {
      /*
      let query_1 = Taro.createSelectorQuery()
      query_1.select('.card').boundingClientRect((res) => {
        //console.log(res);
        //console.log('card_height = ' + res.height)
        that.card_height = res.height;
      }).exec()*/

      const query_2 = Taro.createSelectorQuery()
      query_2.select('.nodata').boundingClientRect((res) => {
        //console.log('nodata_height = ' + res.height)
        that.nodata_height = res.height
      }).exec()      

      const query_3 = Taro.createSelectorQuery()
      query_3.select('.footer').boundingClientRect((res) => {
        //console.log('footer_height = ' + res.height)
        that.footer_height = res.height
      }).exec()

      that.scrollHeight = (that.windowHeight - that.card_height - that.nodata_height - that.footer_height) +'px';
      //console.log('scrollHeight = ' + that.scrollHeight)
    }, 200)
    /*
    this.$nextTick(() => {// 页面渲染完成后的回调
        //let card_height = this.$refs.card.$el.offsetHeight - 10; 
        //let nodata_height = this.$refs.nodata.$el.offsetHeight;        
        //let footer_height = this.$refs.footer.$el.offsetHeight;
        //console.log('card_height = ' + card_height)
        //console.log('nodata_height = ' + nodata_height)
        //console.log('footer_height = ' + footer_height)
        //that.scrollHeight = (that.windowHeight - card_height - nodata_height - footer_height) +'px';
        //console.log('scrollHeight = ' + that.scrollHeight) 
    });
    */
   /*
    //键盘遮挡输入框问题
    window.addEventListener('resize', function () {
      if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
        if(/Android/gi.test(navigator.userAgent)){
          setTimeout(()=>{
            document.activeElement.scrollIntoViewIfNeeded();
          },100);
        }else{
          document.body.scrollTop = document.body.scrollHeight / 8
        }
      }
    })*/
  },
  watch: {//使用这个属性，可以监视 data 中指定数据的变化
    msgVal: function(newVal, oldVal) {
      //console.log('new:'+ newVal)  
      let that = this;
      let count = that.msgVal.length;
      that.inputLength = count; 
    },
    inputValue: {
      handler(newVal, oldName) {
        //console.log('new:'+ newVal)  
        /*
        this.$nextTick(() => {
          //let div = document.getElementById('messagelist');
          //div.scrollTop = div.scrollHeight;
          //this.$refs.messageContainer.scrollTop = this.$refs.messageContainer.scrollHeight;          
          this.$refs.messageContainer.scrollTop = this.$refs.messageContainer.scrollHeight;
        })*/
      },
      deep: true,
      immediate: false,
    }
  },  
  methods: {
    makeId: function(index) {
      return 'msg-' + index
    },
    onFocus: function(val, event) {
      //console.log(event)
      //this.keyHeight = e.detail.height;
      //console.log(this.keyHeight)
      //this.scrollHeight =  (windowHeight - keyHeight) + 'px'
      //this.toView = 'msg-' + (this.msglist.length - 1);
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
      if(bulletVal) {
        //Taro.showToast({ title: '发送成功', icon: 'success'}); 
        //获取登陆用户信息
        let user = sessionStorage.getItem('user');
        console.log(user);   
        if(!user) { //未登陆
          //
          console.log('未登陆'); 
        }     
        let new_msg = {
          msg_id:new Date(),
          msg_fromUserId:JSON.parse(user).login_openid,//当前用户openid
          msg_fromUserName:JSON.parse(user).login_nickname,//当前用户昵称          
          msg_expectation:bulletVal,
          msg_fromUserImg: JSON.parse(user).login_headerImg,//当前用户头像
          msg_createTime:this.formatDate('yyyyMMddHHmm'),
          msg_type: '1'
        };        
        // 追加回复
        this.msglist.push(new_msg);
        // 发送消息之后自动的滚动到底部就是滚动到最后一条数据。遍历数据的时候给每条数据添加一个id，设置scroll-into-view的值为最后一条数据的id
        //this.toView = 'msg-' + (this.msglist.length -1);
        this.$nextTick(function(){
          this.toView = 'msg-' + (this.msglist.length -1);
        });
        //this.inputValue = '' ;                 
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
.tempViewContainer {
    position:absolute;
    width: 100%;
    min-height: 100%;
    overflow: auto;
    color:#666;
}
.tempViewContainer .msgContainer {
  font-size: 14px;
}
.msgContainer .card {
  color: #fff;
  padding: 5px;  
  background-color: #AB2849;
}
.nodata {
  background-color: #fff;
}
.nut-empty-description {    
    color: #999;
}
.dialogContent {
  font-size:18px;color:#1d1e1e;border-radius:5px;background:#fcefe8;border:1px solid #cb3a56
}
.dialogContentNote {
  line-height:35px;padding:3px;font-size:14px;
}
.dialogContentInput {
  padding:5px;background:#fff;
  border-radius: 5px;
}
.dialogContentLength {
  text-align:right;font-size:12px;color:#999;
}
.vwfooter {
  font-size: 16px;width: 100%;cursor: pointer;
}
.vwfooter .onCancelBtn {
  background-color: #c5c8ce;
  border-radius: 4px;
  color:#fff;
  text-align: center;
  padding: 5px 5px;
}
.onOkBtn {
  background-color: #db5a6b;
  border-radius: 4px;
  color:#fff;
  text-align: center;
  padding: 5px 5px;
}
.onRechargeBtn {
  background-color:#29d446;
  border-radius: 4px;
  color:#fff;
  text-align: center;
  padding: 5px 5px;
}
.footer {  
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%; 
  font-size:16px; 
  background-color:#fff;
}
.sendinput {    
  background-color: #fff;  
  border-radius: 20px;  
  padding: 5px;    
}

.placeholder-view {
  width: 100%;
  height: 60px;
}
.inputVal {
  background-color: #fff;  
  border-radius: 20px;  
  padding: 5px; 
}

#chatBox {
  margin: 4px;
  padding: 4px;
}
.time {
  text-align: center;
}
.msg {
  display: flex;
  flex-direction: row;  
  margin-bottom: 20px;
}
.msg-right {
  flex-direction: row-reverse;
}
.msg-left {
  flex-direction: row;
}
.message-wrapper {
  max-width: 220px;
  margin: 0px 10px 0px 10px;    
}
.message-wrapper-left {
  background-color: #ABBF63;
  border-radius: 0px 12px 12px 12px;
}
.message-wrapper-right {
  background-color: #F2B872;
  border-radius: 12px 0px 12px 12px;
}
.message {
  margin: 8px;
  word-wrap: break-word;
}
.img {
  flex: auto;
  height: 36px;
  width: 36px;
  border-radius: 8px;
}
.sendView {  
  padding-bottom:10px;
}
.sview {  
  display:flex;
  align-items: center;  
  padding: 0px 10px 0px 0px;
}
.msginput {
  vertical-align:middle;  
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  margin: 0px 10px 0px 10px; 
  background-color: #F8ECDE;
  font-size: 14px;  
  box-sizing: border-box;
  padding: 10px;  
}
.msgbtn {
  vertical-align:middle;
  background-color: #AB2849;
  border-radius: 4px;
  color:#fff;
  text-align: center;
  font-size: 14px;  
  height: 40px;
  line-height: 40px;
}

</style>
