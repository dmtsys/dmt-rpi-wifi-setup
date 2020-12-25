import dmt from 'dmt/bridge';
import { MirroringStore } from 'dmt/connectome-stores';

import managedDevices from './managedDevices';

function init({ program }) {
  const state = { managedDevices: managedDevices() };

  const store = new MirroringStore(state);

  const channelList = program.registerProtocol({ protocol: 'dmtapp', lane: 'connect' });

  store.mirror(channelList);
}

export { init };
