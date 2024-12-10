// src/@fake-db/accounts.js

import mock from 'src/@fake-db/mock'

const accounts = [
  {
    id: 1,
    name: 'Customer A',
    contactEmail: 'contact@cust-a.com',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Customer B',
    contactEmail: 'contact@cust-b.com',
    status: 'Inactive'
  }
]

mock.onGet('/accounts').reply(200, accounts)

mock.onPost('/accounts/add').reply(config => {
  const newAccount = JSON.parse(config.data)
  accounts.push(newAccount)
  return [200, newAccount]
})

mock.onPut('/accounts/update').reply(config => {
  const updatedAccount = JSON.parse(config.data)
  const accountIndex = accounts.findIndex(a => a.id === updatedAccount.id)
  accounts[accountIndex] = updatedAccount
  return [200, updatedAccount]
})

mock.onDelete('/accounts/delete').reply(config => {
  const { id } = JSON.parse(config.data)
  const updatedAccounts = accounts.filter(account => account.id !== id)
  return [200, updatedAccounts]
})
