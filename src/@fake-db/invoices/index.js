// src/@fake-db/invoices.js

import mock from 'src/@fake-db/mock'

const invoices = [
  {
    id: 1,
    clientName: 'Company XYZ',
    invoiceNumber: 'INV-001',
    amount: 1200.5,
    dueDate: '2024-10-15',
    status: 'Pending'
  },
  {
    id: 2,
    clientName: 'Company ABC',
    invoiceNumber: 'INV-002',
    amount: 750.0,
    dueDate: '2024-09-30',
    status: 'Paid'
  }
]

mock.onGet('/invoices').reply(200, invoices)

mock.onPost('/invoices/add').reply(config => {
  const newInvoice = JSON.parse(config.data)
  invoices.push(newInvoice)
  return [200, newInvoice]
})

mock.onPut('/invoices/update').reply(config => {
  const updatedInvoice = JSON.parse(config.data)
  const invoiceIndex = invoices.findIndex(i => i.id === updatedInvoice.id)
  invoices[invoiceIndex] = updatedInvoice
  return [200, updatedInvoice]
})

mock.onDelete('/invoices/delete').reply(config => {
  const { id } = JSON.parse(config.data)
  const updatedInvoices = invoices.filter(invoice => invoice.id !== id)
  return [200, updatedInvoices]
})
