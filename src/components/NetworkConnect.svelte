<script>
  import { createEventDispatcher } from 'svelte';
  import { Button } from 'dmt-frontend-components';

  const dispatch = createEventDispatcher();

  export let network;

  let password = '';
</script>

<div class="wrapper">
  <p>Enter password to connect to <strong>{network}</strong></p>
  <!-- svelte-ignore a11y-autofocus -->
  <input type="password" bind:value={password} autofocus placeholder="Enter Wifi password" />
  <div class="buttons">
    <Button on:click={() => dispatch('cancel')}>Cancel</Button>
    <Button on:click={() => dispatch('connect', password)}>Connect</Button>
  </div>
</div>

<style>
  .wrapper {
    padding: 1rem;
  }

  p {
    margin: 0;
    text-align: center;
  }

  input {
    width: 100%;
    margin: 0.8rem 0;
  }

  .buttons {
    text-align: right;
  }
</style>
