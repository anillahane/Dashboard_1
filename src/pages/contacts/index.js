// src/pages/contacts/index.js

import React, { useContext, useEffect, useState } from 'react'
import { AbilityContext } from 'src/layouts/components/acl/Can'
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import Icon from 'src/@core/components/icon'

const ContactsPage = () => {
  const [contacts, setContacts] = useState([])
  const [open, setOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({ id: null, name: '', email: '', phone: '', address: '' })
  const ability = useContext(AbilityContext)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    const response = await axios.get('/contacts')
    setContacts(response.data)
  }

  const handleOpen = (contact = { id: null, name: '', email: '', phone: '', address: '' }) => {
    setCurrentContact(contact)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {
    if (currentContact.id) {
      await axios.put('/contacts/update', currentContact)
    } else {
      await axios.post('/contacts/add', currentContact)
    }
    handleClose()
    fetchContacts()
  }

  const handleDelete = async id => {
    await axios.delete('/contacts/delete', { data: { id } })
    fetchContacts()
  }

  return (
    <div>
      {ability?.can('manage', 'Contact') && (
        <Button
          variant='contained'
          color='primary'
          onClick={() => handleOpen()}
          startIcon={<Icon icon='mdi:plus' fontSize='small' />}
        >
          Add Contact
        </Button>
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              {ability?.can('manage', 'Contact') && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map(contact => (
              <TableRow key={contact.id}>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.address}</TableCell>

                {ability?.can('manage', 'Contact') && (
                  <TableCell>
                    <Button onClick={() => handleOpen(contact)}>EDIT</Button>
                    <Button onClick={() => handleDelete(contact.id)}>DELETE</Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentContact.id ? 'Edit Contact' : 'Add Contact'}</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            label='Name'
            fullWidth
            value={currentContact.name}
            onChange={e => setCurrentContact({ ...currentContact, name: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Email'
            fullWidth
            value={currentContact.email}
            onChange={e => setCurrentContact({ ...currentContact, email: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Phone'
            fullWidth
            value={currentContact.phone}
            onChange={e => setCurrentContact({ ...currentContact, phone: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Address'
            fullWidth
            value={currentContact.address}
            onChange={e => setCurrentContact({ ...currentContact, address: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            {currentContact.id ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ContactsPage
