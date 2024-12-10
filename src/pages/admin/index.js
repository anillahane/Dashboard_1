// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Custom Components Imports
import Icon from 'src/@core/components/icon'
import CardStatsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** ApexCharts Imports (Using dynamic import to avoid server-side errors)
import dynamic from 'next/dynamic'
const ReactApexcharts = dynamic(() => import('react-apexcharts'), { ssr: false })

const AdminDashboard = () => {
  // ** States to store fetched data
  const [orders, setOrders] = useState([])
  const [installations, setInstallations] = useState([])
  const [onboarding, setOnboarding] = useState([])
  const [invoices, setInvoices] = useState([])
  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(true)

  // ** Mock Data (Replace API Calls with this for testing)
  const mockOrders = [
    { date: '2024-01-01', quantity: 10 },
    { date: '2024-02-01', quantity: 15 },
    { date: '2024-03-01', quantity: 12 },
    { date: '2024-04-01', quantity: 22 },
    { date: '2024-05-01', quantity: 18 },
    { date: '2024-06-01', quantity: 25 }
  ]

  const mockInstallations = [
    { scheduledDate: '2024-01-01', status: 1 },
    { scheduledDate: '2024-02-01', status: 0 },
    { scheduledDate: '2024-03-01', status: 1 },
    { scheduledDate: '2024-04-01', status: 1 }
  ]

  const mockOnboarding = [
    { stage: 'Initial Setup', status: 'In Progress' },
    { stage: 'Final Review', status: 'Completed' }
  ]
  const mockInvoices = [{ amount: 1000 }, { amount: 1500 }, { amount: 750 }, { amount: 500 }]
  const mockContracts = [
    { contractName: 'Contract A', status: 'Signed' },
    { contractName: 'Contract B', status: 'Pending' }
  ]

  useEffect(() => {
    // ** Replace API calls with mock data for now
    setOrders(mockOrders)
    setInstallations(mockInstallations)
    setOnboarding(mockOnboarding)
    setInvoices(mockInvoices)
    setContracts(mockContracts)
    setLoading(false) // Simulate the API loading state completion
  }, [])

  // ** Data Processing (calculating totals and preparing chart data)
  const totalOrders = orders.length || 0
  const totalInstallations = installations.length || 0
  const totalOnboarding = onboarding.length || 0
  const totalInvoices = invoices.length || 0

  // ** Prepare dummy chart data for ApexCharts
  const processChartData = (data, xKey, yKey) => {
    return {
      options: {
        chart: { id: `${xKey}-chart`, type: 'line', height: 350 },
        xaxis: { categories: data.map(item => item[xKey] || 'N/A') }
      },
      series: [
        {
          name: yKey,
          data: data.map(item => item[yKey] || 0)
        }
      ]
    }
  }

  // Fallback UI if loading
  if (loading) {
    return (
      <ApexChartWrapper>
        <Grid container spacing={6} className='match-height'>
          <Typography variant='h6'>Loading Dashboard...</Typography>
        </Grid>
      </ApexChartWrapper>
    )
  }

  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className='match-height'>
        {/* Stats Section */}
        <Grid item xs={12} md={3}>
          <CardStatsHorizontal
            title='Total Orders'
            stats={totalOrders}
            trendNumber='+12%'
            color='primary'
            icon={<Icon icon='mdi:cart-plus' />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <CardStatsHorizontal
            title='Total Installations'
            stats={totalInstallations}
            trendNumber='+15%'
            color='success'
            icon={<Icon icon='mdi:tools' />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <CardStatsHorizontal
            title='Total Onboarding'
            stats={totalOnboarding}
            trendNumber='+8%'
            color='warning'
            icon={<Icon icon='mdi:account-multiple' />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <CardStatsHorizontal
            title='Total Invoices'
            stats={totalInvoices}
            trendNumber='+22%'
            color='info'
            icon={<Icon icon='mdi:receipt' />}
          />
        </Grid>

        {/* Orders Trend Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant='h6'>Orders Trend</Typography>
              <ReactApexcharts
                options={processChartData(orders, 'date', 'quantity').options}
                series={processChartData(orders, 'date', 'quantity').series}
                type='line'
                height={350}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Installations Overview Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant='h6'>Installations Overview</Typography>
              <ReactApexcharts
                options={processChartData(installations, 'scheduledDate', 'status').options}
                series={processChartData(installations, 'scheduledDate', 'status').series}
                type='bar'
                height={350}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Table Section for Contracts */}
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
      </Grid>
    </ApexChartWrapper>
  )
}

export default AdminDashboard
