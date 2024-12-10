// src/@fake-db/contacts.js

import mock from 'src/@fake-db/mock'

const contacts = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    position: 'Sales Manager',
    address: '123, Main Street, Sydney, Australia',
    accountId: 1 // Linked to Account
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+0987654321',
    position: 'Operations Coordinator',
    address: '456, George Street, Sydney, Australia',
    accountId: 2
  }
]

mock.onGet('/contacts').reply(200, contacts)

mock.onPost('/contacts/add').reply(config => {
  const newContact = JSON.parse(config.data)
  contacts.push(newContact)
  return [200, newContact]
})

mock.onPut('/contacts/update').reply(config => {
  const updatedContact = JSON.parse(config.data)
  const contactIndex = contacts.findIndex(c => c.id === updatedContact.id)
  contacts[contactIndex] = updatedContact
  return [200, updatedContact]
})

mock.onDelete('/contacts/delete').reply(config => {
  const { id } = JSON.parse(config.data)
  const updatedContacts = contacts.filter(contact => contact.id !== id)
  return [200, updatedContacts]
})
