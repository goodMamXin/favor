import { createApp } from 'vue'

// 引入vuex组件
import store from './store/store.js'
// 全局公共方法
import base from './common/base.js'

import { Button, Toast ,Cell,Input, Icon, Avatar ,
Layout, Row, Col ,Swiper,SwiperItem,FixedNav,Barrage,
Tabbar,TabbarItem,SearchBar,Tabs, TabPane,Form,FormItem,CellGroup,
Card ,Tag,Price,Dialog,Popup,OverLay, Radio,RadioGroup,ActionSheet,
Checkbox,CheckboxGroup,DatePicker,Picker,Address,Elevator,Empty,Badge,
} from '@nutui/nutui-taro';


import './app.scss'
const App = createApp({
  onShow (options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.config.globalProperties.$base = base // Vue3全局挂载名称

App.use(Button);
App.use(Toast);
App.use(Form);
App.use(FormItem);
App.use(Cell);
App.use(CellGroup);
App.use(Input);
App.use(Icon);
App.use(Avatar);
App.use(Layout);
App.use(Row);
App.use(Col);
App.use(Tabbar);
App.use(TabbarItem);
App.use(SearchBar);
App.use(Tabs);
App.use(TabPane);
App.use(FixedNav);
App.use(Barrage);
App.use(Swiper);
App.use(SwiperItem);
App.use(Card);
App.use(Tag);
App.use(Price);
App.use(Dialog);
App.use(Popup);
App.use(OverLay);
App.use(Radio);
App.use(RadioGroup);
App.use(ActionSheet);
App.use(Checkbox);
App.use(CheckboxGroup);
App.use(store);//状态管理存储
//App.use(utils);
App.use(DatePicker);
App.use(Picker);
App.use(Elevator);
App.use(Address);
App.use(Empty);
App.use(Badge);

export default App
