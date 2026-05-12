export const adminDashboardService = {
  getDashboardData: async () => ({
    data: {
      success: true,
      data: {
        stats: {
          employees: { total: 248, active: 201, probation: 12, notice: 7 },
          attendance: { present: 189, remote: 42, absent: 17 },
          pending: { leaves: 14, documents: 12, expenses: 5 },
        },
      },
    },
  }),
}
