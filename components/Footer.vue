<template>
    <div class="w-full lg:px-16 md:px-16 px-6 py-8 bg-gradient-to-b from-slate-200 to-cyan-300 divide-y divide-sky-800 divide-dashed divide-opacity-50">
        <div class="w-full">
            <a 
            href="/">
            <img src="~/assets/images/logo.png" alt="FlixtorRealLogo" class="h-9" />
        </a>
        </div>
        <div class="w-full my-10 footer-content pt-8 pb-8">
            <div class="w-full footer-navlinks text-sm font-medium text-sky-800">
                <span>Movies</span>
                <span>TV Shows</span>
                <span>A-Z List</span>
                <span>Trending</span>
                <span>Top IMDb</span>
                <span>New Release</span>
                <span>Most Watched</span>
                <span>Recently Added</span>

            </div>
            <div class="w-full rounded-md bg-sky-200 p-3 shadow-xl">
                <p class="text-sm text-teal-700">
                    FlixTor is a Free Movies streaming site with zero ads. We let you watch movies online without having to register or paying, with over 10000 movies and TV-Series. You can also Download full movies from FlixTor and watch it later if you want.
                </p>
            </div>
        </div>
        <div class="w-full pt-8 pb-8">
            <p class="text-xs font-light text-teal-700">
                This site does not store any files on our server, we only linked to the media which is hosted on 3rd party services.
            </p>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .footer-content, .footer-navlinks{
        display:grid;
        grid-template-columns:repeat(2,1fr);
        gap:1rem;
    }

    .footer-navlinks{
        grid-template-columns:repeat(3,1fr);
        gap:1rem;
    }

    @media (max-width:992px) {    
        .footer-content{
            grid-template-columns:1fr;
        }

        .footer-navlinks{
            grid-template-columns:repeat(2,1fr);
        }
    }
</style>