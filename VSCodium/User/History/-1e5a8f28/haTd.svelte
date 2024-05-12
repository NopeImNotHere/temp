<script lang="ts">
  export let title: string;
</script>

<section>
  
  <h1><slot name="img" />{title}</h1>
  <slot />
  <a href="{learnmore}"></a>

</section>