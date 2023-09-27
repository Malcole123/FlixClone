<template>
  <div class="w-auto min-h-screen bg-slate-200">
    <NavbarVue/>
    <div class="w-auto lg:px-16 md:px-16 px-6">
        <div class="container w-auto h-max">
          <Hooper 
          :itemsToShow="componentData.hooper.itemsToShow"
          :infiniteScroll="true" 
          style="height:100%;padding:12px 0px;"
          @updated="hooperUpdate"
          >
            <HooperSlide
            v-for="(focusedVideo , index) in homeHeadDisplayCarousel" :key="'focused-video-carousel' + index"
            >
            <div class="h-96 w-auto rounded-md pr-3 overflow-hidden">
              <div class="min-h-full min-w-full rounded-md relative">
                  <div class="h-full min-w-full rounded-md flex flex-col gap-4 justify-center px-6 py-2 text-white top-0 left-0 absolute z-10">
                      <div class="flex gap-2">
                          <!--Movie Quality-->
                          <span class="bg-white text-black text-xs px-1 py-0.5 rounded-md">HD</span>
                          <!--Movie Rating-->
                          <span class="border-solid border border-white text-white text-xs px-1 py-0.5 rounded-md">R</span>
                      </div>
                      <h2 class="text-4xl lg:w-3/4 md:w-full h-48 font-bold">{{ focusedVideo.title || focusedVideo.original_name }}</h2>
                      <div class="min-w-full flex items-end">
                          <a :href="focusedVideo.embed_url_imdb"
                          target="_blank"
                          class="border-solid border border-white max-w-max text-lg px-3 py-2 rounded-md cursor-pointer"
                          >
                          Watch Now
                          </a>
                          <span class="ml-auto text-sm text-stone-50">2023</span>
                      </div>
                      <!--Movie info-->
                  </div>
                  <div class="min-h-full min-w-full rounded-md block bg-stone-900 opacity-70 top-0 left-0 absolute"></div>
                  <img
                  class="h-96 min-w-full object-cover rounded-md object-center"
                  :src="`http://image.tmdb.org/t/p/w500/${focusedVideo.backdrop_path}`"
                  :alt="focusedVideo.title"
                  />
              </div>

            </div>
        
            </HooperSlide>
          </Hooper>
        </div>
        <div class="main-container w-auto mt-6 pb-8">
              <div class="w-auto">
                  <div class="w-auto">
                    <h3 class="text-2xl font-semibold">Discover</h3>
                    <div class="flex gap-3 mt-3">
                        <span 
                        v-for="(filterType, indx) in filters.discover.types"
                        :key="'discover-filter-'+ indx"
                        class="p-1 px-2 rounded-md bg-white text-black text-sm cursor-pointer capitalize"
                        :class="filters.discover.current === filterType ? 'text-teal-500 border border-teal-500 border-dashed' : ''"
                        @click="updateDiscoverFilter(filterType)"
                        >
                          {{ filterType }}
                        </span>
                    </div>
                </div>
                <div class="w-auto mt-3">
                    <div class="w-auto grid gap-2 lg:grid-cols-5 md:grid-cols-2 grid-cols-2">
                        <MainMovieDisplayCardVue
                        v-for="(video , index) in discoverHomeListOne" :key="'discover-video' + index "
                        :videoData="video"
                        :videoType="filters.discover.current"
                        />
                    </div>
                </div>
              </div>
              <div class="w-auto p-2">
                <div class="w-auto p-1 rounded-md">
                  <h3 class="text-xl font-semibold">Recently Watched</h3>
            
                </div>
              </div>
        </div>
        <div class="main-container w-auto mt-6 pb-8">
              <div class="w-auto">
                <div class="w-auto mb-4">
                  <img src="~/assets/images/anix_7xx.gif" alt="Advertisement">
                </div>
                  <div class="w-auto">
                    <h3 class="text-2xl font-semibold">Recommended</h3>
                    <div class="flex gap-3 mt-3">
                        <span class="p-1 px-2 rounded-md bg-white text-black text-sm cursor-pointer">Movies</span>
                        <span class="p-1 px-2 rounded-md bg-white text-black text-sm cursor-pointer">TV Shows</span>
                        <!--<span class="p-1 px-2 rounded-md bg-white text-black text-sm cursor-pointer">Trending</span>-->
                    </div>
                </div>
                <div class="w-auto mt-3">
                    <div class="w-auto grid gap-2 lg:grid-cols-5 md:grid-cols-2 grid-cols-2">
                      <MainMovieDisplayCardVue
                        v-for="(video , index) in discoverHomeListTwo" :key="'trending-video' + index "
                        :videoData="video"
                        :videoType="filters.discover.current"
                        />
                    </div>
                </div>
              </div>
              <div class="w-auto">
                <div class="w-auto p-1 rounded-md">
                  <!--<h3 class="text-xl font-semibold">You May Like</h3>-->
            
                </div>
              </div>
        </div>
    </div>
    <FooterVue/>
  </div>
</template>

<script>
import FooterVue from '~/components/Footer.vue';
import MainMovieDisplayCardVue from '~/components/MovieCards/MainMovieDisplayCard.vue';
import NavbarVue from '~/components/Navbar.vue';


export default {
  name: 'IndexPage',
  components:{
    NavbarVue,
    MainMovieDisplayCardVue,
    FooterVue,
  },
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
  const homeLoad = await store.dispatch('movies/fetchHomeLoad');
    return {
        successLoad:homeLoad,
    }
  },
  mounted(){
    window.addEventListener('resize', ()=>{
      if(innerWidth <=992){
        this.componentData.hooper.itemsToShow = 1;
      }else{
        this.componentData.hooper.itemsToShow = 2;
      }
    })
  },
  data(){
    return {
      componentData:{
        hooper:{
          itemsToShow:2
        }
      },
      filters:{
        discover:{
          types:['movie', 'tv show'],
          current:'movie',
        }
      }
    }
  },
  methods:{
    hooperUpdate(dta){
//      console.log(dta)
    },
    updateDiscoverFilter(type_){
      this.filters.discover.current = type_;
      return type_;
    }
  },
  computed:{
    homeHeadDisplayCarousel(){
      const displayFocused = this.$store.getters[`movies/getMovieReleases`];
      // console.log(displayFocused);
      return displayFocused;
    },
    discoverHomeListOne(){
      let getters = [ 'movies'];
      if(this.filters.discover.current === 'movie'){
        getters.push('getMovieReleases');
      }else{
        getters.push('getTVReleases');
      }
      const useGetterStr = getters.join('/');
      const displayReleases = this.$store.getters[`${useGetterStr}`];
      return displayReleases;
    },
    discoverHomeListTwo(){
      let getters = [ 'movies' , 'getTrendingReleases'];
      const useGetterStr = getters.join('/');
      const displayReleases = this.$store.getters[`${useGetterStr}`];
      return displayReleases;
    },
  }
}
</script>

<style>
.main-container{
  display:grid;
  grid-template-columns:5fr 2fr;
}


@media(max-width:1080px) {
  .main-container{
  grid-template-columns:1fr!important;
}
} 
</style>

