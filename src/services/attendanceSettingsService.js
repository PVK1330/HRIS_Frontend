export async function fetchAttendanceSettings() {
  return {
    data: {
      workWeekStartsOn: 'Sunday',
      standardShiftStart: '09:00',
      standardShiftEnd: '18:00',
      graceMinutesForLate: 10,
      overtimeRequiresApproval: true,
      geoFenceEnabled: false,
    },
  }
}

export async function updateAttendanceSettings(payload) {
  const base = (await fetchAttendanceSettings()).data
  return { data: { ...base, ...payload } }
}
