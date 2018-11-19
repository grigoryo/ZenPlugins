// import * as network from '../../common/network'
// jest.mock('network')

import * as api from './api'

describe('_pickKV()', () => {
  it('TODO: write tests', async () => {
    throw new Error('!')
  })
})

describe('_fetchWrapper()', () => {
  it('TODO: write tests', async () => {
    throw new Error('!')
  })
})

describe('API calls', () => {
  let actual = {}

  beforeAll(() => {
    actual._fetchWrapper = api.api._fetchWrapper
  })

  afterAll(() => {
    api.api._fetchWrapper = actual._fetchWrapper
  })

  describe('version()', () => {
    it('should return on correct API response', async () => {
      const response = {
        status: 200,
        body: { response: { result: 0, object: { revision: 7 } } }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let result = await api.version()

      expect(result).toEqual({ status: 200, result: 0, revision: 7 })
    })

    it('should call _fetchWrapper() with correctly formed options', async () => {
      throw new Error('TODO: write test')
    })

    it('should throw on non-200 status code', async () => {
      const response = {
        status: 500,
        body: { response: { result: 0, object: { revision: 7 } } }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let promise = api.version()

      await expect(promise).rejects.toThrow()
    })

    it('should throw if response.result from API response body is non-zero', async () => {
      const response = {
        status: 200,
        body: { response: { result: -1, object: { revision: 7 } } }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let promise = api.version()

      await expect(promise).rejects.toThrow()
    })

    it('should throw if API response states API version revision other than 7', async () => {
      const response = {
        status: 200,
        body: { response: { result: 0, object: { revision: 8 } } }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let promise = api.version()

      await expect(promise).rejects.toThrow()
    })

    it('should rethrow errors from _fetchWrapper', async () => {
      api.api._fetchWrapper = jest.fn(() => new Error())

      let promise = api.version()

      await expect(promise).rejects.toThrow()
    })
  })

  describe('register()', () => {
    it('should return on correct API response', async () => {
      const options = {
        login: 'username',
        password: 'password'
      }

      const response = {
        status: 200,
        body: {
          response: {
            result: 1,
            object: {
              sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3'
            }
          }
        }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let result = await api.register(options)

      expect(result).toEqual({
        status: 200,
        result: 1,
        sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3'
      })
    })

    it('should call _fetchWrapper() with correctly formed options', async () => {
      throw new Error('TODO: write test')
    })

    it('should throw on non-200 status code', async () => {
      const options = {
        login: 'username',
        password: 'password'
      }

      const response = {
        status: 500,
        body: {
          response: {
            result: 1,
            object: {
              sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3'
            }
          }
        }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let promise = api.register(options)

      await expect(promise).rejects.toThrow()
    })

    it('should throw if response.result from API response body is not 1', async () => {
      const options = {
        login: 'username',
        password: 'password'
      }

      const response = {
        status: 200,
        body: {
          response: {
            result: -1,
            object: {
              sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3'
            }
          }
        }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let promise = api.register(options)

      await expect(promise).rejects.toThrow()
    })

    it('should throw if response.object.sessionId property missing in API response body', async () => {
      const options = {
        login: 'username',
        password: 'password'
      }

      const response = {
        status: 200,
        body: {
          response: {
            result: 1,
            object: { }
          }
        }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let promise = api.register(options)

      await expect(promise).rejects.toThrow()
    })

    it('should rethrow errors from _fetchWrapper', async () => {
      const options = {
        login: 'username',
        password: 'password'
      }

      api.api._fetchWrapper = jest.fn(() => new Error())

      let promise = api.register(options)

      await expect(promise).rejects.toThrow()
    })
  })

  describe('verify()', () => {
    it('TODO: write tests', async () => {
      throw new Error('!')
    })
  })

  describe('setPin()', () => {
    it('TODO: write tests', async () => {
      throw new Error('!')
    })
  })

  describe('loginByPin()', () => {
    it('TODO: write tests', async () => {
      throw new Error('!')
    })
  })

  describe('accounts()', () => {
    it('TODO: write tests', async () => {
      throw new Error('!')
    })
  })

  describe('operations()', () => {
    it('TODO: write tests', async () => {
      throw new Error('!')
    })
  })
})

describe('low level functions', () => {
})
