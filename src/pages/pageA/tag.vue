<template>
	<view class="tempViewTag">
    <view class="addTagView">
      <nut-row :gutter="10">
        <nut-col :span="21" class="inputTag">
          <input type="text" v-model.trim="inputTag" maxlength="5" placeholder="输入标签内容" style="padding-left:15px;color:#333;"/>
          <view style="padding-right:15px;">{{inputLength}}/5</view>
        </nut-col>
        <nut-col :span="3">
          <view class="addTagBtn" @click="addTagFunc">添加</view>
        </nut-col>
      </nut-row>
    </view>
    <!-- <view>{{num}}</view>  -->   
    <!-- <view v-for="(item, index) in list" :key="index">{{item}}</view> -->
    <view class="tabContainer">
      <view class="hasTagText">已选标签</view>
      <view class="changeTag">
        <block v-for="(item,index) in state.tag_change" :key="index">
          <nut-tag v-if="item.isShow" closeable @close="closeTag(item)" color="#db5a6b" class="theTag">{{item.tagName}}</nut-tag>
        </block>
      </view>
      <view class="hasTagText">常用标签</view>
      <view class="tagAll" v-for="item in tag_tree" :key="item.tagid">
        <view>{{item.tagtext}}</view>
        <view class="tagTextView">
          <view :class="item_tail.isShow? 'tagTextSelect' : 'tagText'" v-for="item_tail in item.children" :key="item_tail.id" @click="selectTag(item_tail)">{{item_tail.tagName}}</view>
        </view>
      </view>
    </view>
  </view>    
</template>

<script>
import { reactive } from 'vue';
import { eventCenter } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import tagJSON from './tag.json';
import {mapState} from 'vuex'

export default {
  name: 'my',
  components: {
    
  },
  setup(){
    const state = reactive({
      tagVal: "",
      show:true,
      tag_change:[
        {
          "id":"21",
          "tagName":"小财迷",
          "isShow":true
        },
        {
          "id":"23",
          "tagName":"小傲娇",
          "isShow":true
        },
        {
          "id":"36",
          "tagName":"御姐",
          "isShow":true
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
        tag_tree: [],
        inputTag: "",
        inputLength: 0    
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
    // 判断已选择
    let temp = that.state.tag_change;
    var changeName = [];
    for(var index in temp) {
      let tagName = temp[index].tagName
      changeName.push(tagName)
    } 
    that.tag_tree = this.madeJson(tagJSON.tag,changeName)
  },
  watch: {//使用这个属性，可以监视 data 中指定数据的变化，然后触发这个 watch 中对应的 function 处理函数
    inputTag: function(newVal, oldVal){      
      let that = this;
      let count = that.inputTag.length;
      that.inputLength = count; 
    }
  },
  methods: {
    addTagFunc() {
      this.$store.commit('increment')// 调store里的increment方法
      // 调store里的setCount方法，并进行传参
      // this.$store.commit("setCount", 20);
      // 获取store里的stage的count值
      console.log(this.$store.state.count)
      let val = this.inputTag;
      if(val.length == 0) {
        Taro.showToast({ title: "请输入标签内容", icon: 'error'});
        return false;
      }
      let has_tag = this.state.tag_change;
      let temp_tag = [];
      for(var i in has_tag) {
        temp_tag.push(has_tag[i].tagName)
      }
      // 判断是否已存在
      if(temp_tag.indexOf(val) > -1) {
        Taro.showToast({ title: '该标签已存在', icon: 'error'});
        return;
      }      
      this.selectTag({"id":new Date().toString,"tagName":val,"isShow":true})
      //Taro.showToast({ title: '成功', icon: 'success'});
      this.inputTag = "";
    },
    closeTag(item) { // 从已选便签中删除标签
      // 删除数组中对应的item
      let has_tag = this.state.tag_change;
      for(let index in has_tag) {
        //判断两个对象是否相同
        if(Object.entries(has_tag[index]).toString() === Object.entries(item).toString()) {
          has_tag.splice(index,1)
        }
      }
      // 遍历删除后的数据
      let temp = has_tag;
      var changeName = [];
      for(var index in temp) {
        let tagName = temp[index].tagName
        changeName.push(tagName)
      }
      this.tag_tree = this.madeJson(tagJSON.tag,changeName) 
    },
    selectTag(item) { 
      let has_tag = this.state.tag_change;
      // 遍历已选标签
      let tagStr = "";
      let temp_tag = [];
      for(var i in has_tag) {
        temp_tag.push(has_tag[i].tagName)
        tagStr = has_tag[i].tagName +  " " + tagStr ;
      }
      // 添加到已选标签
      if(temp_tag.indexOf(item.tagName) > -1) { // 包含某元素（即第2次点击）        
        //Taro.showToast({ title: '该标签已选择过了噢', icon: 'none'});
        // 删除选择
        this.closeTag({"id":item.id,"tagName":item.tagName,"isShow":true})
      } else {
        // 判断长度（最多选4个标签）
        if(has_tag.length >= 4) {        
          Taro.showToast({ title: '标签最多选择4个', icon: 'none'});
          return false
        }
        item.isShow = true;
        this.state.tag_change.push({"id":item.id,"tagName":item.tagName,"isShow":true})
        this.$store.state.descTag = tagStr;
      }      
    },
    madeJson(data,searchName) {//传入参数：需要遍历的json，需要匹配的searchName           
      var newJSON = [];      
      var stark = [];
      stark = stark.concat(data); //用于连接两个或多个字符串。该方法没有改变原有字符串，但是会返回连接两个或多个字符串新字符串。      
      while(stark.length) { // 非递归遍历
        var temp = stark.shift();// shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值
        // 重新构造json对象
        var obj = {};
        obj.tagid = temp.tagid;// 为obj对象添加属性
        obj.tagtext = temp.tagtext;
        if(temp.children) {          
          var children = temp.children;
          var newChildren = [];
          for(var index in children) {
            var objTemp = {
              id: children[index].id, 
              tagName: children[index].tagName,               
              isShow: searchName.indexOf(children[index].tagName) > -1 ? true : false
            }
            newChildren.push(objTemp);
          }
          obj.children = newChildren
        }    
        newJSON.push(obj);
      }
      return newJSON;// 返回重组后的对象      
    },
  }
}
</script>

<style>
.tempViewTag {
    position:absolute;
    width: 100%;
    height: 100%;
    background-color: #f2f2f2;
    color:#666;
}
.tempViewTag .addTagView {
  margin:15px 5px;
  display: flex;
  justify-content: center;
  font-size: 14px;
}
.inputTag {
  display: flex;
  justify-content: space-between;
  text-align:left;
  background-color: #fff;  
  border-radius: 4px;
  padding:5px;
  color: #999;
}
.addTagBtn {
  background-color:#db5a6b;
  color:#fff;
  border-radius: 4px;
  padding:5px;
  text-align: center;
  cursor: pointer;
}
.tabContainer {  
  background-color: #fff;
  padding:5px 5px;
  font-size: 14px;
}
.hasTagText {
  border-bottom: 1px solid #e7e7e7;
  padding:10px 0px;
}
.changeTag {
  padding-top:10px;
}
.changeTag .theTag {
  margin-right:10px;
  margin-bottom:10px;
  padding-top:4px;
  padding-bottom:4px;
}
.tagAll {
  padding:10px 0px 0px 0px;
}
.tagAll .tagTextView {
  display: flex;
  flex-wrap:wrap;
  margin-top: 5px;  
}
.tagText {
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px 10px 5px 0px;
  background-color: #f2f2f2;
}
.tagTextSelect {
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px 10px 5px 0px;
  background-color: #db5a6b;
  color: #fff;
}

</style>
