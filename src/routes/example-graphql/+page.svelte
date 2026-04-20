<script lang="ts">
  let { data } = $props()
</script>

<div class="mx-auto max-w-2xl rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
  <h1 class="mb-4 bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-3xl font-bold text-transparent">
    GraphQL Setup Example
  </h1>

  {#if data.error}
    <div class="mb-4 rounded-lg border border-red-500/50 bg-red-500/20 p-4 text-red-100">
      <p class="font-bold">Error:</p>
      <p>{data.message}</p>
    </div>
  {:else}
    <div class="mb-4 rounded-lg border border-green-500/50 bg-green-500/20 p-4 text-green-100">
      <p>{data.message}</p>
    </div>
  {/if}

  <div class="mt-6 space-y-4">
    <h2 class="text-xl font-semibold text-white/80">How to use:</h2>
    <div class="rounded-xl bg-black/30 p-4 font-mono text-sm text-blue-200">
      <p class="text-gray-400">// 1. Add this to your .env</p>
      <p>GRAPHQL_ENDPOINT=your_endpoint_url</p>

      <p class="mt-4 text-gray-400">// 2. Import in your +page.server.ts</p>
      <p>import {'{'} gqlRequest {'}'} from '$lib/server/graphql';</p>
    </div>
  </div>
</div>

<style>
  :global(body) {
    background: radial-gradient(circle at top right, #1a1a2e, #16213e, #0f3460);
    color: #e2e8f0;
    min-height: 100vh;
  }
</style>
