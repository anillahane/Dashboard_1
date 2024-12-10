import React, { useContext, useEffect, useState } from 'react'
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Icon from 'src/@core/components/icon'

// ** Axios Import
import axios from 'axios'
import { Checkbox, FormControlLabel } from '@mui/material'

const ContractsPage = () => {
  const [contracts, setContracts] = useState([])
  const [open, setOpen] = useState(false)
  const [currentContract, setCurrentContract] = useState({
    id: null,
    clientName: '',
    contractName: '',
    status: '',
    contractSigned: false
  })
  const ability = useContext(AbilityContext)

  useEffect(() => {
    fetchContracts()
  }, [])

  const fetchContracts = async () => {
    const response = await axios.get('/contracts')
    setContracts(response.data)
  }

  const handleOpen = (contract = { id: null, clientName: '', contractName: '', status: '', contractSigned: false }) => {
    setCurrentContract(contract)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {
    if (currentContract.id) {
      await axios.put('/contracts/update', currentContract)
    } else {
      await axios.post('/contracts/add', currentContract)
    }
    handleClose()
    fetchContracts()
  }

  const handleDelete = async id => {
    await axios.delete('/contracts/delete', { data: { id } })
    fetchContracts()
  }

  if (!ability?.can('manage', 'contracts')) {
    return <div>You do not have permission to view this page</div>
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Contracts'
            action={
              ability?.can('manage', 'contracts') && (
                <Button variant='contained' color='primary' onClick={() => handleOpen()}>
                  <Icon icon='mdi:plus' fontSize='1rem' /> Add Contract
                </Button>
              )
            }
          />
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Client Name</TableCell>
                    <TableCell>Contract Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Signed</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contracts.map(contract => (
                    <TableRow key={contract.id}>
                      <TableCell>{contract.clientName}</TableCell>
                      <TableCell>{contract.contractName}</TableCell>
                      <TableCell>{contract.status}</TableCell>
                      <TableCell>{contract.contractSigned ? 'Yes' : 'No'}</TableCell>
                      <TableCell>
                        {ability?.can('manage', 'contracts') && (
                          <>
                            <Button onClick={() => handleOpen(contract)}>
                              <Icon icon='mdi:pencil' fontSize='1rem' /> Edit
                            </Button>
                            <Button onClick={() => handleDelete(contract.id)}>
                              <Icon icon='mdi:trash-can' fontSize='1rem' /> Delete
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentContract.id ? 'Edit Contract' : 'Add Contract'}</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            label='Client Name'
            fullWidth
            value={currentContract.clientName}
            onChange={e => setCurrentContract({ ...currentContract, clientName: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Contract Name'
            fullWidth
            value={currentContract.contractName}
            onChange={e => setCurrentContract({ ...currentContract, contractName: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Status'
            fullWidth
            value={currentContract.status}
            onChange={e => setCurrentContract({ ...currentContract, status: e.target.value })}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={currentContract.contractSigned}
                onChange={e => setCurrentContract({ ...currentContract, contractSigned: e.target.checked })}
              />
            }
            label='Contract Signed'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            {currentContract.id ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default ContractsPage
