const ok = (data, message = 'OK') => ({ success: true, message, data })

const PASSWORD_SECURITY_BODY = {
  data: {
    passwordPolicy: {
      minimumLength: 8,
      mustIncludeSpecialChars: false,
      passwordExpiryDays: 90,
      twoFactorAuth: false,
    },
    accountSecurity: {
      autoLogoutMinutes: 60,
      maxLoginAttemptLimit: 5,
      blockedAccountRecovery: 'Email recovery',
    },
  },
}

const NOTIFICATION_BODY = {
  data: {
    channels: {
      emailNotifications: true,
      smsNotifications: false,
      inAppAlerts: true,
    },
    eventNotifications: {
      leave_request: { email: true, sms: false, in_app: true },
      attendance_alert: { email: true, sms: false, in_app: true },
      document_expiry: { email: true, sms: false, in_app: true },
      payroll: { email: true, sms: false, in_app: false },
    },
  },
}

const SENSITIVE_BUNDLE = {
  settings: {
    salaryDataVisibility: {
      hr_admin: 'Full',
      manager: 'Masked',
      employee: 'Hidden',
    },
    documentVisibility: {
      hr_admin: 'Full',
      manager: 'Limited',
      employee: 'Own only',
    },
    visaNationalityVisibility: {
      hr_admin: 'Full',
      manager: 'Limited',
      employee: 'Own only',
    },
    notesVisibility: 'HR only',
  },
  salaryVisibilityOptions: ['Full', 'Masked', 'Hidden'],
  visaVisibilityOptions: ['Full', 'Limited', 'Hidden'],
  documentVisibilityOptions: ['Full', 'Limited', 'Own only'],
  notesVisibilityOptions: ['HR only', 'Manager + HR', 'All'],
  roles: [
    { key: 'hr_admin', label: 'HR Admin' },
    { key: 'manager', label: 'Manager' },
    { key: 'employee', label: 'Employee' },
  ],
}

let leaveTypeStore = [
  {
    id: 1,
    name: 'Annual Leave',
    paidOrUnpaid: 'Paid',
    annualEntitlementDays: 21,
    entitlementLabel: 'Days / year',
    accrual: 'Monthly',
    maxCarryForwardDays: 5,
    lossOfPayRule: 'Standard',
    documentRequired: false,
    autoApproval: false,
    approver: 'Manager',
    isActive: true,
    isCustom: false,
  },
  {
    id: 2,
    name: 'Sick Leave',
    paidOrUnpaid: 'Paid',
    annualEntitlementDays: 10,
    entitlementLabel: 'Days / year',
    accrual: 'Upfront',
    maxCarryForwardDays: 0,
    lossOfPayRule: 'Standard',
    documentRequired: true,
    autoApproval: false,
    approver: 'HR Head',
    isActive: true,
    isCustom: false,
  },
  {
    id: 3,
    name: 'Emergency Leave',
    paidOrUnpaid: 'Paid',
    annualEntitlementDays: 3,
    entitlementLabel: 'Days / year',
    accrual: 'Upfront',
    maxCarryForwardDays: 0,
    lossOfPayRule: 'Standard',
    documentRequired: false,
    autoApproval: true,
    approver: 'Manager',
    isActive: true,
    isCustom: false,
  },
]

let documentTypeStore = [
  {
    id: 1,
    name: 'Passport',
    mandatoryOrOptional: 'Mandatory',
    whoMustUpload: 'Employee',
    expiryTracking: true,
    reminderBeforeExpiryDays: 90,
    hrApprovalRequired: true,
    visibility: 'HR only',
  },
  {
    id: 2,
    name: 'Visa',
    mandatoryOrOptional: 'Mandatory',
    whoMustUpload: 'Employee',
    expiryTracking: true,
    reminderBeforeExpiryDays: 60,
    hrApprovalRequired: true,
    visibility: 'Manager + HR',
  },
  {
    id: 3,
    name: 'Emirates ID',
    mandatoryOrOptional: 'Mandatory',
    whoMustUpload: 'Employee',
    expiryTracking: true,
    reminderBeforeExpiryDays: 60,
    hrApprovalRequired: false,
    visibility: 'HR only',
  },
]

const PERM_ROWS = [
  { id: 1, key: 'dashboard', label: 'Dashboard', module: 'Core' },
  { id: 2, key: 'employees:read', label: 'View Employees', module: 'Employees' },
  { id: 3, key: 'employees:write', label: 'Edit Employees', module: 'Employees' },
  { id: 4, key: 'leave:read', label: 'View Leave', module: 'Leave' },
  { id: 5, key: 'leave:approve', label: 'Approve Leave', module: 'Leave' },
  { id: 6, key: 'attendance:read', label: 'View Attendance', module: 'Attendance' },
]

/** Mimic axios response `{ data: serverBody }` for RBAC + logo calls */
function axData(serverBody) {
  return { data: serverBody }
}

let rbacRoles = [
  {
    id: 10,
    name: 'HR Admin',
    key: 'hr_admin',
    description: 'Full HR access',
    is_system: false,
    permissions: PERM_ROWS.slice(0, 6),
  },
  {
    id: 11,
    name: 'Manager',
    key: 'manager',
    description: 'Team lead access',
    is_system: false,
    permissions: PERM_ROWS.filter((p) => [1, 2, 4, 6].includes(p.id)),
  },
  {
    id: 12,
    name: 'Employee',
    key: 'employee',
    description: 'Self-service',
    is_system: true,
    permissions: PERM_ROWS.filter((p) => [1].includes(p.id)),
  },
]

export async function getPasswordSecurity() {
  return { ...PASSWORD_SECURITY_BODY }
}

export async function updatePasswordSecurity(payload) {
  return ok({ ...PASSWORD_SECURITY_BODY.data, ...payload })
}

export async function getNotifications() {
  return { ...NOTIFICATION_BODY }
}

export async function updateNotifications(payload) {
  return ok({ ...NOTIFICATION_BODY.data, ...payload })
}

export async function updateEventNotification(_eventKey, patch) {
  return ok({ ...NOTIFICATION_BODY.data, ...patch })
}

export async function getDocumentTypes() {
  return { data: [...documentTypeStore] }
}

export async function getDocumentType(id) {
  return { data: documentTypeStore.find((d) => String(d.id) === String(id)) || documentTypeStore[0] }
}

export async function createDocumentType(payload) {
  const id = documentTypeStore.length ? Math.max(...documentTypeStore.map((d) => d.id)) + 1 : 1
  const row = {
    id,
    name: payload.name,
    mandatoryOrOptional: 'Mandatory',
    whoMustUpload: 'Employee',
    expiryTracking: true,
    reminderBeforeExpiryDays: 30,
    hrApprovalRequired: false,
    visibility: 'HR only',
  }
  documentTypeStore = [...documentTypeStore, row]
  return { data: row }
}

export async function updateDocumentType(id, payload) {
  documentTypeStore = documentTypeStore.map((d) =>
    String(d.id) !== String(id) ? d : { ...d, ...payload },
  )
  return { data: documentTypeStore.find((d) => String(d.id) === String(id)) }
}

export async function deleteDocumentType(id) {
  documentTypeStore = documentTypeStore.filter((d) => String(d.id) !== String(id))
  return { success: true }
}

export async function getSensitiveData() {
  return { data: SENSITIVE_BUNDLE }
}

export async function updateSensitiveData(payload) {
  return ok({ ...SENSITIVE_BUNDLE, settings: { ...SENSITIVE_BUNDLE.settings, ...payload } })
}

export async function getLeaveTypes() {
  return {
    success: true,
    data: {
      leaveTypes: [...leaveTypeStore],
      approverOptions: ['Manager', 'HR Head', 'Director'],
    },
  }
}

export async function getLeaveType(id) {
  return { success: true, data: { leaveType: leaveTypeStore.find((l) => String(l.id) === String(id)) || leaveTypeStore[0] } }
}

export async function createLeaveType(payload) {
  const id = leaveTypeStore.length ? Math.max(...leaveTypeStore.map((l) => l.id)) + 1 : 1
  const row = {
    id,
    name: payload.name || 'Custom Leave',
    paidOrUnpaid: payload.paidOrUnpaid || 'Paid',
    annualEntitlementDays: 5,
    entitlementLabel: 'Days',
    accrual: 'Upfront',
    maxCarryForwardDays: 0,
    lossOfPayRule: 'Standard',
    documentRequired: false,
    autoApproval: false,
    approver: 'Manager',
    isActive: true,
    isCustom: true,
  }
  leaveTypeStore = [...leaveTypeStore, row]
  return { success: true, data: { leaveType: row } }
}

export async function updateLeaveType(id, payload) {
  leaveTypeStore = leaveTypeStore.map((l) => (String(l.id) !== String(id) ? l : { ...l, ...payload }))
  return { success: true, data: { leaveType: leaveTypeStore.find((l) => String(l.id) === String(id)) } }
}

export async function deleteLeaveType(id) {
  leaveTypeStore = leaveTypeStore.filter((l) => String(l.id) !== String(id))
  return { success: true }
}

export const adminSettingsService = {
  getTenantLogo: async () => axData({ data: { logoUrl: '' } }),
  uploadTenantLogo: async () => axData({ data: { logoUrl: '/uploads/mock-logo.png' } }),

  getSuperadminLogo: async () => axData({ data: { largeLogo: '', smallLogo: '', favicon: '' } }),
  uploadSuperadminLogo: async () => axData({ data: { largeLogo: '/uploads/mock-platform.png' } }),

  getAllPermissions: async () => axData({ success: true, data: PERM_ROWS }),
  getAvailablePermissions: async () => axData({ success: true, data: PERM_ROWS }),
  getAllRoles: async () => axData({ success: true, data: [...rbacRoles] }),
  getRole: async (id) => axData({ success: true, data: rbacRoles.find((r) => String(r.id) === String(id)) || rbacRoles[0] }),
  createRole: async (data) => {
    const id = rbacRoles.length ? Math.max(...rbacRoles.map((r) => r.id)) + 1 : 20
    const row = {
      id,
      name: data.name,
      key: String(data.name || 'role')
        .toLowerCase()
        .replace(/\s+/g, '_'),
      description: data.description || '',
      is_system: false,
      permissions: [],
    }
    rbacRoles = [...rbacRoles, row]
    return axData({ success: true, data: row })
  },
  updateRole: async (id, data) => {
    rbacRoles = rbacRoles.map((r) => (String(r.id) !== String(id) ? r : { ...r, ...data }))
    return axData({ success: true, data: rbacRoles.find((r) => String(r.id) === String(id)) })
  },
  deleteRole: async (id) => {
    rbacRoles = rbacRoles.filter((r) => String(r.id) !== String(id))
    return axData({ success: true, data: { deleted: true } })
  },
  updateRolePermissions: async (roleId, permissionIds) => {
    const ids = new Set((permissionIds || []).map(Number))
    rbacRoles = rbacRoles.map((r) =>
      String(r.id) !== String(roleId)
        ? r
        : { ...r, permissions: PERM_ROWS.filter((p) => ids.has(p.id)) },
    )
    return axData({ success: true, data: { updated: true } })
  },
}
