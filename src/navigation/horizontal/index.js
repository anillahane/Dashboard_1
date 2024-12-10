const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'mdi:home-outline',
      action: 'read',
      subject: 'home' // Example ACL check for home page
    },
    {
      title: 'Users',
      path: '/users',
      icon: 'mdi:account-multiple-outline',
      action: 'manage',
      subject: 'users' // Admin and other roles with 'manage' rights on users
    },
    {
      title: 'Contacts',
      path: '/contacts',
      icon: 'mdi:contacts-outline',
      action: 'read',
      subject: 'contacts' // Sales Managers and others with 'read' access on contacts
    },
    {
      title: 'Sales Leads',
      path: '/sales-leads',
      icon: 'mdi:briefcase-outline',
      action: 'manage',
      subject: 'SalesLead' // Sales Managers managing sales leads
    },
    {
      title: 'Contracts',
      path: '/contracts',
      icon: 'mdi:file-document-outline',
      action: 'manage',
      subject: 'contracts' // Sales Managers or roles with 'manage' contracts
    },
    {
      title: 'Accounts',
      path: '/accounts',
      icon: 'mdi:account-outline',
      action: 'manage',
      subject: 'Account' // Operations, Sales, etc. roles with 'manage' accounts
    },
    {
      title: 'Orders',
      path: '/orders',
      icon: 'mdi:package-variant',
      action: 'manage',
      subject: 'orders' // Admin or Sales roles handling orders
    },
    {
      title: 'Installations',
      path: '/installations',
      icon: 'mdi:calendar-clock-outline',
      action: 'manage',
      subject: 'Installation' // Operations team managing installations
    },
    {
      title: 'Onboarding',
      path: '/onboarding',
      icon: 'mdi:account-group-outline',
      action: 'manage',
      subject: 'Onboarding' // Operations team managing onboarding
    },
    {
      title: 'Invoices',
      path: '/invoices',
      icon: 'mdi:currency-usd',
      action: 'manage',
      subject: 'Invoice' // Invoicing team managing invoices
    },
    {
      title: 'Access Control',
      path: '/acl',
      icon: 'mdi:shield-outline',
      action: 'read',
      subject: 'acl-page' // Access control page, can be used for ACL testing
    }
  ]
}

export default navigation
