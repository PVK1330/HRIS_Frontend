import { adminSettingsService } from './adminSettingsService.js'

export const API_URL = ''

export async function fetchTenantAdminSettings() {
  return {
    success: true,
    data: {
      companyName: 'HRIS Platform Inc.',
      timezone: 'Asia/Dubai',
      dateFormat: 'DD/MM/YYYY',
      currency: 'AED',
      language: 'en',
      logoUrl: '',
    },
  }
}

export async function updateTenantAdminSettings(payload) {
  const prev = (await fetchTenantAdminSettings()).data
  return { success: true, data: { ...prev, ...payload } }
}

export async function uploadTenantLogo(file) {
  const fd = file instanceof FormData ? file : null
  if (fd && typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('tenant-logo-updated'))
  }
  await adminSettingsService.uploadTenantLogo(fd || new FormData())
  return { success: true, data: { logoUrl: '/uploads/tenant-logo.png' } }
}

export function getTenantLogoAbsoluteUrl(relativePath) {
  if (!relativePath || typeof relativePath !== 'string') return ''
  if (relativePath.startsWith('http')) return relativePath
  const cleanPath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`
  const baseUrl =
    API_URL ||
    (typeof window !== 'undefined' ? window.location.origin : '')

  if (!baseUrl) return cleanPath
  return `${baseUrl.replace(/\/$/, '')}${cleanPath}`
}
