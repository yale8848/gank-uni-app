<template>

	<view class="content">
		<uni-card @click="cardClick" :note="data.desc" :is-full="false" :title="data.who" :thumbnail="data.thumbnail" :extra="data.createdAt">
			<image mode="center" :src="data.images[0]" style="width: 100%;"></image>
		</uni-card>

	</view>
</template>

<script>
	import uniCard from "@/components/uni-card/uni-card.vue"


	export default {
		components: {
			uniCard
		},

		props: {
			data: {
				type: Object,
				default: function() {
					return {};
				}
			}
		},
		methods:{
			cardClick:function(){
				this.$emit('itemClickEvent',this.data.url)
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.content {
		margin-top: 50upx;
		margin-left: 30upx;
		margin-right: 30upx;
	}
</style>
