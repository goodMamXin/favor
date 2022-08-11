//import { createApp } from 'vue'
import { createStore } from 'vuex'

/* 
  https://blog.csdn.net/weixin_42149982/article/details/120018204 
  https://vuex.vuejs.org/zh/installation.html
  https://blog.csdn.net/stormzi/article/details/107159290

  https://blog.csdn.net/weixin_46400038/article/details/109841008
  https://www.cnblogs.com/myqinyh/p/15430971.html
  http://www.manongjc.com/detail/26-rphkqescxsjgjxb.html
*/
// 创建一个新的 store 实例
const store = createStore({
  // 全局变量
  state () { // 定义数据 调用数据：this.$store.state.count;  标签里直接使用$store.state.count
    return {
      count: 0,      
      testlist: [],
      descTag:"", 
      hasLogin:false,
      user: {        
        login_openid:"", 
        login_nickname:"", 
        login_headerImg:""
      },
      detail: {},      
      token:''  //初始化token
    }
  },
  // 修改全局变量必须通过mutations中的方法  
  // mutations必须是同步函数（即函数内不能有异步行为）且不支持相互调用（如下面的increment不能调用setCount）
  mutations: {// 定义方法 调用方法：this.$store.commit("incCount")
    increment(state) {
      state.count++
    },
    // 接收参数
    setCount(state, num) {
      state.count = num
    },
    setLogin(state, object) {
      //console.log(object)
      state.user.login_nickname = object.login_nickname;
      state.user.login_openid = object.login_openid;
      state.user.login_headerImg = object.login_headerImg;
    },
    //存储token方法
    //设置token等于外部传递进来的值
    setToken(state, token) {
      state.token = token
      //localStorage.token = token //同步存储token至localStorage
      sessionStorage['token'] = token
      //sessionStorage.setItem('token',token)
    },    
		changeDetail(state, paylod) {
			// 信息
      this.detail = paylod
    }
  },
  getters : {
    //获取token方法
    //判断是否有token,如果没有重新赋值，返回给state的token
    getToken(state) {
      if (!state.token) {  
        state.token = sessionStorage.getItem('token')  
      }  
      return state.token  
    } 
  },
  // 异步方法用actions
  // 通过dispatch方法来调用actions中的方法 例如 this.$store.dispatch('testLogin',xx)
  // actions不能直接修改全局变量，需要调用commit方法来触发mutation中的方法  
  actions: {
    testLogin (context, payload) {
      context.commit('setCount', payload)
    },
    //异步触发setCount
    asynAddAction({commit},val) {
      setTimeout(function() {
        commit('setCount',val)
      },2000)
    },
    //同步触发setCount
    syncAddAction({commit},val) {
      commit('setCount',val)
    }
  },
  modules: {

  }
})

//const app = createApp({ /* 根组件 */ })

// 将 store 实例作为插件安装
//app.use(store)

export default store;