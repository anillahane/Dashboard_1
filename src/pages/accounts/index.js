// src/pages/admin/accounts.js

import React, { useContext, useEffect, useState } from 'react'
import { AbilityContext } from 'src/layouts/components/acl/Can'
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
  Chip
} from '@mui/material'
import axios from 'axios'

import Icon from 'src/@core/components/icon'

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([])
  const [open, setOpen] = useState(false)
  const [currentAccount, setCurrentAccount] = useState({ id: null, name: '', contactEmail: '', status: '' })
  const ability = useContext(AbilityContext)

  useEffect(() => {
    fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
    const response = await axios.get('/accounts')
    setAccounts(response.data)
  }

  const handleOpen = (account = { id: null, name: '', contactEmail: '', status: '' }) => {
    setCurrentAccount(account)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {
    if (currentAccount.id) {
      await axios.put('/accounts/update', currentAccount)
    } else {
      await axios.post('/accounts/add', currentAccount)
    }
    handleClose()
    fetchAccounts()
  }

  const handleDelete = async id => {
    await axios.delete('/accounts/delete', { data: { id } })
    fetchAccounts()
  }

  return (
    <div>
      <Button
        variant='contained'
        startIcon={<Icon icon='mdi:plus' fontSize='small' />}
        color='primary'
        onClick={() => handleOpen()}
      >
        Add Account
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map(account => (
              <TableRow key={account.id}>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.contactEmail}</TableCell>
                <TableCell>
                  <Chip label={account.status} color={account.status === 'Active' ? 'success' : 'default'} />
                </TableCell>
                <TableCell>
                  {ability?.can('manage', 'Account') && (
                    <>
                      <Button onClick={() => handleOpen(account)}>Edit</Button>
                      <Button onClick={() => handleDelete(account.id)}>Delete</Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentAccount.id ? 'Edit Account' : 'Add Account'}</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            label='Name'
            fullWidth
            value={currentAccount.name}
            onChange={e => setCurrentAccount({ ...currentAccount, name: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Contact Email'
            fullWidth
            value={currentAccount.contactEmail}
            onChange={e => setCurrentAccount({ ...currentAccount, contactEmail: e.target.value })}
          />
          <FormControl fullWidth margin='dense'>
            <InputLabel>Status</InputLabel>
            <Select
              value={currentAccount.status}
              onChange={e => setCurrentAccount({ ...currentAccount, status: e.target.value })}
            >
              <MenuItem value='Active'>Active</MenuItem>
              <MenuItem value='Inactive'>Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            {currentAccount.id ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AccountsPage
