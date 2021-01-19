<script>
  export let connected;
  export let state;
  export let api;

  function setWifiPassword(apssid, password) {
    api('wifi').call('setup', { apssid, password });
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  .state {
    margin-top: 10px;
    color: white;
  }

  .status {
    font-size: 1em;
    color: var(--dmt-violet);
  }

  .status.ready {
    color: var(--dmt-green);
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <span class="status" class:ready={$connected}>Connected {$connected ? '✓' : '✖'}</span>

  <div class="state">{JSON.stringify($state)}</div>

  <button title="Set password" on:click={() => setWifiPassword('Metaverse', Math.random())}>
    SET PASSWORD
  </button>
</main>
