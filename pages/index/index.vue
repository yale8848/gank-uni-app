<template>
	<view class="index-content">
		<tab-top :datas="tabBarsDatas" :tabDataHeight="tabHeight"></tab-top>
		<swiper @change="swiperChange" :current="tabIndex">
			<swiper-item v-for="(item,index) in tabBarsDatas" :key="index">
				<scroll-view class="scroll-list" scroll-y="true" @scrolltolower="listScrolledBottom">
					<index-item @itemClickEvent="clickEvent" :data="item" v-for="(item) in listDatas" :key="item.id"></index-item>
					<uni-load-more :status="loadMoreStatus" v-show="loadMoreShow"></uni-load-more>
				</scroll-view>

			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	import tabTop from '../../components/tab-top.vue'
	import indexItem from '../../components/index-item.vue'
	import uniLoadMore from "../../components/uni-load-more.vue"
	import strFormat from "../../common/util.js"

	export default {
		components: {
			tabTop,
			indexItem,
			uniLoadMore
		},
		data() {
			return {
				tabHeight: 100,
				tabBarsDatas: ["Android", "iOS", "休息视频", "福利", "拓展资源", "前端", "瞎推荐", "App"],
				listDatas: [],
				loadMoreStatus: "more",
				loadMoreShow: false,
				listPage: 1
			};
		},
		computed: {
			tabIndex: function() {
				return this.$store.state.indexTabIndex;
			}
		},
		onLoad() {
			uni.showLoading({
				title: '加载中'
			});
			this.getData();
		},
		watch: {
			tabIndex: function(n, o) {
				this.listPage = 1;
				this.listDatas = [];
				uni.showLoading({
					title: '加载中'
				});
				this.getData();
			}
		},
		methods: {
			getData: function() {
				let _this = this;
				let url = "https://gank.io/api/data/{0}/{1}/{2}"
				url = strFormat(url, this.tabBarsDatas[this.tabIndex], 20, this.listPage);
				console.log(url);
				uni.request({
					url: url,
					success: (res) => {
						res.data.results.map(d => {
							d.id = d._id;
							if (d.images == undefined) {
								d.images = ["https://bing.ioliu.cn/v1/rand?w=500&h=500&t=" + d.id];
							}
							d.createdAt = d.createdAt.substring(0, d.createdAt.indexOf('T'));

							d.thumbnail = "https://bing.ioliu.cn/v1/rand?w=50&h=50&t=" + d.id;

						});
						_this.listDatas.push(...res.data.results);

						console.log(_this.listDatas);
					},
					fail: (e) => {
						console.log(e.errMsg);

						uni.showToast({
							title: e.errMsg,
							duration: 1500
						});
					},
					complete: () => {
						uni.hideLoading();
						_this.loadMoreShow = false;
					}
				});
			},
			swiperChange: function(e) {
				this.$store.commit('changeIndexTabIndex', e.detail.current);
			},
			listScrolledBottom: function(e) {
				console.log('listScrolledBottom');
				this.loadMoreShow = true;
				this.loadMoreStatus = "loading"
				this.listPage++
				this.getData();
			},
			clickEvent: function(e) {
				console.log("aa " + e);

				uni.navigateTo({
					url: '/pages/webview/webview?url=' + encodeURIComponent(e)
				});
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
		background-color: #efeff4;
	}

	.index-content {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	swiper {
		flex: 1;
	}

	.scroll-list {
		height: 100%;
	}
</style>
