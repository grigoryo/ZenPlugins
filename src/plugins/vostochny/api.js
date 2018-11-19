import querystring from 'querystring'
import _ from 'lodash'

import * as network from '../../common/network'
import * as converters from './converters'

const BASE_URL = 'https://mobws.faktura.ru/mobws/3.0/json'

const COMMON_HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 6.0; 5-inch Marshmallow (6.0.0) XHDPI Phone Build/MRA58K)',
  'Host': 'mobws.faktura.ru',
  'Connection': 'Keep-Alive',
  'Accept-Encoding': 'gzip'
}

const SANITIZE_REQUEST_LOG = {
  headers: {
    cookie: true
  },
  body: {
    sessionId: true,
    instanceId: true,
    login: true,
    password: true,
    verificationCode: true,
    pin: true
  }
}

const SANITIZE_RESPONSE_LOG = {
  headers: {
    'Set-Cookie': true
  },
  body: {
    response: {
      object: {
        sessionId: true
      },
      session: {
        instanceId: true,
        sessionId: true
      }
    }
  }
}

const FIXED_KV = {
  publicKey: 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALiymAZVhd1Zc9jHyHqbDRH9Xm9Vdw9vDXlmpU59n0Ktx2vHYjhGJdLu1VoeXVjRnLCUzZnIkjJhj1xb2c+mrWECAwEAAQ==',
  osId: 'unknown',
  deviceId: 'unknown',
  applicationStage: 'production',
  wifiMacAddress: '00:00:00:00:00:00',
  applicationCode: 'express-bank',
  deviceType: 'android',
  locale: 'en',
  imei: '000000000000000',
  appver: '3.10',
  pushEnabled: 'false',
  osVersion: '23',
  root: 'true',
  deviceName: 'unknown',
  applicationId: 'ru.ftc.faktura.expressbank',
  vendor: 'unknown',
  hasHceModule: 'false',
  model: 'unknown',
  // TODO: нет точной уверенности, что bankId фиксирован для всех регионов.
  bankId: '11991'
}

const OPERATIONS_COUNT_FOR_PAGE = 40

function _pickKV (list) {
  return _.pick(FIXED_KV, list)
}

async function _fetchWrapper (url, body, cookie) {
  let response = await network.fetch(
    BASE_URL + url,
    {
      // global.fetch options
      method: 'POST',
      headers: {
        ...COMMON_HEADERS,
        ...(cookie ? { cookie } : {})
        // TODO: 'content-length' header
      },
      body: body,
      // network.fetch options
      sanitizeRequestLog: SANITIZE_REQUEST_LOG,
      sanitizeResponseLog: SANITIZE_RESPONSE_LOG,
      log: true, // TODO: how I supposed to use this param in scraper level?
      stringify: querystring.stringify,
      parse: JSON.parse()
    }
  )

  // TODO: MUST I use this "validateResponse" code practice?
  // if (predicate) {
  //   validateResponse(response, response => predicate(response))
  // }

  // {
  //   ok,
  //   status,
  //   statusText,
  //   url,
  //   headers,
  //   body
  // }
  // TODO: what is "OK"?
  return response
}

export async function version () {
  let requestBody = {
    ...api._pickKV(['applicationCode', 'appver', 'locale'])
  }

  let response = await api._fetchWrapper('/getPFMVersion', requestBody)

  let answer = {
    status: response.status,
    result: _.get(response.body, 'response.result'),
    revision: _.get(response.body, 'response.object.revision')
  }

  let success =
    answer.status === 200 &&
    answer.result === 0 &&
    answer.revision === 7

  if (!success) throw new Error(`Unexpected API answer`)

  return answer
}

export async function register ({ login, password }) {
  let requestBody = {
    login: login,
    password: password,
    ...api._pickKV([
      'publicKey',
      'osId',
      'deviceId',
      'applicationStage',
      'wifiMacAddress',
      'applicationCode',
      'deviceType',
      'locale',
      'imei',
      'appver',
      'pushEnabled',
      'osVersion',
      'root',
      'deviceName',
      'applicationId',
      'vendor',
      'hasHceModule',
      'model'
    ])
  }

  let response = await api._fetchWrapper('/login', requestBody)

  let answer = {
    status: response.status,
    result: _.get(response.body, 'response.result'),
    sessionId: _.get(response.body, 'response.object.sessionId')
  }

  let success =
    answer.status === 200 &&
    answer.result === 1 &&
    answer.sessionId !== undefined

  if (!success) throw new Error(`Unexpected API answer`)

  return answer
}

export async function verify ({
  sessionId, login, password, verificationCode
}) {
  let cookie = 'JSESSIONID=' + sessionId

  let requestBody = {
    login: login,
    password: password,
    verificationCode: verificationCode,
    ...api._pickKV([
      'publicKey',
      'osId',
      'deviceId',
      'applicationStage',
      'wifiMacAddress',
      'applicationCode',
      'deviceType',
      'locale',
      'imei',
      'appver',
      'pushEnabled',
      'osVersion',
      'root',
      'deviceName',
      'applicationId',
      'vendor',
      'hasHceModule',
      'model'
    ])
  }

  let response = await api._fetchWrapper('/login', requestBody, cookie)

  let answer = {
    status: response.status,
    result: _.get(response.body, 'response.result'),
    instanceId: _.get(response.body, 'response.object.session.instanceId')
  }

  let success =
    answer.status === 200 &&
    answer.result === 0 &&
    answer.instanceId !== undefined

  if (!success) throw new Error(`Unexpected API answer`)

  return answer
}

export async function setPin ({ sessionId, pin }) {
  let cookie = 'JSESSIONID=' + sessionId

  let requestBody = {
    pin: pin,
    ...api._pickKV(['appver', 'locale'])
  }

  let response = await api._fetchWrapper('/setPin', requestBody, cookie)

  let answer = {
    status: response.status,
    result: _.get(response.body, 'response.result')
  }

  let success =
    answer.status === 200 &&
    answer.result === 0

  if (!success) throw new Error(`Unexpected API answer`)

  return answer
}

export async function loginByPin ({ instanceId, login, pin }) {
  let requestBody = {
    instanceId: instanceId,
    login: login,
    pin: pin,
    ...api._pickKV([
      'osId',
      'applicationCode',
      'wifiMacAddress',
      'locale',
      'deviceType',
      'imei',
      'appver',
      'osVersion',
      'pushEnabled',
      'root',
      'deviceName',
      'vendor',
      'model',
      'hasHceModule'
    ])
  }

  let response = await api._fetchWrapper('/loginByPin', requestBody)

  let answer = {
    status: response.status,
    result: _.get(response.body, 'response.result'),
    sessionId: _.get(response.body, 'response.object.session.sessionId')
  }

  let success =
    answer.status === 200 &&
    answer.result === 0 &&
    answer.sessionId !== undefined

  if (!success) throw new Error(`Unexpected API answer`)

  return answer
}

export async function accounts ({ sessionId }) {
  let cookie = 'JSESSIONID=' + sessionId

  let requestBody = {
    type: 'ACCOUNTS',
    ...api._pickKV(['appver', 'locale', 'bankId'])
  }

  let response =
    await api._fetchWrapper('/getMyFinancesPage', requestBody, cookie)

  let rawAccounts = _.get(response.body, 'response.object.accounts')
  let convertedAccounts = Array.isArray(rawAccounts)
    ? converters.convertAccounts(rawAccounts)
    : []

  let answer = {
    status: response.status,
    result: _.get(response.body, 'response.result'),
    accounts: convertedAccounts
  }

  let success =
    answer.status === 200 &&
    answer.result === 0

  if (!success) throw new Error(`Unexpected API answer`)

  return answer
}

export async function operations ({ sessionId, lastOperationId }) {
  let cookie = 'JSESSIONID=' + sessionId

  let requestBody = {
    countForPage: OPERATIONS_COUNT_FOR_PAGE,
    ...(lastOperationId ? { lastOperationId } : {}),
    ...api._pickKV(['appver', 'locale', 'bankId'])
  }

  let response = await api._fetchWrapper('/pfmTape', requestBody, cookie)

  let rawOperations = _.get(response.body, 'response.object.operations')
  let convertedOperations = Array.isArray(rawOperations)
    ? converters.convertOperations(rawOperations)
    : []

  let answer = {
    status: response.status,
    result: _.get(response.body, 'response.result'),
    operations: convertedOperations,
    lastOperationId: rawOperations.length === OPERATIONS_COUNT_FOR_PAGE
      ? _.get(rawOperations[OPERATIONS_COUNT_FOR_PAGE - 1], 'pfmOperationId')
      : undefined
  }

  let success =
    answer.status === 200 &&
    answer.result === 0

  if (!success) throw new Error(`Unexpected API answer`)

  return answer
}

export const api = {
  _pickKV,
  _fetchWrapper,
  version,
  register,
  verify,
  setPin,
  loginByPin,
  accounts,
  operations
}
