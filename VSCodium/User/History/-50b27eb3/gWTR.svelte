<script lang="ts">
	import favicon from "$lib/assets/favicon.png";
	import BlogCard from "$lib/components/BlogCard.svelte";


</script>
<main>
<BlogCard 
    title="Run Around"
    learnmore="https://google.com"
>
    <img slot="img" src="{favicon}" alt="LOL">
    <p slot="content">TestEst</p>
</BlogCard>
</main>