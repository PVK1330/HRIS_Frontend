/** Shared seed rows for static (offline) services and mock API routing. */

export const SEED_EMPLOYEES = [
  { id: '1', empId: 'EP-1001', name: 'Sarah Ahmed', fullName: 'Sarah Ahmed', email: 'sarah.ahmed@hris.com', phone: '+971 50 123 4567', jobTitle: 'HR Manager', department: 'Human Resources', workLocation: 'Dubai HQ', location: 'Dubai HQ', manager: 'James Porter', status: 'Active', employmentType: 'Full-time', workMode: 'On-site', joinDate: '2019-03-12', nationality: 'UAE', salary: 18000, avatar: null },
  { id: '2', empId: 'EP-1044', name: 'Omar Hassan', fullName: 'Omar Hassan', email: 'omar.hassan@hris.com', phone: '+971 55 987 1122', jobTitle: 'Software Engineer', department: 'Engineering', workLocation: 'Abu Dhabi', location: 'Abu Dhabi', manager: 'Priya Nair', status: 'Probation', employmentType: 'Full-time', workMode: 'On-site', joinDate: '2026-01-20', nationality: 'Egypt', salary: 14000, avatar: null },
  { id: '3', empId: 'EP-1088', name: 'Emily Clarke', fullName: 'Emily Clarke', email: 'emily.clarke@hris.com', phone: '+971 52 441 0098', jobTitle: 'Finance Analyst', department: 'Finance', workLocation: 'Dubai HQ', location: 'Dubai HQ', manager: 'Daniel Brooks', status: 'Active', employmentType: 'Full-time', workMode: 'Hybrid', joinDate: '2021-07-05', nationality: 'United Kingdom', salary: 16000, avatar: null },
  { id: '4', empId: 'EP-1120', name: 'Raj Malhotra', fullName: 'Raj Malhotra', email: 'raj.malhotra@hris.com', phone: '+971 56 220 3344', jobTitle: 'Product Designer', department: 'Design', workLocation: 'Remote', location: 'Remote', manager: 'Sofia Martins', status: 'On Leave', employmentType: 'Full-time', workMode: 'Remote', joinDate: '2020-11-18', nationality: 'India', salary: 15000, avatar: null },
  { id: '5', empId: 'EP-1156', name: 'Layla Farouk', fullName: 'Layla Farouk', email: 'layla.farouk@hris.com', phone: '+971 54 778 9012', jobTitle: 'Operations Lead', department: 'Operations', workLocation: 'Sharjah', location: 'Sharjah', manager: 'Omar Hassan', status: 'Notice Period', employmentType: 'Full-time', workMode: 'On-site', joinDate: '2018-09-01', nationality: 'Jordan', salary: 17000, avatar: null },
  { id: '6', empId: 'EP-1189', name: 'Marcus Lee', fullName: 'Marcus Lee', email: 'marcus.lee@hris.com', phone: '+971 50 667 2233', jobTitle: 'Data Engineer', department: 'Engineering', workLocation: 'Dubai HQ', location: 'Dubai HQ', manager: 'Priya Nair', status: 'Active', employmentType: 'Contract', workMode: 'Hybrid', joinDate: '2022-04-11', nationality: 'Singapore', salary: 19000, avatar: null },
  { id: '7', empId: 'EP-1200', name: 'Priya Nair', fullName: 'Priya Nair', email: 'priya.nair@hris.com', phone: '+971 52 300 5566', jobTitle: 'Engineering Manager', department: 'Engineering', workLocation: 'Dubai HQ', location: 'Dubai HQ', manager: 'James Porter', status: 'Active', employmentType: 'Full-time', workMode: 'On-site', joinDate: '2017-06-01', nationality: 'India', salary: 25000, avatar: null },
  { id: '8', empId: 'EP-1215', name: 'James Porter', fullName: 'James Porter', email: 'james.porter@hris.com', phone: '+971 50 111 9900', jobTitle: 'CEO', department: 'Executive', workLocation: 'Dubai HQ', location: 'Dubai HQ', manager: null, status: 'Active', employmentType: 'Full-time', workMode: 'On-site', joinDate: '2015-01-01', nationality: 'USA', salary: 45000, avatar: null },
]

export const SEED_TENANTS = [
  { id: 1, name: 'Acme Corp', db_name: 'acme_corp', admin_email: 'admin@acme.com', plan: 'Enterprise', status: 'active', created_at: '2024-01-15T10:00:00Z' },
  { id: 2, name: 'TechFlow LLC', db_name: 'techflow_llc', admin_email: 'hr@techflow.com', plan: 'Professional', status: 'active', created_at: '2024-03-01T10:00:00Z' },
  { id: 3, name: 'Sunrise Retail', db_name: 'sunrise_retail', admin_email: 'ops@sunrise.com', plan: 'Starter', status: 'trial', created_at: '2026-04-20T10:00:00Z' },
  { id: 4, name: 'Gulf Logistics', db_name: 'gulf_logistics', admin_email: 'admin@gulflogistics.com', plan: 'Enterprise', status: 'active', created_at: '2023-08-10T10:00:00Z' },
  { id: 5, name: 'MediPlus Clinics', db_name: 'mediplus', admin_email: 'hr@mediplus.com', plan: 'Professional', status: 'suspended', created_at: '2024-05-01T10:00:00Z' },
]

export const SEED_PLANS_ACTIVE = [
  { id: 1, name: 'Starter', price: 29, billing_cycle: 'monthly', max_employees: 50 },
  { id: 2, name: 'Professional', price: 79, billing_cycle: 'monthly', max_employees: 200 },
  { id: 3, name: 'Enterprise', price: 199, billing_cycle: 'monthly', max_employees: -1 },
]

export const SEED_TENANT_FEATURES = [
  { id: 1, name: 'Employee Management', feature_code: 'employee_management', isEnabled: true, isAssigned: true },
  { id: 2, name: 'Attendance', feature_code: 'attendance_tracking', isEnabled: true, isAssigned: true },
  { id: 3, name: 'Leave', feature_code: 'leave_management', isEnabled: true, isAssigned: true },
  { id: 4, name: 'Documents', feature_code: 'document_management', isEnabled: true, isAssigned: true },
  { id: 5, name: 'Assets', feature_code: 'asset_management', isEnabled: false, isAssigned: true },
  { id: 6, name: 'Payroll', feature_code: 'payroll', isEnabled: false, isAssigned: false },
]
