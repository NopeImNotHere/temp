<script lang="ts">
  import { fade, fly } from "svelte/transition";
  export let title: string;
  export let learnmore: string;
  export let visible: boolean;
</script>

{#if  visible}
  
<section class="flex shadow-lg p-4 flex-col w-1/4 gap-2 bg-zinc-700 rounded-md">
  <h1 class="flex gap-2 text-center items-center mb-2 text-xl font-bold"><slot name="img" />{title}</h1>
  <slot name="content" />
  <a class="text-right pt-3 mt-auto text-blue-400 underline" href="{learnmore}">Learn More</a>
</section>

{/if}