import * as api from './api'
import * as utils from '../../common/utils'

export async function scrape ({ preferences, fromDate, toDate }) {
  // user preferences
  let login = preferences.login
  let preferencesPassword = preferences.password

  // user input
  let inputPassword
  let verificationCode

  // session data
  let sessionId
  let password

  // stored data
  let instanceId = ZenMoney.getData('instanceId')
  let pin = ZenMoney.getData('pin')

  // function output
  let accounts
  let operations
  let filteredOperations

  await api.version()

  if (instanceId) {
    ({ sessionId } = await api.loginByPin({ instanceId, login, pin }))
  } else {
    if (!preferencesPassword) {
      inputPassword = await ZenMoney.readLine('[TODO:use approved text]Введите пароль')
    }
    password = preferencesPassword || inputPassword

    ;({ sessionId } = await api.register({ login, password }))

    verificationCode = await ZenMoney.readLine('[TODO:use approved text]Введите код подтверждения')

    ;({ instanceId } =
      await api.verify({ sessionId, login, password, verificationCode }))

    pin = utils.generateRandomPin4()

    await api.setPin({ sessionId, pin })

    ZenMoney.setData('pin', pin)
    ZenMoney.setData('instanceId', instanceId)
    ZenMoney.saveData()
  }

  ({ accounts } = await api.accounts({ sessionId }))

  let lastOperationId
  do {
    let operationsAnswer =
      await api.operations({ sessionId, fromDate, toDate, lastOperationId })
    operations = [...operations, ...operationsAnswer.operations]
    lastOperationId = operationsAnswer.lastOperationId
  } while (lastOperationId)

  filteredOperations = operations.filter(operation => {
    return !ZenMoney.isAccountSkipped(operation.incomeAccount)
  })

  return {
    accounts,
    transactions: filteredOperations
  }
}
