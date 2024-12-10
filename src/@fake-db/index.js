import mock from './mock'

import './auth/jwt'
import './sales-leads'
import './invoices'
import './contracts'
import './orders'
import './installations'
import './onboarding'
import './roles'
import './contacts'
import './accounts'
import './operationsTeams'

mock.onAny().passThrough()
