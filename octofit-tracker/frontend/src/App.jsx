import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Overview', path: '/' },
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function PageHeading() {
  const location = useLocation()
  const currentPage = navigation.find(({ path }) => path === location.pathname)

  return (
    <header className="page-heading">
      <div>
        <p className="eyebrow">OCTOFIT TRACKER / PRESENTATION TIER</p>
        <h1>{currentPage?.label || 'OctoFit Tracker'}</h1>
      </div>
      <span className="status-pill"><span className="status-dot" /> API connected</span>
    </header>
  )
}

function Overview() {
  return (
    <section className="overview-grid">
      <div className="welcome-panel">
        <p className="eyebrow">YOUR TRAINING CONSOLE</p>
        <h2>Make today count.</h2>
        <p>Track movement, find your crew, and keep momentum visible across every workout.</p>
        <NavLink className="primary-link" to="/activities">Log an activity <span aria-hidden="true">→</span></NavLink>
      </div>
      <div className="metric-panel">
        <span className="metric-label">QUICK NAVIGATION</span>
        <div className="quick-links">
          {navigation.slice(1).map(({ label, path }) => (
            <NavLink key={path} to={path}>{label}<span aria-hidden="true">↗</span></NavLink>
          ))}
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/">
          <img src="/octofitapp-small.png" alt="" />
          <span>OctoFit<span> / tracker</span></span>
        </NavLink>
        <nav aria-label="Primary navigation">
          <p className="nav-label">Workspace</p>
          {navigation.map(({ label, path }) => (
            <NavLink key={path} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to={path} end={path === '/'}>
              <span className="nav-marker" aria-hidden="true" />{label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="avatar">OF</span>
          <div><strong>OctoFit member</strong><small>Ready to move</small></div>
        </div>
      </aside>
      <main className="main-content">
        <PageHeading />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
