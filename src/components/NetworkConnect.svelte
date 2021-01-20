<script>
  import { createEventDispatcher } from 'svelte';
  import { Button } from 'dmt-frontend-components';

  const dispatch = createEventDispatcher();

  export let network;

  let password = '';
</script>

<form on:submit|preventDefault={() => dispatch('connect', password)}>
  <p>Enter password to connect to <strong>{network}</strong></p>
  <!-- svelte-ignore a11y-autofocus -->
  <input type="password" bind:value={password} autofocus placeholder="Enter Wifi password" />
  <div class="buttons">
    <Button type="button" variant="normal" on:click={() => dispatch('cancel')}>Cancel</Button>
    <Button type="submit" variant="primary">Connect</Button>
  </div>
</form>

<style>
  form {
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
