<script>
  import { writable } from 'svelte/store';
  import { tweened } from 'svelte/motion';
  import { quadOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import { resize } from '../actions/resize';
  import Logo from '../components/Logo.svelte';
  import NetworkConnect from '../components/NetworkConnect.svelte';
  import NetworkList from '../components/NetworkList.svelte';

  export let state;
  export let api;

  let selectedNetwork;
  let cardWidth;
  let cardHeight = writable(0);

  $: networks = state.wifiNetworks || [];

  function connectNetwork(apssid, password) {
    api('wifi').call('setup', { apssid, password });
    selectedNetwork = undefined;
  }

  // Dont tween on render
  setTimeout(() => {
    cardHeight = tweened($cardHeight, { easing: quadOut, duration: 200 });
  }, 300);
</script>

<div class="wrapper">
  <Logo />
  <p>Connect to a Wifi network below</p>
  <div class="card-wrapper">
    <div bind:offsetWidth={cardWidth} class="card" style="height: {$cardHeight}px;">
      {#if selectedNetwork == null}
        <div
          use:resize
          class="card-content"
          transition:fly|local={{ x: -cardWidth }}
          on:elResize={e => {
            $cardHeight = e.detail;
          }}
        >
          <NetworkList {networks} on:selectNetwork={e => (selectedNetwork = e.detail)} />
        </div>
      {:else}
        <div
          use:resize
          class="card-content"
          transition:fly|local={{ x: cardWidth }}
          on:elResize={e => {
            $cardHeight = e.detail;
          }}
        >
          <NetworkConnect
            network={selectedNetwork}
            on:cancel={() => (selectedNetwork = undefined)}
            on:connect={e => connectNetwork(selectedNetwork, e.detail)}
          />
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .card-wrapper {
    flex-grow: 1;
  }

  .card {
    position: relative;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 0.5rem;
    overflow: hidden;
    width: calc(var(--search-input-width) + 2rem);
  }

  .card-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    /* max-height: 100%; */
  }
</style>
