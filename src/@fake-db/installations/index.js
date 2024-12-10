// src/@fake-db/installations.js

import mock from 'src/@fake-db/mock'

const installations = [
  {
    id: 1,
    clientName: 'Company XYZ',
    installationDate: '2024-01-15T00:00:00Z',
    status: 'Scheduled',
    installerId: 3 // Linked to installer (Operations team)
  },
  {
    id: 2,
    clientName: 'Company ABC',
    installationDate: '2024-03-15T00:00:00Z',
    status: 'Completed',
    installerId: 4
  }
]

mock.onGet('/installations').reply(200, installations)

mock.onPost('/installations/add').reply(config => {
  const newInstallation = JSON.parse(config.data)
  installations.push(newInstallation)
  return [200, newInstallation]
})

mock.onPut('/installations/update').reply(config => {
  const updatedInstallation = JSON.parse(config.data)
  const installationIndex = installations.findIndex(i => i.id === updatedInstallation.id)
  installations[installationIndex] = updatedInstallation
  return [200, updatedInstallation]
})

mock.onDelete('/installations/delete').reply(config => {
  const { id } = JSON.parse(config.data)
  const updatedInstallations = installations.filter(installation => installation.id !== id)
  return [200, updatedInstallations]
})
