let categoryStore = [
  { id: '1', name: 'Laptop', icon_name: 'laptop', depreciation_rate: 25, is_active: true },
  { id: '2', name: 'Mobile', icon_name: 'smartphone', depreciation_rate: 20, is_active: true },
  { id: '3', name: 'Monitor', icon_name: 'box', depreciation_rate: 15, is_active: true },
  { id: '4', name: 'Tablet', icon_name: 'smartphone', depreciation_rate: 20, is_active: true },
  { id: '5', name: 'Furniture', icon_name: 'shirt', depreciation_rate: 10, is_active: true },
]

const defaultRules = {
  requireApprovalForAssignment: true,
  allowSelfServiceRequests: false,
  defaultReturnWindowDays: 7,
}

export async function fetchAssetCategories() {
  return { data: [...categoryStore] }
}

export async function createAssetCategory(payload) {
  const id = String(categoryStore.length + 1)
  const row = {
    id,
    name: payload.name || 'Category',
    icon_name: payload.icon_name || 'box',
    depreciation_rate: Number(payload.depreciation_rate) || 15,
    is_active: true,
  }
  categoryStore = [...categoryStore, row]
  return { data: row }
}

export async function updateAssetCategory(id, payload) {
  categoryStore = categoryStore.map((c) =>
    String(c.id) !== String(id) ? c : { ...c, ...payload },
  )
  return { data: categoryStore.find((c) => String(c.id) === String(id)) }
}

export async function deleteAssetCategory(id) {
  categoryStore = categoryStore.filter((c) => String(c.id) !== String(id))
  return { data: { success: true } }
}

export async function fetchAssetRules() {
  return { data: { ...defaultRules } }
}

export async function updateAssetRules(payload) {
  return { data: { ...defaultRules, ...payload } }
}
