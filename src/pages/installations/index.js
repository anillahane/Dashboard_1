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
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import Icon from 'src/@core/components/icon'

const InstallationPage = () => {
  const [installations, setInstallations] = useState([])
  const [statuses, setStatuses] = useState(['Scheduled', 'In Progress', 'Completed'])
  const [open, setOpen] = useState(false)
  const [currentInstallation, setCurrentInstallation] = useState({
    id: null,
    clientName: '',
    installationDate: '',
    status: ''
  })
  const ability = useContext(AbilityContext)

  useEffect(() => {
    fetchInstallations()
  }, [])

  const fetchInstallations = async () => {
    const response = await axios.get('/installations')
    setInstallations(response.data)
  }

  const handleOpen = (installation = { id: null, clientName: '', installationDate: '', status: '' }) => {
    setCurrentInstallation(installation)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {
    if (currentInstallation.id) {
      await axios.put('/installations/update', currentInstallation)
    } else {
      await axios.post('/installations/add', currentInstallation)
    }
    handleClose()
    fetchInstallations()
  }

  const handleDelete = async id => {
    await axios.delete('/installations/delete', { data: { id } })
    fetchInstallations()
  }

  if (!ability?.can('manage', 'installations')) {
    return <div>You do not have permission to view this page</div>
  }

  return (
    <div>
      <Button variant='contained' color='primary' onClick={() => handleOpen()}>
        <Icon icon='mdi:plus' fontSize='1.25rem' />
        Add Installation
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Client Name</TableCell>
              <TableCell>Installation Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {installations.map(installation => (
              <TableRow key={installation.id}>
                <TableCell>{installation.clientName}</TableCell>
                <TableCell>{new Date(installation.installationDate).toLocaleDateString()}</TableCell>
                <TableCell>{installation.status}</TableCell>
                <TableCell>
                  {ability?.can('manage', 'installations') && (
                    <>
                      <Button onClick={() => handleOpen(installation)}>
                        <Icon icon='mdi:pen' fontSize='1.25rem' />
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(installation.id)}>
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
        <DialogTitle>{currentInstallation.id ? 'Edit Installation' : 'Add Installation'}</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            label='Client Name'
            fullWidth
            value={currentInstallation.clientName}
            onChange={e => setCurrentInstallation({ ...currentInstallation, clientName: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Installation Date'
            type='date'
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={currentInstallation.installationDate}
            onChange={e => setCurrentInstallation({ ...currentInstallation, installationDate: e.target.value })}
          />
          <FormControl fullWidth margin='dense'>
            <InputLabel>Status</InputLabel>
            <Select
              value={currentInstallation.status}
              onChange={e => setCurrentInstallation({ ...currentInstallation, status: e.target.value })}
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
            {currentInstallation.id ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default InstallationPage
