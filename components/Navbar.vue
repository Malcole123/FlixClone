<template>
    <div class="h-16 w-auto lg:px-16 md:px-16 px-6 flex items-center gap-2">
        <!--FOLDICON-->
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
        </div>
        <a 
        v-if="search.active === true && device.mobile === false"
        href="/" class="lg:mr-4" >
            <img src="~/assets/images/logo.png" alt="FlixtorRealLogo" class="h-7" />
        </a>
        <div class="h-12 flex flex-1 bg-white rounded-md relative">
            <div class="absolute left-2 top-0 translate-y-2/4">
                <!--Search.svg-->
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <input 
            v-model.trim="search.input"
            class="min-h-full min-w-full pl-12 border-none outline-none text-xs rounded-md"
            type="text" placeholder="Search movies, tv shows and more...">
            <button
            type="button"
            class="
            outline-none border-none
            flex items-center 
            absolute right-2 top-0 translate-y-2/4 
            bg-zinc-200 hover:bg-zinc-300 text-sm py-1 px-2 rounded-md"
            >
            <span class="mr-2">
                <!--Filter.svg-->
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            </span>
                Filter
            </button>
            <!--Search Results Component-->
            <div 
                :class="search.input.length > 0 && search.results.length > 0 ? 'h-96 absolute top-full left-0 z-10 min-w-full shadow-xl bg-white rounded-md overflow-y-scroll' : 'hidden'"
                >
                <div class="min-w-full flex flex-col">
                    <SearchResultCardVue v-for="n in 8" :key="'n'+ n"
                        :movieTitle="'Staten Island Summer'"
                        :movieStreamQual="'HD'"
                        :movieViewRating="'TV-MA'"
                        :movieReleaseYear="'2015'"
                    />
                </div>
            </div>
        </div>
        <div class="rounded-md p-3 bg-black cursor-pointer">
          <!--Airplay-->
            <svg xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            class="feather feather-airplay text-white"><path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path><polygon points="12 15 17 21 7 21 12 15"></polygon></svg>

        </div>
    </div>
</template>

<script>
import SearchResultCardVue from './MovieCards/SearchResultCard.vue'
export default {
    components:{
        SearchResultCardVue
    },
    mounted(){
        window.addEventListener('resize', this.formatNavbarForScreen)
    },
    data(){
        return {
            device:{
                mobile:false,
                width:0,
                height:0,
            },
            search:{
                active:true,
                input:"",
                results:[],
            }
        }
    },
    methods:{
        formatNavbarForScreen(){
            const { innerWidth , innerHeight } = window;
            this.device.width = innerWidth;
            this.device.height = innerHeight;
            if(innerWidth <= 992){
                 this.device.mobile = true;
            }else{
                this.device.mobile = false;
            }
        }
    }
}
</script>

<style>

</style>