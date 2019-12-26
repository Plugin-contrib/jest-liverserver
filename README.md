# jest-liveserver

A pluggable jest environment which run [`live-server`](https://github.com/tapio/live-server) in background which can be used in your tests for better e2e tests

> ## WIP and can be buggy

## Install

`yarn add jest-liveserver -D`

## Usage

In your `jest.config.js`, add/replace the following

```js
{
  testEnvironment: 'jest-liveserver',
  testEnvironmentOptions: {
    liveServer: {port,...},
    liveServerJestPlugins: [plugin]
  }
}
```

## Options

There are two kind of options this package accepts,

**1. liveServer**

This is the `live-server` package's options
ref [this options](https://github.com/tapio/live-server#usage-from-node)

**2. liveServerJestPlugins**

It accepts a array of plugins. [ref](#plugins)

## Plugins

### Why ?

This package supports plugins which can be added to the core of the environment.
The core plugin just takes the options for the live-server and simply run a server with them. But sometimes you may need to do some extra works like moving or copy-pasting your site or files to your test folder so for these kind of works use plugins.

### Write a Plugin

Plugins are simply objects which returns two methods,

**preRun**
This will run before running the `live-server` server, so work like moving files/folder can be done in this.
this plugin should return a `live-server` options which will update the default options or the options passed through `jest.config.js` under `testEnvironmentOptions.liveServer`

eg

```js
{
  preRun: (dirname, cwdPath, _liveServerConfig) => new_live_server_config
}
```

**tearDown**
This is the method which will run before stopping the `live-server` server, this can be use-full when doing operation like cleaning the dir or deleting temporary files etc.

> It should not return any thing

eg

```js
{
  tearDown: (dirname, cwdPath, _liveServerConfig) => {}
}
```

## Tips

If you are facing issues like environment teardown quickly and closing the server, try to increase the jest timeout time

`jest.setTimeout()`

## Maintained by

<img alt="pluggingIn logo" src="https://imgur.com/kjyrz79.png" width="250px" />

## Author

[Aniketh Saha](https://twitter.com/__ANIX__)

## License

[MIT](./LICENSE)
