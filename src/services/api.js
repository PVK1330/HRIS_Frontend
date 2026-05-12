// STATIC MODE — in-memory mock HTTP client (no axios, no network)
import { SEED_PLANS_ACTIVE, SEED_TENANT_FEATURES, SEED_TENANTS } from '../data/staticSeeds.js'

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^\w_]+/g, '')
}

let tenantRows = SEED_TENANTS.map((t) => ({ ...t }))

function stripPath(url) {
  const s = String(url || '').split('?')[0]
  return s.startsWith('/') ? s : `/${s}`
}

function ok(payload) {
  return { success: true, data: payload }
}

function matchParams(config) {
  return config && typeof config === 'object' && config.params ? config.params : {}
}

function filterTenants(list, params) {
  const search = String(params.search || '')
    .trim()
    .toLowerCase()
  const plan = String(params.plan || 'all').toLowerCase()
  const status = String(params.status || 'all').toLowerCase()
  return list.filter((t) => {
    if (plan !== 'all' && String(t.plan || '').toLowerCase() !== plan) return false
    if (status !== 'all' && String(t.status || '').toLowerCase() !== status) return false
    if (search) {
      const hay = `${t.name} ${t.admin_email} ${t.db_name}`.toLowerCase()
      if (!hay.includes(search)) return false
    }
    return true
  })
}

function routeGet(path, config) {
  const params = matchParams(config)

  if (path === '/auth/access-profile') {
    return ok({
      plan_details: [],
      tenant_features: SEED_TENANT_FEATURES.map((f) => ({
        feature_code: f.feature_code,
        is_enabled: f.isEnabled,
      })),
      allowedModules: [
        'dashboard',
        'employee-directory',
        'employee-profiles',
        'attendance',
        'leave-absence',
        'documents-approval',
        'visa-nationality',
        'assets',
        'performance',
        'policies',
        'expenses',
        'onboarding',
        'exit-management',
        'reports-analytics',
        'announcements',
        'payroll-management',
        'system-settings',
      ],
    })
  }

  if (path === '/superadmin/plans/active') {
    return ok([...SEED_PLANS_ACTIVE])
  }

  if (path === '/tenants') {
    const page = Math.max(1, parseInt(params.page, 10) || 1)
    const limit = Math.max(1, parseInt(params.limit, 10) || 10)
    const filtered = filterTenants(tenantRows, params)
    const total = filtered.length
    const start = (page - 1) * limit
    const tenants = filtered.slice(start, start + limit)
    return ok({ tenants, total })
  }

  const featMatch = path.match(/^\/tenants\/([^/]+)\/features$/)
  if (featMatch) {
    return ok({ features: SEED_TENANT_FEATURES.map((f) => ({ ...f })) })
  }

  return ok({ data: {} })
}

function routePost(path, body) {
  const loginAs = path.match(/^\/tenants\/([^/]+)\/login-as$/)
  if (loginAs) {
    return ok({
      loginUrl: `${typeof window !== 'undefined' ? window.location.origin : ''}/login?demo=1`,
    })
  }

  if (path === '/tenants/create') {
    const id = tenantRows.length ? Math.max(...tenantRows.map((t) => Number(t.id))) + 1 : 1
    const row = {
      id,
      name: body?.name || 'New Organization',
      db_name: slugify(body?.name || `tenant_${id}`),
      admin_email: body?.adminEmail || body?.admin_email || 'admin@example.com',
      plan: SEED_PLANS_ACTIVE.find((p) => String(p.id) === String(body?.plan_id))?.name || 'Starter',
      status: 'active',
      created_at: new Date().toISOString(),
    }
    tenantRows = [...tenantRows, row]
    return ok({ tenant: row })
  }

  const resetPw = path.match(/^\/tenants\/([^/]+)\/reset-password$/)
  if (resetPw) {
    return ok({ success: true })
  }

  return ok({})
}

function routePatch(path, body) {
  const tenantFeat = path.match(/^\/tenants\/([^/]+)\/features\/([^/]+)$/)
  if (tenantFeat) {
    return ok({ feature: { id: Number(tenantFeat[2]), isEnabled: body?.isEnabled } })
  }

  const tenantIdMatch = path.match(/^\/tenants\/([^/]+)$/)
  if (tenantIdMatch && !path.includes('/features')) {
    const id = Number(tenantIdMatch[1])
    tenantRows = tenantRows.map((t) =>
      Number(t.id) === id
        ? {
            ...t,
            ...(body?.name != null ? { name: body.name } : {}),
            ...(body?.adminEmail != null ? { admin_email: body.adminEmail } : {}),
            ...(body?.status != null ? { status: String(body.status).toLowerCase() } : {}),
          }
        : t,
    )
    return ok({ tenant: tenantRows.find((t) => Number(t.id) === id) })
  }

  return ok({})
}

function routeDelete(path) {
  const tenantIdMatch = path.match(/^\/tenants\/([^/]+)$/)
  if (tenantIdMatch) {
    const id = Number(tenantIdMatch[1])
    tenantRows = tenantRows.filter((t) => Number(t.id) !== id)
    return ok({ deleted: true })
  }
  return ok({})
}

const api = {
  get: async (url, config = {}) => {
    const path = stripPath(url)
    return { data: routeGet(path, config) }
  },
  post: async (url, body, _config) => {
    const path = stripPath(url)
    return { data: routePost(path, body) }
  },
  patch: async (url, body, _config) => {
    const path = stripPath(url)
    return { data: routePatch(path, body) }
  },
  put: async (url, body, _config) => {
    const path = stripPath(url)
    return { data: routePatch(path, body) }
  },
  delete: async (url, _config) => {
    const path = stripPath(url)
    return { data: routeDelete(path) }
  },
}

export default api
