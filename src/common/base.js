/**
 * 
 * https://www.cnblogs.com/mu--yu/p/15504355.html
 * https://blog.csdn.net/qq_34261347/article/details/120356569
 * http://www.edbiji.com/doccenter/showdoc/233/nav/3796.html
 * https://www.jianshu.com/p/04dffe7a6b74/
 * https://www.ddpool.cn/article/94248.html
 * https://cloud.tencent.com/developer/article/1843619
 * 
 * https://qitest.blog.csdn.net/article/details/120859866 
 * https://blog.csdn.net/qq_44146522/article/details/117469190
 * https://blog.csdn.net/m0_46978096/article/details/121207281
 * 
 * https://blog.csdn.net/qq1195566313/article/details/123292042
 * https://www.q578.com/s-5-2666020-0/
 * 
 * https://www.cnblogs.com/qiu-Ann/p/7463484.html
 * 
 */

 import { reactive ,getCurrentInstance } from 'vue';
 import { eventCenter } from '@tarojs/taro'
 import Taro from '@tarojs/taro'
 import {mapState} from 'vuex'

//常量的定义
const api = {
    url:'https'
}  

//发起登录请求
function toLogin() {
    Taro.login({
        success (res) {
            //用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 auth.code2Session，
            //使用 code 换取 openid、unionid、session_key 等信息
            console.log(res)
            /*
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
            */
        }
    })
}

//检查是否登陆
function isLogin() {
    //console.log('Checking in...');
    /**
     * 通过 wx.login 接口获得的用户登录态拥有一定的时效性。用户越久未使用小程序，用户登录态越有可能失效。
     * 反之如果用户一直在使用小程序，则用户登录态一直保持有效。具体时效逻辑由微信维护，对开发者透明。
     * 开发者只需要调用 wx.checkSession 接口检测当前用户登录态是否有效。
     * 登录态过期后开发者可以再调用 wx.login 获取新的用户登录态。
     * 调用成功说明当前 session_key 未过期，调用失败说明 session_key 已过
     * https://blog.csdn.net/weixin_48145150/article/details/123897786
     * https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html
     * https://blog.csdn.net/Calvin_zhou/article/details/120431305
     * https://blog.csdn.net/kingtok/article/details/105908647
     * http://t.zoukankan.com/zwh0910-p-13977278.html
     */
    let user = {};
    Taro.getStorage({
        key: 'user',
        success(res) { //接口调用成功的回调函数                
            user = res.data;
        },
        fail(res) { //接口调用失败的回调函数
            console.log(res)
        }
    });
    //打印登录用户
    console.log(user)
    let flag = isBlank(user.login_openid);//是否为空
    //console.log(flag)
    if(flag) { //未登陆
        Taro.showModal({
            title: '提示',
            content: '你的登陆信息已失效，请重新登陆',
            showCancel:false,
            success (res) {
                if (res.confirm) { //确定                
                    Taro.navigateTo({
                        url:'/pages/index/index'
                    })
                } else if (res.cancel) { //取消
                    //console.log('用户点击取消')
                }
            }
        });           
    }
    /*
    let timer = setInterval(() => {
        console.log('执行登录检验...');
        let user = {};
        Taro.getStorage({
            key: 'user',
            success(res) { //接口调用成功的回调函数                
                user = res.data;
            },
            fail(res) { //接口调用失败的回调函数
                console.log(res)
            }
        });
        //打印登录用户
        console.log(user)
        let flag = isBlank(user.login_openid);//是否为空
        //console.log(flag)
        if(flag) { //未登陆
            Taro.showModal({
                title: '提示',
                content: '你的登陆信息已失效，请重新登陆',
                showCancel:false,
                success (res) {
                    if (res.confirm) { //确定                
                        Taro.navigateTo({
                            url:'/pages/index/index'
                        })
                    } else if (res.cancel) { //取消
                        //console.log('用户点击取消')
                    }
                }
            });
            clearInterval(timer);//清除定时器            
        }
    },200)    
    */ 
}

function isNumbervalidator (rule, value, callback) {
    if (!value) {
        return callback(new Error('内容不能为空'));
    }
    setTimeout(() => {
        var re = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/   //正浮点数
        if (!re.test(value)) {
            callback(new Error('请输入大于0的数值'));
        } else {
            callback();
        }
    }, 500);
}
function isNumber (value) {
    var re = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/   //正浮点数
    let boo = true
    if (!re.test(value)) {
        boo = false
    } else {
        boo = true
    }
    return boo
}

//是否为空字符串，全空格也是空字符串 @param str 
function isBlank(str){  
    if(str == null || typeof str == "undefined" ||  str == "" || trim(str) == ""){          
        return true;  
    }  
    return false;  
} 
//去掉字符串头尾空格 @param str 传入的字符串值
function trim(str) {
    if(str == null || typeof str == "undefined"){  
        return "";  
    }  
    return str.toString().replace(/(^\s*)|(\s*$)/g, "");    
}
//是否为Null @param object  
function isNull(object){  
    if(object == null || typeof object == "undefined"){  
        return true;  
    }  
    return false;  
}
//导出 {常量名、函数名}
export default {
    api,
    toLogin,
    isLogin,
    isNumbervalidator,
    isNumber,
    isBlank
}