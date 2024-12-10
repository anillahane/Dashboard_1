// src/@fake-db/sales-leads.js

import mock from 'src/@fake-db/mock'

const salesLeads = [
  {
    id: 2,
    clientName: 'Company ABC',
    status: 'Completed',
    contractStatus: 'Signed',
    salesManagerId: 3,
    contactEmail: 'contact@companyabc.com'
  }
]

mock.onGet('/sales-leads').reply(200, salesLeads)

mock.onPost('/sales-leads/add').reply(config => {
  const newLead = JSON.parse(config.data)
  salesLeads.push(newLead)
  return [200, newLead]
})

mock.onPut('/sales-leads/update').reply(config => {
  const updatedLead = JSON.parse(config.data)
  const leadIndex = salesLeads.findIndex(l => l.id === updatedLead.id)
  salesLeads[leadIndex] = updatedLead
  return [200, updatedLead]
})

mock.onDelete('/sales-leads/delete').reply(config => {
  const { id } = JSON.parse(config.data)
  const updatedLeads = salesLeads.filter(lead => lead.id !== id)
  return [200, updatedLeads]
})
