<script>
  import Loading from './views/Loading.svelte';
  import Dashboard from './views/Dashboard.svelte';

  export let connected;
  export let state;
  export let api;
</script>

<main>
  {#if !$connected}
    <Loading />
  {:else}
    <Dashboard state={$state} {api} />
  {/if}
</main>

<style>
  main {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
