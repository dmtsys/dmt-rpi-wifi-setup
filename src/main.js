import App from './App.svelte';

import { makeConnectedStore } from 'connectome/stores';

const address = window.location.hostname;
const port = 7780;

const protocol = 'dmtapp';
const lane = 'wifi-setup';

const { connected, state, api } = new makeConnectedStore({ address, port, protocol, lane });

const app = new App({
  target: document.body,
  props: {
    connected,
    state,
    api
  }
});

export default app;
