import { Lightning, Launch, PlatformSettings, AppData } from '@lightningjs/sdk'
import { App } from './App.js'

const options = {
  stage: { w: 960, h: 540, clearColor: 0x00000000 },
  enablePointer: false,
  debug: false,
  keys: {
    38: 'Up',
    40: 'Down',
    37: 'Left',
    39: 'Right',
    13: 'Enter',
  },
}

export default function (
  appSettings: Lightning.Application.Options,
  platformSettings: PlatformSettings,
  appData: AppData,
) {
  return Launch(App, options, platformSettings, appData)
}
