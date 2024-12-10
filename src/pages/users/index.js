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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import axios from 'axios'

const UsersPage = () => {
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [open, setOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({ id: null, fullName: '', email: '', role: '' })
  const ability = useContext(AbilityContext)

  useEffect(() => {
    fetchUsers()
    fetchRoles()
  }, [])

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await axios.get('/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUsers(response.data)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }

  const fetchRoles = async () => {
    try {
      const response = await axios.get('/roles')
      setRoles(response.data)
    } catch (error) {
      console.error('Failed to fetch roles:', error)
    }
  }

  const handleOpen = (user = { id: null, fullName: '', email: '', role: '' }) => {
    setCurrentUser(user)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      if (currentUser.id) {
        await axios.put('/users/update', currentUser, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      } else {
        await axios.post('/users/add', currentUser, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      }
      handleClose()
      fetchUsers()
    } catch (error) {
      console.error('Failed to submit user:', error)
    }
  }

  const handleDelete = async id => {
    try {
      const token = localStorage.getItem('accessToken')
      await axios.delete('/users/delete', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: { id }
      })
      fetchUsers()
    } catch (error) {
      console.error('Failed to delete user:', error)
    }
  }

  if (!ability?.can('manage', 'User')) {
    return <div>You do not have permission to view this page</div>
  }

  return (
    <div>
      <Button variant='contained' color='primary' onClick={() => handleOpen()}>
        Add User
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{roles.find(role => role.value === user.role)?.label || user.role}</TableCell>
                <TableCell>
                  {ability?.can('manage', 'User') && (
                    <>
                      <Button onClick={() => handleOpen(user)}>Edit</Button>
                      <Button onClick={() => handleDelete(user.id)}>Delete</Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentUser.id ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            label='Full Name'
            fullWidth
            value={currentUser.fullName}
            onChange={e => setCurrentUser({ ...currentUser, fullName: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Email'
            fullWidth
            value={currentUser.email}
            onChange={e => setCurrentUser({ ...currentUser, email: e.target.value })}
          />
          <FormControl fullWidth margin='dense'>
            <InputLabel>Role</InputLabel>
            <Select value={currentUser.role} onChange={e => setCurrentUser({ ...currentUser, role: e.target.value })}>
              {roles.map(role => (
                <MenuItem key={role.value} value={role.value}>
                  {role.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{currentUser.id ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UsersPage
