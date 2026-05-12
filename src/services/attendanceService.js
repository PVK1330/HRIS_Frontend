import { SEED_EMPLOYEES } from '../data/staticSeeds.js'

function empById(id) {
  return SEED_EMPLOYEES.find((e) => String(e.id) === String(id)) || SEED_EMPLOYEES[0]
}

let attendanceRows = SEED_EMPLOYEES.map((e, i) => ({
  id: String(i + 1),
  employee_id: Number(e.id),
  employee_name: e.name,
  emp_id: e.empId,
  department: e.department,
  date: new Date().toISOString().split('T')[0],
  check_in_time: i % 5 === 0 ? null : `0${7 + (i % 3)}:${i % 2 === 0 ? '00' : '30'}`,
  check_out_time: i % 5 === 0 ? null : `${17 + (i % 2)}:00`,
  status: i % 5 === 0 ? 'Absent' : i % 7 === 0 ? 'Late' : 'Present',
  total_hours: i % 5 === 0 ? 0 : 8 - (i % 2) * 0.25,
  work_mode: e.workMode,
  is_late: i % 7 === 0,
  early_departure: false,
  regularization_status: i % 11 === 0 ? 'Pending' : 'N/A',
}))

let pendingRegs = [
  {
    id: '1',
    employee_id: 2,
    employee_name: 'Omar Hassan',
    emp_id: 'EP-1044',
    date: '2026-05-08',
    status: 'Pending',
    notes: 'Forgot to check in — was at client site',
  },
  {
    id: '2',
    employee_id: 3,
    employee_name: 'Emily Clarke',
    emp_id: 'EP-1088',
    date: '2026-05-07',
    status: 'Pending',
    notes: 'System error — biometric not captured',
  },
]

export const listAttendance = async (params = {}) => {
  const date = params.date || new Date().toISOString().split('T')[0]
  let rows = attendanceRows.filter((r) => r.date === date)
  if (params.department) rows = rows.filter((r) => r.department === params.department)
  if (params.status) rows = rows.filter((r) => r.status === params.status)
  if (params.search) {
    const q = String(params.search).toLowerCase()
    rows = rows.filter((r) => `${r.employee_name} ${r.emp_id}`.toLowerCase().includes(q))
  }
  const summary = {
    present: rows.filter((r) => r.status === 'Present').length,
    absent: rows.filter((r) => r.status === 'Absent').length,
    late: rows.filter((r) => r.status === 'Late').length,
    remote: rows.filter((r) => r.work_mode === 'Remote').length,
    on_leave: 0,
    half_day: 0,
    total_days: rows.length,
  }
  return { records: rows, total: rows.length, summary, date, limit: params.limit || 50, page: params.page || 1 }
}

export const markAttendance = async (payload) => {
  const e = empById(payload.employeeId)
  const rec = {
    id: String(Date.now()),
    employee_id: Number(e.id),
    employee_name: e.name,
    emp_id: e.empId,
    department: e.department,
    date: payload.date,
    check_in_time: payload.checkInTime,
    check_out_time: payload.checkOutTime,
    status: payload.status || 'Present',
    total_hours: 8,
    work_mode: payload.workMode,
    is_late: Boolean(payload.isLate),
    early_departure: false,
    regularization_status: 'N/A',
  }
  attendanceRows = [...attendanceRows, rec]
  return { record: rec }
}

export const getPendingRegularizations = async () => ({ records: [...pendingRegs], total: pendingRegs.length })

export const regularize = async (id, payload) => {
  const action = payload?.action
  pendingRegs = pendingRegs.filter((r) => String(r.id) !== String(id))
  return {
    record: {
      id,
      status: action === 'approve' ? 'Approved' : 'Rejected',
    },
  }
}

export const getEmployeeAttendance = async (employeeId, params = {}) => {
  const y = params.year ?? new Date().getFullYear()
  const m = params.month ?? new Date().getMonth() + 1
  const e = empById(employeeId)
  const records = []
  for (let d = 1; d <= 10; d += 1) {
    records.push({
      date: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
      check_in_time: '09:00',
      check_out_time: '18:00',
      total_hours: 8,
      status: 'Present',
    })
  }
  return {
    records,
    summary: { present: 9, absent: 0, late: 1, half_day: 0, on_leave: 0, total_days: 22 },
    year: y,
    month: m,
  }
}
