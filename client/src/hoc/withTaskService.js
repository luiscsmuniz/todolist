import React from 'react'

const API = 'http://localhost:3001/graphql/'

const UPDATE_TASK_MUTATION = `
  mutation UpdateTaskMutation($input: UpdateTaskInput!) {
    updateTask(
      input: $input
    ) {
      id
      description
      status
    }
  }
`

const CREATE_TASK_MUTATION = `
  mutation CreateTaskMutation($input: CreateTaskInput!) {
    createTask(
      input: $input
    ) {
      id
      description
      status
    }
  }
`

const DELETE_TASK_MUTATION = `
  mutation DeleteTaskMutation($id: ID!){
    deleteTask(
      id: $id
    ) {
      id
      description
      status
    }
  }
`

const GET_TASKS_QUERY = `
  {
    tasks{
      id
      description
      status
    }
  }
`

const fetchAPI = {
  fetch: async (body) => {
    const response = await fetch(API, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    })
    return response.json()
  },
}

const taskService = {
  update: async (variables) => {
    const body = JSON.stringify({
      query: UPDATE_TASK_MUTATION,
      variables,
    })
    return fetchAPI.fetch(body)
  },

  create: async (variables) => {
    const body = JSON.stringify({
      query: CREATE_TASK_MUTATION,
      variables,
    })
    return fetchAPI.fetch(body)
  },

  delete: async (variables) => {
    const body = JSON.stringify({
      query: DELETE_TASK_MUTATION,
      variables,
    })
    return fetchAPI.fetch(body)
  },

  all: async () => {
    const body = JSON.stringify({
      query: GET_TASKS_QUERY,
    })
    return fetchAPI.fetch(body)
  },
}

const withTaskService = WrappedComponent => props => (
  <WrappedComponent taskService={taskService} {...props} />
)

export default withTaskService
