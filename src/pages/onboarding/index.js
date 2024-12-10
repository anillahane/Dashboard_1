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
  DialogTitle
} from '@mui/material'
import Icon from 'src/@core/components/icon'

const OnboardingPage = () => {
  const [onboardingData, setOnboardingData] = useState([])
  const [operationsTeams, setOperationsTeams] = useState([])
  const [open, setOpen] = useState(false)
  const [currentOnboarding, setCurrentOnboarding] = useState(null)

  useEffect(() => {
    fetchOnboardingData()
    fetchOperationsTeams()
  }, [])

  const fetchOnboardingData = async () => {
    const response = await axios.get('/onboarding')
    setOnboardingData(response.data)
  }

  const fetchOperationsTeams = async () => {
    const response = await axios.get('/operations-teams')
    setOperationsTeams(response.data)
  }

  const handleOpen = onboarding => {
    setCurrentOnboarding(onboarding)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {
    if (currentOnboarding.id) {
      await axios.put('/onboarding/update', currentOnboarding)
    } else {
      await axios.post('/onboarding/add', currentOnboarding)
    }
    handleClose()
    fetchOnboardingData()
  }

  const handleDelete = async id => {
    await axios.delete('/onboarding/delete', { data: { id } })
    fetchOnboardingData()
  }

  return (
    <div>
      <Button variant='contained' color='primary' onClick={() => handleOpen({})}>
        Add Onboarding
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Client Name</TableCell>
              <TableCell>Onboarding Stage</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Operations Team</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {onboardingData.map(onboarding => (
              <TableRow key={onboarding.id}>
                <TableCell>{onboarding.clientName}</TableCell>
                <TableCell>{onboarding.onboardingStage}</TableCell>
                <TableCell>{onboarding.status}</TableCell>
                <TableCell>{new Date(onboarding.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(onboarding.endDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  {operationsTeams.find(team => team.id === onboarding.operationsTeamId)?.name || 'N/A'}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(onboarding)}>Edit</Button>
                  <Button onClick={() => handleDelete(onboarding.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentOnboarding?.id ? 'Edit Onboarding' : 'Add Onboarding'}</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            label='Client Name'
            fullWidth
            value={currentOnboarding?.clientName || ''}
            onChange={e => setCurrentOnboarding({ ...currentOnboarding, clientName: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Onboarding Stage'
            fullWidth
            value={currentOnboarding?.onboardingStage || ''}
            onChange={e => setCurrentOnboarding({ ...currentOnboarding, onboardingStage: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Status'
            fullWidth
            value={currentOnboarding?.status || ''}
            onChange={e => setCurrentOnboarding({ ...currentOnboarding, status: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Start Date'
            type='date'
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={
              currentOnboarding?.startDate ? new Date(currentOnboarding.startDate).toISOString().split('T')[0] : ''
            }
            onChange={e => setCurrentOnboarding({ ...currentOnboarding, startDate: e.target.value })}
          />
          <TextField
            margin='dense'
            label='End Date'
            type='date'
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={currentOnboarding?.endDate ? new Date(currentOnboarding.endDate).toISOString().split('T')[0] : ''}
            onChange={e => setCurrentOnboarding({ ...currentOnboarding, endDate: e.target.value })}
          />
          <FormControl fullWidth margin='dense'>
            <InputLabel>Operations Team</InputLabel>
            <Select
              value={currentOnboarding?.operationsTeamId || ''}
              onChange={e => setCurrentOnboarding({ ...currentOnboarding, operationsTeamId: e.target.value })}
            >
              {operationsTeams.map(team => (
                <MenuItem key={team.id} value={team.id}>
                  {team.name}
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
            {currentOnboarding?.id ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default OnboardingPage
