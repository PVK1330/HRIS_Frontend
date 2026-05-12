import { SEED_EMPLOYEES } from '../data/staticSeeds.js'

let deptStore = [
  { id: 1, name: 'Human Resources', code: 'HR', description: 'People operations', head: 'Sarah Ahmed', employeeCount: 14, status: 'Active', isActive: true, manager_id: 1 },
  { id: 2, name: 'Engineering', code: 'ENG', description: 'Product & platform engineering', head: 'Priya Nair', employeeCount: 62, status: 'Active', isActive: true, manager_id: 7 },
  { id: 3, name: 'Finance', code: 'FIN', description: 'Finance & accounting', head: 'Daniel Brooks', employeeCount: 21, status: 'Active', isActive: true, manager_id: null },
  { id: 4, name: 'Design', code: 'DES', description: 'Product design', head: 'Sofia Martins', employeeCount: 18, status: 'Active', isActive: true, manager_id: null },
  { id: 5, name: 'Operations', code: 'OPS', description: 'Business operations', head: 'Layla Farouk', employeeCount: 35, status: 'Active', isActive: true, manager_id: 5 },
]

export const listDepartments = async () => [...deptStore]

export const listDepartmentManagers = async () =>
  SEED_EMPLOYEES.slice(0, 6).map((e) => ({ id: Number(e.id), name: e.name }))

export const getDepartment = async (id) => deptStore.find((d) => String(d.id) === String(id)) || deptStore[0]

export const createDepartment = async (deptData) => {
  const id = deptStore.length ? Math.max(...deptStore.map((d) => d.id)) + 1 : 1
  const row = {
    id,
    name: deptData.name,
    code: (deptData.name || 'DEPT').substring(0, 4).toUpperCase(),
    description: deptData.description || '',
    head: 'Not assigned',
    employeeCount: 0,
    status: deptData.isActive !== false ? 'Active' : 'Inactive',
    isActive: deptData.isActive !== false,
    manager_id: deptData.manager_id ?? null,
  }
  deptStore = [...deptStore, row]
  return row
}

export const updateDepartment = async (id, deptData) => {
  deptStore = deptStore.map((d) =>
    String(d.id) !== String(id)
      ? d
      : {
          ...d,
          ...(deptData.name != null ? { name: deptData.name } : {}),
          ...(deptData.description != null ? { description: deptData.description } : {}),
          ...(deptData.isActive != null
            ? { isActive: deptData.isActive, status: deptData.isActive ? 'Active' : 'Inactive' }
            : {}),
          ...(deptData.manager_id != null ? { manager_id: deptData.manager_id } : {}),
        },
  )
  return deptStore.find((d) => String(d.id) === String(id))
}

export const deleteDepartment = async (id) => {
  deptStore = deptStore.filter((d) => String(d.id) !== String(id))
  return { success: true }
}
