import { Lightning } from '@lightningjs/sdk'

interface ButtonTemplateSpec extends Lightning.Component.TemplateSpec {
  Label: object
}

export class Button
  extends Lightning.Component<ButtonTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<ButtonTemplateSpec>
{
  static override _template() {
    return {
      h: 50,
      w: 50,
      rect: true,
      Label: {
        x: 18,
        y: (h: number) => h / 2,
        mountY: 0.5,
        color: 0xff000000,
        text: { fontSize: 24 },
      },
    }
  }

  set label(value: string) {
    this.tag('Label' as any).text = value.toString()
  }

  override _focus() {
    this.patch({
      smooth: { color: 0xff000000 },
      Label: {
        smooth: { color: 0xffffffff },
      },
    })
  }

  override _unfocus() {
    this.patch({
      smooth: { color: 0xffffffff },
      Label: {
        smooth: { color: 0xff000000 },
      },
    })
  }
}
