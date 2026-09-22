import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('workouts').then(setWorkouts).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <section className="data-view"><h2>Workouts</h2><p className="view-intro">Personalized ideas for wherever your energy is today.</p>{error ? <p className="error-state">{error}</p> : workouts === null ? <p className="loading">Loading workouts...</p> : workouts.length === 0 ? <p className="empty-state">No workout suggestions yet.</p> : <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Workout</th><th>Focus</th><th>Difficulty</th><th>Duration</th></tr></thead><tbody>{workouts.map((workout, index) => <tr key={workout.id || workout._id || index}><td>{workout.name || 'Workout'}</td><td>{workout.focus || workout.type || '—'}</td><td>{workout.difficulty || '—'}</td><td>{workout.duration || '—'}</td></tr>)}</tbody></table></div>}</section>
  )
}

export default Workouts
