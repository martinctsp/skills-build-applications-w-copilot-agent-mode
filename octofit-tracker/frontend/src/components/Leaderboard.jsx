import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

function Leaderboard() {
  const [leaders, setLeaders] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('leaderboard').then(setLeaders).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <section className="data-view"><h2>Leaderboard</h2><p className="view-intro">Friendly competition, measured in consistency and effort.</p>{error ? <p className="error-state">{error}</p> : leaders === null ? <p className="loading">Loading leaderboard...</p> : leaders.length === 0 ? <p className="empty-state">The leaderboard is waiting for its first score.</p> : <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Rank</th><th>Member</th><th>Points</th><th>Streak</th></tr></thead><tbody>{leaders.map((leader, index) => <tr key={leader.id || leader._id || index}><td>#{leader.rank || index + 1}</td><td>{leader.name || leader.user || 'Member'}</td><td>{leader.points ?? '—'}</td><td>{leader.streak ? `${leader.streak} days` : '—'}</td></tr>)}</tbody></table></div>}</section>
  )
}

export default Leaderboard
