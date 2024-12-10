// src/pages/invoices/index.js

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography
} from '@mui/material'
import Icon from 'src/@core/components/icon'

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([])
  const [open, setOpen] = useState(false)
  const [currentInvoice, setCurrentInvoice] = useState(null)

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    const response = await axios.get('/invoices')
    setInvoices(response.data)
  }

  const handleOpen = invoice => {
    setCurrentInvoice(invoice)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {
    if (currentInvoice.id) {
      await axios.put('/invoices/update', currentInvoice)
    } else {
      await axios.post('/invoices/add', currentInvoice)
    }
    handleClose()
    fetchInvoices()
  }

  const handleDelete = async id => {
    await axios.delete('/invoices/delete', { data: { id } })
    fetchInvoices()
  }

  return (
    <div>
      <Button variant='contained' color='primary' onClick={() => handleOpen({})}>
        Add Invoice
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Client Name</TableCell>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map(invoice => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.clientName}</TableCell>
                <TableCell>{invoice.invoiceNumber}</TableCell>
                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(invoice)}>
                    <Icon icon='mdi:pencil-outline' fontSize='small' />
                  </Button>
                  <Button onClick={() => handleDelete(invoice.id)}>
                    <Icon icon='mdi:trash-can-outline' fontSize='small' />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentInvoice?.id ? 'Edit Invoice' : 'Add Invoice'}</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            label='Client Name'
            fullWidth
            value={currentInvoice?.clientName || ''}
            onChange={e => setCurrentInvoice({ ...currentInvoice, clientName: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Invoice Number'
            fullWidth
            value={currentInvoice?.invoiceNumber || ''}
            onChange={e => setCurrentInvoice({ ...currentInvoice, invoiceNumber: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Amount'
            type='number'
            fullWidth
            value={currentInvoice?.amount || ''}
            onChange={e => setCurrentInvoice({ ...currentInvoice, amount: parseFloat(e.target.value) })}
          />
          <TextField
            margin='dense'
            label='Due Date'
            type='date'
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={currentInvoice?.dueDate ? new Date(currentInvoice.dueDate).toISOString().split('T')[0] : ''}
            onChange={e => setCurrentInvoice({ ...currentInvoice, dueDate: e.target.value })}
          />
          <FormControl fullWidth margin='dense'>
            <InputLabel>Status</InputLabel>
            <Select
              value={currentInvoice?.status || ''}
              onChange={e => setCurrentInvoice({ ...currentInvoice, status: e.target.value })}
            >
              <MenuItem value='Pending'>Pending</MenuItem>
              <MenuItem value='Paid'>Paid</MenuItem>
              <MenuItem value='Overdue'>Overdue</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            {currentInvoice?.id ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default InvoicesPage
