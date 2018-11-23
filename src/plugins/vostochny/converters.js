import _ from 'lodash'
import moment from 'moment'

export function convertAccounts (accounts) {
  return accounts.map(account => {
    // TODO: remove: console.log(account)

    let flat = {
      id: _.get(account, 'id'),
      name: _.get(account, 'name'),
      number: _.get(account, 'number'),
      limits0Cards0Num: _.get(account, 'limits[0].cards[0].num'),
      currencyCode: _.get(account, 'currency.code'),
      availableWhenPay: _.get(account, 'availableWhenPay'),
      limits: _.get(account, 'limits')
    }

    let isValid =
      _.isInteger(flat.id) &&
      _.isString(flat.name) && flat.name.length > 0 &&
      _.isString(flat.number) && flat.number.length === 20 &&
      (
        flat.limits0Cards0Num === undefined ||
        (
          _.isString(flat.limits0Cards0Num) &&
          flat.limits0Cards0Num.length === 19
        )
      ) &&
      _.isString(flat.currencyCode) &&
      // TODO: flat.currencyCode === 'RUB' &&
      _.isFinite(flat.availableWhenPay) && flat.availableWhenPay >= 0 &&
      // TODO: fail if creditWhenPay !== availableWhenPay
      _.isArray(flat.limits)

    if (!isValid) throw new Error('Unexpected API answer')

    let result = {
      id: _.toString(flat.id),
      title: flat.name,
      syncID: (a => a.filter(x => x !== ''))([
        flat.number.slice(-4),
        _.toString(flat.limits0Cards0Num).slice(-4)
      ]),

      // TODO: compare account currency code with operation currency code
      instrument: flat.currencyCode,
      // TODO: need to find ways for determining other account types
      type: flat.limits.length > 0 ? 'ccard' : 'checking',

      balance: flat.availableWhenPay,
      startBalance: undefined,
      creditLimit: undefined,

      savings: undefined,

      capitalization: undefined,
      percent: undefined,
      startDate: undefined,
      endDateOffset: undefined,
      endDateOffsetInterval: undefined,
      payoffStep: undefined,
      payoffInterval: undefined
    }
    return result
  })
}

export function convertOperations (operations) {
  return operations.map(operation => {
    // TODO: remove: console.log(operation)

    // TODO: parse each known operation type separately

    let flat = {
      id: _.get(operation, 'id'),
      accountId: _.get(operation, 'accountId'),
      pfmCategoryTOKind: _.get(operation, 'pfmCategoryTO.kind'),
      amount: _.get(operation, 'amount'),
      mccCodeAndCategory: _.get(operation, 'mccCodeAndCategory'),
      operDateTime: _.get(operation, 'operDateTime'),
      hold: _.get(operation, 'hold')
      // TODO: currencyCode: _.get(operation, 'currency.code')
    }

    // TODO: remove: console.log(flat)

    let isValid =
      _.isInteger(flat.id) &&
      _.isInteger(flat.accountId) &&
      (
        flat.pfmCategoryTOKind === '+' ||
        flat.pfmCategoryTOKind === '-' ||
        flat.pfmCategoryTOKind === '0'
      ) &&
      _.isFinite(flat.amount) &&
      _.isString(flat.mccCodeAndCategory) && // TODO: some number in it
      _.isString(flat.operDateTime) && // TODO: flat.operDateTime is date in string
      _.isBoolean(flat.hold)
      // TODO: this.currencyCode === 'RUR'

    if (!isValid) throw new Error('Unexpected API answer')

    let result = {
      id: _.toString(flat.id),
      incomeBankID: _.toString(flat.id),
      incomeAccount: _.toString(flat.accountId),
      income: flat.pfmCategoryTOKind === '+' ? flat.amount : 0.0,
      outcomeBankID: _.toString(flat.id),
      outcomeAccount: _.toString(flat.accountId),
      outcome: flat.pfmCategoryTOKind === '-'
        ? -flat.amount
        : (flat.pfmCategoryTOKind === '0' ? -flat.amount : 0.0),

      mcc: (x => x !== '' ? _.toInteger(x) : undefined)(
        flat.mccCodeAndCategory.replace('MCC ', '')
      ), // TODO: get mcc correctly or fail
      payee: undefined, // TODO: parse "details"

      date: moment(flat.operDateTime, 'DD.MM.YYYY HH:mm')
        .utcOffset('+03:00', true).toDate(), // TODO: more clean way
      hold: flat.hold,

      opIncome: undefined,
      opIncomeInstrument: undefined,
      opOutcome: undefined,
      opOutcomeInstrument: undefined,

      latitude: undefined,
      longitude: undefined
    }
    return result
  })
}

export const converters = {
  convertAccounts,
  convertOperations
}
