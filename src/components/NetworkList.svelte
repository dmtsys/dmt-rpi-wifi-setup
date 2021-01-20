<script>
  import { createEventDispatcher, onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  export let networks = [];

  let search = '';
  let highlightNetworkIndex = -1;

  $: searchLowercased = search.toLowerCase();

  $: filteredNetworks = search ? networks.filter(v => v.toLowerCase().includes(searchLowercased)) : networks;

  $: if (search) {
    highlightNetworkIndex = filteredNetworks.length > 0 ? 0 : -1;
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  function handleKeyDown(e) {
    if (e.key === 'ArrowUp') {
      highlightNetworkIndex--;
      if (highlightNetworkIndex < 0) {
        highlightNetworkIndex = filteredNetworks.length - 1;
      }
    } else if (e.key === 'ArrowDown') {
      highlightNetworkIndex++;
      if (highlightNetworkIndex >= filteredNetworks.length) {
        highlightNetworkIndex = 0;
      }
    } else if (e.key === 'Enter') {
      dispatch('selectNetwork', filteredNetworks[highlightNetworkIndex]);
    }
  }

  function handleSearchKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }
</script>

<div>
  <!-- svelte-ignore a11y-autofocus -->
  <input type="search" bind:value={search} on:keydown={handleSearchKeyDown} autofocus placeholder="Search network..." />
</div>
<ul>
  {#each filteredNetworks as network, i}
    <li>
      <div>
        <button class:highlight={highlightNetworkIndex === i} on:click={() => dispatch('selectNetwork', network)}>
          {network}
        </button>
      </div>
    </li>
  {:else}
    <li>
      <p>No networks found</p>
    </li>
  {/each}
</ul>

<style>
  ul {
    flex: 0 1;
    list-style-type: none;
    padding: 0 1rem;
    margin: 0;
    overflow-y: auto;
  }

  li {
    border-top: 1px solid rgba(255, 255, 255, 0.3);
  }

  li:first-child {
    border-top: 1px solid rgba(255, 255, 255, 0.8);
  }

  /* occupy horizontal space */
  li > * {
    margin: 0 -1rem;
  }

  input {
    width: 100%;
    padding: 0.8rem 1rem;
    border-radius: 0;
    background-color: transparent;
    color: white;
    font-weight: 600;
  }

  button {
    width: 100%;
    padding: 0.625rem 1rem;
    border-radius: 0;
    outline: none;
    border: 0;
    color: white;
    background-color: transparent;
    text-align: left;
    transition: color 0.2s, background-color 0.2s;
  }

  button:hover {
    color: var(--dmt-cool-cyan-rgb);
    background-color: rgba(var(--dmt-cool-cyan-rgb), 0.15);
  }

  button:focus,
  button.highlight {
    color: var(--dmt-cool-cyan-rgb);
    background-color: rgba(var(--dmt-cool-cyan-rgb), 0.2);
  }

  p {
    padding: 0.625rem 1rem;
    text-align: center;
    opacity: 0.5;
  }
</style>
