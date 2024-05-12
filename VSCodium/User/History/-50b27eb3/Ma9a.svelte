<script lang="ts">
	import favicon from "$lib/assets/favicon.png";
	import BlogCard from "$lib/components/BlogCard.svelte";
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';

    let toggle = true;
</script>
<main>
    <button on:click={() => (toggle = !toggle)}>Toggle</button>
    {#if toggle}
        
    <BlogCard 
        title="Run Around"
        learnmore="https://google.com"
        animate:flip={{ delay: 250, duration: 250, easing: quintOut }}
    >
        <img slot="img" src="{favicon}" alt="LOL" class="max-w-10 max-h-10">
        <p slot="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet commodo nulla facilisi nullam. Lorem donec massa sapien faucibus et molestie ac. Vitae elementum curabitur vitae nunc sed velit. Mauris augue neque gravida in fermentum et sollicitudin ac.</p>
    </BlogCard>

    {/if}
</main>