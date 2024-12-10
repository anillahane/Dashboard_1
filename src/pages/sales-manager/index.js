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

const SalesManagerDashboard = () => {
  // ** States to store fetched data
  const [salesLeads, setSalesLeads] = useState([])
  const [orders, setOrders] = useState([])
  const [contracts, setContracts] = useState([])
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)

  // ** Mock Data (Can be replaced by API)
  const mockSalesLeads = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
  const mockOrders = [{ id: 1 }, { id: 2 }]
  const mockContracts = [
    { contractName: 'Contract A', status: 'Signed' },
    { contractName: 'Contract B', status: 'Pending' }
  ]
  const mockInvoices = [
    { amount: 1000, status: 'Pending' },
    { amount: 1500, status: 'Paid' }
  ]

  useEffect(() => {
    // ** Replace API calls with mock data for now
    setSalesLeads(mockSalesLeads)
    setOrders(mockOrders)
    setContracts(mockContracts)
    setInvoices(mockInvoices)
    setLoading(false) // Simulate API loading state completion
  }, [])

  // ** Data Processing (calculating totals)
  const totalSalesLeads = salesLeads.length || 0
  const totalOrders = orders.length || 0
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
      {/* Stats Section */}
      <Grid item xs={12} md={4}>
        <CardStatsHorizontal
          title='Total Sales Leads'
          stats={totalSalesLeads}
          trendNumber='+5%'
          color='primary'
          icon={<Icon icon='mdi:briefcase-check' />}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <CardStatsHorizontal
          title='Total Orders'
          stats={totalOrders}
          trendNumber='+10%'
          color='success'
          icon={<Icon icon='mdi:cart-plus' />}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <CardStatsHorizontal
          title='Pending Invoices'
          stats={pendingInvoices}
          trendNumber='-3%'
          color='warning'
          icon={<Icon icon='mdi:receipt' />}
        />
      </Grid>

      {/* Contracts Overview Section */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6'>Contracts Overview</Typography>
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

      {/* Recent Sales Activity */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6'>Recent Sales Activity</Typography>
            {/* Mock list for recent sales leads */}
            <Box sx={{ mt: 4 }}>
              {salesLeads.length ? (
                salesLeads.map(lead => (
                  <Box key={lead.id} sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
                    <Typography variant='body2'>Sales Lead {lead.id}</Typography>
                    <Typography variant='body2' color='textSecondary'>
                      Pending
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant='body2' color='textSecondary'>
                  No Recent Activity
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

export default SalesManagerDashboard
