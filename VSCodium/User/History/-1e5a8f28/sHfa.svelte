<script lang="ts">
  export let title: string;
  export let learnmore: string;
</script>

<section class="flex shadow-lg p-4 flex-col w-1/4 gap-2 bg-zinc-700 rounded-md">
  <h1 class="flex gap-2 text-center items-center mb-2 text-xl font-bold"><slot name="img" />{title}</h1>
  <slot name="content" />
  <a class="text-left underline" href="{learnmore}">Learn More</a>
</section>