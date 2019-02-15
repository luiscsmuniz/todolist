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

const taskService = {
  update: async (variables) => {
    const body = JSON.stringify({
      query: UPDATE_TASK_MUTATION,
      variables,
    })

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

const withTaskService = WrappedComponent => props => (
  <WrappedComponent taskService={taskService} {...props} />
)

export default withTaskService
