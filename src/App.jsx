import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import Board from './components/Board'
import NewTaskDialog from './components/NewTaskDialog'
import SearchFilterBar from './components/SearchFilterBar'
import { loadTasks } from './actions/taskActions'


export default function App() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState({ q: '', priority: 'all', assignee: 'all' })

  const tasks = useSelector(state => state.tasks.items)

  useEffect(() => {
    if (!tasks || tasks.length === 0) {
      dispatch(loadTasks())
    }
  }, [dispatch, tasks])



  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>Task Dashboard</Typography>
          <Button color='inherit' onClick={() => setOpen(true)}>New Task</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }} maxWidth='lg'>
        <Box sx={{ mb: 2 }}>
          <SearchFilterBar filters={filters} onChange={setFilters} />
        </Box>
        <Board filters={filters} />
      </Container>
      <NewTaskDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}