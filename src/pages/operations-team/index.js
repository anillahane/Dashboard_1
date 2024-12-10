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

const OperationsTeamDashboard = () => {
  // ** States to store fetched data
  const [installations, setInstallations] = useState([])
  const [onboarding, setOnboarding] = useState([])
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)

  // ** Mock Data (Can be replaced by API)
  const mockInstallations = [
    { id: 1, scheduledDate: '2024-09-01', status: 'Scheduled' },
    { id: 2, scheduledDate: '2024-09-05', status: 'Completed' }
  ]
  const mockOnboarding = [
    { stage: 'Initial Setup', status: 'In Progress' },
    { stage: 'Final Review', status: 'Completed' }
  ]
  const mockAccounts = [
    { id: 1, name: 'Customer A' },
    { id: 2, name: 'Customer B' }
  ]

  useEffect(() => {
    // ** Replace API calls with mock data for now
    setInstallations(mockInstallations)
    setOnboarding(mockOnboarding)
    setAccounts(mockAccounts)
    setLoading(false)
  }, [])

  // ** Data Processing (calculating totals)
  const totalInstallations = installations.length || 0
  const ongoingOnboarding = onboarding.filter(item => item.status === 'In Progress').length || 0
  const activeAccounts = accounts.length || 0

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
          title='Total Installations'
          stats={totalInstallations}
          trendNumber='+10%'
          color='primary'
          icon={<Icon icon='mdi:tools' />}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <CardStatsHorizontal
          title='Ongoing Onboarding'
          stats={ongoingOnboarding}
          trendNumber='+5%'
          color='info'
          icon={<Icon icon='mdi:account-cog' />}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <CardStatsHorizontal
          title='Active Accounts'
          stats={activeAccounts}
          trendNumber='+8%'
          color='success'
          icon={<Icon icon='mdi:account-outline' />}
        />
      </Grid>

      {/* Recent Installations Section */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6'>Recent Installations</Typography>
            <Box sx={{ mt: 4 }}>
              {installations.length ? (
                installations.map(install => (
                  <Box key={install.id} sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
                    <Typography variant='body2'>Installation on {install.scheduledDate}</Typography>
                    <Typography variant='body2'>{install.status}</Typography>
                  </Box>
                ))
              ) : (
                <Typography variant='body2' color='textSecondary'>
                  No Installations Available
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

export default OperationsTeamDashboard
