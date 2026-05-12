import { SEED_TENANTS } from '../data/staticSeeds.js'

export const SUPERADMIN_ENDPOINTS = {
  ADMIN_USERS: '/superadmin/admin-users',
  ADMIN_USER_BY_ID: (id) => `/superadmin/admin-users/${id}`,
  PERMISSIONS: '/superadmin/permissions',
  PERMISSION_BY_ROLE_KEY: (roleKey) => `/superadmin/permissions/${roleKey}`,
  MODULES: '/superadmin/modules',
  MODULE_BY_KEY: (moduleKey) => `/superadmin/modules/${moduleKey}`,
  ANNOUNCEMENTS: '/superadmin/announcements',
  ANNOUNCEMENT_BY_ID: (id) => `/superadmin/announcements/${id}`,
  SUPPORT_TICKETS: '/superadmin/support-tickets',
  SUPPORT_TICKET_BY_ID: (id) => `/superadmin/support-tickets/${id}`,
  SUPPORT_TICKET_MESSAGES: (id) => `/superadmin/support-tickets/${id}/messages`,
  AUDIT_LOGS: '/superadmin/audit-logs',
  TENANTS: '/superadmin/tenants',
  TENANT_MODULES: (tenantId) => `/superadmin/tenants/${tenantId}/modules`,
  TENANT_MODULE_BY_KEY: (tenantId, moduleKey) => `/superadmin/tenants/${tenantId}/modules/${moduleKey}`,
  FEATURES: '/superadmin/features',
  FEATURE_BY_ID: (id) => `/superadmin/features/${id}`,
  FEATURE_ACTIVATE: (id) => `/superadmin/features/${id}/activate`,
  FEATURE_DEACTIVATE: (id) => `/superadmin/features/${id}/deactivate`,
  PLANS: '/superadmin/plans',
  PLAN_BY_ID: (id) => `/superadmin/plans/${id}`,
  PLAN_FEATURES: (id) => `/superadmin/plans/${id}/features`,
  PAYMENTS: '/superadmin/payments',
  PAYMENT_STATS: '/superadmin/payments/stats',
  PAYMENT_MANUAL: '/superadmin/payments/manual',
  PAYMENT_STATUS: (id) => `/superadmin/payments/${id}/status`,
  PAYMENT_INVOICE_HTML: (id) => `/superadmin/payments/${id}/invoice-html`,
}

function ax(inner) {
  return Promise.resolve({ data: { success: true, data: inner } })
}

/** Response with top-level `data` array plus `meta` (matches subscription feature list API). */
function axListDataMeta(list, meta) {
  return Promise.resolve({
    data: { success: true, data: list, meta },
  })
}

/** Superadmin RBAC — keys must match `Permissions.jsx` `initialPermissions`. */
function emptyPermissionMap() {
  return {
    dashboard: false,
    organizations: false,
    subscription_plans: false,
    subscription_features: false,
    billing: false,
    admin_users: false,
    permissions: false,
    modules: false,
    announcements: false,
    audit_logs: false,
    support: false,
    settings: false,
  }
}

function allPermissionsEnabled() {
  const m = emptyPermissionMap()
  Object.keys(m).forEach((k) => {
    m[k] = true
  })
  return m
}

let permissionRoleRows = [
  {
    role_key: 'superadmin',
    role_name: 'Super Admin',
    description: 'Full platform access: tenants, billing, security, and configuration.',
    is_active: true,
    is_system: true,
    permissions: allPermissionsEnabled(),
  },
  {
    role_key: 'billing_admin',
    role_name: 'Billing Admin',
    description: 'Subscriptions, invoices, payment gateways, and revenue reporting.',
    is_active: true,
    is_system: true,
    permissions: {
      ...emptyPermissionMap(),
      dashboard: true,
      organizations: true,
      subscription_plans: true,
      subscription_features: true,
      billing: true,
      settings: true,
    },
  },
  {
    role_key: 'support_admin',
    role_name: 'Support Admin',
    description: 'Support tickets, announcements, and read-only operational visibility.',
    is_active: true,
    is_system: true,
    permissions: {
      ...emptyPermissionMap(),
      dashboard: true,
      organizations: true,
      announcements: true,
      support: true,
      audit_logs: true,
    },
  },
]

let paymentRows = [
  {
    id: 101,
    tenant_id: 1,
    tenant_name: 'Acme Corp',
    plan_name: 'Enterprise',
    amount: 199,
    currency: 'AED',
    status: 'completed',
    billing_start_date: '2026-05-01',
    billing_end_date: '2026-05-31',
    created_at: '2026-05-01T10:00:00Z',
  },
  {
    id: 102,
    tenant_id: 2,
    tenant_name: 'TechFlow LLC',
    plan_name: 'Professional',
    amount: 79,
    currency: 'AED',
    status: 'completed',
    billing_start_date: '2026-05-01',
    billing_end_date: '2026-05-31',
    created_at: '2026-05-01T11:00:00Z',
  },
  {
    id: 103,
    tenant_id: 5,
    tenant_name: 'MediPlus Clinics',
    plan_name: 'Professional',
    amount: 79,
    currency: 'AED',
    status: 'pending',
    billing_start_date: '2026-04-01',
    billing_end_date: '2026-04-30',
    created_at: '2026-04-01T09:00:00Z',
  },
]

const paymentStats = {
  monthly_revenue: 9800,
  annual_revenue: 117600,
  outstanding_amount: 790,
  failed_count: 1,
}

const adminUsers = [
  { id: 1, name: 'James Porter', email: 'james.porter@hris.com', role: 'superadmin', status: 'active', last_login_at: '2026-05-12T08:30:00Z' },
  { id: 2, name: 'Sarah Ahmed', email: 'sarah.ahmed@hris.com', role: 'hr_admin', status: 'active', last_login_at: '2026-05-12T09:00:00Z' },
  { id: 3, name: 'Priya Nair', email: 'priya.nair@hris.com', role: 'manager', status: 'active', last_login_at: '2026-05-11T17:45:00Z' },
]

const announcements = [
  { id: 1, title: 'Platform maintenance', message: 'Scheduled window Sunday 2am.', sentDate: '2026-05-10', type: 'info' },
  { id: 2, title: 'New billing export', message: 'CSV export is available in Billing.', sentDate: '2026-05-08', type: 'info' },
]

const modules = [
  {
    module_key: 'employee_directory',
    module_name: 'Employee Directory',
    description: 'Employee records',
    scope: 'global',
    is_enabled: true,
    tier: 'Standard',
  },
  {
    module_key: 'attendance',
    module_name: 'Attendance',
    description: 'Time tracking',
    scope: 'global',
    is_enabled: true,
    tier: 'Standard',
  },
  {
    module_key: 'leave',
    module_name: 'Leave',
    description: 'Leave management',
    scope: 'global',
    is_enabled: true,
    tier: 'Standard',
  },
  {
    module_key: 'payroll',
    module_name: 'Payroll',
    description: 'Payroll processing',
    scope: 'global',
    is_enabled: false,
    tier: 'Premium',
  },
  {
    module_key: 'performance',
    module_name: 'Performance',
    description: 'Reviews',
    scope: 'global',
    is_enabled: true,
    tier: 'Premium',
  },
  {
    module_key: 'onboarding_exit',
    module_name: 'Onboarding & Exit',
    description: 'Lifecycle',
    scope: 'global',
    is_enabled: true,
    tier: 'Standard',
  },
  {
    module_key: 'visa',
    module_name: 'Visa & Nationality',
    description: 'Compliance',
    scope: 'global',
    is_enabled: true,
    tier: 'Standard',
  },
  {
    module_key: 'expenses',
    module_name: 'Expenses',
    description: 'Claims',
    scope: 'global',
    is_enabled: true,
    tier: 'Standard',
  },
  {
    module_key: 'asset_management',
    module_name: 'Assets',
    description: 'Inventory',
    scope: 'global',
    is_enabled: false,
    tier: 'Premium',
  },
]

let featureRows = [
  {
    id: 1,
    feature_name: 'Advanced Reporting',
    feature_code: 'advanced_reporting',
    feature_description: 'Custom dashboards and scheduled exports.',
    feature_sort_order: 10,
    feature_is_active: true,
    created_at: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    feature_name: 'API Access',
    feature_code: 'api_access',
    feature_description: 'REST API keys and webhooks for integrations.',
    feature_sort_order: 20,
    feature_is_active: false,
    created_at: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 3,
    feature_name: 'SSO / SAML',
    feature_code: 'sso_saml',
    feature_description: 'Enterprise single sign-on.',
    feature_sort_order: 30,
    feature_is_active: true,
    created_at: '2024-06-01T00:00:00.000Z',
  },
]

function planWithFeatures(plan) {
  if (!plan) return plan
  const feats = (plan.feature_ids || [])
    .map((fid) => featureRows.find((f) => String(f.id) === String(fid)))
    .filter(Boolean)
    .map((f) => ({
      id: f.id,
      feature_name: f.feature_name,
      feature_code: f.feature_code,
      feature_description: f.feature_description || '',
    }))
  return { ...plan, features: feats }
}

let planRows = [
  {
    id: 1,
    plan_name: 'Starter',
    plan_code: 'starter',
    plan_description: 'Core HR for small teams getting started.',
    monthly_price: 29,
    annual_price: 313.2,
    user_quota: 50,
    storage_quota_gb: 10,
    company_quota: 1,
    trial_days: 14,
    support_level: 'Standard',
    is_active: true,
    is_popular: false,
    feature_ids: [1],
  },
  {
    id: 2,
    plan_name: 'Professional',
    plan_code: 'professional',
    plan_description: 'Attendance, performance, and documents for growing companies.',
    monthly_price: 79,
    annual_price: 853.2,
    user_quota: 200,
    storage_quota_gb: 100,
    company_quota: 3,
    trial_days: 14,
    support_level: 'Priority',
    is_active: true,
    is_popular: true,
    feature_ids: [1, 3],
  },
  {
    id: 3,
    plan_name: 'Enterprise',
    plan_code: 'enterprise',
    plan_description: 'Unlimited scale, dedicated support, and advanced security.',
    monthly_price: 199,
    annual_price: 2149.2,
    user_quota: -1,
    storage_quota_gb: -1,
    company_quota: -1,
    trial_days: 30,
    support_level: '24/7',
    is_active: true,
    is_popular: false,
    feature_ids: [1, 2, 3],
  },
]

let supportTicketRows = [
  {
    id: 1,
    ticketCode: 'TKT-1001',
    subject: 'Cannot export payroll report',
    org: 'TechFlow LLC',
    priority: 'High',
    status: 'Open',
    created: '2026-05-10T10:00:00.000Z',
    assignedTo: 'James Porter',
    description:
      'The payroll CSV export returns a blank file for March 2026. Tried Chrome and Edge.',
    messages: [
      { sender: 'Admin', text: 'Export fails every time after the new update.', time: '2026-05-10 10:05' },
      { sender: 'Support', text: 'We are reviewing the export job logs on your tenant.', time: '2026-05-10 11:00' },
    ],
  },
  {
    id: 2,
    ticketCode: 'TKT-1002',
    subject: 'Employee import CSV failing',
    org: 'Sunrise Retail',
    priority: 'Medium',
    status: 'In Progress',
    created: '2026-05-09T14:00:00.000Z',
    assignedTo: 'Sarah Ahmed',
    description: 'Row 14 validation error is unclear; need guidance on required columns.',
    messages: [
      { sender: 'Admin', text: 'Import stops at row 14 with a generic error.', time: '2026-05-09 14:10' },
      { sender: 'Support', text: 'Please confirm date format is DD/MM/YYYY.', time: '2026-05-09 15:00' },
      { sender: 'Admin', text: 'Yes, using DD/MM/YYYY.', time: '2026-05-09 15:30' },
      { sender: 'Support', text: 'Sending a sample template.', time: '2026-05-09 16:00' },
    ],
  },
  {
    id: 3,
    ticketCode: 'TKT-1003',
    subject: 'Custom role permissions not saving',
    org: 'Acme Corp',
    priority: 'High',
    status: 'Resolved',
    created: '2026-05-05T09:00:00.000Z',
    assignedTo: 'James Porter',
    description: 'Saving a custom role shows success toast but permissions reset on refresh.',
    messages: [
      { sender: 'Admin', text: 'Permissions revert after hard refresh.', time: '2026-05-05 09:15' },
      { sender: 'Support', text: 'Fixed in patch 3.4.1 — please clear cache.', time: '2026-05-05 10:00' },
      { sender: 'Admin', text: 'Confirmed working. Thanks!', time: '2026-05-05 10:30' },
      { sender: 'Support', text: 'Glad to help.', time: '2026-05-05 10:35' },
      { sender: 'Admin', text: 'Closing from our side.', time: '2026-05-05 11:00' },
      { sender: 'Support', text: 'Ticket resolved.', time: '2026-05-05 11:05' },
      { sender: 'Admin', text: 'Acknowledged.', time: '2026-05-05 11:10' },
    ],
  },
]

export const superadminService = {
  getAdminUsers: () => ax({ users: adminUsers }),
  createAdminUser: (payload) => ax({ user: { id: Date.now(), ...payload, status: 'active' } }),
  updateAdminUser: (id, payload) => ax({ user: { id, ...payload } }),

  getPermissions: () =>
    ax({
      roles: permissionRoleRows.map((r) => ({
        role_key: r.role_key,
        role_name: r.role_name,
        description: r.description,
        is_active: r.is_active,
        permissions: { ...r.permissions },
      })),
    }),
  createRole: (payload) => {
    let slug =
      String(payload.name || '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_|_$/g, '') || `custom_${Date.now()}`
    if (permissionRoleRows.some((r) => r.role_key === slug)) {
      slug = `${slug}_${Date.now()}`
    }
    const row = {
      role_key: slug,
      role_name: payload.name,
      description: payload.description || '',
      is_active: payload.isActive !== false,
      is_system: false,
      permissions: { ...emptyPermissionMap(), ...(payload.permissions || {}) },
    }
    permissionRoleRows = [...permissionRoleRows, row]
    return ax({ role: row })
  },
  updateRole: (roleKey, payload) => {
    const idx = permissionRoleRows.findIndex((r) => r.role_key === roleKey)
    if (idx === -1) return ax({ role: null })
    const cur = permissionRoleRows[idx]
    const nextPerms =
      payload.permissions != null
        ? { ...cur.permissions, ...payload.permissions }
        : cur.permissions
    const updated = {
      ...cur,
      role_name: payload.name ?? cur.role_name,
      description: payload.description ?? cur.description,
      is_active: payload.isActive !== undefined ? !!payload.isActive : cur.is_active,
      permissions: nextPerms,
    }
    permissionRoleRows = permissionRoleRows.map((r, i) => (i === idx ? updated : r))
    return ax({ role: updated })
  },
  deleteRole: (roleKey) => {
    const target = permissionRoleRows.find((r) => r.role_key === roleKey)
    if (!target) return ax({ deleted: false })
    if (target.is_system || roleKey === 'superadmin') return ax({ deleted: false, message: 'Cannot delete system role.' })
    permissionRoleRows = permissionRoleRows.filter((r) => r.role_key !== roleKey)
    return ax({ deleted: true })
  },

  getModules: () => ax({ modules }),
  updateModule: (moduleKey, payload) => ax({ module: { key: moduleKey, ...payload } }),
  getTenants: () =>
    ax({
      tenants: SEED_TENANTS.map((t) => ({
        id: t.id,
        name: t.name,
        db_name: t.db_name,
        admin_email: t.admin_email,
        plan: t.plan,
        status: t.status,
        created_at: t.created_at,
      })),
    }),
  getTenantModules: (tenantId) =>
    ax({
      modules: modules.map((m) => ({
        module_key: m.module_key,
        module_name: m.module_name,
        is_enabled: m.is_enabled,
        is_overridden: false,
        tenantId,
      })),
    }),
  updateTenantModule: (tenantId, moduleKey, payload) => ax({ module: { tenantId, moduleKey, ...payload } }),

  getAnnouncements: () => ax({ announcements }),
  createAnnouncement: (payload) => ax({ announcement: { id: Date.now(), ...payload } }),
  updateAnnouncement: (id, payload) => ax({ announcement: { id, ...payload } }),
  deleteAnnouncement: () => ax({ deleted: true }),
  getAnnouncementReport: (id) => ax({ report: { id, reads: 120 } }),

  getSupportTickets: () =>
    ax({
      tickets: supportTicketRows.map((t) => ({
        ...t,
        messages: Array.isArray(t.messages) ? t.messages : [],
      })),
    }),
  updateSupportTicket: (id, payload) => {
    supportTicketRows = supportTicketRows.map((t) =>
      String(t.id) === String(id) ? { ...t, ...payload } : t
    )
    const ticket = supportTicketRows.find((t) => String(t.id) === String(id))
    return ax({ ticket })
  },
  addSupportTicketMessage: (id, payload) => {
    const msg = {
      sender: payload.sender,
      text: payload.text,
      time: payload.time || new Date().toLocaleString(),
    }
    supportTicketRows = supportTicketRows.map((t) =>
      String(t.id) === String(id)
        ? { ...t, messages: [...(Array.isArray(t.messages) ? t.messages : []), msg] }
        : t
    )
    return ax({ message: { id: Date.now(), ticketId: id, ...msg } })
  },

  getAuditLogs: () =>
    ax({
      logs: [
        {
          id: 1,
          admin: 'james.porter@hris.com',
          action: 'UPDATE',
          target: 'Tenant #2',
          ip: '192.168.1.1',
          timestamp: '2026-05-12T08:45:00Z',
          result: 'Success',
        },
        {
          id: 2,
          admin: 'sarah.ahmed@hris.com',
          action: 'CREATE',
          target: 'Employee #8',
          ip: '192.168.1.10',
          timestamp: '2026-05-11T10:20:00Z',
          result: 'Success',
        },
      ],
    }),

  getFeatures: (params = {}) => {
    const page = Math.max(1, parseInt(params.page, 10) || 1)
    const limit = Math.max(1, parseInt(params.limit, 10) || 10)
    let rows = [...featureRows]
    if (params.search) {
      const q = String(params.search).toLowerCase()
      rows = rows.filter(
        (f) =>
          (f.feature_name || '').toLowerCase().includes(q) ||
          (f.feature_code || '').toLowerCase().includes(q)
      )
    }
    if (params.isActive === true) rows = rows.filter((f) => f.feature_is_active)
    if (params.isActive === false) rows = rows.filter((f) => !f.feature_is_active)
    const total = rows.length
    const totalPages = Math.max(1, Math.ceil(total / limit))
    const start = (page - 1) * limit
    const slice = rows.slice(start, start + limit)
    return axListDataMeta(slice, { page, limit, total, totalPages })
  },
  getActiveFeatures: () => ax(featureRows.filter((f) => f.feature_is_active)),
  getFeatureById: (id) =>
    ax(featureRows.find((f) => String(f.id) === String(id)) || featureRows[0]),
  createFeature: (payload) => {
    const row = {
      id: Date.now(),
      feature_name: payload.feature_name,
      feature_code: payload.feature_code,
      feature_description: payload.feature_description || '',
      feature_sort_order: Number(payload.feature_sort_order) || 0,
      feature_is_active: payload.feature_is_active !== false,
      created_at: new Date().toISOString(),
    }
    featureRows = [...featureRows, row]
    return ax({ feature: row })
  },
  updateFeature: (id, payload) => {
    featureRows = featureRows.map((f) =>
      String(f.id) === String(id)
        ? {
            ...f,
            feature_name: payload.feature_name ?? f.feature_name,
            feature_code: payload.feature_code ?? f.feature_code,
            feature_description: payload.feature_description ?? f.feature_description,
            feature_sort_order:
              payload.feature_sort_order !== undefined
                ? Number(payload.feature_sort_order)
                : f.feature_sort_order,
            feature_is_active:
              payload.feature_is_active !== undefined ? !!payload.feature_is_active : f.feature_is_active,
          }
        : f
    )
    const feature = featureRows.find((f) => String(f.id) === String(id))
    return ax({ feature })
  },
  deleteFeature: (id) => {
    featureRows = featureRows.filter((f) => String(f.id) !== String(id))
    planRows = planRows.map((p) => ({
      ...p,
      feature_ids: (p.feature_ids || []).filter((fid) => String(fid) !== String(id)),
    }))
    return ax({ deleted: true })
  },
  activateFeature: (id) => {
    featureRows = featureRows.map((f) =>
      String(f.id) === String(id) ? { ...f, feature_is_active: true } : f
    )
    return ax({ feature: featureRows.find((f) => String(f.id) === String(id)) })
  },
  deactivateFeature: (id) => {
    featureRows = featureRows.map((f) =>
      String(f.id) === String(id) ? { ...f, feature_is_active: false } : f
    )
    return ax({ feature: featureRows.find((f) => String(f.id) === String(id)) })
  },

  getPlans: (params = {}) => {
    const q = (params.search || '').toLowerCase()
    let list = planRows.map((p) => planWithFeatures(p))
    if (q) {
      list = list.filter(
        (p) =>
          (p.plan_name || '').toLowerCase().includes(q) ||
          (p.plan_code || '').toLowerCase().includes(q) ||
          (p.plan_description || '').toLowerCase().includes(q)
      )
    }
    return ax(list)
  },
  getPlanById: (id) => {
    const base = planRows.find((p) => String(p.id) === String(id)) || planRows[0]
    return ax(planWithFeatures(base))
  },
  createPlan: (payload) => {
    const id = Date.now()
    const row = {
      id,
      plan_name: payload.plan_name,
      plan_code: payload.plan_code,
      plan_description: payload.plan_description || '',
      monthly_price: Number(payload.monthly_price) || 0,
      annual_price: Number(payload.annual_price) || 0,
      user_quota: Number(payload.user_quota) || 0,
      storage_quota_gb: Number(payload.storage_quota_gb) || 0,
      company_quota: Number(payload.company_quota) || 1,
      trial_days: Number(payload.trial_days) || 0,
      support_level: payload.support_level || 'Standard',
      is_active: payload.isActive !== false,
      is_popular: !!payload.is_popular,
      feature_ids: [],
    }
    planRows = [...planRows, row]
    return ax(row)
  },
  updatePlan: (id, payload) => {
    planRows = planRows.map((p) => {
      if (String(p.id) !== String(id)) return p
      return {
        ...p,
        plan_name: payload.plan_name ?? p.plan_name,
        plan_code: payload.plan_code ?? p.plan_code,
        plan_description: payload.plan_description ?? p.plan_description,
        monthly_price:
          payload.monthly_price !== undefined ? Number(payload.monthly_price) : p.monthly_price,
        annual_price:
          payload.annual_price !== undefined ? Number(payload.annual_price) : p.annual_price,
        user_quota: payload.user_quota !== undefined ? Number(payload.user_quota) : p.user_quota,
        storage_quota_gb:
          payload.storage_quota_gb !== undefined
            ? Number(payload.storage_quota_gb)
            : p.storage_quota_gb,
        company_quota:
          payload.company_quota !== undefined ? Number(payload.company_quota) : p.company_quota,
        trial_days: payload.trial_days !== undefined ? Number(payload.trial_days) : p.trial_days,
        support_level: payload.support_level ?? p.support_level,
        is_active: payload.isActive !== undefined ? !!payload.isActive : p.is_active,
      }
    })
    const plan = planRows.find((p) => String(p.id) === String(id))
    return ax({ plan })
  },
  deletePlan: (id) => {
    planRows = planRows.filter((p) => String(p.id) !== String(id))
    return ax({ deleted: true })
  },
  updatePlanFeatures: (id, featureIds) => {
    const ids = Array.isArray(featureIds)
      ? featureIds.map((fid) => Number(fid)).filter((n) => !Number.isNaN(n))
      : []
    planRows = planRows.map((p) => (String(p.id) === String(id) ? { ...p, feature_ids: ids } : p))
    return ax({ plan: planWithFeatures(planRows.find((p) => String(p.id) === String(id))) })
  },

  getPayments: (params = {}) => {
    const page = Math.max(1, parseInt(params.page, 10) || 1)
    const limit = Math.max(1, parseInt(params.limit, 10) || 10)
    let rows = [...paymentRows]
    if (params.search) {
      const q = String(params.search).toLowerCase()
      rows = rows.filter((r) => `${r.tenant_name} ${r.id}`.toLowerCase().includes(q))
    }
    if (params.status && params.status !== 'all') {
      rows = rows.filter((r) => r.status === params.status)
    }
    const total = rows.length
    const start = (page - 1) * limit
    const slice = rows.slice(start, start + limit)
    return ax({ payments: slice, meta: { total, page, limit } })
  },
  getPaymentStats: () => ax(paymentStats),
  createManualInvoice: () => {
    const row = {
      id: Date.now(),
      tenant_id: 1,
      tenant_name: 'New Org',
      plan_name: 'Starter',
      amount: 100,
      currency: 'AED',
      status: 'pending',
      billing_start_date: '2026-05-01',
      billing_end_date: '2026-05-31',
      created_at: new Date().toISOString(),
    }
    paymentRows = [row, ...paymentRows]
    return ax({ payment: row })
  },
  getInvoiceHtml: (_id) => Promise.resolve({ data: '<html><body><h1>Invoice</h1></body></html>' }),
  updatePaymentStatus: (id, status) => {
    paymentRows = paymentRows.map((p) => (String(p.id) === String(id) ? { ...p, status } : p))
    return ax({ payment: paymentRows.find((p) => String(p.id) === String(id)) })
  },
}
