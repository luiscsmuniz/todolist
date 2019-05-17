import React, { PureComponent } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import _ from 'lodash/fp'

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
  query TaskQuery($after: Int!, $first: Int!){
    tasks(after: $after, first: $first) {
      payload {
        id
        description
        status
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`

const withTaskService = WrappedComponent => class extends PureComponent {
  static displayName = `withTaskService(${WrappedComponent.name || WrappedComponent.displayName})`

  createMutate = _.curry((mutation, variables) => this.props.client.mutate({
    mutation,
    variables,
  }))

  // eslint-disable-next-line react/sort-comp
  query = _.curry((query, variables) => this.props.client.query({
    fetchPolicy: 'no-cache',
    query,
    variables,
  }))

  taskService = {
    update: this.createMutate(UPDATE_TASK_MUTATION),
    create: this.createMutate(CREATE_TASK_MUTATION),
    delete: this.createMutate(DELETE_TASK_MUTATION),
    all: this.query(GET_TASKS_QUERY),
  }

  render() {
    const { client, ...props } = this.props

    return (
      <WrappedComponent taskService={this.taskService} {...props} />
    )
  }
}

export default _.flow(
  withTaskService,
  withApollo,
)
