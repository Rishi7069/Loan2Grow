import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, Paper, Typography, CircularProgress, Alert } from '@mui/material'
import TaskCard from './TaskCard'



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
  const statuses = [...new Set(items.map(t => t.status))]
  console.log(statuses);
  

  const filtered = applyFilters(items || [], filters || { q: '', priority: 'all', assignee: 'all' })

  return (
    <Grid container spacing={2}>
      {statuses.map(status => (
        <Grid item xs={12} md={4} key={status}>
          <Paper sx={{ p: 2, minHeight: 400 }} elevation={3}>
            <Typography variant='h6' gutterBottom>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Typography>
            {filtered.filter(t => t.status === status).map(t => (
              <TaskCard key={t.id} task={t} />
            ))}
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}