import { getEmployee } from './employeeService.js'
import { SEED_EMPLOYEES } from '../data/staticSeeds.js'

const STATIC_DOCS = [
  { id: '1', employeeId: '1', type: 'Passport', documentNumber: 'P12345678', expiryDate: '2030-01-09', status: 'Valid', fileUrl: '#' },
  { id: '2', employeeId: '2', type: 'Visa', documentNumber: 'V98765432', expiryDate: '2026-05-31', status: 'Expiring Soon', fileUrl: '#' },
  { id: '3', employeeId: '3', type: 'Emirates ID', documentNumber: 'EID784-9865-0001', expiryDate: '2027-03-14', status: 'Valid', fileUrl: '#' },
]

const STATIC_ASSETS = [
  { id: '1', assetTag: 'AST-0001', name: 'MacBook Pro 16"', category: 'Laptop', serialNumber: 'C02XY12345', condition: 'Good', status: 'Assigned', assignedToId: '1', purchaseDate: '2022-03-01' },
  { id: '2', assetTag: 'AST-0002', name: 'iPhone 15 Pro', category: 'Mobile', serialNumber: 'DMPXYZ789', condition: 'Excellent', status: 'Assigned', assignedToId: '7', purchaseDate: '2023-10-15' },
  { id: '4', assetTag: 'AST-0004', name: 'Lenovo ThinkPad X1', category: 'Laptop', serialNumber: 'LN2023001', condition: 'Good', status: 'Assigned', assignedToId: '2', purchaseDate: '2023-02-01' },
]

function seedRow(id) {
  return SEED_EMPLOYEES.find((e) => String(e.id) === String(id)) || SEED_EMPLOYEES[0]
}

export const getEmployeeProfile = async (id) => {
  const base = await getEmployee(id)
  const s = seedRow(id)
  return {
    ...base,
    manager_name: base.reporting_manager || s.manager || '—',
    personal_email: base.personal_email || `${String(s.email).split('@')[0]}.personal@mail.com`,
    date_of_birth: base.date_of_birth || '1990-05-15',
    gender: base.gender || 'Unspecified',
    passport_number: base.passport_number || 'X0000000',
    passport_expiry: base.passport_expiry || '2032-01-01',
    emirates_id_number: base.emirates_id_number || '784-0000-0000000-0',
    emirates_id_expiry: base.emirates_id_expiry || '2028-06-01',
    visa_type: base.visa_type || 'Employment',
    visa_expiry_date: base.visa_expiry_date || '2027-12-31',
    sponsoring_entity: base.sponsoring_entity || 'HRIS Platform Inc.',
  }
}

export const getAttendance = async (employeeId, params = {}) => {
  const y = params.year ?? new Date().getFullYear()
  const m = params.month ?? new Date().getMonth() + 1
  const records = []
  for (let d = 1; d <= 12; d += 1) {
    const date = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const present = d % 7 !== 0
    records.push({
      date,
      check_in_time: present ? `0${8 + (d % 2)}:${d % 2 === 0 ? '00' : '30'}` : null,
      check_out_time: present ? `${17 + (d % 2)}:00` : null,
      total_hours: present ? 8 + (d % 3) * 0.25 : 0,
      status: present ? (d % 9 === 0 ? 'Late' : 'Present') : 'Weekend',
    })
  }
  return {
    records,
    summary: { present: 18, absent: 1, late: 2, half_day: 0, on_leave: 1, total_days: 22 },
    year: y,
    month: m,
  }
}

export const getLeave = async (employeeId, params = {}) => {
  const year = params.year ?? new Date().getFullYear()
  const types = ['Annual Leave', 'Sick Leave', 'Emergency Leave']
  const balances = types.map((leave_type, i) => {
    const total_allocated = 21 - i * 6
    const used = 3 + i
    const carry_forward = i === 0 ? 2 : 0
    const remaining = total_allocated + carry_forward - used
    return { leave_type, total_allocated, carry_forward, used, remaining }
  })
  const requests = [
    {
      leave_type: 'Annual Leave',
      from_date: `${year}-04-10`,
      to_date: `${year}-04-12`,
      total_days: 3,
      status: 'Approved',
    },
    {
      leave_type: 'Sick Leave',
      from_date: `${year}-05-02`,
      to_date: `${year}-05-02`,
      total_days: 1,
      status: 'Pending',
    },
  ]
  return { requests, balances, year }
}

export const getDocuments = async (employeeId) => {
  const docs = STATIC_DOCS.filter((d) => String(d.employeeId) === String(employeeId)).map((d) => ({
    id: d.id,
    document_title: `${d.type} — ${d.documentNumber}`,
    document_type: d.type,
    status: d.status,
    expiry_date: d.expiryDate,
    notes: 'Mock document record',
    file_url: d.fileUrl,
  }))
  return { documents: docs }
}

export const getPerformance = async (employeeId) => {
  const latest = {
    overall_rating: 4.5,
    review_period: 'Q1 2026',
    work_quality: 5,
    productivity: 4,
    communication: 5,
    teamwork: 4,
    leadership: 4,
    review_date: '2026-04-15',
  }
  const reviews = [
    {
      review_period: 'Q1 2026',
      review_type: 'Quarterly',
      overall_rating: 4.5,
      reviewer_name: 'James Porter',
      status: 'Completed',
    },
    {
      review_period: 'Q4 2025',
      review_type: 'Quarterly',
      overall_rating: 4.2,
      reviewer_name: 'James Porter',
      status: 'Completed',
    },
  ]
  return { reviews, latest }
}

export const getAssets = async (employeeId) => {
  const list = STATIC_ASSETS.filter((a) => String(a.assignedToId) === String(employeeId)).map((a) => ({
    id: a.id,
    asset_name: a.name,
    asset_tag: a.assetTag,
    category: a.category,
    serial_number: a.serialNumber,
    condition: a.condition,
    status: a.status,
    assigned_date: a.purchaseDate,
  }))
  return {
    assets: list,
    counts: { active: list.filter((x) => x.status === 'Assigned').length, total: list.length },
  }
}
