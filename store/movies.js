const state = ()=>({
    movies:{
        newReleases:{
            maxPage:0,
            allItems:[]
        },
    },
    tvShows:{
        newReleases:{
            maxPage:0,
            allItems:[]
        },
    },
    trendingVideos:{
        page:0,
        allItems:[]
    }

})

const getters = {
    getMovieReleases(state){
        return state.movies.newReleases.allItems;
    },
    getTVReleases(state){
        return state.tvShows.newReleases.allItems;
    },
    getTrendingReleases(state){
        return state.trendingVideos.allItems;
    },
}

const mutations = {
    updateNewMovieReleases(state, { page , items}){
        state.movies.newReleases.maxPage = page;
        state.movies.newReleases.allItems = items;
    },
    updateNewTVReleases(state, { page , items}){
        state.tvShows.newReleases.maxPage = page;
        state.tvShows.newReleases.allItems = items;
    },
    updateNewTrendingVideos(state, { page , items}){
        state.trendingVideos.page = page;
        state.trendingVideos.allItems = items;
        return true;
    }
}

const actions = {
    async fetchFromVidSrc(state,  {vidType , filterType ,  page}){
        const url = `https://vidsrc.to/vapi/${vidType}/${filterType}/${page}`;
        const response = await this.$axios.$get(url, {
            params:{

            }
        }).then(data=>{
            return {
                ok:true,
                data,
            }
        }).catch(err=>{
            return {
                ok:false,
            }
        });
        return response;
    },
    async fetchFromTMDBAPI(state,  {vidType , filterType ,  page , extendURL , params}){

        const url = `https://api.themoviedb.org/3/${filterType}/${vidType}` + extendURL;
        const response = await this.$axios.$get(url, {
            params,
        }).then(data=>{
            return {
                ok:true,
                data,
            }
        }).catch(err=>{
            return {
                ok:false,
            }
        });
        return response;
    },
    async fetchMovieReleases(state){
        const newMVIEReleases = await state.dispatch('fetchFromTMDBAPI', {
            vidType:'movie',
            filterType:'discover',
            params:{
                api_key:process.env.NUXT_ENV_TMDBAPIKEY,
            },
            page:'1',
            extendURL:''
        });
        const { ok , data } = newMVIEReleases;
        if(!ok){ return {page:0,results:[]}}
        return data;
    },
    async fetchTVReleases(state){
        const newTVReleases = await state.dispatch('fetchFromTMDBAPI', {
            vidType:'tv',
            filterType:'discover',
            params:{
                api_key:process.env.NUXT_ENV_TMDBAPIKEY,
            },
            page:'1',
            extendURL:''
        });
        const { ok , data } = newTVReleases;
        if(!ok){ return {page:0,results:[]}}
        return data;
    },
    async fetchTrendingVideos(state){
        const trendingReleases = await state.dispatch('fetchFromTMDBAPI', {
            vidType:'all',
            filterType:'trending',
            params:{
                api_key:process.env.NUXT_ENV_TMDBAPIKEY,
                language:'en-US',
                page:'3',
            },
            extendURL:'/week',
            
        });
        const { ok , data } = trendingReleases;
        if(!ok){ return {page:0,results:[]}}
        //Filter from new releases
        console.log(data)
        return data;
    },
    async fetchHomeLoad(state){
        const homeLoad = [
            state.dispatch('fetchMovieReleases'),
            state.dispatch('fetchTVReleases'),
            state.dispatch('fetchTrendingVideos'),
          ]
          const action = Promise.all(homeLoad).then((values)=>{
            values.forEach((homeVal, index)=>{
                let commitKey = index === 0 ? 'updateNewMovieReleases' : 'updateNewTVReleases';
                commitKey = index === 2 ? 'updateNewTrendingVideos' : commitKey;
                state.commit(commitKey, {
                    page:homeVal.page,
                    items:homeVal.items || homeVal.results,
                })
            })
            return true;
          }).catch((err)=>{
                return false;
          });
          return action;
    }
 
}





export { state, mutations, actions, getters }