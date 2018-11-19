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
  let transactions

  await api.version()

  if (instanceId) {
    ({ sessionId } = await api.loginByPin({ instanceId, login, pin }))

    // TODO: response.result !== 0
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
    // TODO: fromDate, toDate
    let operationsAnswer = await api.operations({ sessionId, lastOperationId })
    transactions = [...transactions, ...operationsAnswer.operations]
    lastOperationId = operationsAnswer.lastOperationId
  } while (lastOperationId)

  transactions = transactions.filter(transaction => {
    return !ZenMoney.isAccountSkipped(transaction.incomeAccount)
  })

  return { accounts, transactions }
}
