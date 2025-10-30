import React, { useState } from 'react'
import { Card, CardContent, Typography, CardActions, Button, Menu, MenuItem, Chip, Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { updateTask, deleteTask } from '../actions/taskActions'


export default function TaskCard({ task }) {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenu = (e) => setAnchorEl(e.currentTarget)
  const closeMenu = () => setAnchorEl(null)

  const changeStatus = (status) => {
    dispatch(updateTask({ ...task, status }))
    closeMenu()
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='subtitle1'>{task.title}</Typography>
          <Chip label={task.priority} size='small' />
        </Box>
        <Typography variant='body2' color='text.secondary'>{task.description}</Typography>
        <Typography variant='caption' display='block' sx={{ mt: 1 }}>Assignee: {task.assignee}</Typography>
      </CardContent>
      <CardActions>
        <Button size='small' onClick={handleMenu}>Move</Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
          <MenuItem onClick={() => changeStatus('todo')}>To do</MenuItem>
          <MenuItem onClick={() => changeStatus('inprogress')}>In progress</MenuItem>
          <MenuItem onClick={() => changeStatus('done')}>Done</MenuItem>
        </Menu>
        <Button size='small' color='error' onClick={() => dispatch(deleteTask(task.id))}>Delete</Button>
      </CardActions>
    </Card>
  )
}