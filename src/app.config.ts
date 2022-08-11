/*
 全局配置 配置项遵循微信小程序规范，并且对所有平台进行统一
 https://taro-docs.jd.com/taro/docs/app-config
 */
export default defineAppConfig({
  // 主包：即放置默认启动页面/TabBar页面，以及一些所有分包都需用到公共资源/JS 脚本；
  pages: [
    'pages/index/index',
    'pages/sweet/sweet',
    'pages/wish/wish',
    'pages/msg/msglist',
    'pages/my/my'
  ],
  tabBar: {// tabBar路径
    list: [
      {
        'iconPath': 'icon/sweet.png',
        'selectedIconPath': 'icon/sweet_active.png',
        'pagePath': 'pages/sweet/sweet',
        'text': '蜜语'
      },
      {
        "iconPath": "icon/xy.png",
        "selectedIconPath": "icon/xy_active.png",
        "pagePath": "pages/wish/wish",
        "text": "许愿"
      },
      {
        "iconPath": "icon/msg.png",
        "selectedIconPath": "icon/msg_active.png",
        "pagePath": "pages/msg/msglist",
        "text": "消息"
      },
      {
        "iconPath": "icon/my.png",
        "selectedIconPath": "icon/my_active.png",
        "pagePath": "pages/my/my",
        "text": "我的"
      }
    ],
    'backgroundColor': '#fff',//tab 的背景色，仅支持十六进制颜色
    "color": "#f18ca5",//tab 上的文字默认颜色，仅支持十六进制颜色
    "selectedColor": "#AB2849",//tab 上的文字选中时的颜色，仅支持十六进制颜色
    'borderStyle': 'white'//tabbar 上边框的颜色， 仅支持 black / white
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#AB2849',//设置导航背景色
    navigationBarTitleText: 'WeChat',//设置导航标题   
    navigationBarTextStyle: "white",//设置导航文字颜色
  },
  // 分包：则是根据开发者的配置进行划分
  subPackages:[
    {
      "root": "pages/pageA/",// 分包根目录
      "pages": [  // 分包下的页面路径，相对与分包根目录
        "modifyInfo",
        "tag",
      ]
    },
    {
      "root": "pages/pageB/",
      "pages": [
        "mywish"
      ]
    },
	  {
      "root": "pages/pageC/",
      "pages": [
        "myreturn"
      ]
    },
	  {
      "root": "pages/pageD/",
      "pages": [
        "notice",
        "noticeDetail"
      ]
    }
  ]
})
