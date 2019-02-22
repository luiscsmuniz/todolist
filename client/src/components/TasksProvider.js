/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import styled from 'styled-components'
import withTaskService from '../hoc/withTaskService'
import TasksContext from './TasksContext'

const Body = styled.div`
  background-color: ${props => props.color};
  min-height: 100vh;
`

Body.defaultProps = {
  color: '#282c34',
}

class TasksProvider extends Component {
  componentDidMount() {
    this.refetchTasks({ after: 0, first: 5 })
  }

  onRadioClick = (filter) => {
    this.setState({ filter })
  }

  refetchTasks = async ({ after, first }) => {
    const tasks = await this.props.taskService.all({ after, first })
    this.setState({
      tasks: tasks.data.tasksPagination.payload,
      hasNextPage: tasks.data.tasksPagination.pageInfo.hasNextPage,
    })
  }

  loadMore = async ({ after, first }) => {
    const tasks = await this.props.taskService.all({ after: parseInt(after, 10), first })
    this.setState(prevState => ({
      tasks: [
        ...prevState.tasks,
        ...tasks.data.tasksPagination.payload,
      ],
      hasNextPage: tasks.data.tasksPagination.pageInfo.hasNextPage,
    }))
  }

  getFilteredTasks = (tasks) => (
    tasks.filter((task) => {
      if (this.state.filter === 'ALL') {
        return task
      }
      return this.state.filter === task.status
    })
  )

  // eslint-disable-next-line react/sort-comp
  state = {
    tasks: [],
    hasNextPage: false,
    refetchTasks: this.refetchTasks,
    filter: 'ALL',
    getFilteredTasks: this.getFilteredTasks,
    onRadioClick: this.onRadioClick,
    loadMore: this.loadMore,
  }

  render() {
    return (
      <TasksContext.Provider value={this.state}>
        {this.props.children}
      </TasksContext.Provider>
    )
  }
}

export default withTaskService(TasksProvider)
