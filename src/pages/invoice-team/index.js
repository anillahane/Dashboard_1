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

const InvoicingTeamDashboard = () => {
  // ** States to store fetched data
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)

  // ** Mock Data (Can be replaced by API)
  const mockInvoices = [
    { id: 1, amount: 1000, status: 'Pending', dueDate: '2024-09-20' },
    { id: 2, amount: 1500, status: 'Paid', dueDate: '2024-09-15' },
    { id: 3, amount: 750, status: 'Pending', dueDate: '2024-09-25' }
  ]

  useEffect(() => {
    // ** Replace API calls with mock data for now
    setInvoices(mockInvoices)
    setLoading(false)
  }, [])

  // ** Data Processing (calculating totals)
  const totalInvoices = invoices.length || 0
  const pendingInvoices = invoices.filter(inv => inv.status === 'Pending').length || 0
  const totalRevenue = invoices.filter(inv => inv.status === 'Paid').reduce((acc, inv) => acc + inv.amount, 0) || 0

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
          title='Total Invoices'
          stats={totalInvoices}
          trendNumber='+5%'
          color='primary'
          icon={<Icon icon='mdi:receipt' />}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <CardStatsHorizontal
          title='Pending Invoices'
          stats={pendingInvoices}
          trendNumber='+3%'
          color='warning'
          icon={<Icon icon='mdi:alert' />}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <CardStatsHorizontal
          title='Revenue Collected'
          stats={`$${totalRevenue}`}
          trendNumber='+10%'
          color='success'
          icon={<Icon icon='mdi:currency-usd' />}
        />
      </Grid>

      {/* Recent Invoices Section */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6'>Recent Invoices</Typography>
            <Box sx={{ mt: 4 }}>
              {invoices.length ? (
                invoices.map(invoice => (
                  <Box key={invoice.id} sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
                    <Typography variant='body2'>Invoice #{invoice.id}</Typography>
                    <Typography variant='body2'>{`$${invoice.amount} - ${invoice.status}`}</Typography>
                    <Typography variant='body2' color='textSecondary'>
                      Due: {invoice.dueDate}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant='body2' color='textSecondary'>
                  No Invoices Available
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

export default InvoicingTeamDashboard
