<script lang="ts">
  import '$css/index.css'
  import { ImgFavicon } from '$assets/img'

  let { children } = $props()
</script>

<svelte:head>
  <link rel="icon" href={ImgFavicon} />
</svelte:head>

{@render children()}
