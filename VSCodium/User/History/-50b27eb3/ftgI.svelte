<script lang="ts">
	import BlogCard from "$lib/components/BlogCard.svelte";


</script>
<main>
<BlogCard 
    title="Run Around"
    learnmore="google.com"
>
    <img slot="img" src="./favicon.png" alt="LOL">
    <p slot="content">TestEst</p>
</BlogCard>
</main>