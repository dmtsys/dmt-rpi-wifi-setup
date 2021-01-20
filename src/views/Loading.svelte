<script>
  import { onMount } from 'svelte';
  import Logo from '../components/Logo.svelte';

  // Fancy dot loading screen
  let dots = 1;

  onMount(() => {
    const handler = setInterval(() => {
      if (dots >= 3) dots = 0;
      dots = dots + 1;
    }, 500);

    return () => clearInterval(handler);
  });
</script>

<div class="wrapper">
  <Logo />
  <p>Connecting to host{'.'.repeat(dots)}</p>
</div>

<style>
  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
