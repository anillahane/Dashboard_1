import React, { useContext, useEffect, useState } from 'react'

// ** Context Imports
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
  DialogTitle
} from '@mui/material'
import axios from 'axios'

const SalesLeadsPage = () => {
  const [salesLeads, setSalesLeads] = useState([])
  const [salesManagers, setSalesManagers] = useState([])
  const [open, setOpen] = useState(false)
  const [currentLead, setCurrentLead] = useState({
    id: null,
    clientName: '',
    status: '',
    contractStatus: '',
    salesManagerId: '',
    contactEmail: ''
  })
  const ability = useContext(AbilityContext)

  useEffect(() => {
    fetchSalesLeads()
    fetchSalesManagers()
  }, [])

  const fetchSalesLeads = async () => {
    const response = await axios.get('/sales-leads')
    setSalesLeads(response.data)
  }

  const fetchSalesManagers = async () => {
    try {
      const response = await axios.get('/users')
      console.log('Fetched users:', response.data)
      setSalesManagers(response.data.filter(user => user.role === 'salesManager'))
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const handleOpen = (
    lead = { id: null, clientName: '', status: '', contractStatus: '', salesManagerId: '', contactEmail: '' }
  ) => {
    setCurrentLead(lead)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {
    if (currentLead.id) {
      await axios.put('/sales-leads/update', currentLead)
    } else {
      await axios.post('/sales-leads/add', currentLead)
    }
    handleClose()
    fetchSalesLeads()
  }

  const handleDelete = async id => {
    await axios.delete('/sales-leads/delete', { data: { id } })
    fetchSalesLeads()
  }

  if (!ability?.can('manage', 'SalesLead')) {
    return <div>You do not have permission to view this page</div>
  }

  return (
    <div>
      <Button variant='contained' color='primary' onClick={() => handleOpen()}>
        Add Sales Lead
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Client Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Contract Status</TableCell>
              <TableCell>Sales Manager</TableCell>
              <TableCell>Contact Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salesLeads.map(lead => (
              <TableRow key={lead.id}>
                <TableCell>{lead.clientName}</TableCell>
                <TableCell>{lead.status}</TableCell>
                <TableCell>{lead.contractStatus}</TableCell>
                <TableCell>
                  {salesManagers.find(manager => manager.id === lead.salesManagerId)?.fullName || 'Unknown'}
                </TableCell>
                <TableCell>{lead.contactEmail}</TableCell>
                <TableCell>
                  {ability?.can('manage', 'SalesLead') && (
                    <>
                      <Button onClick={() => handleOpen(lead)}>Edit</Button>
                      <Button onClick={() => handleDelete(lead.id)}>Delete</Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentLead.id ? 'Edit Sales Lead' : 'Add Sales Lead'}</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            label='Client Name'
            fullWidth
            value={currentLead.clientName}
            onChange={e => setCurrentLead({ ...currentLead, clientName: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Status'
            fullWidth
            value={currentLead.status}
            onChange={e => setCurrentLead({ ...currentLead, status: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Contract Status'
            fullWidth
            value={currentLead.contractStatus}
            onChange={e => setCurrentLead({ ...currentLead, contractStatus: e.target.value })}
          />
          <FormControl fullWidth margin='dense'>
            <InputLabel>Sales Manager</InputLabel>
            <Select
              value={currentLead.salesManagerId}
              onChange={e => setCurrentLead({ ...currentLead, salesManagerId: e.target.value })}
            >
              {salesManagers.map(manager => (
                <MenuItem key={manager.id} value={manager.id}>
                  {manager.fullName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin='dense'
            label='Contact Email'
            fullWidth
            value={currentLead.contactEmail}
            onChange={e => setCurrentLead({ ...currentLead, contactEmail: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            {currentLead.id ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SalesLeadsPage
