let policyStore = [
  {
    id: '1',
    title: 'Code of Conduct',
    category: 'General',
    version: '2.1',
    status: 'Published',
    publishedAt: '2024-01-01',
    effectiveDate: '2024-01-01',
    updated_at: '2026-01-10T12:00:00Z',
    ack_required: true,
    ackCount: 198,
    description: 'Standards of professional behavior expected from all employees.',
    reviewDate: '2026-12-01',
    audience: 'All Employees',
    attachments: [],
  },
  {
    id: '2',
    title: 'Leave Policy 2026',
    category: 'HR Policies',
    version: '3.0',
    status: 'Published',
    publishedAt: '2026-01-01',
    effectiveDate: '2026-01-01',
    updated_at: '2026-03-22T12:00:00Z',
    ack_required: true,
    ackCount: 220,
    description: 'Comprehensive leave entitlements and procedures.',
    reviewDate: '2026-09-01',
    audience: 'All Employees',
    attachments: [],
  },
  {
    id: '3',
    title: 'IT Security Policy',
    category: 'IT & Security',
    version: '1.5',
    status: 'Published',
    publishedAt: '2023-09-01',
    effectiveDate: '2023-09-01',
    updated_at: '2025-11-05T12:00:00Z',
    ack_required: true,
    ackCount: 180,
    description: 'Acceptable use of IT resources and data protection.',
    reviewDate: '2026-06-01',
    audience: 'All Employees',
    attachments: [],
  },
  {
    id: '4',
    title: 'Remote Work Policy',
    category: 'HR Policies',
    version: '1.0',
    status: 'Draft',
    publishedAt: null,
    effectiveDate: '2026-06-01',
    updated_at: '2026-05-01T12:00:00Z',
    ack_required: false,
    ackCount: 0,
    description: 'Guidelines for remote employees.',
    reviewDate: '2026-08-01',
    audience: 'All Employees',
    attachments: [],
  },
]

let policyCategories = [
  { id: '1', name: 'General', icon_name: 'HiDocumentText', description: '' },
  { id: '2', name: 'HR Policies', icon_name: 'HiDocumentText', description: '' },
  { id: '3', name: 'IT & Security', icon_name: 'HiShieldCheck', description: '' },
  { id: '4', name: 'Finance', icon_name: 'HiDocumentText', description: '' },
]

export const policyService = {
  list: async (_filters = {}) => [...policyStore],

  getOne: async (id) => policyStore.find((p) => String(p.id) === String(id)) || policyStore[0],

  create: async (payload) => {
    const id = String(Date.now())
    const row = { ...payload, id, updated_at: new Date().toISOString(), ackCount: 0 }
    policyStore = [...policyStore, row]
    return row
  },

  update: async (id, payload) => {
    policyStore = policyStore.map((p) => (String(p.id) !== String(id) ? p : { ...p, ...payload, updated_at: new Date().toISOString() }))
    return policyStore.find((p) => String(p.id) === String(id))
  },

  remove: async (id) => {
    policyStore = policyStore.filter((p) => String(p.id) !== String(id))
  },

  getTracking: async (_id) => [
    { employee_name: 'Sarah Ahmed', department: 'Human Resources', status: 'Acknowledged', acknowledged_at: '2026-04-01' },
    { employee_name: 'Omar Hassan', department: 'Engineering', status: 'Pending', acknowledged_at: null },
  ],

  acknowledge: async (id) => ({ success: true, policyId: id }),

  listCategories: async () => [...policyCategories],

  createCategory: async (payload) => {
    const id = String(policyCategories.length + 1)
    const row = {
      id,
      name: payload.name,
      icon_name: payload.iconName || 'HiDocumentText',
      description: payload.description || '',
    }
    policyCategories = [...policyCategories, row]
    return row
  },

  updateCategory: async (id, payload) => {
    policyCategories = policyCategories.map((c) =>
      String(c.id) !== String(id)
        ? c
        : {
            ...c,
            ...payload,
            icon_name: payload.iconName ?? c.icon_name,
          },
    )
    return policyCategories.find((c) => String(c.id) === String(id))
  },

  deleteCategory: async (id) => {
    policyCategories = policyCategories.filter((c) => String(c.id) !== String(id))
  },

  upload: async (_file) => ({ url: '#', name: 'mock-upload.pdf' }),
}
