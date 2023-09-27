<template>
    <div class="cursor-pointer w-auto flex items-center gap-3 px-2 py-1 transition duration-300 ease-in-out hover:text-teal-500 hover:bg-teal-50">
        <div class="h-16">
            <img class="h-full bg-dark" src="~/assets/images/result-banner-test.jpg">
        </div>
        <div class="h-16 flex-1">
            <span class="block font-medium text-sm">{{ movieTitle }}</span>
            <div class="w-auto flex gap-2 items-center mt-2 text-xs">
                <!--Movie Quality-->
                <span class="bg-neutral-800 text-white px-1 py-0.5 rounded-md">{{ movieStreamQual }}</span>
                <!--Movie Rating-->
                <span class="border-solid border border-neutral-800 text-neutral-800 px-1 p-0.5 rounded-md">{{ movieViewRating }}</span>
                <span class="text-neutral-800 font-medium">&nbsp;.&nbsp;</span>
                <span class="text-neutral-800">{{ movieReleaseYear }}</span>
                <span class="text-neutral-800 font-medium">&nbsp;.&nbsp;</span>
                <span class="text-neutral-800">101 m</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:[
        'movieTitle',
        'movieStreamQual',
        'movieViewRating',
        'movieReleaseYear',
        'movieBannerImg',

    ],
    emits:[
        'resultClicked'
    ]
}
</script>

<style scoped>

</style>