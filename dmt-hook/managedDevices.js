import dmt from 'dmt/bridge';

export default function managedDevices() {
  return dmt.devices().map(({ _coredata }) => _coredata);
}
