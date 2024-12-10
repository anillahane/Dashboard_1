export const getHomeRoute = role => {
  switch (role) {
    case 'admin':
      return '/admin'
    case 'salesManager':
      return '/sales-manager'
    case 'operationsTeam':
      return '/operations-team'
    case 'invoicingTeam':
      return '/invoice-team'
    default:
      return '/home' // Default home for other users like clients
  }
}

const navigation = role => {
  const homePath = getHomeRoute(role) // Get the home route based on role

  const items = [
    {
      title: 'Home',
      path: homePath, // Set the role-based home path here
      icon: 'mdi:home-outline',
      action: 'read',
      subject: 'home' // Everyone can read their specific home page
    }
  ]

  switch (role) {
    case 'admin':
      items.push(
        {
          title: 'Users',
          path: '/users',
          icon: 'mdi:account-group-outline',
          action: 'manage',
          subject: 'users'
        },
        {
          title: 'Sales Leads',
          path: '/sales-leads',
          icon: 'mdi:briefcase-outline',
          action: 'manage',
          subject: 'SalesLead'
        },
        {
          title: 'Contracts',
          path: '/contracts',
          icon: 'mdi:file-document-outline',
          action: 'manage',
          subject: 'contracts'
        },
        {
          title: 'Contacts',
          path: '/contacts',
          icon: 'mdi:account-group-outline',
          action: 'manage',
          subject: 'contacts'
        },
        {
          title: 'Accounts',
          path: '/accounts',
          icon: 'mdi:account-outline',
          action: 'manage',
          subject: 'accounts'
        },
        {
          title: 'Installations',
          path: '/installations',
          icon: 'mdi:calendar-clock-outline',
          action: 'manage',
          subject: 'installations'
        },
        {
          title: 'Onboarding',
          path: '/onboarding',
          icon: 'mdi:account-group-outline',
          action: 'manage',
          subject: 'onboarding'
        },
        {
          title: 'Orders',
          path: '/orders',
          icon: 'mdi:package-variant',
          action: 'manage',
          subject: 'orders'
        },
        {
          title: 'Invoices',
          path: '/invoices',
          icon: 'mdi:currency-usd',
          action: 'manage',
          subject: 'invoices'
        }
      )
      break
    case 'salesManager':
      items.push(
        {
          title: 'Sales Leads',
          path: '/sales-leads',
          icon: 'mdi:briefcase-outline',
          action: 'manage',
          subject: 'SalesLead'
        },
        {
          title: 'Contracts',
          path: '/contracts',
          icon: 'mdi:file-document-outline',
          action: 'manage',
          subject: 'contracts'
        },
        {
          title: 'Orders',
          path: '/orders',
          icon: 'mdi:package-variant',
          action: 'manage',
          subject: 'orders'
        },
        {
          title: 'Invoices',
          path: '/invoices',
          icon: 'mdi:currency-usd',
          action: 'read',
          subject: 'invoices'
        }
      )
      break
    case 'operationsTeam':
      items.push(
        {
          title: 'Installations',
          path: '/installations',
          icon: 'mdi:calendar-clock-outline',
          action: 'manage',
          subject: 'installations'
        },
        {
          title: 'Onboarding',
          path: '/onboarding',
          icon: 'mdi:account-group-outline',
          action: 'manage',
          subject: 'onboarding'
        }
      )
      break
    case 'invoicingTeam':
      items.push({
        title: 'Invoices',
        path: '/invoices',
        icon: 'mdi:currency-usd',
        action: 'manage',
        subject: 'invoices'
      })
      break
    case 'client':
      items.push({
        title: 'Accounts',
        path: '/accounts',
        icon: 'mdi:account-outline',
        action: 'read',
        subject: 'accounts'
      })
      break
    default:
      items.push({
        title: 'Home',
        path: '/home',
        icon: 'mdi:home-outline',
        action: 'read',
        subject: 'home'
      })
      break
  }

  return items
}

export default navigation
