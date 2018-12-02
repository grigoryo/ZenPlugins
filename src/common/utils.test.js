import * as utils from './utils'

let originalImplementation = {}

describe('generateRandomPin4()', () => {
  beforeAll(() => {
    originalImplementation.mathRandom = Math.random
  })

  afterAll(() => {
    Math.random = originalImplementation.mathRandom
  })

  it('should return "1608" if Math.random returned sequence of (0.13...), (0.75...), (0.04...), (0.98...)', async () => {
    Math.random = jest.fn()
      .mockReturnValueOnce(0.13557716147953824)
      .mockReturnValueOnce(0.7534762164900517)
      .mockReturnValueOnce(0.044318951051221855)
      .mockReturnValueOnce(0.9816199778913879)
      .mockReturnValue(Math.random()) // it fails to work without this line (probably Math.random is used by jest itself?)
    let result = utils.generateRandomPin4()
    expect(result).toEqual('1608')
  })

  it('should return "9999" if Math.random returned maximal value (1.0) four times in a row', async () => {
    Math.random = jest.fn(() => 1.0)
    let result = utils.generateRandomPin4()
    expect(result).toEqual('9999')
  })

  it('should return "0000" if Math.random returned minimal value (0.0) four times in a row', async () => {
    Math.random = jest.fn(() => 0.0)
    let result = utils.generateRandomPin4()
    expect(result).toEqual('0000')
  })
})
