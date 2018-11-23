// TODO: import * as network from '../../common/network'
import * as converters from './converters'

import * as api from './api'

let originalImplementation = {}
// TODO: jest.mock('network')
jest.mock('./converters')

describe('helper functions', () => {
  describe('_pickKV()', () => {
    it('should return single requested KV pair from FIXED_KV const', () => {
      let input = ['applicationId']
      let output = {
        'applicationId': 'ru.ftc.faktura.expressbank'
      }
      let result = api.api._pickKV(input)
      expect(result).toEqual(output)
    })

    it('should return multiple requested KV pairs from FIXED_KV const', () => {
      let input = ['applicationId', 'applicationCode']
      let output = {
        'applicationId': 'ru.ftc.faktura.expressbank',
        'applicationCode': 'express-bank'
      }
      let result = api.api._pickKV(input)
      expect(result).toEqual(output)
    })

    it('should not return KV pairs for keys not found in FIXED_KV const', () => {
      let result = api.api._pickKV(['invalidKey'])
      expect(result).toEqual({})
    })
  })

  describe('_fetchWrapper()', () => {
    it('TODO: write tests', async () => {
      throw new Error('!')
    })
  })
})

describe('API calls', () => {
  beforeAll(() => {
    originalImplementation._fetchWrapper = api.api._fetchWrapper
  })

  afterAll(() => {
    api.api._fetchWrapper = originalImplementation._fetchWrapper
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
            object: {}
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
    it('should return on correct API response', async () => {
      const options = {
        sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3',
        login: 'username',
        password: 'password',
        verificationCode: '123456'
      }

      const response = {
        status: 200,
        body: {
          response: {
            result: 0,
            object: {
              session: { instanceId: '42204229D69F53C653EB7ECCF67A7446' }
            }
          }
        }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let result = await api.verify(options)

      expect(result).toEqual({
        status: 200,
        result: 0,
        instanceId: '42204229D69F53C653EB7ECCF67A7446'
      })
    })

    it('should call _fetchWrapper() with correctly formed options', async () => {
      throw new Error('TODO: write test')
    })

    it('should throw on non-200 status code', async () => {
      const options = {
        sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3',
        login: 'username',
        password: 'password',
        verificationCode: '123456'
      }

      const response = {
        status: 500,
        body: {
          response: {
            result: 0,
            object: {
              session: { instanceId: '42204229D69F53C653EB7ECCF67A7446' }
            }
          }
        }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let promise = api.verify(options)

      await expect(promise).rejects.toThrow()
    })

    it('should throw if response.result from API response body is non-zero', async () => {
      const options = {
        sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3',
        login: 'username',
        password: 'password',
        verificationCode: '123456'
      }

      const response = {
        status: 200,
        body: {
          response: {
            result: -1,
            object: {
              session: { instanceId: '42204229D69F53C653EB7ECCF67A7446' }
            }
          }
        }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let promise = api.verify(options)

      await expect(promise).rejects.toThrow()
    })

    it('should throw if response.object.session.instanceId property missing in API response body', async () => {
      const options = {
        sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3',
        login: 'username',
        password: 'password',
        verificationCode: '123456'
      }

      const response = {
        status: 200,
        body: {
          response: {
            result: 0,
            object: {
              session: {}
            }
          }
        }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let promise = api.verify(options)

      await expect(promise).rejects.toThrow()
    })

    it('should rethrow errors from _fetchWrapper', async () => {
      const options = {
        sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3',
        login: 'username',
        password: 'password',
        verificationCode: '123456'
      }

      api.api._fetchWrapper = jest.fn(() => new Error())

      let promise = api.verify(options)

      await expect(promise).rejects.toThrow()
    })
  })

  describe('setPin()', () => {
    it('should return on correct API response', async () => {
      const options = {
        sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3',
        pin: '1234'
      }

      const response = {
        status: 200,
        body: { response: { result: 0 } }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let result = await api.setPin(options)

      expect(result).toEqual({ status: 200, result: 0 })
    })

    it('should call _fetchWrapper() with correctly formed options', async () => {
      throw new Error('TODO: write test')
    })

    it('should throw on non-200 status code', async () => {
      const options = {
        sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3',
        pin: '1234'
      }

      const response = {
        status: 500,
        body: { response: { result: 0 } }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let promise = api.setPin(options)

      await expect(promise).rejects.toThrow()
    })

    it('should throw if response.result from API response body is non-zero', async () => {
      const options = {
        sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3',
        pin: '1234'
      }

      const response = {
        status: 200,
        body: { response: { result: -1 } }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let promise = api.setPin(options)

      await expect(promise).rejects.toThrow()
    })

    it('should rethrow errors from _fetchWrapper', async () => {
      const options = {
        sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3',
        pin: '1234'
      }

      api.api._fetchWrapper = jest.fn(() => new Error())

      let promise = api.setPin(options)

      await expect(promise).rejects.toThrow()
    })
  })

  describe('loginByPin()', () => {
    it('should return on correct API response', async () => {
      const options = {
        instanceId: '42204229D69F53C653EB7ECCF67A7446',
        login: 'username',
        pin: '1234'
      }

      const response = {
        status: 200,
        body: {
          response: {
            result: 0,
            object: {
              session: {
                sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3'
              }
            }
          }
        }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let result = await api.loginByPin(options)

      expect(result).toEqual({
        status: 200,
        result: 0,
        sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3'
      })
    })

    it('should call _fetchWrapper() with correctly formed options', async () => {
      throw new Error('TODO: write test')
    })

    it('should throw on non-200 status code', async () => {
      const options = {
        instanceId: '42204229D69F53C653EB7ECCF67A7446',
        login: 'username',
        pin: '1234'
      }

      const response = {
        status: 500,
        body: {
          response: {
            result: 0,
            object: {
              session: {
                sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3'
              }
            }
          }
        }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let promise = api.loginByPin(options)

      await expect(promise).rejects.toThrow()
    })

    it('should throw if response.result from API response body is non-zero', async () => {
      const options = {
        instanceId: '42204229D69F53C653EB7ECCF67A7446',
        login: 'username',
        pin: '1234'
      }

      const response = {
        status: 200,
        body: {
          response: {
            result: -1,
            object: {
              session: {
                sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3'
              }
            }
          }
        }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let promise = api.loginByPin(options)

      await expect(promise).rejects.toThrow()
    })

    it('should throw if response.object.session.sessionId property missing in API response body', async () => {
      const options = {
        instanceId: '42204229D69F53C653EB7ECCF67A7446',
        login: 'username',
        pin: '1234'
      }

      const response = {
        status: 200,
        body: {
          response: {
            result: 0,
            object: {
              session: {}
            }
          }
        }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let promise = api.loginByPin(options)

      await expect(promise).rejects.toThrow()
    })

    it('should rethrow errors from _fetchWrapper', async () => {
      const options = {
        instanceId: '42204229D69F53C653EB7ECCF67A7446',
        login: 'username',
        pin: '1234'
      }

      api.api._fetchWrapper = jest.fn(() => new Error())

      let promise = api.loginByPin(options)

      await expect(promise).rejects.toThrow()
    })
  })

  describe('accounts()', () => {
    beforeAll(() => {
      converters.convertAccounts.mockImplementation(accounts => {
        return accounts.map(account => ({
          rp1: 'r' + account.p1,
          rp2: 'r' + account.p2
        }))
      })
    })

    afterAll(() => {
      converters.convertAccounts.mockReset()
    })

    it('should return results with converted accounts on correct API response', async () => {
      const options = {
        sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3'
      }

      const response = {
        status: 200,
        body: {
          response: {
            result: 0,
            object: {
              accounts: {
                accounts: [
                  { p1: 'v11', p2: 'v12' },
                  { p1: 'v21', p2: 'v22' }
                ]
              }
            }
          }
        }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let result = await api.accounts(options)

      expect(converters.convertAccounts).toBeCalled()
      expect(result).toEqual({
        status: 200,
        result: 0,
        accounts: [
          { rp1: 'rv11', rp2: 'rv12' },
          { rp1: 'rv21', rp2: 'rv22' }
        ]
      })
    })

    it('should call _fetchWrapper() with correctly formed options', async () => {
      throw new Error('TODO: write test')
    })

    it('should throw on non-200 status code', async () => {
      const options = {
        sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3'
      }

      const response = {
        status: 500,
        body: {
          response: {
            result: 0,
            object: {
              accounts: {
                accounts: [
                  { p1: 'v11', p2: 'v12' },
                  { p1: 'v21', p2: 'v22' }
                ]
              }
            }
          }
        }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let promise = api.accounts(options)

      await expect(promise).rejects.toThrow()
    })

    it('should throw if response.result from API response body is non-zero', async () => {
      const options = {
        sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3'
      }

      const response = {
        status: 200,
        body: {
          response: {
            result: -1,
            object: {
              accounts: {
                accounts: [
                  { p1: 'v11', p2: 'v12' },
                  { p1: 'v21', p2: 'v22' }
                ]
              }
            }
          }
        }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let promise = api.accounts(options)

      await expect(promise).rejects.toThrow()
    })

    it('should throw if response.object.accounts.accounts property missing in API response body', async () => {
      const options = {
        sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3'
      }

      const response = {
        status: 200,
        body: {
          response: {
            result: 0,
            object: {}
          }
        }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let promise = api.accounts(options)

      await expect(promise).rejects.toThrow()
    })

    describe('should throw if response.object.accounts.accounts from API response body is not an array', () => {
      it('but an empty object', async () => {
        const options = {
          sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3'
        }

        const response = {
          status: 200,
          body: {
            response: {
              result: 0,
              object: {
                accounts: {
                  accounts: {}
                }
              }
            }
          }
        }
        api.api._fetchWrapper = jest.fn(() => response)

        let promise = api.accounts(options)

        await expect(promise).rejects.toThrow()
      })

      it('but a non-empty object', async () => {
        const options = {
          sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3'
        }

        const response = {
          status: 200,
          body: {
            response: {
              result: 0,
              object: {
                accounts: {
                  accounts: { x: 123 }
                }
              }
            }
          }
        }
        api.api._fetchWrapper = jest.fn(() => response)

        let promise = api.accounts(options)

        await expect(promise).rejects.toThrow()
      })

      it('but a string', async () => {
        const options = {
          sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3'
        }

        const response = {
          status: 200,
          body: {
            response: {
              result: 0,
              object: {
                accounts: {
                  accounts: 'abcdef'
                }
              }
            }
          }
        }
        api.api._fetchWrapper = jest.fn(() => response)

        let promise = api.accounts(options)

        await expect(promise).rejects.toThrow()
      })

      it('but a number', async () => {
        const options = {
          sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3'
        }

        const response = {
          status: 200,
          body: {
            response: {
              result: 0,
              object: {
                accounts: {
                  accounts: 123
                }
              }
            }
          }
        }
        api.api._fetchWrapper = jest.fn(() => response)

        let promise = api.accounts(options)

        await expect(promise).rejects.toThrow()
      })
    })

    it('should rethrow errors from _fetchWrapper', async () => {
      const options = {
        sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3'
      }

      api.api._fetchWrapper = jest.fn(() => new Error())

      let promise = api.accounts(options)

      await expect(promise).rejects.toThrow()
    })
  })

  describe('operations()', () => {
    beforeAll(() => {
      converters.convertOperations.mockImplementation(operations => {
        return operations.map(operation => ({
          id: operation.id,
          rp1: 'r' + operation.p1,
          rp2: 'r' + operation.p2
        }))
      })
      originalImplementation.OPERATIONS_COUNT_FOR_PAGE =
        api.api.OPERATIONS_COUNT_FOR_PAGE
    })

    afterAll(() => {
      converters.convertOperations.mockReset()
      api.api.OPERATIONS_COUNT_FOR_PAGE =
        originalImplementation.OPERATIONS_COUNT_FOR_PAGE
    })

    describe('should return results with converted operations on correct API response', () => {
      it('and with undefined lastOperationId when got non-maximal number of operations', async () => {
        const options = {
          sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3',
          lastOperationId: undefined
        }

        const response = {
          status: 200,
          body: {
            response: {
              result: 0,
              object: {
                operations: [
                  { id: 11, p1: 'v11', p2: 'v12' },
                  { id: 12, p1: 'v21', p2: 'v22' }
                ]
              }
            }
          }
        }
        api.api._fetchWrapper = jest.fn(() => response)

        let result = await api.operations(options)

        expect(converters.convertOperations).toBeCalled()
        expect(result).toEqual({
          status: 200,
          result: 0,
          operations: [
            { id: 11, rp1: 'rv11', rp2: 'rv12' },
            { id: 12, rp1: 'rv21', rp2: 'rv22' }
          ],
          lastOperationId: undefined
        })
      })

      it('and with defined lastOperationId when got maximal number of operations', async () => {
        const options = {
          sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3',
          lastOperationId: undefined
        }

        const response = {
          status: 200,
          body: {
            response: {
              result: 0,
              object: {
                operations: [
                  { id: 11, p1: 'v11', p2: 'v12' },
                  { id: 12, p1: 'v21', p2: 'v22' }
                ]
              }
            }
          }
        }
        api.api.OPERATIONS_COUNT_FOR_PAGE = 2
        api.api._fetchWrapper = jest.fn(() => response)

        let result = await api.operations(options)

        expect(converters.convertOperations).toBeCalled()
        expect(result).toEqual({
          status: 200,
          result: 0,
          operations: [
            { id: 11, rp1: 'rv11', rp2: 'rv12' },
            { id: 12, rp1: 'rv21', rp2: 'rv22' }
          ],
          lastOperationId: 12
        })
      })
    })

    it('should call _fetchWrapper() with correctly formed options', async () => {
      // TODO:
      // it('should return results with converted operations on correct API response when no lastOperationId specified', async () => {})
      // it('should return results with converted operations on correct API response when lastOperationId specified', async () => {})
      throw new Error('TODO: write test')
    })

    it('should throw on non-200 status code', async () => {
      const options = {
        sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3',
        lastOperationId: undefined
      }

      const response = {
        status: 500,
        body: {
          response: {
            result: 0,
            object: {
              operations: [
                { p1: 'v11', p2: 'v12' },
                { p1: 'v21', p2: 'v22' }
              ]
            }
          }
        }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let promise = api.operations(options)

      await expect(promise).rejects.toThrow()
    })

    it('should throw if response.result from API response body is non-zero', async () => {
      const options = {
        sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3',
        lastOperationId: undefined
      }

      const response = {
        status: 200,
        body: {
          response: {
            result: -1,
            object: {
              operations: [
                { p1: 'v11', p2: 'v12' },
                { p1: 'v21', p2: 'v22' }
              ]
            }
          }
        }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let promise = api.operations(options)

      await expect(promise).rejects.toThrow()
    })

    it('should throw if response.object.operations property missing in API response body', async () => {
      const options = {
        sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3',
        lastOperationId: undefined
      }

      const response = {
        status: 200,
        body: {
          response: {
            result: 0,
            object: {}
          }
        }
      }
      api.api._fetchWrapper = jest.fn(() => response)

      let promise = api.operations(options)

      await expect(promise).rejects.toThrow()
    })

    describe('should throw if response.object.operations from API response body is not an array', () => {
      it('but an empty object', async () => {
        const options = {
          sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3',
          lastOperationId: undefined
        }

        const response = {
          status: 200,
          body: {
            response: {
              result: 0,
              object: {
                operations: {}
              }
            }
          }
        }
        api.api._fetchWrapper = jest.fn(() => response)

        let promise = api.operations(options)

        await expect(promise).rejects.toThrow()
      })

      it('but a non-empty object', async () => {
        const options = {
          sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3',
          lastOperationId: undefined
        }

        const response = {
          status: 200,
          body: {
            response: {
              result: 0,
              object: {
                operations: { x: 123 }
              }
            }
          }
        }
        api.api._fetchWrapper = jest.fn(() => response)

        let promise = api.operations(options)

        await expect(promise).rejects.toThrow()
      })

      it('but a string', async () => {
        const options = {
          sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3',
          lastOperationId: undefined
        }

        const response = {
          status: 200,
          body: {
            response: {
              result: 0,
              object: {
                operations: 'abcdef'
              }
            }
          }
        }
        api.api._fetchWrapper = jest.fn(() => response)

        let promise = api.operations(options)

        await expect(promise).rejects.toThrow()
      })

      it('but a number', async () => {
        const options = {
          sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3',
          lastOperationId: undefined
        }

        const response = {
          status: 200,
          body: {
            response: {
              result: 0,
              object: {
                operations: 123
              }
            }
          }
        }
        api.api._fetchWrapper = jest.fn(() => response)

        let promise = api.operations(options)

        await expect(promise).rejects.toThrow()
      })
    })

    it('should rethrow errors from _fetchWrapper', async () => {
      const options = {
        sessionId: 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3',
        lastOperationId: undefined
      }

      api.api._fetchWrapper = jest.fn(() => new Error())

      let promise = api.operations(options)

      await expect(promise).rejects.toThrow()
    })
  })
})
