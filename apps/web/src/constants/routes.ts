export const ROUTES = {
  HOME: '/',
  CONDITION: '/condition/:slug',
  WHAT_WE_TREAT: '/what-we-treat',
  HOW_WE_CAN_HELP: '/how-we-can-help',
  LOCATIONS: '/locations',
  LOGIN: '/login',
  CLIENT_DASHBOARD: '/client/dashboard',
  ADMIN_DASHBOARD: '/admin/dashboard',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]

export const createConditionRoute = (slug: string) => `/condition/${slug}`

export const ROLE_REDIRECT: Record<'client' | 'admin', string> = {
  client: ROUTES.CLIENT_DASHBOARD,
  admin: ROUTES.ADMIN_DASHBOARD,
}

export interface HeaderNavItem {
  label: string
  to: string
}

export const HEADER_NAV_ITEMS: HeaderNavItem[] = [
  { label: 'Home', to: ROUTES.HOME },
  { label: 'What We Treat', to: ROUTES.WHAT_WE_TREAT },
  { label: 'How We Can Help', to: ROUTES.HOW_WE_CAN_HELP },
  { label: 'Locations', to: ROUTES.LOCATIONS },
]
