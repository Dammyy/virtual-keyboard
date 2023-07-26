import { Lightning, Utils } from '@lightningjs/sdk'
import { Button } from './Button'
import { toMatrix, toIndex } from './utils'

interface AppTemplateSpec extends Lightning.Component.TemplateSpec {
  Label: object
  Keyboard: object
}

type IndexType = { i: number; j: number }
type MatrixType = number[][] | string[][]
type TagType = (objectName: string) => any

interface InitSpec {
  currentIndexMatrix: IndexType
  input: string
  matrix: MatrixType
  tag: TagType
}

export class App
  extends Lightning.Component<AppTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<AppTemplateSpec>
{
  currentIndexMatrix: IndexType = { i: 0, j: 0 }
  input = ''
  matrix: MatrixType = [[]]
  static override _template(): Lightning.Component.Template<AppTemplateSpec> {
    return {
      w: 960,
      h: 540,
      Label: {
        mount: 0.5,
        x: 480,
        h: 50,
        y: 200,
        color: 0xff000000,
        text: { text: '', fontSize: 24 },
      },
      Keyboard: {
        w: 500,
        h: 300,
        x: 480,
        y: 380,
        mount: 0.5,
        rect: true,
      },
    }
  }

  static getFonts() {
    return [
      {
        family: 'Regular',
        url: Utils.asset('fonts/Roboto-Regular.ttf') as string,
      },
    ]
  }

  override _init() {
    // this.currentIndexMatrix = { i: 0, j: 0 }
    this.input = ''
    this.matrix = [[]]
    const arr = []

    const buttons = []
    for (let i = 0; i <= 9; i++) {
      arr[i] = i
      buttons.push({
        type: Button,
        x: i * 50,
        y: 0 * 50,
        w: 50,
        label: i,
      })
    }

    this.matrix[0] = arr

    let start = 97 // ASCII code
    const end = 122
    const spaceKey = String.fromCharCode(32)
    // static vs dynamic variable

    let i = 1
    while (i <= 3) {
      const list = []
      for (let j = 0; j <= 9 && start <= end; j++) {
        list.push(String.fromCharCode(start))
        const label = String.fromCharCode(start)
        buttons.push({
          type: Button,
          x: j * 50,
          y: i * 50,
          w: 50,
          label,
        })
        start++
        if (start > end) {
          list.push(spaceKey)
          buttons.push({
            type: Button,
            x: (j + 1) * 50,
            y: i * 50,
            w: 100,
            label: 'space',
          })
        }
      }

      this.matrix[i] = list
      i++
    }
    // reference to object
    this.tag('Keyboard' as any).children = buttons
  }

  override _handleUp() {
    if (this.currentIndexMatrix.i <= 0) return
    this.currentIndexMatrix.i -= 1
  }

  override _handleLeft() {
    if (this.currentIndexMatrix.j <= 0) return
    this.currentIndexMatrix.j -= 1
  }

  override _handleRight() {
    if (
      this.currentIndexMatrix.j >= 9 ||
      toIndex(this.currentIndexMatrix) === this.tag('Keyboard' as any).children.length - 1
    )
      return
    this.currentIndexMatrix.j += 1
  }

  override _handleDown() {
    if (this.currentIndexMatrix.i >= 3) {
      return
    } else if (
      (this.currentIndexMatrix.i === 2 &&
        this.currentIndexMatrix.j >= 0 &&
        this.currentIndexMatrix.j <= 5) ||
      (this.currentIndexMatrix.i < 2 && this.currentIndexMatrix.i >= 0)
    ) {
      this.currentIndexMatrix.i += 1
    } else {
      this.currentIndexMatrix.i = 3
      this.currentIndexMatrix.j = toMatrix(this.tag('Keyboard' as any).children.length - 1).j
    }
  }

  override _handleEnter() {
    // @ts-expect-error to do - fix error
    this.input += this.matrix[this.currentIndexMatrix.i][this.currentIndexMatrix.j]
    this.tag('Label' as any).text.text = this.input
  }

  override _handleBack() {
    if (this.input.length > 0) {
      this.input = this.input.substring(0, this.input.length - 1)
    }
    this.tag('Label' as any).text.text = this.input
  }

  override _getFocused() {
    return this.tag('Keyboard' as any).children[toIndex(this.currentIndexMatrix)]
  }
}
