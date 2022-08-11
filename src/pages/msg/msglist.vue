<template>
	<view class="msgViewContainer">
    <view class="nodata" v-show="showNoData" ref="nodata"><nut-empty description="没找到数据，快去许愿吧"></nut-empty></view>
    <!-- 系统通知 -->
    <view class="msgContainer" v-for="(item,index) in noticelist" :key="index"  @click="jumpUrl(item)">
      <view class="layoutLeft">
        <image :src="item.fromUserImg" class="headerImg"></image>
      </view>
      <view class="layoutRight">
        <view class="con-left">
          <view>{{item.fromUserName}}</view>
          <view class="msgdetail">{{item.expectation}}</view>
        </view>
        <view class="con-right">          
          <view class="msgtime">{{item.createTime}}</view>
          <view class="msgbadge"><nut-badge :value="0" dot :color="item.hasRead? '#bbb' : '#fa2c19'"> </nut-badge></view>
        </view>
      </view>
    </view>
    <!-- 用户消息（显示自己回应过的许愿） -->
    <view class="msgContainer" v-for="(item,index) in msglist" :key="index"  @click="jumpUrl(item)">
      <view class="layoutLeft">
        <image :src="item.fromUserImg" class="headerImg"></image>
      </view>
      <view class="layoutRight">
        <view class="con-left">
          <view>{{item.fromUserName}}</view>
          <view class="msgdetail">{{item.expectation}}</view>
        </view>
        <view class="con-right">          
          <view class="msgtime">{{item.createTime}}</view>
          <view class="msgbadge"><nut-badge :value="0" dot :color="item.hasRead? '#bbb' : '#fa2c19'"> </nut-badge></view>
        </view>
      </view>
    </view>      
  </view>    
</template>

<script>
import { reactive ,getCurrentInstance } from 'vue';
import { eventCenter } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import { mapState,mapMutations } from 'vuex'

export default {
  name: 'msglist',
  components: {},    
  setup(){
    //通过getCurrentInstance来获取全局方法，这个只能在setup里使用
    //const { proxy } = getCurrentInstance();
    //console.log(proxy.$base.isNumber('单独全局方法'));
    //console.log(proxy.$base.api);
    //let user = sessionStorage.getItem('user');   
    //console.log(JSON.parse(user));
    //proxy.$base.isLogin();
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
            parentId:1,//许愿的id
            fromUserId:99,
            fromUserName:'系统消息',
            fromUserImg: require('../../icon/sys_notice.png'),
            expectation: '因为有你，我每天都能过情人节',            
            createTime:'2022-05-21',
            hasRead:false,
            type:1 //系统消息
          }
        ],
        msglist:[
          {
            id:1000,
            parentId:1,
            fromUserId:99,
            fromUserName:'韵儿',
            fromUserImg: require('../../images/tsy.png'),
            expectation: '想找个广东的，要顾家，宠老婆，又懂浪漫的男朋友，非诚勿扰！谢谢！',            
            createTime:'2022-05-21',
            hasRead:false,
            type:2, //用户消息
          },
          {
            id:1001,
            parentId:2,
            fromUserId:100,
            fromUserName:'南笙',
            fromUserImg: require('../../images/mm.jpg'),
            expectation: '我本将心向明月，奈何明月照沟渠。落花有意随流水，流水无心恋落花。',            
            createTime:'2022-05-17',
            hasRead:false,
            type:2
          },
          {
            id:1003,
            parentId:3,
            fromUserId:100,
            fromUserName:'涉川',            
            fromUserImg: require('../../images/zyy.png'),
            expectation: '山无陵，江水为竭，冬雷震震，夏雨雪，天地合，乃敢与君绝。',            
            createTime:'2022-05-12',
            hasRead:true,
            type:2
          },
          {
            id:1004,
            parentId:4,
            fromUserId:100,
            fromUserName:'夕意',
            fromUserImg: require('../../images/xx.jpeg'),
            expectation: '有一种想念，叫避而不见。很多东西就像指缝间的阳光，温暖，美好，却永远无法抓住。',            
            createTime:'2022-05-11',
            hasRead:true,
            type:2
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
    //this.$base.isLogin();
    //console.log(this.$base.isNumber('test'))       
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
    /**
      * 通过mapMutations引入changeDetail相当于在methods中定义了名称为changeDetail的方法，所以就不能在methods中重复定义名称为changeDetail的方法了
      * 在需要存入vuex的时候调用 this.changeDetail(data)
      * 在 methods 的别的方法里面可以直接 this.函数名称来调用，就等价于 commit 在提交它
      * 
    */
    ...mapMutations(['changeDetail']),
    makeId: function(index) {
      return 'msg-' + index
    },
    jumpUrl: function(item) {
      let that = this;
      //console.log(item)
      let targetUrl = item.type; //1 = 系统通知，2 = 用户消息
      if(targetUrl == 1) {
        Taro.navigateTo({
          url:'/pages/pageD/notice'
        })
      } else {   
        //设置已读
        let targetlist = that.msglist;
        let afterlist = [] ;
        for(var i in targetlist) {
          //console.log(targetlist[i])
          //重组
          let obj = {
            id:targetlist[i].id,
            parentId:targetlist[i].parentId,
            fromUserId:targetlist[i].fromUserId,
            fromUserName:targetlist[i].fromUserName,
            fromUserImg: targetlist[i].fromUserImg,
            expectation: targetlist[i].expectation,            
            createTime:targetlist[i].createTime,
            hasRead:targetlist[i].hasRead? true : item.id == targetlist[i].id ? true : false,
            type:targetlist[i].type
          }
          afterlist.push(obj)
        }
        that.msglist = afterlist;
        let msg = {
          msg_id: item.id,
          msg_parentId: item.parentId,
          msg_fromUserId:item.fromUserId,
          msg_fromUserName:item.fromUserName,
          msg_fromUserImg:item.fromUserImg,
          msg_expectation: item.expectation,
          msg_createTime: item.createTime,
          msg_type:'2' //2指别人，1指自己
        }        
        //console.log(msg)
        this.$store.replaceState(
          Object.assign(this.$store.state, msg)
        );
        sessionStorage.setItem('msg', JSON.stringify(msg));
        //跳转
        Taro.navigateTo({
          url:'/pages/pageC/myreturn'
        })
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
.msgViewContainer {
    position:absolute;
    width: 100%;
    min-height: 100%;
    overflow: auto;
    color:#666;
}
.msgViewContainer .msgContainer {  
  font-size: 14px;
  padding: 10px;
}
.msgContainer .layoutLeft {  
  float: left;
  padding-right: 10px;
}
.msgContainer .headerImg {
  width: 50px;
  height: 50px;
  border-radius: 50%;  
}
.msgContainer .layoutRight {
  overflow: hidden;
  border-bottom: 1px solid #e7e7e7;
}
.con-left {
  float: left;   
  width:73%;
}
.msgdetail {
  padding:5px 5px 10px 0px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #999;
}
.con-right {
  overflow: hidden;
  text-align: right;
}
.msgtime {
  color:#bbb;
  font-size: 12px;
}
.nodata {
  background-color: #fff;
}
.nut-empty-description {    
    color: #999;
}
.msgbadge {  
  padding-right: 10px;
}


</style>
