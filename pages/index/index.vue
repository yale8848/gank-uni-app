<template>
	<view>
        <view class="tab-top">
			<tab-top></tab-top>
		</view>
		
		<view>
			<view class="index-content">
				<block v-for="(item,index) in listDatas" :key="index">
					<index-item :data="item">
						
					</index-item>
					
				</block>
			</view>
			<view class="load-more">
				<list-load-more></list-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	
	import tabTop from '../../components/tab-top.vue';
	import listLoadMore from '../../components/list-load-more.vue';
	import indexItem from '../../components/index-item.vue';

	
	export default {
		
		components:{
			tabTop,
			listLoadMore,
			indexItem
		},
		
		data() {
			return {
				title: 'Hello',
				listDatas:["aa","bb","ccc","ddd"]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}
    .logo{
        height: 200upx;
        width: 200upx;
        margin-top: 200upx;
    }
	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
