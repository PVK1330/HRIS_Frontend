const DEPT_NAMES = {
  1: 'Human Resources',
  2: 'Engineering',
  3: 'Finance',
  4: 'Design',
  5: 'Operations',
  6: 'Executive',
}

let desigStore = [
  { id: 1, name: 'HR Manager', department_id: 1, department_name: 'Human Resources', status: 'Active', is_active: true },
  { id: 2, name: 'Software Engineer', department_id: 2, department_name: 'Engineering', status: 'Active', is_active: true },
  { id: 3, name: 'Finance Analyst', department_id: 3, department_name: 'Finance', status: 'Active', is_active: true },
  { id: 4, name: 'Product Designer', department_id: 4, department_name: 'Design', status: 'Active', is_active: true },
  { id: 5, name: 'Data Engineer', department_id: 2, department_name: 'Engineering', status: 'Active', is_active: true },
]

export const listDesignations = async () => [...desigStore]

export const getDesignation = async (id) => desigStore.find((d) => String(d.id) === String(id)) || desigStore[0]

export const createDesignation = async (payload) => {
  const id = desigStore.length ? Math.max(...desigStore.map((d) => d.id)) + 1 : 1
  const did = Number(payload.department_id)
  const row = {
    id,
    name: payload.name,
    department_id: did,
    department_name: DEPT_NAMES[did] || 'Department',
    status: payload.isActive !== false ? 'Active' : 'Inactive',
    is_active: payload.isActive !== false,
  }
  desigStore = [...desigStore, row]
  return row
}

export const updateDesignation = async (id, payload) => {
  desigStore = desigStore.map((d) =>
    String(d.id) !== String(id)
      ? d
      : {
          ...d,
          ...(payload.name != null ? { name: payload.name } : {}),
          ...(payload.department_id != null
            ? {
                department_id: Number(payload.department_id),
                department_name: DEPT_NAMES[Number(payload.department_id)] || d.department_name,
              }
            : {}),
          ...(payload.isActive != null
            ? { is_active: payload.isActive, status: payload.isActive ? 'Active' : 'Inactive' }
            : {}),
        },
  )
  return desigStore.find((d) => String(d.id) === String(id))
}

export const deleteDesignation = async (id) => {
  desigStore = desigStore.filter((d) => String(d.id) !== String(id))
  return { success: true }
}
