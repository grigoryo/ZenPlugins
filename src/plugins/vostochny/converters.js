import _ from 'lodash'
import moment from 'moment'

// TODO: remove comments
// response.object.accounts[]
// .id -> id
// .name -> title
// .number -> syncID +
//   .limits[].cards[].num -> syncID
// .currency.code -> instrument
// .limits === [] -> type = 'checking'
// .limits === [{...}, ...] -> type = 'ccard'
// .availableWhenPay -> balance
// -> startBalance
// -> creditLimit
// -> savings
export function convertAccounts (accounts) {
  return accounts.map(account => ({
    id: _.get(account, 'id').toString(),
    title: _.get(account, 'name').toString(),
    syncID: [
      _.get(account, 'number').toString().slice(-4),
      _.get(account, 'limits[0].cards[0].num').toString().slice(-4)
    ],
    // TODO: compare account currency code with operation currency code
    instrument: _.get(account, 'currency.code').toString(),
    balance: Number(_.get(account, 'availableWhenPay')),
    // TODO: need to find ways for determining other account types
    type: (x => Array.isArray(x) && x.length > 0)(_.get(account, 'limits'))
      ? 'ccard'
      : 'checking'
    // TODO: not all fields are accured from reverse engineered data
  }))
}

export function convertOperations (operations) {
  // TODO: generate more operation types in examples
  return operations.map(operation => {
    // TODO: throw if not in RUR
    let result = {
      id: _.get(operation, 'id').toString(),
      incomeBankID: _.get(operation, 'id').toString(),
      incomeAccount: _.get(operation, 'accountId').toString(),
      income: _.get(operation, 'pfmCategoryTO.kind') === '+'
        ? Number(_.get(operation, 'amount'))
        : 0,
      outcomeBankID: _.get(operation, 'id').toString(),
      outcomeAccount: _.get(operation, 'accountId').toString(),
      outcome: _.get(operation, 'pfmCategoryTO.kind') === '-'
        ? Number(_.get(operation, 'amount'))
        : 0,

      mcc: Number(_.get(operation, 'mccCodeAndCategory').replace('MCC ', '')),
      payee: undefined, // TODO: parse details

      date: moment(_.get(operation, 'operDateTime'), 'DD.MM.YYYY HH:mm')
        .utcOffset('+03:00', true),
      hold: Boolean(_.get(operation, 'hold')),

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
