import moment from 'moment'

import * as network from '../../common/network'
import * as utils from '../../common/utils'
import * as ZenMoney from '../../common/ZenMoney'

import * as index from './index'

jest.mock('../../common/network')
jest.mock('../../common/utils')
jest.mock('../../common/ZenMoney')

describe('integration tests for vostochny', () => {
  const server = {
    version: {
      input: {
        url: 'https://mobws.faktura.ru/mobws/3.0/json/getPFMVersion',
        body: {
          applicationCode: 'express-bank',
          appver: '3.10',
          locale: 'en'
        }
      },
      output: {
        status: 200,
        body: {
          'response': {
            'object': {
              'revision': 7
            },
            'result': 0
          }
        }
      }
    },

    register: {
      input: {
        url: 'https://mobws.faktura.ru/mobws/3.0/json/login',
        body: {
          publicKey: 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALiymAZVhd1Zc9jHyHqbDRH9Xm9Vdw9vDXlmpU59n0Ktx2vHYjhGJdLu1VoeXVjRnLCUzZnIkjJhj1xb2c+mrWECAwEAAQ==',
          osId: 'unknown',
          deviceId: 'unknown',
          password: 'password',
          applicationStage: 'production',
          wifiMacAddress: '00:00:00:00:00:00',
          applicationCode: 'express-bank',
          deviceType: 'android',
          locale: 'en',
          imei: '000000000000000',
          appver: '3.10',
          login: 'username',
          pushEnabled: 'false',
          osVersion: '23',
          root: 'true',
          deviceName: 'unknown',
          applicationId: 'ru.ftc.faktura.expressbank',
          vendor: 'unknown',
          hasHceModule: 'false',
          model: 'unknown'
        }
      },
      output: {
        status: 200,
        body: {
          'response': {
            'object': {
              'instanceId': null,
              'removeWToken': true,
              'sessionId': 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3',
              'timeout': 600
            },
            'result': 1
          }
        }
      }
    },

    verify: {
      input: {
        url: 'https://mobws.faktura.ru/mobws/3.0/json/login',
        body: {
          publicKey: 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALiymAZVhd1Zc9jHyHqbDRH9Xm9Vdw9vDXlmpU59n0Ktx2vHYjhGJdLu1VoeXVjRnLCUzZnIkjJhj1xb2c+mrWECAwEAAQ==',
          osId: 'unknown',
          deviceId: 'unknown',
          password: 'password',
          applicationStage: 'production',
          wifiMacAddress: '00:00:00:00:00:00',
          applicationCode: 'express-bank',
          deviceType: 'android',
          locale: 'en',
          imei: '000000000000000',
          appver: '3.10',
          login: 'username',
          pushEnabled: 'false',
          osVersion: '23',
          verificationCode: '123456',
          root: 'true',
          deviceName: 'unknown',
          applicationId: 'ru.ftc.faktura.expressbank',
          vendor: 'unknown',
          hasHceModule: 'false',
          model: 'unknown'
        }
      },
      output: {
        status: 200,
        body: {
          'response': {
            'object': {
              'absClientId': '238880714751',
              'bankInfos': [
                {
                  'bic': '040813886',
                  'city': 'г.Хабаровск',
                  'corAccount': '30101810600000000886',
                  'fullName': 'ДАЛЬНЕВОСТОЧНЫЙ ФИЛИАЛ ПАО КБ "ВОСТОЧНЫЙ", g.Khabarovsk',
                  'id': 7907049,
                  'inn': '2801015394',
                  'kpp': '272302001',
                  'legalAddress': '680007, г. Хабаровск, ул Шевчука, 23',
                  'mainBranch': false,
                  'name': 'ДАЛЬНЕВОСТОЧНЫЙ ФИЛИАЛ ПАО КБ "ВОСТОЧНЫЙ"',
                  'nameShort': 'ДАЛЬНЕВОСТОЧНЫЙ ФИЛИАЛ ПАО КБ "ВОСТОЧНЫЙ"',
                  'network': 15715145107,
                  'settings': { /* settings omitted */ },
                  'supportEmails': []
                },
                {
                  'bic': '041012718',
                  'city': 'г.Благовещенск',
                  'contacts': [
                    {
                      'notes': '',
                      'phone': '8-800-100-7-100'
                    }
                  ],
                  'corAccount': '30101810700000000718',
                  'fullName': 'ПАО КБ "ВОСТОЧНЫЙ", g.Blagoveshchensk',
                  'id': 11991,
                  'inn': '2801015394',
                  'kpp': '280101001',
                  'legalAddress': '675000, г. Благовещенск, пер Святителя Иннокентия, 1',
                  'mainBranch': true,
                  'name': 'ПАО КБ "ВОСТОЧНЫЙ"',
                  'nameShort': 'ПАО КБ "ВОСТОЧНЫЙ"',
                  'network': 15715145107,
                  'pushState': 'NONE',
                  'settings': { /* settings omitted */ },
                  'supportEmails': [
                    'testib@vostbank.ru'
                  ]
                }
              ],
              'pushEnabledTimeout': 60,
              'removeWToken': true,
              'session': {
                'instanceId': '42204229D69F53C653EB7ECCF67A7446',
                'removeWToken': false,
                'sessionId': 'D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3',
                'timeout': 600
              },
              'user': {
                'firstName': 'Иван',
                'lastName': 'Иванов',
                'name': 'Иванов Иван Иванович',
                'secondName': 'Иванович',
                'userId': '56351776127'
              }
            },
            'result': 0
          }
        }
      }
    },

    setPin: {
      input: {
        url: 'https://mobws.faktura.ru/mobws/3.0/json/setPin',
        body: {
          appver: '3.10',
          locale: 'en',
          pin: '1235'
        }
      },
      output: {
        status: 200,
        body: {
          'response': {
            'result': 0
          }
        }
      }
    },

    loginByPin: {
      input: {
        url: 'https://mobws.faktura.ru/mobws/3.0/json/loginByPin',
        body: {
          osId: 'unknown',
          applicationCode: 'express-bank',
          wifiMacAddress: '00:00:00:00:00:00',
          locale: 'en',
          deviceType: 'android',
          pin: '4321',
          imei: '000000000000000',
          appver: '3.10',
          login: 'username',
          osVersion: '23',
          pushEnabled: 'false',
          instanceId: '42204229D69F53C653EB7ECCF67A7446',
          root: 'true',
          deviceName: 'unknown',
          vendor: 'unknown',
          model: 'unknown',
          hasHceModule: 'false'
        }
      },
      output: {
        status: 200,
        body: {
          'response': {
            'object': {
              'absClientId': '238880714751',
              'bankInfos': [
                {
                  'bic': '040813886',
                  'city': 'г.Хабаровск',
                  'corAccount': '30101810600000000886',
                  'fullName': 'ДАЛЬНЕВОСТОЧНЫЙ ФИЛИАЛ ПАО КБ "ВОСТОЧНЫЙ", g.Khabarovsk',
                  'id': 7907049,
                  'inn': '2801015394',
                  'kpp': '272302001',
                  'legalAddress': '680007, г. Хабаровск, ул Шевчука, 23',
                  'mainBranch': false,
                  'name': 'ДАЛЬНЕВОСТОЧНЫЙ ФИЛИАЛ ПАО КБ "ВОСТОЧНЫЙ"',
                  'nameShort': 'ДАЛЬНЕВОСТОЧНЫЙ ФИЛИАЛ ПАО КБ "ВОСТОЧНЫЙ"',
                  'network': 15715145107,
                  'settings': { /* settings omitted */ },
                  'supportEmails': []
                },
                {
                  'bic': '041012718',
                  'city': 'г.Благовещенск',
                  'contacts': [
                    {
                      'notes': '',
                      'phone': '8-800-100-7-100'
                    }
                  ],
                  'corAccount': '30101810700000000718',
                  'fullName': 'ПАО КБ "ВОСТОЧНЫЙ", g.Blagoveshchensk',
                  'id': 11991,
                  'inn': '2801015394',
                  'kpp': '280101001',
                  'legalAddress': '675000, г. Благовещенск, пер Святителя Иннокентия, 1',
                  'mainBranch': true,
                  'name': 'ПАО КБ "ВОСТОЧНЫЙ"',
                  'nameShort': 'ПАО КБ "ВОСТОЧНЫЙ"',
                  'network': 15715145107,
                  'pushState': 'NONE',
                  'settings': { /* settings omitted */ },
                  'supportEmails': [
                    'testib@vostbank.ru'
                  ]
                }
              ],
              'pushEnabledTimeout': 60,
              'removeWToken': true,
              'session': {
                'instanceId': '42204229D69F53C653EB7ECCF67A7446',
                'removeWToken': false,
                'sessionId': '97F5A75E78F4948A32F3D5C7BD66B1CC.BnkMobws2_1',
                'timeout': 600
              },
              'user': {
                'firstName': 'Иван',
                'lastName': 'Иванов',
                'name': 'Иванов Иван Иванович',
                'secondName': 'Иванович',
                'userId': '56351776127'
              }
            },
            'result': 0
          }
        }
      }
    },

    accounts: {
      input: {
        url: 'https://mobws.faktura.ru/mobws/3.0/json/getMyFinancesPage',
        body: {
          appver: '3.10',
          type: 'ACCOUNTS',
          locale: 'en',
          bankId: '11991'
        }
      },
      output: {
        status: 200,
        body: {
          'response': {
            'object': {
              'accounts': {
                'accounts': [
                  {
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
                  },
                  {
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
                  }
                ],
                'b2pCards': null
              },
              'bonusTotals': null,
              'depositList': null,
              'loanList': null
            },
            'result': 0
          }
        }
      }
    },

    operationsFirst: {
      input: {
        url: 'https://mobws.faktura.ru/mobws/3.0/json/pfmTape',
        body: {
          to: '22.11.2018',
          from: '01.11.2018',
          appver: '3.10',
          locale: 'en',
          bankId: '11991',
          countForPage: 40
        }
      },
      output: {
        status: 200,
        body: {
          'response': {
            'object': {
              'expenses': [
                {
                  'amount': 100.0,
                  'currency': {
                    'code': 'RUB',
                    'name': 'Российский рубль',
                    'roundDecimals': -2,
                    'shortName': 'р.'
                  }
                }
              ],
              'incoming': [
                {
                  'amount': 100.0,
                  'currency': {
                    'code': 'RUB',
                    'name': 'Российский рубль',
                    'roundDecimals': -2,
                    'shortName': 'р.'
                  }
                }
              ],
              'operations': [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
                20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
                30, 31, 32, 33, 34, 35, 36, 37, 38, 39
              ].map(item => ({
                'accountId': 56367569999,
                'amount': -100.0,
                'authId': '683837',
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
                'id': 56607812602 + item,
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
                'pfmOperationId': 56607812602 + item
              }))
            },
            'result': 0
          }
        }
      }
    },

    operationsNext: {
      input: {
        url: 'https://mobws.faktura.ru/mobws/3.0/json/pfmTape',
        body: {
          to: '22.11.2018',
          from: '01.11.2018',
          appver: '3.10',
          locale: 'en',
          bankId: '11991',
          countForPage: 40,
          lastOperationId: 56607812602 + 39
        }
      },
      output: {
        status: 200,
        body: {
          'response': {
            'object': {
              'expenses': [
                {
                  'amount': 100.0,
                  'currency': {
                    'code': 'RUB',
                    'name': 'Российский рубль',
                    'roundDecimals': -2,
                    'shortName': 'р.'
                  }
                }
              ],
              'incoming': [
                {
                  'amount': 100.0,
                  'currency': {
                    'code': 'RUB',
                    'name': 'Российский рубль',
                    'roundDecimals': -2,
                    'shortName': 'р.'
                  }
                }
              ],
              'operations': [
                39, // duplicates can happen
                40
              ].map(item => ({
                'accountId': 56367569999,
                'amount': -100.0,
                'authId': '683837',
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
                'id': 56607812602 + item,
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
                'pfmOperationId': 5660756607812602 + item
              }))
            },
            'result': 0
          }
        }
      }
    },

    operationsSole: {
      input: {
        url: 'https://mobws.faktura.ru/mobws/3.0/json/pfmTape',
        body: {
          to: '22.11.2018',
          from: '01.11.2018',
          appver: '3.10',
          locale: 'en',
          bankId: '11991',
          countForPage: 40
        }
      },
      output: {
        status: 200,
        body: {
          'response': {
            'object': {
              'expenses': [
                {
                  'amount': 100.0,
                  'currency': {
                    'code': 'RUB',
                    'name': 'Российский рубль',
                    'roundDecimals': -2,
                    'shortName': 'р.'
                  }
                }
              ],
              'incoming': [
                {
                  'amount': 100.0,
                  'currency': {
                    'code': 'RUB',
                    'name': 'Российский рубль',
                    'roundDecimals': -2,
                    'shortName': 'р.'
                  }
                }
              ],
              'operations': [
                0
              ].map(item => ({
                'accountId': 56367569999,
                'amount': -100.0,
                'authId': '683837',
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
                'id': 56607812602 + item,
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
                'pfmOperationId': 5660756607812602 + item
              }))
            },
            'result': 0
          }
        }
      }
    }
  }

  const expectedResult = {
    accounts: [
      {
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
      },
      {
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
      }
    ],
    transactions: [
      // first page
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
      20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
      30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      // next page
      40
    ].map(item => ({
      id: (56607812602 + item).toString(),
      incomeBankID: (56607812602 + item).toString(),
      incomeAccount: '56367569999',
      income: 0.0,
      outcomeBankID: (56607812602 + item).toString(),
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
    }))
  }

  const expectedResultSole = {
    accounts: [
      {
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
      },
      {
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
      }
    ],
    transactions: [
      // sole page
      0
    ].map(item => ({
      id: (56607812602 + item).toString(),
      incomeBankID: (56607812602 + item).toString(),
      incomeAccount: '56367569999',
      income: 0.0,
      outcomeBankID: (56607812602 + item).toString(),
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
    }))
  }

  describe('first time sync scenario when password is saved in preferences', () => {
    const args = {
      preferences: { login: 'username', password: 'password' },
      fromDate: moment.parseZone('2018-11-01T00:00:00+03:00').toDate(),
      toDate: moment.parseZone('2018-11-22T00:00:00+03:00').toDate()
    }

    let returnedResult

    let setAndSaveCallOrder

    beforeAll(async () => {
      // Setup network.fetch behaviour

      network.fetch
        .mockResolvedValueOnce(server.version.output)
        .mockResolvedValueOnce(server.register.output)
        .mockResolvedValueOnce(server.verify.output)
        .mockResolvedValueOnce(server.setPin.output)
        .mockResolvedValueOnce(server.accounts.output)
        .mockResolvedValueOnce(server.operationsFirst.output)
        .mockResolvedValueOnce(server.operationsNext.output)

      // Setup utils module behaviour

      utils.generateRandomPin4
        .mockReturnValue('1235')

      // Setup ZenMoney functions behaviour

      ZenMoney.getData
        .mockReturnValue(undefined) // all storage data are to be <undefined>
      ZenMoney.readLine
        .mockResolvedValue('123456')
      ZenMoney.isAccountSkipped
        .mockReturnValue(false)

      setAndSaveCallOrder = []
      ZenMoney.setData.mockImplementation(() => {
        setAndSaveCallOrder.push('setData')
      })
      ZenMoney.saveData.mockImplementation(() => {
        setAndSaveCallOrder.push('saveData')
      })

      // Execute

      returnedResult = await index.scrape(args)
    })

    afterAll(() => {
      network.fetch.mockReset()
      utils.generateRandomPin4.mockReset()
      ZenMoney.getData.mockReset()
      ZenMoney.readLine.mockReset()
      ZenMoney.isAccountSkipped.mockReset()
      ZenMoney.setData.mockReset()
      ZenMoney.saveData.mockReset()
    })

    it('should call server API through network.fetch in defined order', () => {
      const cookie = 'JSESSIONID=D3AEE0D745EC3955995E0B56F83EC037.BnkMobws2_3'

      expect(network.fetch).nthCalledWith(
        1,
        server.version.input.url,
        expect.objectContaining({
          headers: expect.not.objectContaining({ cookie: expect.anything() }),
          body: server.version.input.body
        })
      )
      expect(network.fetch).nthCalledWith(
        2,
        server.register.input.url,
        expect.objectContaining({
          headers: expect.not.objectContaining({ cookie: expect.anything() }),
          body: server.register.input.body
        })
      )
      expect(network.fetch).nthCalledWith(
        3,
        server.verify.input.url,
        expect.objectContaining({
          headers: expect.objectContaining({ cookie }),
          body: server.verify.input.body
        })
      )
      expect(network.fetch).nthCalledWith(
        4,
        server.setPin.input.url,
        expect.objectContaining({
          headers: expect.objectContaining({ cookie }),
          body: server.setPin.input.body
        })
      )
      expect(network.fetch).nthCalledWith(
        5,
        server.accounts.input.url,
        expect.objectContaining({
          headers: expect.objectContaining({ cookie }),
          body: server.accounts.input.body
        })
      )
      expect(network.fetch).nthCalledWith(
        6,
        server.operationsFirst.input.url,
        expect.objectContaining({
          headers: expect.objectContaining({ cookie }),
          body: server.operationsFirst.input.body
        })
      )
      expect(network.fetch).nthCalledWith(
        7,
        server.operationsNext.input.url,
        expect.objectContaining({
          headers: expect.objectContaining({ cookie }),
          body: server.operationsNext.input.body
        })
      )
    })

    it('should get storage data', () => {
      expect(ZenMoney.getData).toBeCalledWith('instanceId')
      expect(ZenMoney.getData).toBeCalledWith('pin')
    })

    it('should request verification code from user and nothing more', () => {
      expect(ZenMoney.readLine)
        .toBeCalledWith(expect.stringContaining('введите код из СМС'))
      expect(ZenMoney.readLine)
        .toBeCalledTimes(1)
    })

    it('should set and save storage data', () => {
      expect(ZenMoney.setData)
        .toBeCalledWith('pin', '1235')
      expect(ZenMoney.setData)
        .toBeCalledWith('instanceId', '42204229D69F53C653EB7ECCF67A7446')
      expect(setAndSaveCallOrder).toEqual(['setData', 'setData', 'saveData'])
    })

    it('should check for each transaction if it must be skipped', () => {
      expect(ZenMoney.isAccountSkipped)
        .toBeCalledTimes(returnedResult.transactions.length)
    })

    it('should return expected accounts and transactions', () => {
      expect(returnedResult).toEqual(expectedResult)
    })
  })

  describe('first time sync scenario when password is not saved in preferences', () => {
    const args = {
      preferences: { login: 'username', password: undefined },
      fromDate: moment.parseZone('2018-11-01T00:00:00+03:00').toDate(),
      toDate: moment.parseZone('2018-11-22T00:00:00+03:00').toDate()
    }

    let returnedResult

    beforeAll(async () => {
      // Setup network.fetch behaviour
      network.fetch
        .mockResolvedValueOnce(server.version.output)
        .mockResolvedValueOnce(server.register.output)
        .mockResolvedValueOnce(server.verify.output)
        .mockResolvedValueOnce(server.setPin.output)
        .mockResolvedValueOnce(server.accounts.output)
        .mockResolvedValueOnce(server.operationsFirst.output)
        .mockResolvedValueOnce(server.operationsNext.output)

      // Setup ZenMoney functions behaviour
      ZenMoney.readLine.mockImplementation(input => {
        if (input.includes('введите пароль')) {
          return Promise.resolve('password2')
        }
        if (input.includes('введите код из СМС')) {
          return Promise.resolve('123456')
        }
        return Promise.resolve()
      })
      ZenMoney.isAccountSkipped
        .mockReturnValue(false)

      // Execute
      returnedResult = await index.scrape(args)
    })

    afterAll(() => {
      network.fetch.mockReset()
      ZenMoney.readLine.mockReset()
      ZenMoney.isAccountSkipped.mockReset()
    })

    it('should call server API through network.fetch in defined order', () => {
      expect(network.fetch).nthCalledWith(
        2,
        server.register.input.url,
        expect.objectContaining({
          body: expect.objectContaining({ password: 'password2' })
        })
      )
      expect(network.fetch).nthCalledWith(
        3,
        server.verify.input.url,
        expect.objectContaining({
          body: expect.objectContaining({ password: 'password2' })
        })
      )
    })

    it('should request both password and verification code from user and nothing more', () => {
      expect(ZenMoney.readLine)
        .toBeCalledWith(expect.stringContaining('введите пароль'))
      expect(ZenMoney.readLine)
        .toBeCalledWith(expect.stringContaining('введите код из СМС'))
      expect(ZenMoney.readLine)
        .toBeCalledTimes(2)
    })

    it('should return expected accounts and transactions', () => {
      expect(returnedResult).toEqual(expectedResult)
    })
  })

  describe('sync by pin scenario', () => {
    const args = {
      preferences: { login: 'username', password: 'password3' },
      fromDate: moment.parseZone('2018-11-01T00:00:00+03:00').toDate(),
      toDate: moment.parseZone('2018-11-22T00:00:00+03:00').toDate()
    }

    let returnedResult

    beforeAll(async () => {
      // Setup network.fetch behaviour
      network.fetch
        .mockResolvedValueOnce(server.version.output)
        .mockResolvedValueOnce(server.loginByPin.output)
        .mockResolvedValueOnce(server.accounts.output)
        .mockResolvedValueOnce(server.operationsFirst.output)
        .mockResolvedValueOnce(server.operationsNext.output)

      // Setup ZenMoney functions behaviour
      ZenMoney.getData.mockImplementation(name => {
        if (name === 'instanceId') return '42204229D69F53C653EB7ECCF67A7446'
        if (name === 'pin') return '4321'
        return undefined
      })
      ZenMoney.isAccountSkipped
        .mockReturnValue(false)

      // Execute
      returnedResult = await index.scrape(args)
    })

    afterAll(() => {
      network.fetch.mockReset()
      ZenMoney.getData.mockReset()
      ZenMoney.isAccountSkipped.mockReset()
    })

    it('should call server API through network.fetch in defined order', () => {
      const cookie = 'JSESSIONID=97F5A75E78F4948A32F3D5C7BD66B1CC.BnkMobws2_1'

      expect(network.fetch).nthCalledWith(
        1,
        server.version.input.url,
        expect.objectContaining({
          headers: expect.not.objectContaining({ cookie: expect.anything() }),
          body: server.version.input.body
        })
      )
      expect(network.fetch).nthCalledWith(
        2,
        server.loginByPin.input.url,
        expect.objectContaining({
          headers: expect.not.objectContaining({ cookie: expect.anything() }),
          body: server.loginByPin.input.body
        })
      )
      expect(network.fetch).nthCalledWith(
        3,
        server.accounts.input.url,
        expect.objectContaining({
          headers: expect.objectContaining({ cookie }),
          body: server.accounts.input.body
        })
      )
      expect(network.fetch).nthCalledWith(
        4,
        server.operationsFirst.input.url,
        expect.objectContaining({
          headers: expect.objectContaining({ cookie }),
          body: server.operationsFirst.input.body
        })
      )
      expect(network.fetch).nthCalledWith(
        5,
        server.operationsNext.input.url,
        expect.objectContaining({
          headers: expect.objectContaining({ cookie }),
          body: server.operationsNext.input.body
        })
      )
    })

    it('should get storage data', () => {
      expect(ZenMoney.getData).toBeCalledWith('instanceId')
      expect(ZenMoney.getData).toBeCalledWith('pin')
    })

    it('should not request anything from user', () => {
      expect(ZenMoney.readLine)
        .toBeCalledTimes(0)
    })

    it('should return expected accounts and transactions', () => {
      expect(returnedResult).toEqual(expectedResult)
    })
  })

  describe('first time sync scenario when something gone wrong', () => {
    const args = {
      preferences: { login: 'username', password: 'password' },
      fromDate: moment.parseZone('2018-11-01T00:00:00+03:00').toDate(),
      toDate: moment.parseZone('2018-11-22T00:00:00+03:00').toDate()
    }

    beforeAll(() => {
      // Setup ZenMoney functions behaviour
      ZenMoney.getData
        .mockReturnValue(undefined) // all storage data are to be <undefined>
      ZenMoney.readLine
        .mockReturnValue('123456')
      ZenMoney.isAccountSkipped
        .mockReturnValue(false)
    })

    afterAll(() => {
      utils.generateRandomPin4.mockReset()
      ZenMoney.getData.mockReset()
      ZenMoney.readLine.mockReset()
      ZenMoney.isAccountSkipped.mockReset()
    })

    it('should throw if network.fetch throws at <version> call', async () => {
      network.fetch
        .mockRejectedValueOnce(new Error('version'))
        .mockResolvedValueOnce(server.register.output)
        .mockResolvedValueOnce(server.verify.output)
        .mockResolvedValueOnce(server.setPin.output)
        .mockResolvedValueOnce(server.accounts.output)
        .mockResolvedValueOnce(server.operationsFirst.output)
        .mockResolvedValueOnce(server.operationsNext.output)

      let returnedResponse = index.scrape(args)

      await expect(returnedResponse).rejects.toThrow('version')

      network.fetch.mockReset()
    })

    it('should throw if network.fetch throws at <register> call', async () => {
      network.fetch
        .mockResolvedValueOnce(server.version.output)
        .mockRejectedValueOnce(new Error('register'))
        .mockResolvedValueOnce(server.verify.output)
        .mockResolvedValueOnce(server.setPin.output)
        .mockResolvedValueOnce(server.accounts.output)
        .mockResolvedValueOnce(server.operationsFirst.output)
        .mockResolvedValueOnce(server.operationsNext.output)

      let returnedResponse = index.scrape(args)

      await expect(returnedResponse).rejects.toThrow('register')

      network.fetch.mockReset()
    })

    it('should throw if network.fetch throws at <verify> call', async () => {
      network.fetch
        .mockResolvedValueOnce(server.version.output)
        .mockResolvedValueOnce(server.register.output)
        .mockRejectedValueOnce(new Error('verify'))
        .mockResolvedValueOnce(server.setPin.output)
        .mockResolvedValueOnce(server.accounts.output)
        .mockResolvedValueOnce(server.operationsFirst.output)
        .mockResolvedValueOnce(server.operationsNext.output)

      let returnedResponse = index.scrape(args)

      await expect(returnedResponse).rejects.toThrow('verify')

      network.fetch.mockReset()
    })

    it('should throw if network.fetch throws at <setPin> call', async () => {
      network.fetch
        .mockResolvedValueOnce(server.version.output)
        .mockResolvedValueOnce(server.register.output)
        .mockResolvedValueOnce(server.verify.output)
        .mockRejectedValueOnce(new Error('setPin'))
        .mockResolvedValueOnce(server.accounts.output)
        .mockResolvedValueOnce(server.operationsFirst.output)
        .mockResolvedValueOnce(server.operationsNext.output)

      let returnedResponse = index.scrape(args)

      await expect(returnedResponse).rejects.toThrow('setPin')

      network.fetch.mockReset()
    })

    it('should throw if network.fetch throws at <accounts> call', async () => {
      network.fetch
        .mockResolvedValueOnce(server.version.output)
        .mockResolvedValueOnce(server.register.output)
        .mockResolvedValueOnce(server.verify.output)
        .mockResolvedValueOnce(server.setPin.output)
        .mockRejectedValueOnce(new Error('accounts'))
        .mockResolvedValueOnce(server.operationsFirst.output)
        .mockResolvedValueOnce(server.operationsNext.output)

      let returnedResponse = index.scrape(args)

      await expect(returnedResponse).rejects.toThrow('accounts')

      network.fetch.mockReset()
    })

    it('should throw if network.fetch throws at <operations> first call', async () => {
      network.fetch
        .mockResolvedValueOnce(server.version.output)
        .mockResolvedValueOnce(server.register.output)
        .mockResolvedValueOnce(server.verify.output)
        .mockResolvedValueOnce(server.setPin.output)
        .mockResolvedValueOnce(server.accounts.output)
        .mockRejectedValueOnce(new Error('operationsFirst'))
        .mockResolvedValueOnce(server.operationsNext.output)

      let returnedResponse = index.scrape(args)

      await expect(returnedResponse).rejects.toThrow('operationsFirst')

      network.fetch.mockReset()
    })

    it('should throw if network.fetch throws at <operations> next call', async () => {
      network.fetch
        .mockResolvedValueOnce(server.version.output)
        .mockResolvedValueOnce(server.register.output)
        .mockResolvedValueOnce(server.verify.output)
        .mockResolvedValueOnce(server.setPin.output)
        .mockResolvedValueOnce(server.accounts.output)
        .mockResolvedValueOnce(server.operationsFirst.output)
        .mockRejectedValueOnce(new Error('operationsNext'))

      let returnedResponse = index.scrape(args)

      await expect(returnedResponse).rejects.toThrow('operationsNext')

      network.fetch.mockReset()
    })
  })

  describe('sync by pin scenario when something gone wrong', () => {
    const args = {
      preferences: { login: 'username', password: 'password3' },
      fromDate: moment.parseZone('2018-11-01T00:00:00+03:00').toDate(),
      toDate: moment.parseZone('2018-11-22T00:00:00+03:00').toDate()
    }

    beforeAll(() => {
      // Setup ZenMoney functions behaviour
      ZenMoney.getData.mockImplementation(name => {
        if (name === 'instanceId') return '42204229D69F53C653EB7ECCF67A7446'
        if (name === 'pin') return '4321'
        return undefined
      })
      ZenMoney.isAccountSkipped
        .mockReturnValue(false)
    })

    afterAll(() => {
      network.fetch.mockReset()
      ZenMoney.getData.mockReset()
      ZenMoney.isAccountSkipped.mockReset()
    })

    it('should throw if network.fetch throws at <version> call', async () => {
      network.fetch
        .mockRejectedValueOnce(new Error('version'))
        .mockResolvedValueOnce(server.loginByPin.output)
        .mockResolvedValueOnce(server.accounts.output)
        .mockResolvedValueOnce(server.operationsFirst.output)
        .mockResolvedValueOnce(server.operationsNext.output)

      let returnedResponse = index.scrape(args)

      await expect(returnedResponse).rejects.toThrow('version')

      network.fetch.mockReset()
    })

    it('should throw if network.fetch throws at <loginByPin> call', async () => {
      network.fetch
        .mockResolvedValueOnce(server.version.output)
        .mockRejectedValueOnce(new Error('loginByPin'))
        .mockResolvedValueOnce(server.accounts.output)
        .mockResolvedValueOnce(server.operationsFirst.output)
        .mockResolvedValueOnce(server.operationsNext.output)

      let returnedResponse = index.scrape(args)

      await expect(returnedResponse).rejects.toThrow('loginByPin')

      network.fetch.mockReset()
    })

    it('should throw if network.fetch throws at <accounts> call', async () => {
      network.fetch
        .mockResolvedValueOnce(server.version.output)
        .mockResolvedValueOnce(server.loginByPin.output)
        .mockRejectedValueOnce(new Error('accounts'))
        .mockResolvedValueOnce(server.operationsFirst.output)
        .mockResolvedValueOnce(server.operationsNext.output)

      let returnedResponse = index.scrape(args)

      await expect(returnedResponse).rejects.toThrow('accounts')

      network.fetch.mockReset()
    })

    it('should throw if network.fetch throws at <operations> first call', async () => {
      network.fetch
        .mockResolvedValueOnce(server.version.output)
        .mockResolvedValueOnce(server.loginByPin.output)
        .mockResolvedValueOnce(server.accounts.output)
        .mockRejectedValueOnce(new Error('operationsFirst'))
        .mockResolvedValueOnce(server.operationsNext.output)

      let returnedResponse = index.scrape(args)

      await expect(returnedResponse).rejects.toThrow('operationsFirst')

      network.fetch.mockReset()
    })

    it('should throw if network.fetch throws at <operations> next call', async () => {
      network.fetch
        .mockResolvedValueOnce(server.version.output)
        .mockResolvedValueOnce(server.loginByPin.output)
        .mockResolvedValueOnce(server.accounts.output)
        .mockResolvedValueOnce(server.operationsFirst.output)
        .mockRejectedValueOnce(new Error('operationsNext'))

      let returnedResponse = index.scrape(args)

      await expect(returnedResponse).rejects.toThrow('operationsNext')

      network.fetch.mockReset()
    })
  })

  describe('when only one page of operations returned (based on sync by pin scenario)', () => {
    const args = {
      preferences: { login: 'username', password: 'password4' },
      fromDate: moment.parseZone('2018-11-01T00:00:00+03:00').toDate(),
      toDate: moment.parseZone('2018-11-22T00:00:00+03:00').toDate()
    }

    let returnedResult

    beforeAll(async () => {
      // Setup network.fetch behaviour
      network.fetch
        .mockResolvedValueOnce(server.version.output)
        .mockResolvedValueOnce(server.loginByPin.output)
        .mockResolvedValueOnce(server.accounts.output)
        .mockResolvedValueOnce(server.operationsSole.output)

      // Setup ZenMoney functions behaviour
      ZenMoney.getData.mockImplementation(name => {
        if (name === 'instanceId') return '42204229D69F53C653EB7ECCF67A7446'
        if (name === 'pin') return '4321'
        return undefined
      })
      ZenMoney.isAccountSkipped
        .mockReturnValue(false)

      // Execute
      returnedResult = await index.scrape(args)
    })

    afterAll(() => {
      network.fetch.mockReset()
      ZenMoney.getData.mockReset()
      ZenMoney.isAccountSkipped.mockReset()
    })

    it('should call server API through network.fetch in defined order and only four times', () => {
      expect(network.fetch).nthCalledWith(
        1,
        server.version.input.url,
        expect.anything()
      )
      expect(network.fetch).nthCalledWith(
        2,
        server.loginByPin.input.url,
        expect.anything()
      )
      expect(network.fetch).nthCalledWith(
        3,
        server.accounts.input.url,
        expect.anything()
      )
      expect(network.fetch).nthCalledWith(
        4,
        server.operationsSole.input.url,
        expect.anything()
      )
      expect(network.fetch).toBeCalledTimes(4)
    })

    it('should return expected accounts and transactions', () => {
      expect(returnedResult).toEqual(expectedResultSole)
    })
  })
})
