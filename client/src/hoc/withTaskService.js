import React from 'react'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql/',
})

const UPDATE_TASK_MUTATION = gql`
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

const CREATE_TASK_MUTATION = gql`
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

const DELETE_TASK_MUTATION = gql`
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

const GET_TASKS_QUERY = gql`
  {
    tasks {
      id
      description
      status
    }
  }
`

const taskService = {
  update: (variables) => client.mutate({
    mutation: UPDATE_TASK_MUTATION,
    variables,
  }),

  create: (variables) => client.mutate({
    mutation: CREATE_TASK_MUTATION,
    variables,
  }),

  delete: (variables) => client.mutate({
    mutation: DELETE_TASK_MUTATION,
    variables,
  }),

  all: () => client.query({
    query: GET_TASKS_QUERY,
    fetchPolicy: 'network-only',
  }),
}

const withTaskService = WrappedComponent => props => (
  <WrappedComponent taskService={taskService} {...props} />
)

export default withTaskService
