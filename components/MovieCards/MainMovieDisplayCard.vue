<template>
  <div class="cursor-pointer bg-white h-80 w-auto rounded-md shadow-lg relative"
  @mouseenter="detectMouseEnter"
  @mouseleave="detectMouseLeave"
  >
    <div
      class="h-2/3 w-auto bg-black rounded-md rounded-bl-none rounded-br-none overflow-hidden relative"
    >
      <img
        class="h-full min-w-full object-cover object-center"
        :src="`http://image.tmdb.org/t/p/w500/${videoData.poster_path}`"
        :alt="videoData.title || videoData.original_name"
      />
      <span
      class="absolute top-2 left-2 bg-teal-500 text-black text-xs rounded-md px-1 py-0.5 font-medium z-10"
      >
        HD
      </span>
    </div>
    <div class="h-1/3 w-auto rounded-md p-2">
      <div class="block w-auto h-2/3">
        <h4 class="text-base font-bold text-neutral-800 w-full h-full truncate  overflow-clip overflow-hidden">
          {{ videoData.title || videoData.original_name }}
        </h4>
      </div>
      <div class="block h-1/3 flex items-end gap-2 text-sm text-gray-400">
        <span class="capitalize">
          {{ videoType }}
        </span>
        <span class="ml-auto">
          {{ releaseYearDisplay }}
        </span>
        <span class="uppercase">
          {{ videoData.original_language }}
        </span>
      </div>
    </div>
    <div class="h-full w-60 z-20 absolute -right-1/2 transition duration-1000 delay-1000 ease-in-out rounded-md p-2 border border-teal-500 flex flex-col"
        :class="previewStyling"
    >
    <div class="w-full text-teal-500 border border-teal-500 border-dashed px-2 py-1 rounded-md font-light">
        {{ videoData.title || videoData.original_name }}
    </div>
        <div class="mt-2 flex items-center gap-2 text-xs text-neutral-200">
            <span class="bg-neutral-200 text-neutral-900 px-1 py-0.5 rounded-md">HD</span>
            <!--Movie Rating-->
            <span class="border-solid border border-neutral-200 px-1 py-0.5 rounded-md">R</span>
            <span>2023</span>
            <span>127 min</span>
        </div>
        <p class="overview-paragraph mt-4 w-full text-xs text-neutral-300 leading-relaxed h-40">
            {{ videoData.overview }}
        </p>
        <div class="w-full mt-auto grid grid-cols-2 gap-1 text-sm font-light">
            <a 
            class="py-2 px-4 flex items-center justify-center bg-teal-500 text-neutral-900 rounded-md"
            href="/">
                <span class="mr-1">Play Now</span>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </span>
            </a>
            <button
            type="button" 
            class="py-2 px-4 flex items-center justify-center bg-neutral-600 text-white rounded-md"
            >
            <span class="mr-1">Bookmark</span>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>                </span>
            </button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props:[
        'videoData',
        'videoType'
    ],
    data(){
        return{
            previewCard:{
                active:false,
            }
        }
    },
    computed:{
        releaseYearDisplay(){
            const { release_date, first_air_date } = this.videoData;
            let useStr = "";
            if(typeof release_date === 'string' || typeof first_air_date === 'string'){
                const useDate = release_date || first_air_date;
                useStr = useDate.slice(0,4);
            };
            return useStr
        },
        previewStyling(){
            if(this.previewCard.active){
                return 'bg-neutral-900 bottom-2/4'
            }else{
                return 'hidden'
            }
        }
    },
    methods:{
        detectMouseEnter(ev){
            this.previewCard.active = true;
        },
        detectMouseLeave(){
            this.previewCard.active = false;
        }
    }
}
</script>

<style scoped>
.overview-paragraph{
    display: -webkit-box;
    overflow:hidden;
  -webkit-line-clamp:6;
  -webkit-box-orient: vertical;  
}
</style>