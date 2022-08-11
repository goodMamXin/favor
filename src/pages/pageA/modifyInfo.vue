<template>
    <view class="tempView">         
        <nut-cell-group>
            <nut-cell title="头像" is-link @click="toEditInfo" style="align-items:center">
                <template v-slot:link>
                    <image
                    class="nut-icon"
                    src="../../images/mm.jpg" style="border-radius:50%;width:45px;height:45px;line-height:45px;" />
                </template>
            </nut-cell>        
            <nut-cell title="昵称" is-link :desc="state.descNickName" @click="switchActionSheet(1)"></nut-cell>        
            <nut-cell title="性别" is-link :desc="state.descSex" @click="switchActionSheet(2)"></nut-cell>        
            <nut-cell title="个性签名" is-link :desc="state.descSignature" @click="switchActionSheet(3)"></nut-cell>      
            <!-- <nut-cell title="标签" is-link :desc="state.descTag"  @click="switchActionSheet(4)"></nut-cell> -->   
            <nut-cell title="手机" is-link :desc="state.descTel"  @click="switchActionSheet(5)"></nut-cell>     
            <nut-cell title="生日" is-link :desc="state.descBirthday" @click="switchActionSheet(6)"></nut-cell>        
            <nut-cell title="城市" is-link :desc="state.descCity" @click="switchActionSheet(7)"></nut-cell>  
        </nut-cell-group>   
        
        <!-- actionsheet 区域 -->  
        <view>
            <!-- 昵称弹框 --> 
            <nut-dialog v-model:visible="state.isVisibleNickName" title="修改昵称">            
                <template #default>
                <view class="dialogContent">
                    <view class="dialogContentInput">
                        <view>
                            <input type="text" v-model.trim="inputNickName" maxlength="5" placeholder="昵称最多输入5个字符" style="text-align:left;" />
                        </view>
                        <view class="dialogContentLength">{{inputLength}}/5</view>
                    </view>                
                </view>          
                </template>
                <template #footer>
                <view class="vwfooter">
                    <nut-row :gutter="12">
                        <nut-col :span="12">
                        <view class="onCancelBtn" @click="onCancelNickName">取消</view>
                        </nut-col>
                        <nut-col :span="12">
                        <view class="onOkBtn" @click="onOkNickName">确认</view>
                        </nut-col>
                    </nut-row>  
                </view>
                </template>
            </nut-dialog>
            <!-- 性别弹框 --> 
            <nut-actionsheet
            v-model:visible="state.isVisibleSex"
            :menu-items="menuItems"
            @choose="chooseItem"
            >
            </nut-actionsheet>
            <!-- 个性签名弹框 --> 
            <nut-dialog v-model:visible="state.isVisibleSignature" title="修改个性签名">            
                <template #default>
                <view class="dialogContent">
                    <view class="dialogContentInput">
                        <view>
                            <input type="text" v-model.trim="inputSignature" maxlength="15" placeholder="个性签名最多输入15个字符" style="text-align:left;" />
                        </view>
                        <view class="dialogContentLength">{{inputLength}}/15</view>
                    </view>                
                </view>          
                </template>
                <template #footer>
                <view class="vwfooter">
                    <nut-row :gutter="12">
                        <nut-col :span="12">
                        <view class="onCancelBtn" @click="onCancelSignature">取消</view>
                        </nut-col>
                        <nut-col :span="12">
                        <view class="onOkBtn" @click="onOkSignature">确认</view>
                        </nut-col>
                    </nut-row>  
                </view>
                </template>
            </nut-dialog>
            <!-- 个性标签 -->
            <nut-popup pop-class="popclass" 
                v-model:visible="state.isVisibleTag" round :z-index="100" :close-on-click-overlay="false"
                :style="{ width: '90%', height: '70%','padding':'5px 5px' }">
                <view class="popContainer">
                    <view class="myTag" v-for="item in taglist" :key="item.id"><nut-tag plain>{{item.tagName}}</nut-tag></view>  
                    <view class="closeTagPop" @click="switchActionSheet(4)">关 闭</view>                  
                </view>                
            </nut-popup>
            <!-- 手机号弹框 --> 
            <nut-dialog v-model:visible="state.isVisibleTel" title="手机号">            
                <template #default>
                <view class="dialogContent">
                    <view class="dialogContentInput">
                        <view>
                            <input type="number" v-model.trim="inputTel" maxlength="11" placeholder="请输入手机号" style="text-align:left;" />
                        </view>
                    </view>                
                </view>          
                </template>
                <template #footer>
                <view class="vwfooter">
                    <nut-row :gutter="12">
                        <nut-col :span="12">
                        <view class="onCancelBtn" @click="onCancelTel">取消</view>
                        </nut-col>
                        <nut-col :span="12">
                        <view class="onOkBtn" @click="onOkTel">确认</view>
                        </nut-col>
                    </nut-row>  
                </view>
                </template>
            </nut-dialog>
            <!-- 修改生日-->
            <nut-datepicker
                v-model="birthday"
                v-model:visible="state.isVisibleBirthday"
                :min-date="state.minDate"
                :max-date="state.maxDate"
                :is-show-chinese="false"
                @confirm="confirmBirthDay"
            ></nut-datepicker> 
            <!-- 修改城市-->            
            <nut-address
                v-model:visible="state.isVisibleCity"
                :province="province"
                :city="city"
                :country="country"
                :town="town"
                @change="onChange"
                @close="close"
                custom-address-title="请选择所在地区"
            ></nut-address>
        </view>
    </view>
</template>

<script>
import { reactive, toRefs ,ref,computed } from 'vue';
import { eventCenter } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import {mapState} from 'vuex'
import {useStore} from 'vuex';
import areaJSON from './area.json'

export default {
  name: 'modifyInfo',
  components: {},
  setup(props){
    const state = reactive({        
        isVisibleNickName:false,
        isVisibleSex: false,
        isVisibleSignature: false,
        isVisibleTag:false,
        isVisibleBirthday:false,
        isVisibleCity:false,
        isVisibleTel: false,
        descNickName:'玄心',
        descSex: '男',
        descSignature: '红尘无限好，从此不羡仙',
        descTag:'吃货 音乐舞蹈 平易近人 质朴厚道',
        descBirthday: '1991-7-25',
        minDate: new Date(1970, 0, 1),
        maxDate: new Date(2010, 0, 1),
        descCity:'广东省广州市天河区',
        descTel:'132****2588'                    
    });     
    const address = reactive({
        province:[
            { id: 1, name: '北京' }
        ],
        city:[
            { id: 7, name: '朝阳区' }
        ],
        country:[
            { id: 3, name: '八里庄街道' }
        ],
        town:[]
    });    
    /*
    // 获取store
    const store = useStore();
    // 获取stage里的值
    let store_descTag = computed(() => {
        return store.state.descTag;
    });
    state.descTag = store_descTag;*/
    const menuItems = [
      {
        name: '男'
      },
      {
        name: '女'
      }
    ];    
    const switchActionSheet = ( num ) => {   
        // 显示修改昵称弹框     
        if(num == 1) {
            state.isVisibleNickName = !state.isVisibleNickName;
        }
        // 显示修改性别弹框
        if(num == 2) {
            state.isVisibleSex = !state.isVisibleSex;
        }    
        // 显示修改个性签名弹框
        if(num == 3) {
            state.isVisibleSignature = !state.isVisibleSignature;
        }
        // 显示修改个性标签
        if(num == 4) {            
            Taro.navigateTo({
                url:'/pages/pageA/tag'
            })
        }
        // 显示修改手机号弹框
        if(num == 5) {
            state.isVisibleTel = !state.isVisibleTel;
        }
        // 显示修改生日
        if(num == 6) {
            state.isVisibleBirthday = !state.isVisibleBirthday;
        }
        // 显示修改城市
        if(num == 7) {
            state.isVisibleCity = !state.isVisibleCity;
            //设置省
            let provinceArr = [];
            for(var index in areaJSON){
                provinceArr.push({ id: areaJSON[index].Code, name: areaJSON[index].Name });
            }
            address.province = provinceArr;
            address.province.sort((a,b)=>{ return a.id-b.id});
        }
    };
    const chooseItem = (itemParams) => {        
        state.descSex = itemParams.name;
    };
    const onChange = (cal) => {   
        //console.log(cal)     
        //根据id查询
        searchJson(areaJSON,cal.value.id,cal.next);
        const name = address[cal.next]
        //console.log(name);
        if (name.length < 1) {
            state.isVisibleCity = false;
        }
    };
    const close = val => {
        //console.log(val);
        state.descCity = val.data.addressStr;
        //执行保存
        console.log(state.descCity);
    };
    const searchJson = (data,searchName,next) => { // 传入参数：需要遍历的json，需要匹配的searchName
        var stark = [];
        stark = stark.concat(data);
        while(stark.length) {
            var temp = stark.shift();
            if(temp.children) {
                stark = temp.children.concat(stark);
            }
            if(searchName === temp.Code) {
                //console.log(temp);
                if(temp.children && temp.children.length !== 0) {                    
                    address.city = [];
                    address.country = [];
                    //遍历子节点
                    let item = temp.children;
                    for(var i in item) {
                        if(next === 'city') {
                            address.city.push({'id':item[i].Code,'name':item[i].Name});
                            address.city.sort((a,b)=>{ return a.id-b.id})//排序
                        }
                        if (next === 'country') {
                            address.country.push({'id':item[i].Code,'name':item[i].Name});
                            address.country.sort((a,b)=>{ return a.id-b.id})
                        }                      
                    }
                }
                return temp;
            } 
        }              
    };
      
    return {
      state,menuItems,switchActionSheet,chooseItem, ...toRefs(address) ,
      onChange,close,searchJson
    }
  },
  mounted() {   
    let that = this;
    let arr = areaJSON;
    //arr.sort(that.compare("Code"));    
    //arr.sort((a,b)=>{ return a.Code-b.Code})//升序    
  },
  watch: {//使用这个属性，可以监视 data 中指定数据的变化，然后触发这个 watch 中对应的 function 处理函数
    inputNickName: function(newVal, oldVal){      
      let that = this;
      let count = that.inputNickName.length;
      that.inputLength = count; 
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
  data() {
    return {
        uimg:require('../../images/mm.jpg'),
        wishMoney:8,
        inputNickName:'',
        inputSignature:'',
        inputTel:'',
        taglist: [], 
        inputLength:0
    }
  },
  methods:{
      // 修改昵称
      onCancelNickName: function() {
        this.state.isVisibleNickName = false;
        this.inputNickName = '';
      },
      onOkNickName: function() {        
        if(this.inputNickName.length >0) {
            this.state.descNickName = this.inputNickName;
            this.state.isVisibleNickName = false;
        } else {
            Taro.showToast({ title: '昵称不能为空', icon: 'error'});
        }        
        this.inputNickName = '';
      },
      // 修改个性签名
      onCancelSignature: function() {
          this.state.isVisibleSignature = false;
          this.inputSignature = '';
      },
      onOkSignature: function() {
        if(this.inputSignature.length >0) {
            this.state.descSignature = this.inputSignature;
            this.state.isVisibleSignature = false;
        } else {
            Taro.showToast({ title: '个性签名不能为空', icon: 'error'});
        }        
        this.inputSignature = '';
      },
      confirmBirthDay(selectedValue, selectedOptions) {
        //console.log(selectedValue)//数组
        this.state.descBirthday = selectedValue[0] + "-" + selectedValue[1] + "-" + selectedValue[2];
      }, 
      confirmCity(selectedValue,selectedOptions ) {
          //selectedValue,selectedOptions 
      },
      compare(p){ // 比较函数
        return function(m,n){
            var a = m[p];
            var b = n[p];
            return a - b; //升序
        }
      },
      onCancelTel() {
          this.state.isVisibleTel = false;
          this.inputTel = '';
      },
      onOkTel: function() {
        //11位手机号码正则
        var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/; 
        if(!reg_tel.test(this.inputTel)){
            Taro.showToast({ title: '手机号码有误', icon: 'error'});
            return;
        }
        if(this.inputTel.length ==11) {
            this.state.descTel = this.inputTel;
            this.state.isVisibleTel = false;
        } else {
            Taro.showToast({ title: '请填写手机号', icon: 'error'});
        }        
        this.inputTel = '';
      },
    } 
}
</script>
<style>
.tempView {
    position:absolute;
    width: 100%;
    height: 100%;
    background-color: #f2f2f2;
}
.tempView .nut-cell-group__warp {    
    border-radius: 0;    
    margin: 0 0 10px 0;
}
.tempView .nut-cell__value {    
    color: #666;
}
.tempView .dialogContent {
  font-size:18px;color:#1d1e1e;border-radius:5px;background:#fcefe8;border:1px solid #cb3a56
}
.tempView .dialogContentNote {
  line-height:35px;padding:3px;border-top:1px solid #ffb3a7;border-bottom:1px solid #ffb3a7;
}
.tempView .dialogContentInput {
  padding:5px;background:#fff;border-radius:5px;
}
.tempView .dialogContentLength {
  text-align:right;font-size:12px;color:#999;
}
.tempView .vwfooter {
  font-size: 16px;width: 100%;cursor: pointer;
}
.tempView .vwfooter .onCancelBtn {
  background-color: #c5c8ce;
  border-radius: 4px;
  color:#fff;
  text-align: center;
  padding: 5px 5px;
}
.tempView .onOkBtn {
  background-color: #db5a6b;
  border-radius: 4px;
  color:#fff;
  text-align: center;
  padding: 5px 5px;
}
.tempView .popContainer {
    display: flex;    
    align-items: center;   
    flex-wrap: wrap;/* 换行，默认是不换行的 */
    align-content: center;
    justify-content:center;
    font-size:16px;
    
}
.tempView .popContainer .myTag {
    margin: 5px 5px;
    font-size:16px;
}
.tempView .popContainer .closeTagPop {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    background-color: #db5a6b;   
    color:#fff;
    text-align: center;    
    bottom: 0px;    
    position:absolute;
    width: 100%;
    font-size: 22px;
    cursor: pointer;
}
</style>