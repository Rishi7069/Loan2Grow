import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, Paper, Typography, CircularProgress, Alert } from '@mui/material'
import TaskCard from './TaskCard'

const STATUSES = [
  { key: 'todo', label: 'To do' },
  { key: 'inprogress', label: 'In progress' },
  { key: 'done', label: 'Done' }
]

function applyFilters(items, filters) {
  return items.filter(t => {
    if (!t) return false
    const q = filters.q.trim().toLowerCase()
    if (q && !t.title.toLowerCase().includes(q)) return false
    if (filters.priority !== 'all' && t.priority !== filters.priority) return false
    if (filters.assignee !== 'all' && t.assignee !== filters.assignee) return false
    return true
  })
}

export default function Board({ filters }) {
  const { items, status, error } = useSelector(s => s.tasks)

  if (status === 'loading') return <CircularProgress />
  if (status === 'failed') return <Alert severity='error'>{error || 'Failed to load tasks'}</Alert>

  const filtered = applyFilters(items || [], filters || { q: '', priority: 'all', assignee: 'all' })

  return (
    <Grid container spacing={2}>
      {STATUSES.map(col => (
        <Grid item xs={12} md={4} key={col.key}>
          <Paper sx={{ p: 2, minHeight: 400 }} elevation={3}>
            <Typography variant='h6' gutterBottom>{col.label}</Typography>
            {filtered.filter(t => t.status === col.key).map(t => (
              <TaskCard key={t.id} task={t} />
            ))}
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}