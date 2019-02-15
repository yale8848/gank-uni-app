import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		indexTabIndex:0
	},
	getters:{//computed
		getIndexTabIndex:function(state){
			return state.indexTabIndex;
		}
	},
	mutations: {//methods
		changeIndexTabIndex:function(state, payload){
			state.indexTabIndex = payload;
		}
	},
	actions: {//async methods
	
	}
})

export default store
