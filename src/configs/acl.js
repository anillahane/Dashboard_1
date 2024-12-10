import { AbilityBuilder, Ability } from '@casl/ability'

export const AppAbility = Ability

const defineRulesFor = role => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  if (role === 'admin') {
    can('manage', 'all') // Admin can manage everything
  } else if (role === 'client') {
    can('read', 'home') // Client can read home
    can('read', 'accounts')
  } else if (role === 'salesManager') {
    can('read', 'home') // Sales Manager can read their home
    can('manage', 'SalesLead')
    can('manage', 'contracts')
    can('manage', 'orders')
    can('read', 'invoices')
  } else if (role === 'operationsTeam') {
    can('read', 'home') // Operations team can read their home
    can('manage', 'installations')
    can('manage', 'onboarding')
  } else if (role === 'invoicingTeam') {
    can('read', 'home') // Invoicing team can read their home
    can('manage', 'invoices')
  } else {
    // Default access for any other roles (can be modified)
    can('read', 'home')
  }

  return rules
}

export const buildAbilityFor = role => {
  return new AppAbility(defineRulesFor(role), {
    detectSubjectType: object => object.type // Detect object type for proper rule application
  })
}

export const defaultACLObj = {
  action: 'read',
  subject: 'home' // Default subject for users without a specific role
}

export default defineRulesFor
