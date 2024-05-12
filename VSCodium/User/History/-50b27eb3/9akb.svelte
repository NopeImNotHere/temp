<script lang="ts">
	import favicon from "$lib/assets/favicon.png";
	import BlogCard from "$lib/components/BlogCard.svelte";
	import { backIn, backOut } from "svelte/easing";

    let toggle = true;
</script>
<main>
    <button on:click={() => (toggle = !toggle)}>Toggle</button>
        
    <BlogCard 
        title="Run Around"
        learnmore="https://google.com"
        visible={toggle}
        animationParams={{inAnimation: {easing: backOut}, outAnimation: {easing: backIn}}}
    >
        <img slot="img" src="{favicon}" alt="LOL" class="max-w-10 max-h-10">
        <p slot="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet commodo nulla facilisi nullam. Lorem donec massa sapien faucibus et molestie ac. Vitae elementum curabitur vitae nunc sed velit. Mauris augue neque gravida in fermentum et sollicitudin ac.</p>
    </BlogCard>

</main>