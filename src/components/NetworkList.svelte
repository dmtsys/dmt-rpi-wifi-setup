<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { List, ListItem } from 'dmt-frontend-components';
  import ChevronRightIcon from './ChevronRightIcon.svelte';

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

<List transparent focusTop>
  <ListItem fluid>
    <!-- svelte-ignore a11y-autofocus -->
    <input type="search" bind:value={search} on:keydown={handleSearchKeyDown} autofocus placeholder="Search network..." />
  </ListItem>
  {#each filteredNetworks as network, i}
    <ListItem fluid>
      <button class:highlight={highlightNetworkIndex === i} on:click={() => dispatch('selectNetwork', network)}>
        <span>
          {network}
        </span>
        <ChevronRightIcon />
      </button>
    </ListItem>
  {:else}
    <ListItem>
      <p>No networks found</p>
    </ListItem>
  {/each}
</List>

<style>
  input {
    width: 100%;
    padding: 0.8rem 1rem;
    border-radius: 0;
    background-color: transparent;
    color: white;
    font-weight: 600;
  }

  button {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    color: rgb(var(--dmt-cool-cyan-rgb));
    background-color: rgba(var(--dmt-cool-cyan-rgb), 0.15);
  }

  button:focus,
  button.highlight {
    color: rgb(var(--dmt-cool-cyan-rgb));
    background-color: rgba(var(--dmt-cool-cyan-rgb), 0.2);
  }

  p {
    text-align: center;
    opacity: 0.5;
  }
</style>
