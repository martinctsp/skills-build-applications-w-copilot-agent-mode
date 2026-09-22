import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

function Teams() {
  const [teams, setTeams] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('teams').then(setTeams).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <section className="data-view"><h2>Teams</h2><p className="view-intro">Find your people and make the next session easier to show up for.</p>{error ? <p className="error-state">{error}</p> : teams === null ? <p className="loading">Loading teams...</p> : teams.length === 0 ? <p className="empty-state">No teams created yet.</p> : <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Team</th><th>Captain</th><th>Members</th></tr></thead><tbody>{teams.map((team, index) => <tr key={team.id || team._id || index}><td>{team.name || 'Team'}</td><td>{team.captain || team.owner || '—'}</td><td>{team.members?.length ?? team.memberCount ?? '—'}</td></tr>)}</tbody></table></div>}</section>
  )
}

export default Teams
