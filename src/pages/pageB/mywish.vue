<template>
	<view class="tempViewContainer">
    <view class="msgContainer">
      <view class="card">我的许愿卡 - 所愿皆成真，所盼皆可期</view>
      <view class="nodata" v-show="showNoData"><nut-empty description="无数据，快去许愿吧"></nut-empty></view>
      <view class="content" v-for="(item,index) in state.msglist" :key="index"> 
        <view class="conBox">
          <view>
            <image :src="item.uimg" class="headerImg"></image>
          </view>
          <view class="msgdetail">
            <view class="detail">{{item.expectation}}</view>
            <view class="createTime">{{item.createTime}}</view>
            <view class="returnNum">
              <view class="numText" @click="showReturnBox(index,item.id)">收到回应</view>
              <view class="num" @click="showReturnBox(index,item.id)">{{item.returnCount}}</view>
            </view>
          </view>
        </view>
        <view class="returnBox" v-show="activeIndex===index">
          <view style="padding:15px 5px;background-color:#FFEAE0;color:#333;border-top-left-radius: 4px;border-top-right-radius: 4px; ">回应详情</view>
          <view class="boxContent" v-for="subitem in state.submsglist" :key="subitem.id">            
            <view class="fromUser"><image :src="subitem.uimg" class="fromUserImg"></image></view>
            <view class="fromMsg">
              <view style="padding-bottom:5px">{{subitem.nickname}}</view>
              <view style="padding-bottom:5px">{{subitem.expectation}}</view>
              <view style="padding-bottom:5px;color:#999;display:flex">{{subitem.createTime}}<view style="padding:0px 10px;color:#333" @click="showReturnDialog">回复TA</view></view>
              <view style="border-radius:4px;background-color:#FFF4E0;padding:10px;">
                <block v-for="rmsg in state.myReturnMsg" :key="rmsg.id">
                  <view style="padding-bottom:5px">我：<text>{{rmsg.msg}}</text></view>
                </block>           
              </view>
            </view>            
          </view>
          <view v-show="noReTurnData" style="text-align:center">            
            <image :src="state.none"></image>
            <view style="color:#999;">无数据</view>
          </view>
        </view>
      </view> 
      <!-- 回复弹框 -->
      <nut-dialog v-model:visible="state.visible" title="给TA回复">            
        <template #default>
          <view class="dialogContent">  
            <view class="dialogContentInput"> 
                <view>
                  <input type="text" v-model.trim="msgVal" maxlength="32" placeholder="请输入回复内容" style="text-align:left;" />
                  <view class="dialogContentLength">{{inputLength}}/32</view>
                </view>
            </view>                            
          </view>          
        </template>
        <template #footer>
          <view class="vwfooter">
            <nut-row :gutter="6">
                <nut-col :span="12">
                  <view class="onCancelBtn" @click="coloseReturnDialog">取消</view>
                </nut-col>
                <nut-col :span="12">
                  <view class="onOkBtn" @click="saveReturnMsg">确定</view>
                </nut-col>
            </nut-row>  
          </view>
        </template>
      </nut-dialog> 
    </view>
  </view>    
</template>

<script>
import { reactive } from 'vue';
import { eventCenter } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import {mapState} from 'vuex'

export default {
  name: 'mywish',
  components: {
    
  },
  setup(){
    const state = reactive({    
      visible:false,      
      uimg: require('../../images/tsy.png'),  
      none: require('../../images/none.png'),
      msglist:[
        {
          id:1000,
          uimg: require('../../images/tsy.png'),
          expectation: '想找个广东的，要顾家，宠老婆，又懂浪漫的男朋友，非诚勿扰！谢谢！',
          nickname: "慕容晓晓",
          createTime:'2022-05-08 20:08',
          returnCount:15
        },
        {
          id:1001,
          uimg: require('../../images/tsy.png'),
          expectation: '颜值不必很高，有眼缘就行，但一定要有责任心，奔着结婚去的',
          nickname: "苏芊芊",
          createTime:'2022-05-07 20:08',
          returnCount:10
        },
        {
          id:1002,
          uimg: require('../../images/tsy.png'),
          expectation: '喜欢美食、看书，想找一个178cm以上，白白净净的男生',
          nickname: "欧阳馨",
          createTime:'2022-05-06 20:08',
          returnCount:18
        },
        {
          id:1003,
          uimg: require('../../images/tsy.png'),
          expectation: '想找一个能读懂我内心的人，哪儿人都可以，年龄不要相差太大',
          nickname: "高丽丽",
          createTime:'2022-05-05 20:08',
          returnCount:25
        },
        {
          id:1004,
          uimg: require('../../images/tsy.png'),
          expectation: '在上海工作，在异乡漂泊真的很孤独，很想有个人能陪伴我',
          nickname: "董小苑",
          createTime:'2022-05-04 20:08',
          returnCount:9
        }
      ],
      submsglist:[
        {
          id:2001,
          uimg: require('../../images/tsy.png'),
          expectation: '美女，你好！我看到你的愿望后，决定向你表达我的想法，希望能认识你！',
          nickname: "潇洒的强哥",
          createTime:'2022-05-05 23:54'
        },
        {
          id:2002,
          uimg: require('../../images/tsy.png'),
          expectation: '很想很想很想认识你，能加个微信聊聊吗？',
          nickname: "万里竹林",
          createTime:'2022-05-04 16:15'
        }
      ],
      myReturnMsg:[
        {
          id:3001,
          msg:'你省省吧，不想认识！'
        },
        {
          id:3002,
          msg:'嗯~ 又是一只想吃天鹅肉的蛤蟆。'
        }
      ]
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
        msgVal:''
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
  },
  watch: {//使用这个属性，可以监视 data 中指定数据的变化
    msgVal: function(newVal, oldVal){
      //console.log('new:'+ newVal)  
      let that = this;
      let count = that.msgVal.length;
      that.inputLength = count; 
    }
  },
  methods: {
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
            that.state.submsglist = [];// 清空数据集
            that.state.submsglist = res.data;
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
    // 立刻回应
    saveReturnMsg(){
      let bulletVal = this.msgVal;      
      if(bulletVal){
        Taro.showToast({ title: '你的回复已飞向TA', icon: 'success'});        
        this.state.visible = false;
        // 追加回复
        this.state.myReturnMsg.push({id:new Date(),msg:bulletVal})
        // 异步保存
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
        this.msgVal = '';
      }else { // 不为空提示  
        this.state.visible = true;                
        Taro.showToast({ title: '请输入回复内容', icon: 'error'});
      }
    },
  }
}
</script>

<style>
.tempViewContainer {
    position:absolute;
    width: 100%;
    height: 100%;
    background-color: #f2f2f2;
    color:#666;
}
.tempViewContainer .msgContainer {  
  background-color: #f2f2f2;  
  font-size: 14px;
}
.msgContainer .card {
  color: #fff;
  padding: 5px;  
  margin-bottom: 10px; 
  background-color: #AB2849;
}
.nodata {
  background-color: #fff;
}
.tempViewContainer .content {  
  margin-bottom: 10px;
  background-color: #fff;
  padding: 5px 5px 0px 5px;
}
.content .conBox {
  display: flex;
}
.tempViewContainer .content .headerImg {      
  width: 85px;
  height: 85px;
  padding:0px; 
  border-radius: 10px;  
}
.tempViewContainer .content .msgdetail {  
  padding-left: 10px;  
  padding-bottom: 10px; 
}
.msgdetail .detail {
  margin-bottom: 5px;
}
.msgdetail .createTime {
  color: #999;
  margin-bottom: 5px;
}
.msgdetail .returnNum {
  display: flex;
  color: #fff;  
}
.numText {
  padding: 2px 5px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  background-color: #A8A2A2;  
}
.num {
  background-color: #AB2849;
  padding: 2px 0px;
  text-align: center;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  width:55px;
  cursor: pointer;
}
.returnBox {  
  border-radius: 4px;
  border:1px solid #FFEAE0;
}
.boxContent {
  display: flex;  
  justify-content: flex-start;
  padding:5px 5px;  
  border-bottom:1px solid #e7e7e7;
}
.boxContent .fromMsg .name {  
  padding: 5px 0px;
}
.fromUser {  
  width: 25px;
  height: 25px;
}
.fromUserImg {
  width: 25px;
  height: 25px;
  padding:0px; 
  border-radius: 50%;  
}
.fromMsg {
  margin-left: 10px;
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
</style>
