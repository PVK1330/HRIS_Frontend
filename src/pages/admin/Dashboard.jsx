import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
   HiUsers,
   HiClock,
   HiCalendar,
   HiDocument,
   HiCreditCard,
   HiClipboardDocumentCheck,
   HiChartBar,
   HiBuildingOffice,
   HiBriefcase,
   HiMegaphone,
   HiBellAlert,
   HiGift,
   HiArrowRightOnRectangle,
   HiArrowTrendingUp,
   HiShieldCheck,
   HiMapPin,
   HiArrowPath,
   HiIdentification,
   HiUserGroup,
   HiFlag,
   HiCog6Tooth,
   HiBell,
} from 'react-icons/hi2'
import {
   AreaChart,
   Area,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
   PieChart,
   Pie,
   Cell,
} from 'recharts'
import { Badge } from '../../components/ui/Badge.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { StatCard } from '../../components/ui/StatCard.jsx'
import { Modal } from '../../components/ui/Modal.jsx'
import { Avatar } from '../../components/ui/Avatar.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { dashboardStats, dashboardAlerts } from '../../data/mockData.js'
import toast from 'react-hot-toast'

const COLORS = ['#0F766E', '#14B8A6', '#2DD4BF', '#99F6E4', '#F0FDFA']

// Mock Data for SaaS RBAC Environment
const growthData = [
   { name: 'Jan', employees: 45 },
   { name: 'Feb', employees: 52 },
   { name: 'Mar', employees: 48 },
   { name: 'Apr', employees: 61 },
   { name: 'May', employees: 55 },
   { name: 'Jun', employees: 67 },
   { name: 'Jul', employees: 75 },
]

export default function Dashboard() {
   const { user } = useAuth()
   const [isLoading, setIsLoading] = useState(true)
   const [dashboardData, setDashboardData] = useState(null)
   const [selectedAnnouncement, setSelectedAnnouncement] = useState(null)

   const todayLabel = useMemo(
      () =>
         new Date().toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
         }),
      [],
   )

   useEffect(() => {
      setIsLoading(false)
   }, [])

   const loadDashboardData = () => {
      setIsLoading(true)
      setTimeout(() => setIsLoading(false), 800)
   }

   // Determine view based on role
   const isHRAdmin = user?.role === 'hr_admin'
   const isManager = user?.role === 'manager'
   const isEmployee = user?.role === 'employee'

   const stats = dashboardData?.stats || {
      employees: {
         total: dashboardStats.totalEmployees,
         active: dashboardStats.activeEmployees,
         probation: dashboardStats.onProbation,
         notice: dashboardStats.inNotice
      },
      attendance: {
         present: dashboardStats.todayInOffice,
         remote: dashboardStats.todayRemote,
         absent: dashboardStats.todayAbsent
      },
      pending: {
         leaves: dashboardStats.pendingLeaves,
         documents: dashboardStats.pendingDocuments,
         expenses: dashboardStats.pendingExpenses
      },
      personal: {
         leaveBalance: 14,
         attendanceRate: '98%',
         pendingTasks: 3
      }
   }

   const announcements = [
      { id: 1, title: 'Annual General Meeting 2026', content: 'The annual general meeting for all shareholders and employees will be held in the main auditorium.', priority: 'High', created_at: new Date().toISOString() },
      { id: 2, title: 'New Health Insurance Policy', content: 'We have updated our health insurance provider to ensure better coverage for all employees.', priority: 'Standard', created_at: new Date().toISOString() },
   ]

   const birthdays = [
      { name: 'Sarah Ahmed', type: 'Birthday', icon: '🎂', date: 'Today', dept: 'Engineering' },
      { name: 'Omar Hassan', type: 'Anniversary', icon: '🎉', date: 'Tomorrow', dept: 'Marketing' },
   ]

   const expiryAlerts = [
      { name: 'Passport Expiry', count: 3, items: ['John Doe', 'Jane Smith', 'Mike Ross'], color: 'rose' },
      { name: 'Visa Expiry', count: 5, items: ['Ali Khan', 'Sara Lee', 'David B.'], color: 'amber' },
   ]

   const joinersExits = {
      newJoiners: [
         { name: 'Alice Wong', dept: 'IT', date: '01 May', avatar: 'AW' },
         { name: 'Bob Saget', dept: 'Sales', date: '03 May', avatar: 'BS' },
      ],
      exits: [
         { name: 'Charlie Sheen', dept: 'Legal', date: '15 May', avatar: 'CS' },
      ]
   }

   if (isLoading) {
      return (
         <div className="flex h-[60vh] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
               <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
               <p className="text-sm text-slate-500">Loading dashboard…</p>
            </div>
         </div>
      )
   }

   return (
      <div className="space-y-4 pb-6 animate-in fade-in duration-500">
         <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#0D5F57] p-6 text-white shadow-xl sm:p-8">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
               <div>
                  <p className="mb-1 text-xs font-medium text-emerald-100/90">
                     {isHRAdmin ? 'Admin overview' : isManager ? 'Team overview' : 'My dashboard'}
                  </p>
                  <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                     {isEmployee ? 'Hello,' : 'Welcome back,'}{' '}
                     <span className="text-emerald-200">{user?.name?.split(' ')[0] ?? 'Admin'}</span>
                  </h1>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-emerald-100/80">
                     <span className="font-medium text-white">{user?.tenantName || 'Your organization'}</span>
                     <span className="text-emerald-200/90"> · </span>
                     <span className="capitalize">{user?.role?.replace('_', ' ') || 'User'}</span>
                  </p>
               </div>

               <div className="flex items-center gap-4 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                  <div className="text-right">
                     <p className="text-xs font-medium text-emerald-200">Today</p>
                     <p className="text-sm font-semibold text-white leading-snug">{todayLabel}</p>
                  </div>
                  <button
                     onClick={loadDashboardData}
                     className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400 text-[#0F766E] transition-all hover:scale-105 active:scale-95 shadow-lg"
                  >
                     <HiArrowPath className="h-5 w-5" />
                  </button>
               </div>
            </div>
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
         </div>

         {/* RBAC Stats Registry */}
         <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {isHRAdmin ? (
               <>
                  <StatCard title="Total employees" value={stats.employees.total} subtitle="All records" color="blue" icon={HiUsers} />
                  <StatCard title="Active employees" value={stats.employees.active} subtitle="Currently active" color="emerald" icon={HiBriefcase} />
                  <StatCard title="On probation" value={stats.employees.probation} subtitle="Trial period" color="amber" icon={HiClock} />
                  <StatCard title="Notice period" value={stats.employees.notice} subtitle="Leaving soon" color="rose" icon={HiArrowRightOnRectangle} />
               </>
            ) : isManager ? (
               <>
                  <StatCard title="Team size" value="12" subtitle="Direct reports" color="blue" icon={HiUserGroup} />
                  <StatCard title="On-site today" value="10" subtitle="Inside office geofence" color="emerald" icon={HiBuildingOffice} />
                  <StatCard title="On leave" value="2" subtitle="Away today" color="amber" icon={HiCalendar} />
                  <StatCard title="Team rating" value="4.2" subtitle="Average score" color="indigo" icon={HiChartBar} />
               </>
            ) : (
               <>
                  <StatCard title="Leave balance" value={stats.personal.leaveBalance} subtitle="Days left" color="emerald" icon={HiCalendar} />
                  <StatCard title="Attendance" value={stats.personal.attendanceRate} subtitle="Last 30 days" color="blue" icon={HiClock} />
                  <StatCard title="Pending tasks" value={stats.personal.pendingTasks} subtitle="Needs attention" color="amber" icon={HiClipboardDocumentCheck} />
                  <StatCard title="Payslip" value="Open" subtitle="Latest" color="indigo" icon={HiCreditCard} />
               </>
            )}
         </div>

         <div className="grid gap-4 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-4">
            <div className="space-y-4 lg:col-span-2">
               <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                     <div className="mb-4 flex items-center justify-between">
                        <div>
                           <h2 className="text-xs font-semibold text-slate-500">Attendance today</h2>
                           <h3 className="text-lg font-bold text-slate-900">Who is working</h3>
                        </div>
                        <Badge label="Live" color="green" variant="soft" className="text-[10px]" />
                     </div>
                     <p className="mb-4 flex items-start gap-2 rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2 text-[11px] leading-relaxed text-slate-600">
                        <HiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0F766E]" aria-hidden />
                        <span>
                           <span className="font-semibold text-slate-700">On-site</span> counts people checked in inside the office geofence. Remote and leave are tracked separately.
                        </span>
                     </p>
                     <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3">
                           <div className="flex items-center gap-3">
                              <div className="h-2 w-2 rounded-full bg-[#0F766E]" />
                              <span className="text-sm font-medium text-slate-700">On-site (geofence)</span>
                           </div>
                           <span className="text-sm font-bold text-slate-900">{stats.attendance.present}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3">
                           <div className="flex items-center gap-3">
                              <div className="h-2 w-2 rounded-full bg-blue-500" />
                              <span className="text-sm font-medium text-slate-700">Remote</span>
                           </div>
                           <span className="text-sm font-bold text-slate-900">{stats.attendance.remote}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3">
                           <div className="flex items-center gap-3">
                              <div className="h-2 w-2 rounded-full bg-rose-500" />
                              <span className="text-sm font-medium text-slate-700">On leave</span>
                           </div>
                           <span className="text-sm font-bold text-slate-900">{stats.attendance.absent}</span>
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                     <h3 className="mb-3 w-full text-xs font-semibold text-slate-500">Today’s split</h3>
                     <div className="h-40 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                              <Pie
                                 data={[
                                    { name: 'On-site', value: stats.attendance.present },
                                    { name: 'Remote', value: stats.attendance.remote },
                                    { name: 'Leave', value: stats.attendance.absent },
                                 ]}
                                 cx="50%"
                                 cy="50%"
                                 innerRadius={45}
                                 outerRadius={60}
                                 paddingAngle={8}
                                 dataKey="value"
                              >
                                 <Cell fill="#0F766E" />
                                 <Cell fill="#3B82F6" />
                                 <Cell fill="#EF4444" />
                              </Pie>
                              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                           </PieChart>
                        </ResponsiveContainer>
                     </div>
                  </div>
               </div>

               {/* Trends / Graphs */}
               {!isEmployee && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                     <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900">Employees over time</h3>
                        <HiArrowTrendingUp className="h-5 w-5 text-[#0F766E]" aria-hidden />
                     </div>
                     <div className="h-[220px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                           <AreaChart data={growthData}>
                              <defs>
                                 <linearGradient id="colorEmployees" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0F766E" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
                                 </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                              <Area type="monotone" dataKey="employees" name="Employees" stroke="#0F766E" strokeWidth={2} fill="url(#colorEmployees)" />
                           </AreaChart>
                        </ResponsiveContainer>
                     </div>
                  </div>
               )}

               <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <h3 className="mb-3 text-sm font-semibold text-slate-700">Quick links</h3>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                     {[
                        { label: 'Directory', icon: HiUsers, path: '/admin/employee-directory', color: 'blue' },
                        { label: 'Profile', icon: HiIdentification, path: '/admin/employee-profile', color: 'emerald' },
                        { label: 'Attendance', icon: HiClock, path: '/admin/attendance', color: 'amber' },
                        { label: 'Leave', icon: HiCalendar, path: '/admin/leave', color: 'rose' },
                        { label: 'Documents', icon: HiDocument, path: '/admin/documents', color: 'indigo' },
                        { label: 'Visa', icon: HiCreditCard, path: '/admin/visa', color: 'purple' },
                        { label: 'Policies', icon: HiClipboardDocumentCheck, path: '/admin/policies', color: 'emerald' },
                        { label: 'Performance', icon: HiChartBar, path: '/admin/performance', color: 'blue' },
                        ...(isHRAdmin ? [{ label: 'Settings', icon: HiCog6Tooth, path: '/admin/settings', color: 'slate' }] : [])
                     ].map((mod) => (
                        <Link key={mod.label} to={mod.path} className="group flex flex-col items-center rounded-xl border border-slate-100 bg-slate-50/50 p-3 transition-all hover:border-emerald-200 hover:bg-white hover:shadow-md">
                           <mod.icon className={`mb-2 h-5 w-5 text-${mod.color}-600 transition-transform group-hover:scale-105`} />
                           <span className="text-center text-[11px] font-semibold text-slate-700">{mod.label}</span>
                        </Link>
                     ))}
                  </div>
               </div>
               <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
                  <div className="mb-4 flex items-center justify-between">
                     <h3 className="text-lg font-bold text-slate-900">Company announcements</h3>
                     <HiMegaphone className="h-5 w-5 text-emerald-600" aria-hidden />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                     {announcements.map((ann) => (
                        <button
                           key={ann.id}
                           type="button"
                           onClick={() => setSelectedAnnouncement(ann)}
                           className="group w-full rounded-xl border border-slate-100 bg-slate-50 p-4 text-left transition-all hover:border-emerald-200 hover:bg-white hover:shadow-md sm:p-5"
                        >
                           <div className="mb-2 flex items-center gap-2">
                              <Badge label={ann.priority} color={ann.priority === 'High' ? 'red' : 'emerald'} variant="soft" className="text-[10px] px-2 py-0.5" />
                              <span className="text-[11px] font-medium text-slate-400">{new Date(ann.created_at).toLocaleDateString()}</span>
                           </div>
                           <h4 className="mb-1 text-sm font-semibold text-slate-900 group-hover:text-[#0F766E]">{ann.title}</h4>
                           <p className="line-clamp-2 text-xs text-slate-600">{ann.content}</p>
                        </button>
                     ))}
                  </div>
               </div>
            </div>

            <div className="space-y-4 lg:col-span-1">
               {/* Notifications */}
               <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <h3 className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-700">
                     <span className="flex items-center gap-2">
                        <HiBell className="h-4 w-4 text-[#0F766E]" aria-hidden />
                        Notifications
                     </span>
                     <Badge label="Live" color="green" variant="soft" className="text-[10px]" />
                  </h3>
                  <div className="space-y-3">
                     {dashboardAlerts.map((n) => (
                        <div
                           key={n.id}
                           className={`rounded-xl border p-3 ${n.tone === 'red'
                                 ? 'border-red-100 bg-red-50/60'
                                 : n.tone === 'blue'
                                    ? 'border-blue-100 bg-blue-50/60'
                                    : 'border-emerald-100 bg-emerald-50/60'
                              }`}
                        >
                           <p className="text-xs font-semibold text-slate-900">{n.type}</p>
                           <p className="mt-1 text-xs leading-relaxed text-slate-600">{n.detail}</p>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Pending Approvals */}
               {(isHRAdmin || isManager) && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                     <h3 className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-700">
                        Pending approvals <HiBellAlert className="h-4 w-4 text-amber-500" aria-hidden />
                     </h3>
                     <div className="space-y-2">
                        {[
                           { label: 'Leave', count: stats.pending.leaves, path: '/admin/leave' },
                           { label: 'Expenses', count: stats.pending.expenses, path: '/admin/expenses' },
                           { label: 'Documents', count: stats.pending.documents, path: '/admin/documents' }
                        ].map(item => (
                           <Link key={item.label} to={item.path} className="flex items-center justify-between rounded-xl border border-slate-50 bg-slate-50 p-3 transition-all hover:border-slate-100 hover:bg-white">
                              <span className="text-xs font-medium text-slate-700">{item.label}</span>
                              <Badge label={item.count} color="amber" variant="soft" />
                           </Link>
                        ))}
                     </div>
                  </div>
               )}

               {/* Compliance Alerts */}
               {isHRAdmin && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                     <h3 className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-700">
                        Document alerts <HiShieldCheck className="h-4 w-4 text-rose-500" aria-hidden />
                     </h3>
                     <div className="space-y-3">
                        {expiryAlerts.map(alert => (
                           <div key={alert.name} className={`p-3 rounded-xl bg-${alert.color}-50 border border-${alert.color}-100`}>
                              <div className="flex justify-between items-center mb-1">
                                 <span className={`text-xs font-semibold text-${alert.color}-700`}>{alert.name}</span>
                                 <Badge label={alert.count} color={alert.color} className="text-[10px]" />
                              </div>
                              <p className="truncate text-xs text-slate-500">{alert.items.join(', ')}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {/* Celebrations: Visual List */}
               <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <h3 className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-700">
                     Birthdays & anniversaries <HiGift className="h-4 w-4 text-rose-500" aria-hidden />
                  </h3>
                  <div className="space-y-3">
                     {birthdays.map((b, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-slate-50 bg-slate-50 transition-all hover:bg-white hover:shadow-md group">
                           <Avatar name={b.name} size="sm" className="ring-2 ring-white group-hover:ring-rose-100" />
                           <div className="flex-1 min-w-0">
                              <p className="mb-0.5 truncate text-xs font-semibold text-slate-900">{b.name}</p>
                              <p className="text-[11px] font-medium text-rose-600">{b.type} · {b.date}</p>
                           </div>
                           <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-white text-lg shadow-sm border border-slate-100 group-hover:rotate-12 transition-transform">
                              {b.icon}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Upcoming Holidays */}
               <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <h3 className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-700">
                     Upcoming holidays <HiFlag className="h-4 w-4 text-[#0F766E]" aria-hidden />
                  </h3>
                  <div className="space-y-2">
                     {[
                        { name: 'Eid Al Adha', date: '16 June', days: 'In 40 days', color: 'emerald' },
                        { name: 'Islamic New Year', date: '07 July', days: 'Upcoming', color: 'blue' }
                     ].map(h => (
                        <div key={h.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 border border-transparent hover:border-slate-100 transition-all">
                           <div className="flex items-center gap-3">
                              <div className={`h-8 w-1 bg-${h.color}-500 rounded-full`} />
                              <div>
                                 <p className="mb-0.5 text-xs font-semibold text-slate-900">{h.name}</p>
                                 <p className="text-[11px] text-slate-500">{h.date}</p>
                              </div>
                           </div>
                           <span className="text-[11px] font-medium text-slate-500">{h.days}</span>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-1">
                  <h3 className="mb-3 text-sm font-semibold text-slate-700">People changes</h3>
                  <div className="space-y-5">
                     <div>
                        <p className="mb-2 text-xs font-medium text-emerald-700">New hires</p>
                        <div className="space-y-3">
                           {joinersExits.newJoiners.map(j => (
                              <div key={j.name} className="flex items-center justify-between gap-2">
                                 <div className="flex min-w-0 items-center gap-3">
                                    <Avatar name={j.name} size="xs" />
                                    <div className="min-w-0">
                                       <p className="truncate text-xs font-semibold text-slate-800">{j.name}</p>
                                       <p className="text-[11px] text-slate-500">{j.dept}</p>
                                    </div>
                                 </div>
                                 <span className="shrink-0 text-xs font-medium text-slate-600">{j.date}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                     <div className="border-t border-slate-100 pt-4">
                        <p className="mb-2 text-xs font-medium text-rose-700">Leaving soon</p>
                        <div className="space-y-3">
                           {joinersExits.exits.map(e => (
                              <div key={e.name} className="flex items-center justify-between gap-2">
                                 <div className="flex min-w-0 items-center gap-3">
                                    <Avatar name={e.name} size="xs" />
                                    <div className="min-w-0">
                                       <p className="truncate text-xs font-semibold text-slate-800">{e.name}</p>
                                       <p className="text-[11px] text-slate-500">{e.dept}</p>
                                    </div>
                                 </div>
                                 <span className="shrink-0 text-xs font-medium text-slate-600">{e.date}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Modal */}
         {selectedAnnouncement && (
            <Modal title="Announcement" isOpen={true} onClose={() => setSelectedAnnouncement(null)} size="lg">
               <div className="space-y-4 pt-1">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 sm:p-8">
                     <div className="mb-4 flex flex-wrap items-center gap-3">
                        <Badge label={selectedAnnouncement.priority} color={selectedAnnouncement.priority === 'High' ? 'red' : 'emerald'} className="text-xs px-3" />
                        <span className="text-xs text-slate-500">{new Date(selectedAnnouncement.created_at).toLocaleString()}</span>
                     </div>
                     <h2 className="mb-3 text-xl font-bold leading-tight text-slate-900 sm:text-2xl">{selectedAnnouncement.title}</h2>
                     <div className="rounded-xl border border-white bg-white/80 p-4 text-sm leading-relaxed text-slate-600 sm:p-6">
                        {selectedAnnouncement.content}
                     </div>
                  </div>
                  <div className="flex gap-3">
                     <Button label="Close" variant="primary" onClick={() => setSelectedAnnouncement(null)} className="flex-1 rounded-xl py-3" />
                     <Button label="Dismiss" variant="ghost" onClick={() => setSelectedAnnouncement(null)} className="rounded-xl py-3 text-slate-600" />
                  </div>
               </div>
            </Modal>
         )}
      </div>
   )
}
