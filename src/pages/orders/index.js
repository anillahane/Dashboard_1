import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography
} from '@mui/material'
import Icon from 'src/@core/components/icon'

const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [statuses, setStatuses] = useState(['Pending', 'In Progress', 'Completed'])
  const [open, setOpen] = useState(false)
  const [currentOrder, setCurrentOrder] = useState({
    id: null,
    clientName: '',
    product: '',
    quantity: '',
    deliveryStatus: ''
  })
  const ability = useContext(AbilityContext)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    const response = await axios.get('/all-orders')
    setOrders(response.data)
  }

  const handleOpen = (order = { id: null, clientName: '', product: '', quantity: '', deliveryStatus: '' }) => {
    setCurrentOrder(order)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {
    if (currentOrder.id) {
      await axios.put('/orders/update', currentOrder)
    } else {
      await axios.post('/orders/add', currentOrder)
    }
    handleClose()
    fetchOrders()
  }

  const handleDelete = async id => {
    await axios.delete('/orders/delete', { data: { id } })
    fetchOrders()
  }

  if (!ability?.can('manage', 'orders')) {
    return <div>You do not have permission to view this page</div>
  }

  return (
    <div>
      <Button variant='contained' color='primary' onClick={() => handleOpen()}>
        <Icon icon='mdi:plus' fontSize='1.25rem' />
        Add Order
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Client Name</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Delivery Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id}>
                <TableCell>{order.clientName}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.deliveryStatus}</TableCell>
                <TableCell>
                  {ability?.can('manage', 'orders') && (
                    <>
                      <Button onClick={() => handleOpen(order)}>
                        <Icon icon='mdi:pen' fontSize='1.25rem' />
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(order.id)}>
                        <Icon icon='mdi:trash-can' fontSize='1.25rem' />
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentOrder.id ? 'Edit Order' : 'Add Order'}</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            label='Client Name'
            fullWidth
            value={currentOrder.clientName}
            onChange={e => setCurrentOrder({ ...currentOrder, clientName: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Product'
            fullWidth
            value={currentOrder.product}
            onChange={e => setCurrentOrder({ ...currentOrder, product: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Quantity'
            type='number'
            fullWidth
            value={currentOrder.quantity}
            onChange={e => setCurrentOrder({ ...currentOrder, quantity: e.target.value })}
          />
          <FormControl fullWidth margin='dense'>
            <InputLabel>Delivery Status</InputLabel>
            <Select
              value={currentOrder.deliveryStatus}
              onChange={e => setCurrentOrder({ ...currentOrder, deliveryStatus: e.target.value })}
            >
              {statuses.map(status => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            {currentOrder.id ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default OrdersPage
