import App from '..'
import settings from '../../settings.json'

const app = App(
  {
    // @ts-expect-error to do - fix error
    stage: {
      ...settings['appSettings'].stage,
      useImageWorker: false,
    },
    debug: false,
  },
  {
    ...settings['platformSettings'],
    log: false,
    fontLoader: jest.fn(),
  },
  {},
)

describe('App', () => {
  it('should render', () => {
    expect(app).toMatchSnapshot()
  })

  it('should display empty text in the Label', () => {
    const App = app._getFocused()
    // @ts-expect-error to do - fix error
    const label = App.tag('Label').text.text
    expect(label).toEqual('')
  })

  it('should display Keyboard Children', () => {
    const App = app._getFocused()
    // @ts-expect-error to do - fix error
    const keyboard = App.tag('Keyboard').children.length
    expect(keyboard).toBeGreaterThan(0)
  })
})
