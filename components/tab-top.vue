<template>
	<view class="tab-bar" :style="{height:tabHeight+'px'}">
		<scroll-view id="tab-bar" class="swiper-tab" scroll-x :scroll-left="scrollLeft" :style="{lineHeight:tabHeight+'px',height:tabHeight+'px'}">
			<view v-for="(tab,index) in datas" :key="index" :class="['tab-swiper-list',tabIndex==index ? 'active' : '']" :style="{width:tabWidth+'px'}"
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
			},
			tabDataHeight: {
				type: Number,
				default: 100
			}
		},
		
		computed:{
			tabIndex(){
				return this.$store.state.indexTabIndex;
			}
		},
		watch:{
			tabIndex:function(n,o){
				this.scrollLeft = (n==0?0:this.tabWidth*(n-1));
			}
		},
		data() {
			return {
				scrollLeft: 0,
				tabWidth: 150,
				tabHeight: 100

			};
		},
		created: function() {
			if (this.datas.length > 4) {
				this.tabWidth = uni.upx2px((750 / 4) + 20);
			} else {
				this.tabWidth = uni.upx2px(750 / this.datas.length);
			}
			this.tabHeight = uni.upx2px(this.tabDataHeight);
		},

		methods: {
			tapTab(index) { 
				if (this.tabIndex === index) {
					return false;
				} 
				this.$store.commit('changeIndexTabIndex', index);
			},

		}
	}
</script>

<style>
	.tab-bar {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.swiper-tab {
		width: 100%;
		white-space: nowrap;
		border-bottom: 1px solid #c8c7cc;
		position: fixed;
		background: #FFFFFF;
		z-index: 999;
		left: 0;
	}

	.tab-swiper-list {
		font-size: 30upx;
		width: 150upx;
		display: inline-block;
		text-align: center;
		color: #555;
	}

	.tab-bar .active {
		color: #007AFF;
	}
</style>
