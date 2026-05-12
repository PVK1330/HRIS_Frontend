import { SEED_EMPLOYEES } from '../data/staticSeeds.js'

let employeeStore = SEED_EMPLOYEES.map((e) => ({ ...e }))

function toApiEmployee(e) {
  return {
    id: e.id,
    emp_id: e.empId,
    full_name: e.fullName || e.name,
    work_email: e.email,
    phone_number: e.phone || '',
    job_title: e.jobTitle,
    department: e.department,
    work_location: e.workLocation || e.location || '',
    reporting_manager: e.manager || 'N/A',
    employment_status: e.status || 'Active',
    join_date: e.joinDate,
    work_mode: e.workMode || '',
    employment_type: e.employmentType || 'Full-time',
    nationality: e.nationality || '',
    salary: e.salary,
    rbac_role_name: e.rbacRoleName || '',
    rbac_role_id: e.rbacRoleId ?? null,
    portal_enabled: e.portalEnabled !== false,
    first_name: (e.fullName || e.name || '').split(' ')[0] || '',
    last_name: (e.fullName || e.name || '').split(' ').slice(1).join(' ') || '',
    personal_email: e.personalEmail || '',
    date_of_birth: e.dateOfBirth || null,
    gender: e.gender || '',
    country_of_residence: e.countryOfResidence || '',
    marital_status: e.maritalStatus || '',
    dependents: e.dependents ?? '',
    emergency_contact_name: e.emergencyContactName || '',
    emergency_contact_phone: e.emergencyContactPhone || '',
    home_address: e.homeAddress || '',
    probation_end_date: e.probationEndDate || null,
    grade: e.grade || '',
    cost_center: e.costCenter || '',
    passport_number: e.passportNumber || '',
    passport_expiry: e.passportExpiry || null,
    emirates_id_number: e.emiratesIdNumber || '',
    emirates_id_expiry: e.emiratesIdExpiry || null,
    visa_type: e.visaType || '',
    visa_expiry_date: e.visaExpiryDate || null,
    sponsoring_entity: e.sponsoringEntity || '',
    career_history: e.careerHistory || '',
    awards_summary: e.awardsSummary || '',
    promotion_history: e.promotionHistory || '',
    bio: e.bio || '',
    manager_emp_id: e.managerEmpId || '',
  }
}

function matchesFilters(row, params) {
  const p = params || {}
  const search = String(p.search || '')
    .trim()
    .toLowerCase()
  if (search) {
    const blob = `${row.full_name} ${row.work_email} ${row.emp_id} ${row.job_title} ${row.department}`.toLowerCase()
    if (!blob.includes(search)) return false
  }
  if (p.department && String(row.department) !== String(p.department)) return false
  if (p.status && String(row.employment_status) !== String(p.status)) return false
  if (p.workMode && String(row.work_mode) !== String(p.workMode)) return false
  if (p.jobTitle && String(row.job_title) !== String(p.jobTitle)) return false
  if (p.workLocation && String(row.work_location) !== String(p.workLocation)) return false
  return true
}

export const getEmployeeStats = async () => {
  const rows = employeeStore.map(toApiEmployee)
  const total = 248
  const active = rows.filter((r) => r.employment_status === 'Active').length || 201
  const onLeave = rows.filter((r) => r.employment_status === 'On Leave').length || 18
  return { total, active, onLeave }
}

export const getFilterOptions = async () => {
  const rows = employeeStore.map(toApiEmployee)
  const uniq = (arr) => [...new Set(arr.filter(Boolean))]
  return {
    departments: uniq(rows.map((r) => r.department)),
    jobTitles: uniq(rows.map((r) => r.job_title)),
    workLocations: uniq(rows.map((r) => r.work_location)),
    workModes: uniq(rows.map((r) => r.work_mode)),
    statuses: uniq(rows.map((r) => r.employment_status)),
  }
}

export const listEmployees = async (params = {}) => {
  const all = employeeStore.map(toApiEmployee).filter((r) => matchesFilters(r, params))
  const page = Math.max(1, parseInt(params.page, 10) || 1)
  const limit = Math.max(1, parseInt(params.limit, 10) || 20)
  const start = (page - 1) * limit
  const slice = all.slice(start, start + limit)
  return {
    employees: slice,
    total: all.length,
    page,
    limit,
    pages: Math.max(1, Math.ceil(all.length / limit)),
  }
}

export const getEmployee = async (id) => {
  const row = employeeStore.find((e) => String(e.id) === String(id))
  return row ? toApiEmployee(row) : toApiEmployee(employeeStore[0])
}

export const createEmployee = async (payload) => {
  const id = String(Date.now())
  const empId = `EP-${1000 + Math.floor(Math.random() * 8000)}`
  const merged = {
    id,
    empId,
    name: payload.fullName || payload.name || 'New Employee',
    fullName: payload.fullName || payload.name || 'New Employee',
    email: payload.workEmail || payload.email || `user${id}@hris.com`,
    phone: payload.phoneNumber || payload.phone || '',
    jobTitle: payload.jobTitle || 'Staff',
    department: payload.department || 'Human Resources',
    workLocation: payload.workLocation || payload.location || 'Dubai HQ',
    location: payload.workLocation || 'Dubai HQ',
    manager: payload.reportingManager || payload.manager || 'N/A',
    status: payload.employmentStatus || payload.status || 'Active',
    employmentType: payload.employmentType || 'Full-time',
    workMode: payload.workMode || 'On-site',
    joinDate: (payload.joinDate || new Date().toISOString().split('T')[0]).split('T')[0],
    nationality: payload.nationality || '',
    salary: payload.salary || 0,
  }
  employeeStore = [...employeeStore, merged]
  return toApiEmployee(merged)
}

export const updateEmployee = async (id, payload) => {
  employeeStore = employeeStore.map((e) => {
    if (String(e.id) !== String(id)) return e
    return {
      ...e,
      ...(payload.fullName != null ? { fullName: payload.fullName, name: payload.fullName } : {}),
      ...(payload.workEmail != null ? { email: payload.workEmail } : {}),
      ...(payload.phoneNumber != null ? { phone: payload.phoneNumber } : {}),
      ...(payload.jobTitle != null ? { jobTitle: payload.jobTitle } : {}),
      ...(payload.department != null ? { department: payload.department } : {}),
      ...(payload.workLocation != null ? { workLocation: payload.workLocation, location: payload.workLocation } : {}),
      ...(payload.employmentStatus != null ? { status: payload.employmentStatus } : {}),
      ...(payload.workMode != null ? { workMode: payload.workMode } : {}),
      ...(payload.employmentType != null ? { employmentType: payload.employmentType } : {}),
      ...(payload.joinDate != null ? { joinDate: String(payload.joinDate).split('T')[0] } : {}),
    }
  })
  return getEmployee(id)
}

export const deleteEmployee = async () => {
  /* soft-delete stub — keep row for static demo stability */
  return undefined
}
