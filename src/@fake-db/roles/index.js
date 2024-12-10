// src/@fake-db/roles.js

import mock from 'src/@fake-db/mock'

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'salesManager', label: 'Sales Manager' },
  { value: 'operationsTeam', label: 'Operations Team' },
  { value: 'invoicingTeam', label: 'Invoicing Team' },
  { value: 'client', label: 'Client' }
]

mock.onGet('/roles').reply(200, roles)
