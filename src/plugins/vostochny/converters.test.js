import moment from 'moment'
import * as converters from './converters'

describe('convertAccounts()', () => {
  it('should parse debet card accounts', () => {
    const accounts = [{
      'archive': false,
      'availableWhenPay': 225.0,
      'background': 'account',
      'bankId': 7907049,
      'creditWhenPay': 225.0,
      'currency': {
        'code': 'RUB',
        'name': 'Российский рубль',
        'roundDecimals': -2,
        'shortName': 'р.'
      },
      'detailSum': 0.0,
      'detailSumName': 'С учетом средств на картах',
      'details': {
        'openDate': '12.11.2018',
        'ownerFio': 'Иванов Иван Иванович'
      },
      'fake': false,
      'hidden': false,
      'id': 56367569999,
      'limits': [
        {
          'amounts': null,
          'cards': [
            {
              'allowStatement': true,
              'auxInfoCode': 'CARD.1-1',
              'canAddToAndroidPay': true,
              'canAddToApplePay': true,
              'canChoosePeriodInStatement': true,
              'canClose': false,
              'canLock': true,
              'canReissue': false,
              'canUnlock': false,
              'cardHolderName': 'INSTANT ISSUE',
              'cardReissueEnabled': true,
              'cashWithdrawalByQrCode': false,
              'changePinByUrlEnabled': false,
              'changePinEnabled': false,
              'expireDate': 1661878800000,
              'expireDateForCard': '08/22',
              'expireDateS': '31.08.2022',
              'hceEnabled': false,
              'hidden': false,
              'limitId': '1',
              'loyaltyId': 49362079999,
              'name': 'Visa UnEmbossed',
              'num': '**** **** **** 1234',
              'panMode': 'GET_PAN',
              'primary': true,
              'showLimitsAndTransScheme': false,
              'showTransSchemes': false,
              'status': 'WORK',
              'typeId': 'VISA',
              'virtual': false
            }
          ],
          'limit': 225.0
        }
      ],
      'name': 'ТП с БП "СashBack бонус_Карта №1"',
      'number': '40817810232100014321',
      'permissions': {
        'canDepositExchange': false,
        'canDoStatement': true,
        'canPay': true,
        'canPayFsgAndZk': true,
        'canTransferToOtherBanks': true,
        'canTransferToOtherClients': true,
        'canUpdateLoanInfo': false,
        'closeEnabled': false,
        'creditAvailable': true,
        'debitAvailable': true,
        'onlineRateAvailable': false
      },
      'qrCode': 'F|bic=040813886|accNum=40817810232100014321|payeeName=ИВАНОВ ИВАН ИВАНОВИЧ|purpose=Перевод средств',
      'setting': {
        'cardToCardForOtherBank': {
          'cardInfoCodes': [
            'CARD.1-1'
          ],
          'mode': 'WITH_CARDS'
        },
        'cardToCardForOwnBank': {
          'cardInfoCodes': [
            'CARD.1-1'
          ],
          'mode': 'WITH_CARDS'
        },
        'cardToCardKt': {
          'cardInfoCodes': [
            'CARD.1-1'
          ],
          'mode': 'WITH_CARDS'
        },
        'cardsForDpDt': {
          'cardInfoCodes': [],
          'mode': 'DISABLED'
        },
        'cardsForOtherDt': {
          'cardInfoCodes': [],
          'mode': 'WITHOUT_CARDS'
        },
        'cardsForOwnDt': {
          'cardInfoCodes': [],
          'mode': 'WITHOUT_CARDS'
        },
        'cardsForOwnKt': {
          'cardInfoCodes': [],
          'mode': 'WITHOUT_CARDS'
        },
        'cardsForPhoneTransfer': {
          'cardInfoCodes': [],
          'mode': 'WITHOUT_CARDS'
        },
        'cardsForServiceDt': {
          'cardInfoCodes': [],
          'mode': 'WITHOUT_CARDS'
        }
      },
      'show': true,
      'showHouseAndUtilityExecutors': false
    }]

    const convertedAccounts = [{
      id: '56367569999',
      title: 'ТП с БП "СashBack бонус_Карта №1"',
      syncID: ['4321', '1234'],

      instrument: 'RUB',
      type: 'ccard',

      balance: 225.0,
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
    }]

    let result = converters.convertAccounts(accounts)

    expect(result).toEqual(convertedAccounts)
  })

  it('should parse checking accounts', () => {
    const accounts = [{
      'archive': false,
      'availableWhenPay': 75.0,
      'background': 'account',
      'bankId': 7907049,
      'creditWhenPay': 75.0,
      'currency': {
        'code': 'RUB',
        'name': 'Российский рубль',
        'roundDecimals': -2,
        'shortName': 'р.'
      },
      'detailSum': 75.0,
      'detailSumName': 'Средств на счете',
      'details': {
        'openDate': '13.11.2018',
        'ownerFio': 'Иванов Иван Иванович'
      },
      'fake': false,
      'hidden': false,
      'id': 56459645555,
      'limits': [],
      'name': 'Счет - Сейф',
      'number': '40817810832100012233',
      'permissions': {
        'canDepositExchange': false,
        'canDoStatement': true,
        'canPay': true,
        'canPayFsgAndZk': true,
        'canTransferToOtherBanks': true,
        'canTransferToOtherClients': true,
        'canUpdateLoanInfo': false,
        'closeEnabled': false,
        'creditAvailable': true,
        'debitAvailable': true,
        'onlineRateAvailable': false
      },
      'qrCode': 'F|bic=040813886|accNum=40817810832100012233|payeeName=ИВАНОВ ИВАН ИВАНОВИЧ|purpose=Перевод средств',
      'setting': {
        'cardToCardForOtherBank': {
          'cardInfoCodes': [],
          'mode': 'DISABLED'
        },
        'cardToCardForOwnBank': {
          'cardInfoCodes': [],
          'mode': 'DISABLED'
        },
        'cardToCardKt': {
          'cardInfoCodes': [],
          'mode': 'DISABLED'
        },
        'cardsForDpDt': {
          'cardInfoCodes': [],
          'mode': 'DISABLED'
        },
        'cardsForOtherDt': {
          'cardInfoCodes': [],
          'mode': 'WITHOUT_CARDS'
        },
        'cardsForOwnDt': {
          'cardInfoCodes': [],
          'mode': 'WITHOUT_CARDS'
        },
        'cardsForOwnKt': {
          'cardInfoCodes': [],
          'mode': 'WITHOUT_CARDS'
        },
        'cardsForPhoneTransfer': {
          'cardInfoCodes': [],
          'mode': 'WITHOUT_CARDS'
        },
        'cardsForServiceDt': {
          'cardInfoCodes': [],
          'mode': 'WITHOUT_CARDS'
        }
      },
      'show': true,
      'showHouseAndUtilityExecutors': false,
      'showSum': 75.0
    }]

    const convertedAccounts = [{
      id: '56459645555',
      title: 'Счет - Сейф',
      syncID: ['2233'],

      instrument: 'RUB',
      type: 'checking',

      balance: 75.0,
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
    }]

    let result = converters.convertAccounts(accounts)

    expect(result).toEqual(convertedAccounts)
  })
})

describe('convertOperations()', () => {
  it('should parse ATM deposit operation', () => {
    const operations = [{
      'accountId': 56367569999,
      'amount': 300.0,
      'canChangeCategory': false,
      'canSaveTemplate': false,
      'canSendPrintedForm': false,
      'categoryCode': 'OTHER.INCOME',
      'currency': {
        'code': 'RUB',
        'name': 'Российский рубль',
        'roundDecimals': -2,
        'shortName': 'р.'
      },
      'details': 'ДАЛЬНЕВОСТОЧНЫЙ ФИЛИАЛ ПАО КБ "ВОСТОЧНЫЙ"//Пополнение ТБС №40817810232100014321 (ИВАНОВ ИВАН ИВАНОВИЧ) в УС J143446, транзакция № 238882383333 от 12/11/2018 05:32:00',
      'hold': false,
      'id': 56702485287,
      'mccCodeAndCategory': '',
      'operDate': '12.11.2018',
      'operDateTime': '12.11.2018 05:32',
      'payeeAccountNumber': '40817810232100014321',
      'payeeBankBic': '040813886',
      'payeeBankName': 'ДАЛЬНЕВОСТОЧНЫЙ ФИЛИАЛ ПАО КБ "ВОСТОЧНЫЙ"',
      'payeeName': 'ИВАНОВ ИВАН ИВАНОВИЧ',
      'payerAccount': '20208810132108802572',
      'payerBankBic': '040813886',
      'payerBankName': 'ДАЛЬНЕВОСТОЧНЫЙ ФИЛИАЛ ПАО КБ "ВОСТОЧНЫЙ"',
      'payerName': 'ДАЛЬНЕВОСТОЧНЫЙ ФИЛИАЛ ПАО КБ "ВОСТОЧНЫЙ"',
      'pfmCategoryTO': {
        'code': 'OTHER.INCOME',
        'color': 'afaeaf',
        'enName': 'Other income',
        'icon': 'pfm-income',
        'kind': '+',
        'name': 'Прочие поступления'
      },
      'pfmIcon': 'pfm-income',
      'pfmIconObject': {
        'backgroundColor': 'afaeaf',
        'icon': 'pfm-income',
        'iconColor': 'FFFFFF'
      },
      'pfmOperationId': 56702485287
    }]

    const convertedOperations = [{
      id: '56702485287',
      incomeBankID: '56702485287',
      incomeAccount: '56367569999',
      income: 300.0,
      outcomeBankID: '56702485287',
      outcomeAccount: '56367569999',
      outcome: 0.0,

      mcc: undefined,
      payee: undefined,

      date: moment.parseZone('2018-11-12T05:32:00+03:00').toDate(),
      hold: false,

      opIncome: undefined,
      opIncomeInstrument: undefined,
      opOutcome: undefined,
      opOutcomeInstrument: undefined,

      latitude: undefined,
      longitude: undefined
    }]

    let result = converters.convertOperations(operations)

    expect(result).toEqual(convertedOperations)
  })

  it('should parse ATM withdrawal operation', () => {
    const operations = [{
      'accountId': 56367569999,
      'amount': -100.0,
      'authId': '683222',
      'bonus': {
        'bonusAvailable': false,
        'loyaltyId': 49362079999
      },
      'canChangeCategory': true,
      'canSaveTemplate': false,
      'canSendPrintedForm': false,
      'categoryCode': 'ATM',
      'currency': {
        'code': 'RUB',
        'name': 'Российский рубль',
        'roundDecimals': -2,
        'shortName': 'р.'
      },
      'details': 'Получение наличных в банкомате RUS VLADIVOSTOK PAO KB "Vostochnyy"',
      'hold': false,
      'id': 56607812602,
      'mccCodeAndCategory': 'MCC 6011',
      'operDate': '19.11.2018',
      'operDateTime': '19.11.2018 10:46',
      'pfmCategoryTO': {
        'code': 'ATM',
        'color': 'f47d33',
        'enName': 'Cash operations',
        'icon': 'pfm-atm',
        'kind': '-',
        'name': 'Операции с наличными'
      },
      'pfmIcon': 'pfm-atm',
      'pfmIconObject': {
        'backgroundColor': 'f47d33',
        'icon': 'pfm-atm',
        'iconColor': 'FFFFFF'
      },
      'pfmOperationId': 56607812602
    }]

    const convertedOperations = [{
      id: '56607812602',
      incomeBankID: '56607812602',
      incomeAccount: '56367569999',
      income: 0.0,
      outcomeBankID: '56607812602',
      outcomeAccount: '56367569999',
      outcome: 100.0,

      mcc: 6011,
      payee: undefined,

      date: moment.parseZone('2018-11-19T10:46:00+03:00').toDate(),
      hold: false,

      opIncome: undefined,
      opIncomeInstrument: undefined,
      opOutcome: undefined,
      opOutcomeInstrument: undefined,

      latitude: undefined,
      longitude: undefined
    }]

    let result = converters.convertOperations(operations)

    expect(result).toEqual(convertedOperations)
  })

  describe('should parse transfer between own accounts', () => {
    it('on "from" account operation', () => {
      const operations = [{
        'accountId': 56367569999,
        'amount': -25.0,
        'canChangeCategory': false,
        'canSaveTemplate': true,
        'canSendPrintedForm': true,
        'categoryCode': 'BETWEEN.MY.ACC',
        'currency': {
          'code': 'RUB',
          'name': 'Российский рубль',
          'roundDecimals': -2,
          'shortName': 'р.'
        },
        'details': 'Transfer to my account',
        'hold': false,
        'id': 56408092176,
        'mccCodeAndCategory': '',
        'operDate': '13.11.2018',
        'operDateTime': '13.11.2018 10:47',
        'orderFormType': 'TRANSFER_OWN_INSIDE_BANK',
        'orderId': 56408094747,
        'payeeAccountNumber': '40817810832100012233',
        'payeeBankBic': '040813886',
        'payeeBankName': 'ДАЛЬНЕВОСТОЧНЫЙ ФИЛИАЛ ПАО КБ "ВОСТОЧНЫЙ"',
        'payeeName': 'ИВАНОВ ИВАН ИВАНОВИЧ',
        'payerAccount': '40817810232100014321',
        'payerBankBic': '040813886',
        'payerBankName': 'ДАЛЬНЕВОСТОЧНЫЙ ФИЛИАЛ ПАО КБ "ВОСТОЧНЫЙ"',
        'payerName': 'IVANOV IVAN IVANOVICH',
        'pfmCategoryTO': {
          'code': 'BETWEEN.MY.ACC',
          'color': 'afaeaf',
          'enName': 'Transfer between my accounts',
          'icon': null,
          'kind': '0',
          'name': 'Перевод между моими счетами'
        },
        'pfmIcon': 'pfm-finance',
        'pfmIconObject': {
          'backgroundColor': '4fc639',
          'icon': 'pfm-finance',
          'iconColor': 'FFFFFF'
        },
        'pfmOperationId': 56408092176,
        'purpose': '',
        'state': {
          'code': 'successes',
          'color': '009900',
          'comment': 'Документ проведён',
          'dateS': '13.11.2018 10:49',
          'name': 'Исполнен'
        }
      }]

      const convertedOperations = [{
        id: '56408092176',
        incomeBankID: '56408092176',
        incomeAccount: '56367569999',
        income: 0.0,
        outcomeBankID: '56408092176',
        outcomeAccount: '56367569999',
        outcome: 25.0,

        mcc: undefined,
        payee: undefined,

        date: moment.parseZone('2018-11-13T10:47:00+03:00').toDate(),
        hold: false,

        opIncome: undefined,
        opIncomeInstrument: undefined,
        opOutcome: undefined,
        opOutcomeInstrument: undefined,

        latitude: undefined,
        longitude: undefined
      }]

      let result = converters.convertOperations(operations)

      expect(result).toEqual(convertedOperations)
    })

    it('on "to" account operation', () => {
      const operations = [{
        'accountId': 56459645555,
        'amount': 25.0,
        'canChangeCategory': false,
        'canSaveTemplate': false,
        'canSendPrintedForm': false,
        'categoryCode': 'OTHER.INCOME',
        'currency': {
          'code': 'RUB',
          'name': 'Российский рубль',
          'roundDecimals': -2,
          'shortName': 'р.'
        },
        'details': 'ИВАНОВ ИВАН ИВАНОВИЧ//Перевод собственных средств.\nБез налога (НДС).',
        'hold': false,
        'id': 56450454503,
        'mccCodeAndCategory': '',
        'operDate': '13.11.2018',
        'operDateTime': '13.11.2018 00:00',
        'payeeAccountNumber': '40817810832100012233',
        'payeeBankBic': '040813886',
        'payeeBankName': 'ДАЛЬНЕВОСТОЧНЫЙ ФИЛИАЛ ПАО КБ "ВОСТОЧНЫЙ"',
        'payeeName': 'ИВАНОВ ИВАН ИВАНОВИЧ',
        'payerAccount': '40817810232100014321',
        'payerBankBic': '040813886',
        'payerBankName': 'ДАЛЬНЕВОСТОЧНЫЙ ФИЛИАЛ ПАО КБ "ВОСТОЧНЫЙ"',
        'payerName': 'ИВАНОВ ИВАН ИВАНОВИЧ',
        'pfmCategoryTO': {
          'code': 'OTHER.INCOME',
          'color': 'afaeaf',
          'enName': 'Other income',
          'icon': 'pfm-income',
          'kind': '+',
          'name': 'Прочие поступления'
        },
        'pfmIcon': 'pfm-income',
        'pfmIconObject': {
          'backgroundColor': 'afaeaf',
          'icon': 'pfm-income',
          'iconColor': 'FFFFFF'
        },
        'pfmOperationId': 56450454503
      }]

      const convertedOperations = [{
        id: '56450454503',
        incomeBankID: '56450454503',
        incomeAccount: '56459645555',
        income: 25.0,
        outcomeBankID: '56450454503',
        outcomeAccount: '56459645555',
        outcome: 0.0,

        mcc: undefined,
        payee: undefined,

        date: moment.parseZone('2018-11-13T00:00:00+03:00').toDate(),
        hold: false,

        opIncome: undefined,
        opIncomeInstrument: undefined,
        opOutcome: undefined,
        opOutcomeInstrument: undefined,

        latitude: undefined,
        longitude: undefined
      }]

      let result = converters.convertOperations(operations)

      expect(result).toEqual(convertedOperations)
    })
  })

  describe('should parse pay by card operation', () => {
    it('when on hold', () => {
      const operations = [{
        'accountId': 56367569999,
        'amount': -94.9,
        'authId': '683111',
        'canChangeCategory': true,
        'canSaveTemplate': false,
        'canSendPrintedForm': false,
        'categoryCode': 'SUPERMARKETS',
        'currency': {
          'code': 'RUB',
          'name': 'Российский рубль',
          'roundDecimals': -2,
          'shortName': 'р.'
        },
        'details': 'Оплата товара/услуг RUS Vladivostok MAGAZINNAME',
        'hold': true,
        'id': 56607812584,
        'mccCodeAndCategory': 'MCC 5411',
        'operDate': '19.11.2018',
        'operDateTime': '19.11.2018 10:37',
        'payerAccount': 'Card *1234',
        'payerBankBic': '040813886',
        'payerBankName': 'ДАЛЬНЕВОСТОЧНЫЙ ФИЛИАЛ ПАО КБ "ВОСТОЧНЫЙ"',
        'payerName': 'IVANOV IVAN IVANOVICH',
        'pfmCategoryTO': {
          'code': 'SUPERMARKETS',
          'color': 'fed308',
          'enName': 'Supermarkets',
          'icon': 'pfm-supermarkets',
          'kind': '-',
          'name': 'Супермаркеты'
        },
        'pfmIcon': 'pfm-supermarkets',
        'pfmIconObject': {
          'backgroundColor': 'fed308',
          'icon': 'pfm-supermarkets',
          'iconColor': 'FFFFFF'
        },
        'pfmOperationId': 56607812584
      }]

      const convertedOperations = [{
        id: '56607812584',
        incomeBankID: '56607812584',
        incomeAccount: '56367569999',
        income: 0.0,
        outcomeBankID: '56607812584',
        outcomeAccount: '56367569999',
        outcome: 94.9,

        mcc: 5411,
        payee: undefined,

        date: moment.parseZone('2018-11-19T10:37:00+03:00').toDate(),
        hold: true,

        opIncome: undefined,
        opIncomeInstrument: undefined,
        opOutcome: undefined,
        opOutcomeInstrument: undefined,

        latitude: undefined,
        longitude: undefined
      }]

      let result = converters.convertOperations(operations)

      expect(result).toEqual(convertedOperations)
    })

    it('when hold ended', () => {
      const operations = [{
        'accountId': 56367569999,
        'amount': -94.9,
        'authId': '683111',
        'bonus': {
          'bonusAvailable': false,
          'loyaltyId': 49362079999
        },
        'canChangeCategory': true,
        'canSaveTemplate': false,
        'canSendPrintedForm': false,
        'categoryCode': 'SUPERMARKETS',
        'currency': {
          'code': 'RUB',
          'name': 'Российский рубль',
          'roundDecimals': -2,
          'shortName': 'р.'
        },
        'details': 'Оплата товара/услуг RUS VLADIVOSTOK MAGAZINNAME',
        'hold': false,
        'id': 56607812584,
        'mccCodeAndCategory': 'MCC 5411',
        'operDate': '19.11.2018',
        'operDateTime': '19.11.2018 10:37',
        'pfmCategoryTO': {
          'code': 'SUPERMARKETS',
          'color': 'fed308',
          'enName': 'Supermarkets',
          'icon': 'pfm-supermarkets',
          'kind': '-',
          'name': 'Супермаркеты'
        },
        'pfmIcon': 'pfm-supermarkets',
        'pfmIconObject': {
          'backgroundColor': 'fed308',
          'icon': 'pfm-supermarkets',
          'iconColor': 'FFFFFF'
        },
        'pfmOperationId': 56607812584
      }]

      const convertedOperations = [{
        id: '56607812584',
        incomeBankID: '56607812584',
        incomeAccount: '56367569999',
        income: 0.0,
        outcomeBankID: '56607812584',
        outcomeAccount: '56367569999',
        outcome: 94.9,

        mcc: 5411,
        payee: undefined,

        date: moment.parseZone('2018-11-19T10:37:00+03:00').toDate(),
        hold: false,

        opIncome: undefined,
        opIncomeInstrument: undefined,
        opOutcome: undefined,
        opOutcomeInstrument: undefined,

        latitude: undefined,
        longitude: undefined
      }]

      let result = converters.convertOperations(operations)

      expect(result).toEqual(convertedOperations)
    })
  })

  describe('should parse initial card opening', () => {
    it('initial money deposit operation', () => {
      const operations = [{
        'accountId': 56367569999,
        'amount': 150.0,
        'canChangeCategory': false,
        'canSaveTemplate': false,
        'canSendPrintedForm': false,
        'categoryCode': 'OTHER.INCOME',
        'currency': {
          'code': 'RUB',
          'name': 'Российский рубль',
          'roundDecimals': -2,
          'shortName': 'р.'
        },
        'details': 'ИВАНОВ ИВАН ИВАНОВИЧ//Внесено на текущий банковский счет № 40817810232100014321, владелец счета ИВАНОВ ИВАН ИВАНОВИЧ',
        'hold': false,
        'id': 56702485178,
        'mccCodeAndCategory': '',
        'operDate': '12.11.2018',
        'operDateTime': '12.11.2018 00:00',
        'payeeAccountNumber': '40817810232100014321',
        'payeeBankBic': '040813886',
        'payeeBankName': 'ДАЛЬНЕВОСТОЧНЫЙ ФИЛИАЛ ПАО КБ "ВОСТОЧНЫЙ"',
        'payeeName': 'ИВАНОВ ИВАН ИВАНОВИЧ',
        'payerAccount': '20202810632100000001',
        'payerBankBic': '040813886',
        'payerBankName': 'ДАЛЬНЕВОСТОЧНЫЙ ФИЛИАЛ ПАО КБ "ВОСТОЧНЫЙ"',
        'payerName': 'ИВАНОВ ИВАН ИВАНОВИЧ',
        'pfmCategoryTO': {
          'code': 'OTHER.INCOME',
          'color': 'afaeaf',
          'enName': 'Other income',
          'icon': 'pfm-income',
          'kind': '+',
          'name': 'Прочие поступления'
        },
        'pfmIcon': 'pfm-income',
        'pfmIconObject': {
          'backgroundColor': 'afaeaf',
          'icon': 'pfm-income',
          'iconColor': 'FFFFFF'
        },
        'pfmOperationId': 56702485178
      }]

      const convertedOperations = [{
        id: '56702485178',
        incomeBankID: '56702485178',
        incomeAccount: '56367569999',
        income: 150.0,
        outcomeBankID: '56702485178',
        outcomeAccount: '56367569999',
        outcome: 0.0,

        mcc: undefined,
        payee: undefined,

        date: moment.parseZone('2018-11-12T00:00:00+03:00').toDate(),
        hold: false,

        opIncome: undefined,
        opIncomeInstrument: undefined,
        opOutcome: undefined,
        opOutcomeInstrument: undefined,

        latitude: undefined,
        longitude: undefined
      }]

      let result = converters.convertOperations(operations)

      expect(result).toEqual(convertedOperations)
    })

    it('pay for card issue operation', () => {
      const operations = [{
        'accountId': 56367569999,
        'amount': -150.0,
        'canChangeCategory': true,
        'canSaveTemplate': false,
        'canSendPrintedForm': false,
        'categoryCode': 'OTHERS',
        'currency': {
          'code': 'RUB',
          'name': 'Российский рубль',
          'roundDecimals': -2,
          'shortName': 'р.'
        },
        'details': 'ДАЛЬНЕВОСТОЧНЫЙ ФИЛИАЛ ПАО КБ "ВОСТОЧНЫЙ"//Комиссия за выдачу карты 472934xxxxxx1234 ИВАНОВ ИВАН ИВАНОВИЧ',
        'hold': false,
        'id': 56702485193,
        'mccCodeAndCategory': '',
        'operDate': '12.11.2018',
        'operDateTime': '12.11.2018 00:00',
        'pfmCategoryTO': {
          'code': 'OTHERS',
          'color': 'afaeaf',
          'enName': 'Others',
          'icon': 'pfm-other',
          'kind': '-',
          'name': 'Не распределено'
        },
        'pfmIcon': 'pfm-other',
        'pfmIconObject': {
          'backgroundColor': 'afaeaf',
          'icon': 'pfm-other',
          'iconColor': 'FFFFFF'
        },
        'pfmOperationId': 56702485193
      }]

      const convertedOperations = [{
        id: '56702485193',
        incomeBankID: '56702485193',
        incomeAccount: '56367569999',
        income: 0.0,
        outcomeBankID: '56702485193',
        outcomeAccount: '56367569999',
        outcome: 150.0,

        mcc: undefined,
        payee: undefined,

        date: moment.parseZone('2018-11-12T00:00:00+03:00').toDate(),
        hold: false,

        opIncome: undefined,
        opIncomeInstrument: undefined,
        opOutcome: undefined,
        opOutcomeInstrument: undefined,

        latitude: undefined,
        longitude: undefined
      }]

      let result = converters.convertOperations(operations)

      expect(result).toEqual(convertedOperations)
    })
  })

  describe('should parse checking account opening', () => {
    it('transfer from other account operation', () => {
      const operations = [{
        'accountId': 56367569999,
        'amount': -50.0,
        'canChangeCategory': false,
        'canSaveTemplate': false,
        'canSendPrintedForm': false,
        'categoryCode': 'BETWEEN.MY.ACC',
        'currency': {
          'code': 'RUB',
          'name': 'Российский рубль',
          'roundDecimals': -2,
          'shortName': 'р.'
        },
        'details': 'ИВАНОВ ИВАН ИВАНОВИЧ//Открытие договора (безналично)',
        'hold': false,
        'id': 56702485337,
        'mccCodeAndCategory': '',
        'operDate': '13.11.2018',
        'operDateTime': '13.11.2018 00:00',
        'pfmCategoryTO': {
          'code': 'BETWEEN.MY.ACC',
          'color': 'afaeaf',
          'enName': 'Transfer between my accounts',
          'icon': null,
          'kind': '0',
          'name': 'Перевод между моими счетами'
        },
        'pfmIcon': 'pfm-finance',
        'pfmIconObject': {
          'backgroundColor': '4fc639',
          'icon': 'pfm-finance',
          'iconColor': 'FFFFFF'
        },
        'pfmOperationId': 56702485337
      }]

      const convertedOperations = [{
        id: '56702485337',
        incomeBankID: '56702485337',
        incomeAccount: '56367569999',
        income: 0.0,
        outcomeBankID: '56702485337',
        outcomeAccount: '56367569999',
        outcome: 50.0,

        mcc: undefined,
        payee: undefined,

        date: moment.parseZone('2018-11-13T00:00:00+03:00').toDate(),
        hold: false,

        opIncome: undefined,
        opIncomeInstrument: undefined,
        opOutcome: undefined,
        opOutcomeInstrument: undefined,

        latitude: undefined,
        longitude: undefined
      }]

      let result = converters.convertOperations(operations)

      expect(result).toEqual(convertedOperations)
    })

    it('income on new account operation', () => {
      const operations = [{
        'accountId': 56459645555,
        'amount': 50.0,
        'canChangeCategory': false,
        'canSaveTemplate': false,
        'canSendPrintedForm': false,
        'categoryCode': 'OTHER.INCOME',
        'currency': {
          'code': 'RUB',
          'name': 'Российский рубль',
          'roundDecimals': -2,
          'shortName': 'р.'
        },
        'details': 'ИВАНОВ ИВАН ИВАНОВИЧ//Открытие договора (безналично)',
        'hold': false,
        'id': 56450454474,
        'mccCodeAndCategory': '',
        'operDate': '13.11.2018',
        'operDateTime': '13.11.2018 00:00',
        'payeeAccountNumber': '40817810832100012233',
        'payeeBankBic': '040813886',
        'payeeBankName': 'ДАЛЬНЕВОСТОЧНЫЙ ФИЛИАЛ ПАО КБ "ВОСТОЧНЫЙ"',
        'payeeName': 'ИВАНОВ ИВАН ИВАНОВИЧ',
        'payerAccount': '40817810232100014321',
        'payerBankBic': '040813886',
        'payerBankName': 'ДАЛЬНЕВОСТОЧНЫЙ ФИЛИАЛ ПАО КБ "ВОСТОЧНЫЙ"',
        'payerName': 'ИВАНОВ ИВАН ИВАНОВИЧ',
        'pfmCategoryTO': {
          'code': 'OTHER.INCOME',
          'color': 'afaeaf',
          'enName': 'Other income',
          'icon': 'pfm-income',
          'kind': '+',
          'name': 'Прочие поступления'
        },
        'pfmIcon': 'pfm-income',
        'pfmIconObject': {
          'backgroundColor': 'afaeaf',
          'icon': 'pfm-income',
          'iconColor': 'FFFFFF'
        },
        'pfmOperationId': 56450454474
      }]

      const convertedOperations = [{
        id: '56450454474',
        incomeBankID: '56450454474',
        incomeAccount: '56459645555',
        income: 50.0,
        outcomeBankID: '56450454474',
        outcomeAccount: '56459645555',
        outcome: 0.0,

        mcc: undefined,
        payee: undefined,

        date: moment.parseZone('2018-11-13T00:00:00+03:00').toDate(),
        hold: false,

        opIncome: undefined,
        opIncomeInstrument: undefined,
        opOutcome: undefined,
        opOutcomeInstrument: undefined,

        latitude: undefined,
        longitude: undefined
      }]

      let result = converters.convertOperations(operations)

      expect(result).toEqual(convertedOperations)
    })
  })
})
