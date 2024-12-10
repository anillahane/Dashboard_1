// src/@fake-db/onboarding.js

import mock from 'src/@fake-db/mock'

const onboarding = [
  {
    id: 1,
    clientName: 'Company XYZ',
    onboardingStage: 'Initial Setup',
    status: 'In Progress',
    startDate: '2024-01-15T00:00:00Z',
    endDate: '2024-03-15T00:00:00Z',
    operationsTeamId: 3
  },
  {
    id: 2,
    clientName: 'Company ABC',
    onboardingStage: 'Final Review',
    status: 'Completed',
    startDate: '2024-02-01T00:00:00Z',
    endDate: '2024-04-01T00:00:00Z',
    operationsTeamId: 4
  }
]

mock.onGet('/onboarding').reply(200, onboarding)

mock.onPost('/onboarding/add').reply(config => {
  const newOnboarding = JSON.parse(config.data)
  onboarding.push(newOnboarding)
  return [200, newOnboarding]
})

mock.onPut('/onboarding/update').reply(config => {
  const updatedOnboarding = JSON.parse(config.data)
  const onboardingIndex = onboarding.findIndex(o => o.id === updatedOnboarding.id)
  onboarding[onboardingIndex] = updatedOnboarding
  return [200, updatedOnboarding]
})

mock.onDelete('/onboarding/delete').reply(config => {
  const { id } = JSON.parse(config.data)
  const updatedOnboarding = onboarding.filter(item => item.id !== id)
  return [200, updatedOnboarding]
})
