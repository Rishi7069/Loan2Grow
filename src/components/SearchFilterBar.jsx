import React from 'react'
import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

export default function SearchFilterBar({ filters, onChange }) {
  const handle = (key) => (e) => onChange({ ...filters, [key]: e.target.value })

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <TextField label='Search title' value={filters.q} onChange={handle('q')} size='small' fullWidth />
      <FormControl size='small' sx={{ minWidth: 140 }}>
        <InputLabel>Priority</InputLabel>
        <Select value={filters.priority} label='Priority' onChange={handle('priority')}>
          <MenuItem value='all'>All</MenuItem>
          <MenuItem value='high'>High</MenuItem>
          <MenuItem value='medium'>Medium</MenuItem>
          <MenuItem value='low'>Low</MenuItem>
        </Select>
      </FormControl>
      <FormControl size='small' sx={{ minWidth: 160 }}>
        <InputLabel>Assignee</InputLabel>
        <Select value={filters.assignee} label='Assignee' onChange={handle('assignee')}>
          <MenuItem value='all'>All</MenuItem>
          <MenuItem value='Asha'>Asha</MenuItem>
          <MenuItem value='Ravi'>Ravi</MenuItem>
          <MenuItem value='Priya'>Priya</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}