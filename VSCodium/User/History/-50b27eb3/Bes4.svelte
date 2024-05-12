<script lang="ts">
	import BlogCard from "$lib/components/BlogCard.svelte";
	import favicon from "images/favicon.png";


</script>
<main>
<BlogCard 
    title="Run Around"
    learnmore="google.com"
>
    <img slot="img" src="{favicon}" alt="LOL">
    <p slot="content">TestEst</p>
</BlogCard>
</main>