import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

function Activities() {
  const [activities, setActivities] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities').then(setActivities).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <ResourcePage title="Activities" intro="A clear record of every run, ride, lift, and small win." rows={activities} error={error} empty="No activities logged yet.">
      <table className="data-table"><thead><tr><th>Activity</th><th>Member</th><th>Duration</th><th>Date</th></tr></thead><tbody>{activities?.map((activity, index) => <tr key={activity.id || activity._id || index}><td>{activity.type || activity.name || 'Activity'}</td><td>{activity.user || activity.userName || '—'}</td><td>{activity.duration || '—'}</td><td>{activity.date || activity.createdAt || '—'}</td></tr>)}</tbody></table>
    </ResourcePage>
  )
}

function ResourcePage({ title, intro, rows, error, empty, children }) {
  return <section className="data-view"><h2>{title}</h2><p className="view-intro">{intro}</p>{error ? <p className="error-state">{error}</p> : rows === null ? <p className="loading">Loading {title.toLowerCase()}...</p> : rows.length === 0 ? <p className="empty-state">{empty}</p> : <div className="data-table-wrap">{children}</div>}</section>
}

export default Activities
