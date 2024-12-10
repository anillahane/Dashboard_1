// src/@fake-db/orders.js

import mock from 'src/@fake-db/mock'

const orders = [
  {
    id: 1,
    clientName: 'Company XYZ',
    product: 'Product A',
    quantity: 10,
    deliveryStatus: 'Pending',
    salesManagerId: 1 // Linked to Sales Manager
  },
  {
    id: 2,
    clientName: 'Company ABC',
    product: 'Product B',
    quantity: 5,
    deliveryStatus: 'Completed',
    salesManagerId: 2
  }
]

mock.onGet('/all-orders').reply(200, orders)

mock.onPost('/orders/add').reply(config => {
  const newOrder = JSON.parse(config.data)
  orders.push(newOrder)
  return [200, newOrder]
})

mock.onPut('/orders/update').reply(config => {
  const updatedOrder = JSON.parse(config.data)
  const orderIndex = orders.findIndex(o => o.id === updatedOrder.id)
  orders[orderIndex] = updatedOrder
  return [200, updatedOrder]
})

mock.onDelete('/orders/delete').reply(config => {
  const { id } = JSON.parse(config.data)
  const updatedOrders = orders.filter(order => order.id !== id)
  return [200, updatedOrders]
})
