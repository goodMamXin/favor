<template>
  <view class="index_login">
    <view class="wish">
      <view class="wishbtn">        
        <nut-button color="#FF7079" @click="goHome" size="large">点我许愿吧</nut-button>
      </view>
    </view>  
    <!-- 协议 --> 
    <view v-if="state.userAgree == false">
    <view catchtouchmove="catchtouchmove" class="tips">
      <view class="tips_box">
        <view class="hint_view">
          <view class="text">
            <view class="hint1">《余生偏爱小程序》使用协议</view>
            <view class="hint2">
              <text>小程序使用协议小程序使用协议小程序使用协议小程序使用协议小程序使用协议...........等等                      
              </text>
            </view>
          </view>
        </view>
        <button @click='tipAgree' class="login" type='primary' formType="submit" >我同意</button>
      </view>
    </view>
    </view>

  </view>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { eventCenter } from '@tarojs/taro'
import Taro from '@tarojs/taro'
export default {
  name: 'Index',
  components: {},
  setup(){
    const state = reactive({
      type: 'text',
      show: false,
      cover: false,
      userAgree:false,
    });

    const handleClick = (type, cover = false) => {
      state.show = true;
      state.type = type;
      state.cover = cover;
    };

    return {
      state, handleClick
    }
  },
  data() {
    return {
        backgroundImg:require("../../images/login.png")
    }
  },
  onShow() {    
    //从本地缓存中同步获取指定 key 的内容
    //检查用户协议是否已经同意过，没有的话则弹出用户协议界面
    try {
      let value = Taro.getStorageSync('userAgree') || false;      
      if (value) {
        // Do something with return value
        this.state.userAgree = true;    
        //console.log('用户协议已经同意过')   
      }
    } catch (e) {
      // Do something when catch error
      //console.log(e)
    } 
  },
  mounted() {  
    let that = this;    
    //console.log(this.$store.state)  
    /*
    let userInfo = {};
    //console.log(this.$store.state)    
    // 由于页面刷新是vuex内的信息会丢失，因此在页面刷新时将vuex里的信息保存到sessionStorage里
    // beforeunload事件在页面刷新时先触发
    window.addEventListener('beforeunload', () => {     
      //Taro.setStorage({key:'user',data: this.$store.state.user});
      Taro.getStorage({
        key: 'user',
        success (res) {
          console.log(res.data)
          userInfo = res.data;
        }
      });
    }) 
    //this.$store.commit("setLogin",userInfo); 
    console.log(this.$store.state.user)
    */
  },
  methods: {
    tipAgree: function() {         
      //用户点击同意 "用户协议" 后，保存到storage
      try {
        this.state.userAgree  = true;
        Taro.setStorageSync('userAgree', true);
        this.goHome();
      } 
      catch (e) { }
    },
    goHome: function() { 
      //调用微信小程序的获取用户信息的接口(不包括openid) wx.getUserProfile方法不能被其它如wx.login方法嵌套使用。
      //http://t.zoukankan.com/wanthune-p-14757992.html
      //https://blog.51cto.com/u_15192168/2757554
      //https://blog.csdn.net/qq_38194393/article/details/86517509
      Taro.showModal({
        title: '温馨提示',
        content: '授权微信登录后才能正常使用',
        success(res) {          
          if (res.confirm) {
            //console.log('用户点击了确定按钮');
            Taro.getUserProfile({
              desc: '授权微信登录后才能使用', // 声明获取用户个人信息后的用途
              lang: 'zh_CN',
              success(info) {
                console.log(info)
                //把获取到的信息复制到data中的loginInfo中
                //data.loginInfo = Object.assign( that.data.loginInfo, info )
                //调用后台的接口，把所有整合的个人信息传过去
                //that.handlerLogin( that.data.loginInfo )
              },
              fail(e) {
                console.log('获取用户信息失败', e)                  
              }
            });
          } else if (res.cancel) {            
            /*console.log('用户点击了取消按钮');
            Taro.showToast({
              title: '您拒绝了请求',
              icon: 'error',
              duration: 2000
            });*/
            return;
          }
        }
      });
      
      

      /*
      Taro.login({
        success (res) {
            //用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 auth.code2Session，
            //使用 code 换取 openid、unionid、session_key 等信息
            console.log(res);            
            if (res.code) {              
              //后端请求
              wx.request({
                  url: 'https://example.com/onLogin',
                  data: {
                      code: res.code
                  }
              })            
            } else {
                console.log('登录失败！' + res.errMsg)
            }            
        }
      })          
      */
      //......
      let userEntity = {
        login_openid:"f_20200725_h",
        login_nickname:"朝夕相伴",
        login_headerImg:require('../../images/tsy.png')
      }
      /* 
      let userEntity = {
        login_openid:"",
        login_nickname:"",
        login_headerImg:""
      }*/

      //this.$store.commit('setToken',JSON.stringify(res.data.token));
      //将数据存储在本地缓存
      //小程序用storage代替了localstorage,sessionstorage.strage
      Taro.setStorage({key:'user',data: userEntity});
      let flag = this.$base.isBlank(userEntity.login_openid);  
      //console.log(flag)
      /*
      if (!flag) { 
        //this.$store.replaceState(
          //Object.assign(this.$store.state,JSON.parse(userJson))
        //)
        //wx.reLaunch是可以跳转到tabBar页面的。
        //wx.reLaunch和wx.switchTab的区别就是：前者可以触发onLoad事件，而后者则不能触发。
        //所以通过wx.reLaunch跳转到tabBar的方式完美解决了不能刷新的问题。
        //wx.switchTab 跳转是触发onLoad事件  但是只会触发一次 
        //wx.reLaunch是可以跳转到tabBar页面的 再次触发onLoad事件
        //wx.reLaunch关闭所有页面，跳转到小程序的其他页面
        //https://www.likecs.com/show-203336260.html
        //https://www.jianshu.com/p/2dea4cbe6dfd   

        //登陆信息存入store
        this.$store.commit("setLogin",userEntity);
        //console.log(this.$store.state.user)
        
        //跳转        
        Taro.reLaunch({
          url:'/pages/sweet/sweet'
        })
      }  
      */
    },
  }
}
</script>


<style>
/*
使用@import引入样式文件，就算加scoped，其它没有引入的模块还是可以访问到你的样式，如果某个组件的类名一致，则就会被污染到。
如果不想被污染，修改引入方式。要是再写新的样式，要重新写一个新的style标签
// @import './index.scss';
*/

.index_login {
    font-family: "Avenir", Helvetica, Arial, sans-serif,"microsoft yahei";;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    width: 100%;
    height: 100%;  
    background-image: url('../../images/login.png'); 
    background-repeat: no-repeat;
    background-size: 100% 100%;  
    /* position: relative; */
    position:absolute;
  }
/*
.index_login_btn {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    bottom: 22%;
    position: fixed;
    width: 100%;
}
.index_login_btn .wishbtn{  
    font-style: italic; 
}
img {
    height: 100%; 
    width: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;  
}
*/
.index_login .wish {    
    display: flex;
    justify-content: flex-end;
    align-items: center ;
    width: 100%;
    height: 100%;  
}
.index_login .wish .wishbtn {
  display: flex;
  justify-content: flex-end ;
  align-items: center ;  
  height: 100%; 
}
.nut-button--round {
    border-top-right-radius: 0rem;
    border-bottom-right-radius: 0rem;
    border:0;
    padding-left:10px;
    padding-right:10px;
}
.nut-button__warp {
    font-style: italic;
}
/*
.nut-button--default {    
    border: 0rem solid #ee0a24;
}*/

/* 在登录时弹窗用户使用协议 */
.tips {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
}

.tips .tips_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 85%;    
    height: auto;
    border-radius: 12px;
    background: #fff;
    overflow: hidden;
}

.tips .tips_box .hint_view {
    display: flex;
    align-items: center;
}

.tips .tips_box .hint_view .text {
    display: flex;
    flex-direction: column;
    margin: 12px 12px;
}

.tips .tips_box .hint1 {    
    text-align: center;
    font-size: 22px;
    color: #1a1a1a;    
    border-bottom:1px solid #333;  
    width:100%;  
}

.tips .tips_box .hint2 {
    margin-top: 14px;
    text-align: justify;
    text-indent:2em;
    font-size: 18px;
    color: #666;
    line-height:30px;
}

.tips .tips_box .login {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px 0 15px 0;
    width: 50%;    
    border-radius: 80px;
    font-size: 18px;
    letter-spacing: 6px;
    padding:3px;
    color: #fff;
}





</style>
