import _ from 'lodash'

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
  accounts.map(account => ({
    id: _.get(account, 'id').toString(),
    title: _.get(account, 'name').toString(),
    syncID: [
      _.get(account, 'number').toString().slice(-4),
      _.get(account, 'limits[0].cards[0].num').toString().slice(-4)
    ],
    instrument: _.get(account, 'currency.code').toString(),
    balance: Number(_.get(account, 'availableWhenPay')),
    // TODO: need to find ways for determining other account types
    type: Array.isArray(_.get(account, 'limits')) ? 'ccard' : 'checking'
    // TODO: not all fields are accured from reverse engineered data
  }))
}

export function convertOperations () {
  // TODO: write implementation
  // TODO: generate more operation types in examples
  return []
}

export const converters = {
  convertAccounts,
  convertOperations
}
