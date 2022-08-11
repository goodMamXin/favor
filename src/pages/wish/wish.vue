<template>
  <view class="wishbg">
    <!-- 
        https://segmentfault.com/a/1190000022549145 
        https://cn.vuejs.org/v2/guide/transitions.html
    -->
    <!-- 
    <view class="barrage_area">     
      <view class="dmGroup" @animationend="animationend" v-for="item in bulletlist" :key="item.id"
          :style="{top:item.top +'%'}">
          <view class="dmItem">
              <view class="dm">
                  <view class="avatarBox">
                      <image :src='item.sex == 0 ? avatarBoy : avatarGirl ' class='avatar' mode='aspectFit'></image>
                      <image :src='item.sex == 0 ? iconBoy : iconGirl ' class='sex' mode='aspectFit'></image>
                  </view>
                  <text class="content">{{ item.content }}</text>
              </view>
          </view>
      </view>       
      <view class='bullet-chat-box'>
        <view class='dan'>德玛西亚德玛西亚德玛西亚德玛西亚</view>
      </view>         
    </view> 
    --> 
    <!-- 许愿弹幕墙 -->
    <view>
      <view class="dmcontainer">
          <view class="bullet-item bullet-animation" @animationend="animationend" v-for="item in bulletlist" :key="item.id"
            :style="{ top:item.line == 1? '10%': item.line == 2 ? '35%' : '55%' }"
          >
            <view class="dmItem">
              <view class="dm">
                  <view class="avatarBox"><image :src="item.avatar" class="avatar"></image></view>                  
                  <view class="content">{{ item.content }}</view>
              </view>
            </view>
          </view> 
          <image :src="dmbgIMG" class="dmbgIMG"></image>
          <view class="dmwishcontainer">
            <view class="dmwishcontainerbtn" @click="showDialogWish"><text>+许愿</text></view>
          </view>          
          <!-- 许愿弹框 -->
          <nut-dialog v-model:visible="state.visible1" title="爱TA 就大声去告白">            
            <template #default>
              <view class="dialogContent">
                <view style="padding:15px 0px;">
                  许愿币余额为：<text class="balance-count">{{balanceCount}}</text>个
                </view> 
                <view class="dialogContentInput">
                    <view>
                      <input type="text" v-model.trim="wishVal" maxlength="32" placeholder="输入20-32文字效果更佳哦" style="text-align:left;" />
                    </view>
                    <view class="dialogContentLength">{{inputLength}}/32</view>
                </view>
                <view class="dialogContentNote"><text>许愿会花费5个许愿币，<br>赠送1次回应TA的机会。</text></view>                
              </view>          
            </template>
            <template #footer>
              <view class="vwfooter">
                <nut-row :gutter="6">
                    <nut-col :span="8">
                      <view class="onCancelBtn" @click="onCancelBtn">取消</view>
                    </nut-col>
                    <nut-col :span="8">
                      <view class="onOkBtn" @click="sendBullet">许愿</view>
                    </nut-col>
                    <nut-col :span="8">
                      <view class="onRechargeBtn" @click="onRechargeBtn">充值</view>
                    </nut-col>
                </nut-row>  
              </view>
            </template>
          </nut-dialog>          
      </view>
    </view>

    <!-- 社区人员-->    
    <view class="pub">
      <!-- 
      <scroll-view :scroll-y="true"         
        @scrolltoupper="upper" @scrolltolower="lower" 
        @scroll="scroll" :scroll-top="scrollTop" style="height: 725px;" >            
          <view class="pub_user" v-for="(item,index) in publist" :key="index">
            <view  class="pub_user_img">
              <image :src="item.uimg" class="uimg"></image>
            </view>
            <view class="pub_prolist">              
              <view class="expectation">{{item.expectation}}</view>
              <view class="attr">
                <view class="word">淑女</view>
                <view class="word">温柔</view>
                <view class="word">甜美</view>
                <view class="word">乖乖女</view>
              </view>
              <view class="operate">                
                <view class="returnTa" @click="funReturnTa"><text>回应TA</text></view>
              </view>              
            </view>
          </view>
      </scroll-view>
      -->
      <view>
        <view class="pub_user" v-for="(item,index) in publist" :key="index">
            <view  class="pub_user_img">
              <image :src="item.uimg" class="uimg"></image>
            </view>
            <view class="pub_prolist">              
              <view class="expectation">{{item.expectation}}</view>
              <!--
              <view class="attr">
                <view class="word" v-for="(tag,indx) in item.attr" :key="indx">{{tag.word}}</view>
              </view>
              -->
              <view class="operate">                
                <view class="returnTa" @click="funReturnTa"><text>回应TA</text></view>
              </view>              
            </view>
        </view>
      </view>
      <!-- 回应Ta弹框 -->
      <nut-dialog v-model:visible="state.visible2" title="爱TA 就给TA回应">            
        <template #default>
          <view class="dialogContent">
            <view style="padding:15px 0px;">
              许愿币余额为：<text class="balance-count">{{balanceCount}}</text>个
            </view>    
            <view class="dialogContentInput"> 
                <view>
                  <input type="text" v-model.trim="wishVal" maxlength="32" placeholder="输入20-32文字效果更佳哦" style="text-align:left;" />
                </view>
                <view class="dialogContentLength">{{inputLength}}/32</view>
            </view>            
            <view class="dialogContentNote"><text>回应会花费8个许愿币，<br>请问确认回应TA吗？</text></view>                            
          </view>          
        </template>
        <template #footer>
          <view class="vwfooter">
            <nut-row :gutter="6">
                <nut-col :span="8">
                  <view class="onCancelBtn" @click="onClosedBtn">取消</view>
                </nut-col>
                <nut-col :span="8">
                  <view class="onOkBtn" @click="onReturnTa">回应</view>
                </nut-col>
                <nut-col :span="8">
                  <view class="onRechargeBtn" @click="onRechargeBtn">充值</view>
                </nut-col>
            </nut-row>  
          </view>
        </template>
      </nut-dialog> 
    </view>
  </view> 
</template>

<script>
import { reactive, toRefs ,ref } from 'vue';
import Taro from '@tarojs/taro'
export default {
  name: 'wish',
  components: {},  
  setup(){    
    const state = reactive({          
      count: new Array(100).fill(0),
      visible1: false,
      visible2: false,
      radioVal: '1' ,
      headerImgArr:[
        require('../../images/tsy.png'),
        require('../../images/zyy.png'),
        require('../../images/xx.jpeg'),        
        require('../../images/mm.jpg'),
        require('../../images/icon_avatar_boy.png'),
        require('../../images/qdai.png'),
        require('../../images/icon_avatar_girl.png'),
        require('../../images/yzr.jpeg'),
      ],      
    });       
    const handleScroll = () => {   
      let arr = new Array(100).fill(0);
      const len = state.count.length;
      //state.count = state.count.concat(arr.map((number, number) => len + index + 1));   
    }; 
    //const visible1 = ref(false);    
    const onOk = () => {
      console.log('event ok');
    };
    const handleChange = (value) => {
        console.log(value);        
    };
       
    return {
       state,handleScroll,onOk,handleChange 
    }
  },
  data() {
    return {  
        dmbgIMG:require("../../images/lm-2.png"),
        iconGood: require('../../images/icon-good.png'),
        avatarBoy: require('../../images/icon_avatar_boy.png'),
        avatarGirl: require('../../images/icon_avatar_girl.png'),
        iconBoy: require('../../images/icon-boy.png'),
        iconGirl: require('../../images/icon-girl.png'),        
        list: [ // 弹幕数据
          {
            "id": 786,
            "sex": 1,
            "content": "我今年23岁，安徽人在深圳，独立、善良、孝顺都是我的优点。比较喜欢有担当，有主见的男生，如果他再有点小幽默就更好了，还有身高不要低于175cm。如果有合适的小哥哥，我么可以聊聊啊~",
            "zanNumber": 27,
            "line": 0,
            "avatar":this.state.headerImgArr[this.getArrayRandom(this.state.headerImgArr)], //随机图片
            "top": Math.floor(Math.random() * 80) + 2
          }, {
            "id": 854,
            "sex": 1,
            "content": "在上海，在异乡漂泊真的很孤独，很想有个人能陪伴我。过完年我就27岁了，性格比较内向，想找一个能读懂我内心的人，哪儿人都可以，年龄不要相差太大，奔着结婚去的，我很真诚，希望你也能够认真真诚。",
            "zanNumber": 14,
            "line": 0,
            "avatar":this.state.headerImgArr[this.getArrayRandom(this.state.headerImgArr)], 
            "top": Math.floor(Math.random() * 80) + 2
          }, {
            "id": 1022,
            "sex": 1,
            "content": "24岁湖南长沙人，想找个广州本地的闺蜜",
            "zanNumber": 14,
            "line": 0,
            "avatar":this.state.headerImgArr[this.getArrayRandom(this.state.headerImgArr)], 
            "top": Math.floor(Math.random() * 80) + 2
          }, {
            "id": 1103,
            "sex": 1,
            "content": "想找个广东的，喜欢旅游，开朗，顾家，宠老婆，懂浪漫的，希望在着遇到有缘人～",
            "zanNumber": 10,
            "line": 0,
            "avatar":this.state.headerImgArr[this.getArrayRandom(this.state.headerImgArr)],  
            "top": Math.floor(Math.random() * 80) + 2
          }, {
            "id": 1005,
            "sex": 0,
            "content": "28岁，北京人，有车有房，想找个的四川的，聊聊看",
            "zanNumber": 7,
            "line": 0,
            "avatar":'https://img01.yzcdn.cn/vant/cat.jpeg', 
            "top": Math.floor(Math.random() * 80) + 2
          }, {
            "id": 1214,
            "sex": 1,
            "content": "在南京 今年24 我是你的前女友 也曾拯救过地球 身高刚好169 快来找我复合吧。我不是颜控 喜欢有才华 有爱心 幽默的男生，身高175以上。理想型 李诞 一样的诗人\uD83D\uDC7B",
            "zanNumber": 6,
            "line": 0,
            "avatar":this.state.headerImgArr[this.getArrayRandom(this.state.headerImgArr)], 
            "top": Math.floor(Math.random() * 80) + 2
          }, {
            "id": 1207,
            "sex": 1,
            "content": "我今年21岁，沈阳的，平时喜欢美食、看书，想找一个178cm以上，白白净净的。",
            "zanNumber": 5,
            "line": 0,
            "avatar":this.state.headerImgArr[this.getArrayRandom(this.state.headerImgArr)], 
            "top": Math.floor(Math.random() * 80) + 2
          }, {
            "id": 1227,
            "sex": 1,
            "content": "今年22岁~在上海，做酒店行业的，平时除了工作一个人比较孤单，想找个聊得来的小哥哥，一起回家过年",
            "zanNumber": 4,
            "line": 0,
            "avatar":this.state.headerImgArr[this.getArrayRandom(this.state.headerImgArr)], 
            "top": Math.floor(Math.random() * 80) + 2
          }, {
            "id": 1206,
            "sex": 1,
            "content": "秦皇岛的，刚毕业，想找个有稳定工作的男朋友，颜值不必很高，有眼缘就行，但是一定要有责任心，奔着结婚去的，非诚勿扰哈～",
            "zanNumber": 3,
            "line": 0,
            "avatar":this.state.headerImgArr[this.getArrayRandom(this.state.headerImgArr)], 
            "top": Math.floor(Math.random() * 80) + 2
          }, {
            "id": 799,
            "sex": 0,
            "content": "福州人今年26岁，在杭州上班。找一个温柔体贴的女生",
            "zanNumber": 10,
            "line": 0,
            "avatar":this.state.headerImgArr[this.getArrayRandom(this.state.headerImgArr)], 
            "top": Math.floor(Math.random() * 80) + 2
          }, {
            "id": 859,
            "sex": 0,
            "content": "美术老师在广州，找个同行的",
            "zanNumber": 7,
            "line": 0,
            "avatar":this.state.headerImgArr[this.getArrayRandom(this.state.headerImgArr)],  
            "top": Math.floor(Math.random() * 80) + 2            
          }, {
            "id": 825,
            "sex": 0,
            "content": "插画师，在云南，哈哈！一起去泸沽湖",
            "zanNumber": 6,
            "line": 0,
            "avatar":this.state.headerImgArr[this.getArrayRandom(this.state.headerImgArr)], 
            "top": Math.floor(Math.random() * 80) + 2
          }, {
            "id": 861,
            "sex": 0,
            "content": "江苏人现居上海，26，171，54。喜欢可爱的女孩，求偶遇",
            "zanNumber": 3,
            "line": 0,
            "avatar":this.state.headerImgArr[this.getArrayRandom(this.state.headerImgArr)], 
            "top": Math.floor(Math.random() * 80) + 2
          }, {
            "id": 862,
            "sex": 0,
            "content": "想找个广东的学妹一起温习功课~",
            "zanNumber": 3,
            "line": 0,
            "avatar":this.state.headerImgArr[this.getArrayRandom(this.state.headerImgArr)], 
            "top": Math.floor(Math.random() * 80) + 2
          }, {
            "id": 863,
            "sex": 0,
            "content": "喜欢唱歌，跳舞，温柔，能做下厨",
            "zanNumber": 3,
            "line": 0,
            "avatar":this.state.headerImgArr[this.getArrayRandom(this.state.headerImgArr)], 
            "top": Math.floor(Math.random() * 80) + 2
          }, {
            "id": 864,
            "sex": 0,
            "content": "曾经说爱我入骨的人，你如今在哪里",
            "zanNumber": 3,
            "line": 0,
            "avatar":this.state.headerImgArr[this.getArrayRandom(this.state.headerImgArr)], 
            "top": Math.floor(Math.random() * 80) + 2
          }
        ], // 普通的弹幕队列
        clist: [], // c位的弹幕队列
        bulletlist: [], // 当前正在执行的
        value: '',
        idx: 3,
        dmData: [],
        dmDataFu: [
          {
            id: 17288,
            avatar:'https://img01.yzcdn.cn/vant/cat.jpeg',              
            nickname: '小帅哥快来玩呀1'
          }
      ],
      //定时器
      timer: null,
      //定时器时间
      timerS: 2000,
      //计数器
      num: -1,
      publist:[
        {
          uimg: require('../../images/tsy.png'),
          expectation: '想找个广东的，要顾家，宠老婆，又懂浪漫的男朋友，非诚勿扰！谢谢！',
          attr: [{"word":"淑女"},{"word":"温柔"},{"word":"甜美"},{"word":"乖乖女"}],
          nickname: "慕容晓晓"
        },
        {
          uimg: require('../../images/zyy.png'),
          expectation: '颜值不必很高，有眼缘就行，但一定要有责任心，奔着结婚去的',
          attr: [{"word":"淑女"},{"word":"温柔"},{"word":"甜美"},{"word":"乖乖女"}],
          nickname: "苏芊芊"
        },
        {
          uimg: require('../../images/5e329d86bd4aa7a8affd45d25e68f6fc.jpg'),
          expectation: '喜欢美食、看书，想找一个178cm以上，白白净净的男生',
          attr: [{"word":"淑女"},{"word":"温柔"},{"word":"甜美"},{"word":"乖乖女"}],
          nickname: "欧阳馨"
        },
        {
          uimg: require('../../images/yzr.jpeg'),
          expectation: '想找一个能读懂我内心的人，哪儿人都可以，年龄不要相差太大',
          attr: [{"word":"淑女"},{"word":"温柔"},{"word":"甜美"},{"word":"乖乖女"}],
          nickname: "高丽丽"
        },
        {
          uimg: require('../../images/xx.jpeg'),
          expectation: '在上海工作，在异乡漂泊真的很孤独，很想有个人能陪伴我',
          attr: [{"word":"淑女"},{"word":"温柔"},{"word":"甜美"},{"word":"乖乖女"}],
          nickname: "董小苑"
        }
      ],
      balanceCount: 8,
      wishVal:'',
      inputLength:0      
    }
  },
  created() {
    //this.parameters();
  },
  watch: {//使用这个属性，可以监视 data 中指定数据的变化，然后触发这个 watch 中对应的 function 处理函数
    /*
    wishVal:{
      handler: function (newVal, oldVal) {// 参数一：变化之后的值，参数二：变化之前的值
        //console.log('new:'+ newVal)
        //console.log('old:'+ oldVal)
      }
    },*/
    wishVal: function(newVal, oldVal){
      //console.log('new:'+ newVal)  
      let that = this;
      let count = that.wishVal.length;
      that.inputLength = count; 
    }
  },
  mounted() {
    let that = this;    
    //setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。
    //setTimeout是到时执行一次
    setInterval(()=>{
        var item = null; // item 是当前要显示的弹幕
        // 判断一下是否是 c 位，c 位的话要先排查 c 位弹幕队列
        if(this.idx == 3){
            // c 位
            item = this.clist.shift();
        }
        // 如果说没有要显示的弹幕，那么取普通弹幕队列的弹幕
        if(!item){
            item = this.list.shift();
        }

        if(item){// 如果有弹幕，那么放到显示队列中
            item.line = this.idx;
            this.idx = (this.idx % 3 + 1);
            this.bulletlist.push(item)
        }else{ // 如果没有弹幕，那么排查一下有没有 c位 弹幕队列
            if(this.clist.length){
                item = this.clist.shift();
                item.line = 3;
                this.idx = 3;
                this.bulletlist.push(item)
            }
        }
    }, 2000) 
  },  
  methods: {
    onInput(){
      //console.log(e)
      let e = window.event || arguments[0];
      console.log(e,e.keyCode)
      if (e.key == 'Enter' || e.code == 'Enter' || e.keyCode == 13) {
        e.returnValue = false;
        return false;
      }
      //获取原来的内容
      let val = this.wishVal;
      //console.log(val)
      //let valn = val.replace(/[\r\n]/g, "")//去掉换行符
      //this.wishVal = valn.replace(/\ +/g, "");    // 去除 空格
      //console.log(Math.random())
    },
    getUUID(){
      return Date.now() + Math.random()
    },
    animationend(){
        //console.log(this.bulletlist.shift());
        //动画结束是监视 animationend 的回调，因为我的动画时长是固定，所以每次都移除第一个 DOM 即可
        this.list.push(this.bulletlist.shift())
    },
    showDialogWish() { // 显示许愿弹框      
      this.state.visible1 = true;  
    },
    onCancelBtn() {
      this.state.visible1 = false; 
      this.wishVal = ''
    },
    sendBullet(){ // 发送弹幕
      let bulletVal = this.wishVal;      
      if(bulletVal){
        // 判断余额
        let bcount = this.balanceCount;
        if(bcount < 5) {
          this.state.visible1 = true;  
          Taro.showToast({ title: '许愿币不足，请充值后再来许愿吧', icon: 'none'});
          return false;
        }
        this.clist.push({
            id: this.getUUID(), 
            content: bulletVal, 
            avatar: require('../../images/tsy.png'),
            line: 0
        })
        this.wishVal = ''
        // 扣减余额
        this.balanceCount = bcount - 5
        console.log(this.balanceCount)
        // 提示成功
        Taro.showToast({ title: '许愿完成', icon: 'success'});
        // 关闭弹框
        this.state.visible1 = false; 
        this.$nextTick(v=>{
            //this.$refs.input.focus()
        })
      }else { // 不为空提示  
        this.state.visible1 = true;                
        Taro.showToast({ title: '请双手奉上你真诚又深情的告白吧', icon: 'none'});
      }      
    },     
    onRechargeBtn() {
      this.state.visible1 = false; 
      // 跳转到充值页面
      Taro.switchTab({
        url:'/pages/my/my'
      })
    },
    //处理弹幕参数
    parameters() {
        //console.log(this.dmDataFu)
        const dm = this.dmDataFu;
        const dmArr = [];
        for (let i = 0; i < dm.length; i++) {
            // 动画在开始前的延迟时间
            const delayTime = Math.floor(Math.random() * 20) + 5;
            // 动画执行一次的所需时间
            const timeRequired = Math.floor(Math.random() * 300);
            // const _time = time < 6 ? 6 + i : time + i;
            // 随机位置
            const top = Math.floor(Math.random() * 80) + 2;
            const _p = {
                id: dm[i].id,
                nickname: dm[i].nickname,
                avatar: dm[i].avatar,
                top,
                delayTime,
                timeRequired,
                //弹幕的字体颜色
                color: '#F2889B',
                //显示弹幕边框
                borderColor: false
            };
            console.log(_p)
            dmArr.push(_p);
        }
        this.dmDataFu = dmArr
    },
    // 显示回应TA弹框
    funReturnTa() {      
      this.state.visible2 = true;   
    },
    // 关闭回应TA弹框
    onClosedBtn() {
      this.state.visible2 = false; 
      this.wishVal = ''
    },
    // 立刻回应
    onReturnTa(){
      let bulletVal = this.wishVal;      
      if(bulletVal){
        // 判断余额
        let bcount = this.balanceCount;
        if(bcount < 8) {
          this.state.visible2 = true;  
          Taro.showToast({ title: '许愿币不足，充值后再来回应TA吧', icon: 'none'});
          return false;
        }
        this.wishVal = ''
        // 扣减余额
        this.balanceCount = bcount - 8
        console.log(this.balanceCount)
        // 提示成功
        Taro.showToast({ title: '已发送通知，静候TA佳音吧', icon: 'none'});
        // 关闭弹框
        this.state.visible2 = false; 
        this.$nextTick(v=>{
            //this.$refs.input.focus()
        })
      }else { // 不为空提示  
        this.state.visible2 = true;                
        Taro.showToast({ title: '你精彩绝伦的回应，TA会更青睐你哦', icon: 'none'});
      }
    },
    // 向上滚动
    upper(e) {
      //console.log('upper:', e)
    },
    // 向下滚动
    lower(e) {
      //console.log('lower:', e)
    },
    // 滚动事件
    scroll(e) {
      //console.log('scroll:', e)
    },
    getArrayRandom(arrayObj) {
      //console.log(arrayObj)
      let index = Math.floor(Math.random() * arrayObj.length);// 获得随机的数组索引值，使用return将数组索引返回
      //console.log(index)
      return index
    }
  }  
}
</script>

<style>
.wishbg {
    background-color: #f2f2f2;
    width: 100%;
    height: 100%;
    position:absolute;
}
.box-img {
   position: absolute;/*设为绝对定位*/
    
  opacity: 0.7;/*设置透明度*/
}
.box-font {
  font-size: 20px;
  color: #333;
  position: absolute;/*绝对布局*/
  z-index: 1;/*置于上层*/
  display: inline;
  top: 0;
  right: 0;
}
.dmcontainer {
  position:relative;height:180px;width:100%;
}
.dmbgIMG {
  width:100%;height: 180px;
}
.dmwishcontainer {
  position:absolute;bottom:0;width:100%;text-align:center;
}
.dmwishcontainerbtn {
  display:inline-block;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color:#db5a6b;
  color:#fff;
  padding:4px 12px;
  font-size:16px;
  letter-spacing:4px;
}
.bullet-wrap {
  height: 300px;
  position: relative;
  overflow: hidden;
  font-size: 16px;  
  background-size: cover;
  border:1px solid red;
}
.bullet-item{  
  color: #333;
  white-space: nowrap;
  user-select: none;
  position: absolute;
  top:0;
  left:0;  
  z-index: 2;
}
.bullet-item[data-line="1"]{top: 10%}
.bullet-item[data-line="2"]{top: 35%}
.bullet-item[data-line="3"]{top: 60%}

.dmposition1{top: 10%}
.dmposition2{top: 35%}
.dmposition3{top: 60%}

.bullet-item--c{border: 1px solid  #ff000082;}
.bullet-animation{
  animation: right2left 15s linear both;
}

@keyframes right2left {
    0% {transform: translate(100vw)}
    100% {transform: translate(-100%);}
}
.barrage_area {
    width: 100%;
    height: 150px;
    position: relative;
    background-image: url('../../images/lm-2.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.dmGroup {
    position: absolute;
    top: 70px;
    left: 100%;
    z-index: 10;    
    white-space: nowrap;
    height: 30px;
    animation: dmAnimation 10s linear both;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    transform: translateZ(0);
} 
.dmItem {    
    margin-right: 30px;
    white-space: nowrap;
    font-size: 14px; 
} 
.dmItem .dm {
    display: flex;
    vertical-align: middle;
    align-items: center;
    position: relative;    
    max-width: 280px;    
    overflow: hidden;    
    color: rgba(255, 255, 255, 1);       
    font-size: 14px; 
} 
.dmItem .avatarBox {
    display: inline-block;
    position: relative;
    width: 30px;
    height: 30px;
    margin-right: 6px;
} 
.dmItem .avatarBox .avatar {
    width: 30px;
    height: 30px;
    border: 0;
    border-radius: 50%;
    overflow: hidden;
}
.dmItem .dm .sex{ 
  position: absolute; 
  left: 15px; 
  top: 10px; 
  width: 22px; 
  height: 22px; 
  overflow: hidden;
}
.dmItem .dm .content{
  display: inline-block; 
  max-width: 440px;  
  white-space: nowrap; 
  text-overflow: ellipsis; 
  overflow: hidden; 
  font-size: 14px; 
  background: rgba(203,58,86,0.7) !important;  
  border-radius:25px;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
}
@keyframes dmAnimation {
	from{left: 0%;}
	to{left: -200%;}
}
@-moz-keyframes dmAnimation  {
	from{left: 0%;}
	to{left: -200%;}
}	
@-webkit-keyframes dmAnimation {
from{left: 0%;}
  to{left: -200%;}
}
@-o-keyframes dmAnimation {
  from{left: 0%;}
  to{left: -200%;}
} 

.bullet-chat-box{
    width: 100%;
    height: 50%;
    border:1px solid red;
}
.dan{
    position: absolute;
    left: 100%;
    background: #333;
    white-space: nowrap;
    padding: 0 14px;
    border-radius: 50px;
    height: 24px;
    line-height: 24px;
    color: #fff;
    letter-spacing: 2px;
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.2);
    cursor: default;
    top: 80px;
    animation: dmAnimation 6s linear 0s infinite;
}
@-webkit-keyframes dmAnimation {
    from {
        -webkit-transform: translateX(0);
        transform: translateX(0);
    }
    to {
        -webkit-transform: translateX(calc(-100vw - 100%));
        transform: translateX(calc(-100vw - 100%));
    }
}
@keyframes dmAnimation {
    from {
        -webkit-transform: translateX(0);
        transform: translateX(0);
    }
    to {
        -webkit-transform: translateX(calc(-100vw - 100%));
        transform: translateX(calc(-100vw - 100%));
    }
}

.toWish {
    text-align: center;     
    position: absolute;/*绝对布局*/
    z-index: 1;/*置于上层*/
    display: inline;
    top: 0;
}
.towishbtn {    
    padding:5px 15px;
    color: #fff;
    background-color: #ef7a82;
    cursor: pointer;
    border-bottom-left-radius: 12px;
}

.search_prolist_attr {
    margin: 3px 0 1px;
    height: 15px;
    overflow: hidden;   
}
.search_prolist_attr > span{
    float: left;
    padding: 0 5px;
    border-radius: 1px;
    font-size: 10px;
    height: 15px;
    line-height: 15px;
    color: #999;
    background-color: #f2f2f7;
    margin-right: 5px;
}

.pub { 
    background-color: #f2f2f2;    
}
.pub_user {
    margin-top: 10px;
    display: flex; 
    display: -webkit-flex;
    justify-content: flex-start;
    align-items: center;
    padding:6px;
    background-color: #fff;
    margin-bottom: 10px;
}
.pub_user_img {
    width: 90px;
    height: 90px; 
}
.pub_user_img .uimg {
    object-fit:cover;
    border-radius: 10px;
    width: 90px;
    height: 90px;
}
.pub_user .pub_prolist {
    padding-left:10px;
}
.expectation {
    font-size:14px;
    margin-bottom: 8px;
}
.pub_user .attr {
    margin: 0;
    display: flex; 
    display: -webkit-flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 8px;
}
.pub_user .attr .word{
    padding: 2px 5px;
    border-radius: 4px;
    font-size: 12px;
    color: #ffffff;
    background-color: #F2AEAE;
    margin-right: 5px;
}
.operate {    
    display: flex; 
    display: -webkit-flex;
    justify-content: flex-start;
    align-items: center;    
}
.returnTa {    
    background-color: #db5a6b;
    border: 1px solid #db5a6b;
    color: #ffffff;
    border-radius: 4px;
    padding:4px 12px;
    font-size: 14px;
}

.balance-count {
    font-weight: bold;
    color: #ff9e0d;
    padding:0px 5px;
}
.dialogContent {
  font-size:18px;color:#1d1e1e;border-radius:5px;background:#fcefe8;border:1px solid #cb3a56
}
.dialogContentNote {
  line-height:35px;padding:3px;font-size:14px;
}
.dialogContentInput {
  padding:5px;background:#fff;
  border-top:1px solid #ffb3a7;
  border-bottom:1px solid #ffb3a7;
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
