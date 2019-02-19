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

const gqlFetch = {
  mutate: (mutation, variables) => client.mutate({
    mutation,
    variables,
  }),

  query: (query, fetchPolicy) => client.query({
    query,
    fetchPolicy,
  }),
}

const taskService = {
  update: (variables) => gqlFetch.mutate(UPDATE_TASK_MUTATION, variables),

  create: (variables) => gqlFetch.mutate(CREATE_TASK_MUTATION, variables),

  delete: (variables) => gqlFetch.mutate(DELETE_TASK_MUTATION, variables),

  all: () => gqlFetch.query(GET_TASKS_QUERY, 'no-cache'),
}

const withTaskService = WrappedComponent => props => (
  <WrappedComponent taskService={taskService} {...props} />
)

export default withTaskService
