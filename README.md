## Get started

Install the dependencies...

```bash
cd dmt-connect
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running.

## dmt-proc

You have to have `dmt-proc` running on localhost as well. This frontend will connect to it and display store state (part of the api for dmt-connect).

## dmt-connect state

```
managedDevices
staticConnections
```

### managedDevices

[todo]

### staticConnections

[todo]

## Technical

`App.svelte` simply gets two Svelte stores:

```html

<script>
  export let connected;
  export let state;
</script>
```

`$connected` readable store (true/false) tells if the gui is currently connected to backend.

`$state` is the state for `dmt-connect` app.

## Goals

[todo]
