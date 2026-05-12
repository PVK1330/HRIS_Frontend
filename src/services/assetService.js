const COLORS = ['#0F766E', '#6366f1', '#f97316', '#0ea5e9', '#a855f7']

let assetStore = [
  {
    id: '1',
    asset_id: 'AST-0001',
    serial_number: 'C02XY12345',
    serial: 'C02XY12345',
    category_id: '1',
    categoryName: 'Laptop',
    categoryIcon: 'laptop',
    categoryColor: COLORS[0],
    assignedTo: 'Sarah Ahmed',
    employee_id: '1',
    issue_date: '2022-03-01T00:00:00.000Z',
    condition: 'Good',
    status: 'Issued',
    notes: 'Primary workstation',
  },
  {
    id: '2',
    asset_id: 'AST-0002',
    serial_number: 'DMPXYZ789',
    serial: 'DMPXYZ789',
    category_id: '2',
    categoryName: 'Mobile',
    categoryIcon: 'smartphone',
    categoryColor: COLORS[1],
    assignedTo: 'Priya Nair',
    employee_id: '7',
    issue_date: '2023-10-15T00:00:00.000Z',
    condition: 'Excellent',
    status: 'Issued',
    notes: '',
  },
  {
    id: '3',
    asset_id: 'AST-0003',
    serial_number: 'DL9876543',
    serial: 'DL9876543',
    category_id: '3',
    categoryName: 'Monitor',
    categoryIcon: 'box',
    categoryColor: COLORS[2],
    assignedTo: '-',
    employee_id: '',
    issue_date: '',
    condition: 'Good',
    status: 'Available',
    notes: '',
  },
  {
    id: '4',
    asset_id: 'AST-0004',
    serial_number: 'LN2023001',
    serial: 'LN2023001',
    category_id: '1',
    categoryName: 'Laptop',
    categoryIcon: 'laptop',
    categoryColor: COLORS[0],
    assignedTo: 'Omar Hassan',
    employee_id: '2',
    issue_date: '2023-02-01T00:00:00.000Z',
    condition: 'Good',
    status: 'Issued',
    notes: '',
  },
]

export const assetService = {
  getAssets: async () => [...assetStore],

  getAsset: async (id) => assetStore.find((a) => String(a.id) === String(id)) || assetStore[0],

  createAsset: async (data) => {
    const id = String(Date.now())
    const row = {
      id,
      asset_id: `AST-${String(assetStore.length + 1).padStart(4, '0')}`,
      serial_number: data.serialNumber || 'N/A',
      serial: data.serialNumber || 'N/A',
      category_id: String(data.categoryId || '1'),
      categoryName: 'General',
      categoryIcon: 'box',
      categoryColor: COLORS[3],
      assignedTo: data.employeeId ? `Employee ${data.employeeId}` : '-',
      employee_id: data.employeeId || '',
      issue_date: data.issueDate ? `${data.issueDate}T00:00:00.000Z` : new Date().toISOString(),
      condition: data.condition || 'Good',
      status: data.status || 'Available',
      notes: data.notes || '',
    }
    assetStore = [...assetStore, row]
    return row
  },

  updateAsset: async (id, data) => {
    assetStore = assetStore.map((a) =>
      String(a.id) !== String(id)
        ? a
        : {
            ...a,
            serial_number: data.serialNumber ?? a.serial_number,
            serial: data.serialNumber ?? a.serial,
            category_id: String(data.categoryId || a.category_id),
            employee_id: data.employeeId ?? a.employee_id,
            issue_date: data.issueDate ? `${data.issueDate}T00:00:00.000Z` : a.issue_date,
            condition: data.condition ?? a.condition,
            status: data.status ?? a.status,
            notes: data.notes ?? a.notes,
            assignedTo: data.employeeId ? `Employee ${data.employeeId}` : a.assignedTo,
          },
    )
    return assetStore.find((a) => String(a.id) === String(id))
  },

  deleteAsset: async (id) => {
    assetStore = assetStore.filter((a) => String(a.id) !== String(id))
    return { success: true }
  },
}

export default assetService
