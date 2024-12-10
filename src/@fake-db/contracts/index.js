// src/@fake-db/contracts.js

import mock from 'src/@fake-db/mock'

const contracts = [
  {
    id: 1,
    clientName: 'Company XYZ',
    contractName: 'Contract A',
    status: 'Drafted',
    contractSigned: false,
    salesManagerId: 1 // Linked to Sales Manager
  },
  {
    id: 2,
    clientName: 'Company ABC',
    contractName: 'Contract B',
    status: 'Signed',
    contractSigned: true,
    salesManagerId: 2
  }
]

mock.onGet('/contracts').reply(200, contracts)

mock.onPost('/contracts/add').reply(config => {
  const newContract = JSON.parse(config.data)
  contracts.push(newContract)
  return [200, newContract]
})

mock.onPut('/contracts/update').reply(config => {
  const updatedContract = JSON.parse(config.data)
  const contractIndex = contracts.findIndex(c => c.id === updatedContract.id)
  contracts[contractIndex] = updatedContract
  return [200, updatedContract]
})

mock.onDelete('/contracts/delete').reply(config => {
  const { id } = JSON.parse(config.data)
  const updatedContracts = contracts.filter(contract => contract.id !== id)
  return [200, updatedContracts]
})
