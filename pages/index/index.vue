<template>
	<view>
		<tab-top @tab-index-event="currentTabIndexEvent" :datas="tabBarsDatas"></tab-top>
		<view>{{tabIndex}}</view>
	</view>
</template>
<script>
 import tabTop from '../../components/tab-top.vue'
 
	
 export default{
	 components:{
		 tabTop
	 },
	 data(){
		return {
			 tabIndex:0,
			 tabBarsDatas:["aa","bb","cc","dd","ee"]
		};
	 },
	 onLoad() {
	 	console.log("bb");
	 },
	 methods:{
		 currentTabIndexEvent:function(data){
			 this.tabIndex = data;
			 console.log(data);
		 }
	 }
 }

</script>

<style>
<style>