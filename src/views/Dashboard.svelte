<script>
  import { tweened } from 'svelte/motion';
  import { quadIn } from 'svelte/easing';
  import Logo from '../components/Logo.svelte';
  import NetworkConnect from '../components/NetworkConnect.svelte';
  import NetworkList from '../components/NetworkList.svelte';

  export let state;
  export let api;

  let selectedNetwork;
  let card;
  let cardHeight = tweened(0, { easing: quadIn });

  $: networks = state.wifiNetworks || [];

  $: networks, selectedNetwork, calcCardHeight();

  $: cardHeightValue = card == null ? 'auto' : `${cardHeight}px`;

  function calcCardHeight() {
    if (card) {
      cardHeight = card.scrollHeight;
    }
  }

  function connectNetwork(apssid, password) {
    api('wifi').call('setup', { apssid, password });
  }
</script>

<div class="wrapper">
  <Logo />
  <p>Connect to a Wifi network below</p>
  <div class="card-wrapper">
    <div bind:this={card} class="card">
      {#if selectedNetwork == null}
        <NetworkList {networks} on:selectNetwork={e => (selectedNetwork = e.detail)} />
      {:else}
        <NetworkConnect network={selectedNetwork} on:cancel={() => (selectedNetwork = undefined)} on:connect={e => connectNetwork(selectedNetwork, e.detail)} />
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
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 0.5rem;
    overflow: hidden;
    width: calc(var(--search-input-width) + 2rem);
  }
</style>
