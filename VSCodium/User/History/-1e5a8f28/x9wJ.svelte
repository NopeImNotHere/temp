<script lang="ts">
  export let title: string;
  export let learnmore: string;
</script>

<section>
  <h1><slot name="img" />{title}</h1>
  <slot name="content" />
  <a href="{learnmore}">Learn More</a>
</section>