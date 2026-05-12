import { getLeaveTypes } from './adminSettingsService.js'

const LEAVE_TYPES_STATIC = [
  { id: 1, name: 'Annual Leave', paidOrUnpaid: 'Paid', annualEntitlementDays: 21, isActive: true, isCustom: false },
  { id: 2, name: 'Sick Leave', paidOrUnpaid: 'Paid', annualEntitlementDays: 10, isActive: true, isCustom: false },
  { id: 3, name: 'Emergency Leave', paidOrUnpaid: 'Paid', annualEntitlementDays: 3, isActive: true, isCustom: false },
]

let leaveRequests = [
  {
    id: 1,
    employee_id: 4,
    employee_name: 'Raj Malhotra',
    emp_id: 'EP-1120',
    department: 'Design',
    leave_type: 'Annual Leave',
    from_date: '2026-05-10',
    to_date: '2026-05-15',
    total_days: 6,
    reason: 'Family vacation',
    status: 'Approved',
  },
  {
    id: 2,
    employee_id: 2,
    employee_name: 'Omar Hassan',
    emp_id: 'EP-1044',
    department: 'Engineering',
    leave_type: 'Sick Leave',
    from_date: '2026-05-12',
    to_date: '2026-05-12',
    total_days: 1,
    reason: 'Flu',
    status: 'Pending',
  },
  {
    id: 3,
    employee_id: 6,
    employee_name: 'Marcus Lee',
    emp_id: 'EP-1189',
    department: 'Engineering',
    leave_type: 'Annual Leave',
    from_date: '2026-06-01',
    to_date: '2026-06-05',
    total_days: 5,
    reason: 'Personal trip',
    status: 'Pending',
  },
]

export const listLeave = async (params = {}) => {
  let rows = [...leaveRequests]
  if (params.year) {
    const y = String(params.year)
    rows = rows.filter((r) => String(r.from_date).startsWith(y))
  }
  if (params.status) rows = rows.filter((r) => r.status === params.status)
  if (params.department) rows = rows.filter((r) => r.department === params.department)
  if (params.search) {
    const q = String(params.search).toLowerCase()
    rows = rows.filter((r) => r.employee_name.toLowerCase().includes(q))
  }
  const stats = {
    total: rows.length,
    pending: rows.filter((r) => r.status === 'Pending').length,
    approved: rows.filter((r) => r.status === 'Approved').length,
    rejected: rows.filter((r) => r.status === 'Rejected').length,
  }
  return {
    requests: rows,
    total: rows.length,
    stats,
    year: params.year || new Date().getFullYear(),
    limit: params.limit || 20,
    page: params.page || 1,
  }
}

export const applyLeave = async (payload) => {
  const id = leaveRequests.length ? Math.max(...leaveRequests.map((r) => r.id)) + 1 : 1
  const req = {
    id,
    employee_id: Number(payload.employeeId),
    employee_name: 'Employee',
    emp_id: 'EP-0000',
    department: 'General',
    leave_type: payload.leaveType || 'Annual Leave',
    from_date: payload.fromDate,
    to_date: payload.toDate,
    total_days: Number(payload.totalDays) || 1,
    reason: payload.reason || '',
    status: 'Pending',
  }
  leaveRequests = [...leaveRequests, req]
  return { request: req }
}

export const processLeave = async (id, payload) => {
  const action = payload?.action
  leaveRequests = leaveRequests.map((r) =>
    String(r.id) === String(id)
      ? {
          ...r,
          status: action === 'approve' ? 'Approved' : action === 'reject' ? 'Rejected' : r.status,
        }
      : r,
  )
  return { request: leaveRequests.find((r) => String(r.id) === String(id)) }
}

export const listBalances = async (params = {}) => {
  const year = params.year || new Date().getFullYear()
  const balances = [1, 2, 3, 4, 5, 6].map((eid) => {
    const nameMap = { 1: 'Sarah Ahmed', 2: 'Omar Hassan', 3: 'Emily Clarke', 4: 'Raj Malhotra', 5: 'Layla Farouk', 6: 'Marcus Lee' }
    const empMap = { 1: 'EP-1001', 2: 'EP-1044', 3: 'EP-1088', 4: 'EP-1120', 5: 'EP-1156', 6: 'EP-1189' }
    const deptMap = { 1: 'Human Resources', 2: 'Engineering', 3: 'Finance', 4: 'Design', 5: 'Operations', 6: 'Engineering' }
    const jobMap = { 1: 'HR Manager', 2: 'Software Engineer', 3: 'Finance Analyst', 4: 'Product Designer', 5: 'Operations Lead', 6: 'Data Engineer' }
    return {
      employee_id: eid,
      employee_name: nameMap[eid],
      emp_id: empMap[eid],
      department: deptMap[eid],
      job_title: jobMap[eid],
      balances: LEAVE_TYPES_STATIC.map((lt, i) => ({
        leave_type: lt.name,
        total_allocated: lt.annualEntitlementDays,
        carry_forward: i === 0 ? 2 : 0,
        used: 2 + (eid % 3),
        remaining: lt.annualEntitlementDays - (2 + (eid % 3)) + (i === 0 ? 2 : 0),
      })),
    }
  })
  return { balances, year }
}

export const getEmployeeLeave = async (employeeId, params = {}) => {
  const year = params.year || new Date().getFullYear()
  const { balances: allRows } = await listBalances({ year })
  const row = allRows.find((b) => String(b.employee_id) === String(employeeId))
  return {
    requests: leaveRequests.filter((r) => String(r.employee_id) === String(employeeId)),
    balances: row?.balances || [],
    year,
  }
}

export { getLeaveTypes }
