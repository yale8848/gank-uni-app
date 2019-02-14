<template>
	<view class="uni-tab-bar">
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in datas" :key="index" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :style="{width:tabWidth+'px'}"
			 :id="index" :data-current="index" @click="tapTab(index)">{{tab}}</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			datas: {
				type: Array,
				default: function() {
					return [];
				}
			}
		},

		data() {
			return {
				tabIndex: 0,
				scrollLeft: 0,
				tabWidth:150

			};
		},
		created:function(){
			console.log('tab created');
			console.log(this.datas.length);
			if(this.datas.length>4){
				this.tabWidth = uni.upx2px((750/4)+20);
			}else{
				this.tabWidth = uni.upx2px(750/this.datas.length);
			}
			
		},
	
		methods: {
			getElSize(id) { //得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select('#' + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			async tapTab(index) { //点击tab-bar
				if (this.tabIndex === index) {
					return false;
				} else {

					this.$emit("tab-index-event", index);

					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = index;
				}
			},

		}
	}
</script>

<style>

</style>
