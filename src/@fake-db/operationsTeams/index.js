// src/@fake-db/operationsTeams.js

import mock from 'src/@fake-db/mock'

const operationsTeams = [
  {
    id: 1,
    name: 'Team Alpha'
  },
  {
    id: 2,
    name: 'Team Beta'
  },
  {
    id: 3,
    name: 'Team Gamma'
  },
  {
    id: 4,
    name: 'Team Delta'
  }
]

mock.onGet('/operations-teams').reply(200, operationsTeams)
