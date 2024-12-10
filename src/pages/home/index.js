// ** React Imports
import { useEffect, useState } from 'react'
import axios from 'axios'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Custom Components Imports
import Icon from 'src/@core/components/icon'
import CardStatsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

const ClientDashboard = () => {
  // ** States to store fetched data
  const [orders, setOrders] = useState([])
  const [onboarding, setOnboarding] = useState([])
  const [invoices, setInvoices] = useState([])
  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(true)

  // ** Mock Data (Can be replaced by API)
  const mockOrders = [{ id: 1 }, { id: 2 }, { id: 3 }]
  const mockOnboarding = [{ stage: 'Initial Setup', status: 'In Progress' }]
  const mockInvoices = [
    { amount: 1000, status: 'Pending' },
    { amount: 500, status: 'Paid' }
  ]
  const mockContracts = [
    { contractName: 'Contract A', status: 'Signed' },
    { contractName: 'Contract B', status: 'Pending' }
  ]

  useEffect(() => {
    // ** Replace API calls with mock data for now
    setOrders(mockOrders)
    setOnboarding(mockOnboarding)
    setInvoices(mockInvoices)
    setContracts(mockContracts)
    setLoading(false) // Simulate API loading state completion
  }, [])

  // ** Data Processing (calculating totals)
  const totalOrders = orders.length || 0
  const totalOnboarding = onboarding.length || 0
  const pendingInvoices = invoices.filter(inv => inv.status === 'Pending').length || 0

  // Fallback UI if loading
  if (loading) {
    return (
      <Grid container spacing={6} className='match-height'>
        <Typography variant='h6'>Loading Dashboard...</Typography>
      </Grid>
    )
  }

  return (
    <Grid container spacing={6} className='match-height'>
      {/* Landing Page Header */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h4'>Welcome to Your Dashboard!</Typography>
            <Typography variant='body1' color='textSecondary'>
              Here, you can view your account information, orders, contracts, and more. If you have any questions, feel
              free to contact support.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Stats Section */}
      <Grid item xs={12} md={4}>
        <CardStatsHorizontal
          title='Total Orders'
          stats={totalOrders}
          trendNumber='+10%'
          color='primary'
          icon={<Icon icon='mdi:cart-plus' />}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <CardStatsHorizontal
          title='Pending Invoices'
          stats={pendingInvoices}
          trendNumber='-5%'
          color='warning'
          icon={<Icon icon='mdi:receipt' />}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <CardStatsHorizontal
          title='Ongoing Onboarding'
          stats={totalOnboarding}
          trendNumber='+1%'
          color='info'
          icon={<Icon icon='mdi:account-cog' />}
        />
      </Grid>

      {/* Recent Contracts Section */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6'>Recent Contracts</Typography>
            <Box sx={{ mt: 4 }}>
              {contracts.length ? (
                contracts.map(contract => (
                  <Box key={contract.contractName} sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
                    <Typography variant='body2'>{contract.contractName}</Typography>
                    <Typography variant='body2'>{contract.status}</Typography>
                  </Box>
                ))
              ) : (
                <Typography variant='body2' color='textSecondary'>
                  No Contracts Available
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Support Section */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6'>Need Help?</Typography>
            <Typography variant='body2' color='textSecondary'>
              If you have any issues or questions, feel free to <a href='/support'>contact support</a>.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ClientDashboard
