const NodeEnvironment = require('jest-environment-node')
const liveServer = require('live-server')

class liveServerEnv extends NodeEnvironment {
  constructor(config, context) {
    super(config, context)
    this.liveServerConfig = config.testEnvironmentOptions.liveServer || {}
    this.liveServerJestPlugins =
      config.testEnvironmentOptions.liveServerJestPlugins || []
  }

  async setup() {
    this.liveServerJestPlugins.forEach(plugin => {
      console.log('plugin', plugin)
      const { liveServerConfig } =
        (plugin.preRun &&
          plugin.preRun({
            __dirname,
            cwdPath: process.cwd(),
            liveServerConfig: this.liveServerConfig
          })) ||
        {}
      Object.assign(this.liveServerConfig, liveServerConfig)
    })

    console.log(
      `[jest liveserver ] Starting the server @${this.liveServerConfig.port}`
    )
    await liveServer.start(this.liveServerConfig)
    this.global.__LIVESERVER__ = liveServer
    this.global.liveSeverConfig = this.liveServerConfig
  }

  async teardown() {
    this.liveServerJestPlugins.forEach(
      plugin =>
        plugin.tearDown &&
        plugin.tearDown({
          __dirname,
          cwdPath: process.cwd(),
          liveServerConfig: this.liveServerConfig
        })
    )
    console.log('[jest liveserver ] Shutting down the server')
    await this.global.__LIVESERVER__.shutdown()
    await super.teardown()
  }

  runScript(script) {
    return super.runScript(script)
  }
}

module.exports = liveServerEnv
