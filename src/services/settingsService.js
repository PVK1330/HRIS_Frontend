const general = {
  companyName: 'HRIS Platform Inc.',
  timezone: 'Asia/Dubai',
  dateFormat: 'DD/MM/YYYY',
  currency: 'AED',
  language: 'en',
  fiscalYearStart: 'January',
  weekendDays: ['Friday', 'Saturday'],
}

const company = {
  legalName: 'HRIS Platform Inc.',
  tradeLicense: 'TL-0001',
  addressLine1: 'Dubai Internet City',
  city: 'Dubai',
  country: 'United Arab Emirates',
}

const email = {
  systemEmail: 'no-reply@hris.com',
  systemFromName: 'HRIS',
  emailDelivery: 'smtp',
  smtpHost: 'smtp.example.com',
  smtpPort: 587,
  smtpUsername: 'no-reply',
  smtpPassword: '********',
  smtpEncryption: 'tls',
}

const system = {
  version: '3.4.1',
  environment: 'static-demo',
  dbStatus: 'Healthy',
  cacheStatus: 'Healthy',
  storageUsed: '42 GB',
  storageTotal: '200 GB',
  uptime: '99.97%',
  lastBackup: '2026-05-12T02:00:00Z',
}

/** Sidebar for `/superadmin/settings/*` — keep in sync with `AppRouter` nested routes. */
export const superadminSettingsNavSections = [
  {
    key: 'general',
    label: 'General',
    items: [
      { label: 'General Settings', to: '/superadmin/settings/general' },
      { label: 'Company Details', to: '/superadmin/settings/company' },
      { label: 'Domain & SSL', to: '/superadmin/settings/domain' },
      { label: 'Account & Registration', to: '/superadmin/settings/account-settings' },
      { label: 'Currency', to: '/superadmin/settings/currency' },
    ],
  },
  {
    key: 'branding',
    label: 'Branding',
    items: [{ label: 'Logo & Assets', to: '/superadmin/settings/logo' }],
  },
  {
    key: 'email',
    label: 'Email',
    items: [
      { label: 'SMTP & Delivery', to: '/superadmin/settings/email/settings' },
      { label: 'Email Templates', to: '/superadmin/settings/email/templates' },
      { label: 'Email Log', to: '/superadmin/settings/email/log' },
    ],
  },
  {
    key: 'billing',
    label: 'Billing',
    items: [
      { label: 'Payment Gateways', to: '/superadmin/settings/payments' },
      { label: 'Free Trial', to: '/superadmin/settings/free-trial' },
    ],
  },
  {
    key: 'security',
    label: 'Security',
    items: [{ label: 'reCAPTCHA', to: '/superadmin/settings/recaptcha' }],
  },
]

const meta = {
  languages: [
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'Arabic' },
  ],
  timezones: [
    { value: 'Asia/Dubai', label: 'Asia/Dubai' },
    { value: 'UTC', label: 'UTC' },
  ],
  dateFormats: [
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
  ],
  general: {
    languages: [{ value: 'English', label: 'English' }],
    timezones: [{ value: 'Asia/Dubai', label: 'Asia/Dubai' }],
    dateFormats: [{ value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' }],
    dateSelectorFormats: [{ value: 'dd-mm-yyyy', label: 'dd-mm-yyyy' }],
  },
  email: {
    deliveryOptions: [{ value: 'smtp', label: 'SMTP' }],
    encryptionOptions: [
      { value: 'tls', label: 'TLS' },
      { value: 'ssl', label: 'SSL' },
    ],
  },
  paymentGateways: {
    order: ['stripe'],
    meta: {
      stripe: {
        icon: 'credit-card',
        label: 'Stripe',
        subtitle: 'Cards & digital wallets',
        iconBg: 'bg-slate-900',
        showTestMode: true,
        fields: [
          { key: 'publishableKey', label: 'Publishable key', type: 'password' },
          { key: 'secretKey', label: 'Secret key', type: 'password' },
        ],
      },
    },
  },
  currency: {
    options: [
      { value: 'AED', label: 'AED (د.إ)', symbol: 'AED' },
      { value: 'USD', label: 'USD ($)', symbol: '$' },
    ],
    symbolPositions: [
      { value: 'before', label: 'Before Amount' },
      { value: 'after', label: 'After Amount' },
    ],
    decimalOptions: [
      { value: '.', label: 'Period (.)' },
      { value: ',', label: 'Comma (,)' },
    ],
    thousandOptions: [
      { value: ',', label: 'Comma (,)' },
      { value: '.', label: 'Period (.)' },
      { value: '', label: 'None' },
    ],
  },
  navigation: { sections: superadminSettingsNavSections },
}

const recaptcha = { enabled: false, siteKey: '', secretKey: '' }

const freeTrial = { enabled: true, days: 14 }

const accountSettings = {
  publicRegistration: false,
  emailVerification: true,
  twoFactorAuth: false,
}

const currency = {
  defaultCurrency: 'AED',
  currencySymbol: 'AED',
  symbolPosition: 'before',
  decimalSeparator: '.',
  thousandSeparator: ',',
}

const emailTemplates = [
  { slug: 'welcome', name: 'Welcome', subject: 'Welcome to HRIS', bodyHtml: '<p>Welcome</p>' },
]

const d = (x) => ({ data: x })

export const settingsService = {
  getGeneral: async () =>
    d({
      defaultLanguage: 'English',
      timezone: 'Asia/Dubai',
      dateFormat: 'DD/MM/YYYY',
      dateSelectorFormat: 'dd-mm-yyyy',
      renewalGracePeriod: 3,
      termsOfService: false,
      companyName: general.companyName,
      currency: general.currency,
      language: general.language,
    }),
  updateGeneral: async (payload) =>
    d({
      defaultLanguage: 'English',
      timezone: 'Asia/Dubai',
      dateFormat: 'DD/MM/YYYY',
      dateSelectorFormat: 'dd-mm-yyyy',
      renewalGracePeriod: 3,
      termsOfService: false,
      ...general,
      ...payload,
    }),

  getCompany: async () => d({ ...company }),
  updateCompany: async (payload) => d({ ...company, ...payload }),

  getEmail: async () => d({ ...email }),
  updateEmail: async (payload) => d({ ...email, ...payload }),
  getEmailLogs: async () => d([]),
  sendTestEmail: async () => d({ success: true }),

  getTemplates: async () => d(emailTemplates),
  getTemplate: async (slug) => {
    const t = emailTemplates.find((x) => x.slug === slug) || emailTemplates[0]
    return d({
      slug: t.slug,
      name: t.name,
      subject: t.subject,
      body: t.bodyHtml,
      bodyHtml: t.bodyHtml,
      is_active: true,
    })
  },
  updateTemplate: async (slug, payload) =>
    d({
      slug,
      name: payload.name || slug,
      subject: payload.subject || '',
      body: payload.bodyHtml || payload.body || '',
      bodyHtml: payload.bodyHtml || payload.body || '',
      is_active: payload.is_active !== false,
    }),

  getLogo: async () => d({ urls: {} }),

  uploadLogo: async (_type, _formData) => d({ success: true, url: '/uploads/logo.png' }),

  getSystem: async () => d({ ...system }),
  getSettingsMeta: async () => d({ ...meta }),

  getPaymentGateways: async () =>
    d([
      {
        slug: 'stripe',
        name: 'Stripe',
        isEnabled: false,
        testMode: true,
        credentials: { publishableKey: '', secretKey: '' },
        lastVerifiedStatus: 'untested',
      },
    ]),
  getPaymentGateway: async (slug) =>
    d({
      gateway: {
        slug,
        name: 'Stripe',
        isEnabled: false,
        testMode: true,
        credentials: {},
      },
    }),
  updatePaymentGateway: async (slug, payload) =>
    d({
      slug,
      name: 'Stripe',
      isEnabled: payload.isEnabled,
      testMode: payload.testMode,
      credentials: payload.credentials || {},
      lastVerifiedStatus: 'saved',
    }),
  testPaymentGateway: async () => d({ verified: true, message: 'Mock gateway OK' }),

  getRecaptcha: async () => d({ ...recaptcha }),
  updateRecaptcha: async (payload) => d({ ...recaptcha, ...payload }),
  testRecaptcha: async () => d({ verified: true, message: 'Mock reCAPTCHA OK' }),

  getFreeTrial: async () => d({ ...freeTrial }),
  updateFreeTrial: async (payload) => d({ ...freeTrial, ...payload }),

  getAccountSettings: async () => d({ ...accountSettings }),
  updateAccountSettings: async (payload) => d({ ...accountSettings, ...payload }),

  getCurrency: async () => d({ ...currency }),
  updateCurrency: async (payload) => d({ ...currency, ...payload }),
}

export default settingsService
