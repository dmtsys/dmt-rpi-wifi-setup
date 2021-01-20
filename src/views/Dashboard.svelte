<script>
  import { tweened } from 'svelte/motion';
  import { quadOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import { resize } from '../actions/resize';
  import Logo from '../components/Logo.svelte';
  import NetworkConnect from '../components/NetworkConnect.svelte';
  import NetworkList from '../components/NetworkList.svelte';
  import { tick } from 'svelte';

  export let state;
  export let api;

  let safeToShow = false;
  let selectedNetwork;
  // let card;
  let cardWidth;
  let cardHeight;
  let cardHeightValue;
  let cardFlexHeight = tweened(0, { easing: quadOut, duration: 200 });

  $: networks = state.wifiNetworks || [];

  setTimeout(() => (safeToShow = true), 200);

  function connectNetwork(apssid, password) {
    api('wifi').call('setup', { apssid, password });
    selectedNetwork = undefined;
  }

  async function setCardFlexHeight(v) {
    cardHeightValue = '';

    $cardFlexHeight = v;

    // wait animate
    await tick();

    cardHeightValue = cardHeight + 'px';
  }
</script>

<div class="wrapper">
  <Logo />
  <p>Connect to a Wifi network below</p>
  <div
    bind:offsetWidth={cardWidth}
    class="card"
    style="flex-basis: {$cardFlexHeight}px; visibility: {safeToShow ? 'visible' : 'hidden'};"
  >
    {#if selectedNetwork == null}
      <div
        use:resize
        class="card-content"
        transition:fly|local={{ x: -cardWidth }}
        on:elResize={e => setCardFlexHeight(e.detail.target.scrollHeight)}
      >
        <NetworkList {networks} on:selectNetwork={e => (selectedNetwork = e.detail)} />
      </div>
    {:else}
      <div
        use:resize
        class="card-content"
        transition:fly|local={{ x: cardWidth }}
        on:elResize={e => setCardFlexHeight(e.detail.target.scrollHeight)}
      >
        <NetworkConnect network={selectedNetwork} on:cancel={() => (selectedNetwork = undefined)} on:connect={e => connectNetwork(selectedNetwork, e.detail)} />
      </div>
    {/if}
  </div>
</div>

<style>
  .wrapper {
    padding: 1rem;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .card {
    position: relative;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 0.5rem;
    overflow: hidden;
    width: 100%;
    max-width: calc(var(--search-input-width) + 2rem);
  }

  .card-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
</style>
