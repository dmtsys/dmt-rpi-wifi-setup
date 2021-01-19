import dmt from 'dmt/bridge';
import { MirroringStore } from 'dmt/connectome-stores';

import wifiNetworks from './wifiNetworks';
import makeApi from './api';

function init({ program }) {
  const state = { wifiNetworks: wifiNetworks() };

  const store = new MirroringStore(state);

  const api = makeApi(store);

  function onConnect({ channel }) {
    channel.attachObject('wifi', api);
  }

  const channelList = program.registerProtocol({ protocol: 'dmtapp', lane: 'wifi-setup', onConnect });

  store.mirror(channelList);
}

export { init };
