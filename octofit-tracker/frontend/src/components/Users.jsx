import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

function Users() {
  const [users, setUsers] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('users').then(setUsers).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <section className="data-view"><h2>Users</h2><p className="view-intro">The people powering this training community.</p>{error ? <p className="error-state">{error}</p> : users === null ? <p className="loading">Loading users...</p> : users.length === 0 ? <p className="empty-state">No users found yet.</p> : <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Name</th><th>Email</th><th>Team</th></tr></thead><tbody>{users.map((user, index) => <tr key={user.id || user._id || index}><td>{user.name || user.username || 'Member'}</td><td>{user.email || '—'}</td><td>{user.team || user.teamName || '—'}</td></tr>)}</tbody></table></div>}</section>
  )
}

export default Users
