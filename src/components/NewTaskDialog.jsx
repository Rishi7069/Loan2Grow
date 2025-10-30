import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addTask } from '../actions/taskActions'
import { v4 as uuidv4 } from 'uuid'

const PRIORITIES = ['high', 'medium', 'low']
const ASSIGNEES = ['Asha', 'Ravi', 'Priya']

export default function NewTaskDialog({ open, onClose }) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { title: '', description: '', status: 'todo', priority: 'medium', assignee: '' }
  })
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    const task = { id: uuidv4(), ...data }
    dispatch(addTask(task))
    reset()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>New Task</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent>
          <Controller name='title' control={control} rules={{ required: 'Title is required' }}
            render={({ field }) => (
              <TextField {...field} margin='dense' label='Title' fullWidth error={!!errors.title} helperText={errors.title?.message} />
            )} />
          <Controller name='description' control={control} rules={{ minLength: { value: 10, message: 'Minimum 10 chars' } }}
            render={({ field }) => (
              <TextField {...field} margin='dense' label='Description' fullWidth multiline rows={3} error={!!errors.description} helperText={errors.description?.message} />
            )} />
          <Controller name='priority' control={control} render={({ field }) => (
            <TextField {...field} select margin='dense' label='Priority' fullWidth>
              {PRIORITIES.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
            </TextField>
          )} />
          <Controller name='assignee' control={control} rules={{ required: 'Assignee required' }}
            render={({ field }) => (
              <TextField {...field} select margin='dense' label='Assignee' fullWidth error={!!errors.assignee} helperText={errors.assignee?.message}>
                {ASSIGNEES.map(a => <MenuItem key={a} value={a}>{a}</MenuItem>)}
              </TextField>
            )} />
          <Controller name='status' control={control} render={({ field }) => (
            <TextField {...field} margin='dense' label='Status' fullWidth />
          )} />
          <Box sx={{ mt: 1, fontSize: 12, color: 'text.secondary' }}>Title required, description >=10 chars, assignee required.</Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type='submit'>Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}