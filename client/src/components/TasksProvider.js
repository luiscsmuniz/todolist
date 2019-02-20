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
    this.refetchTasks()
  }

  onRadioClick = (filter) => {
    this.setState({ filter })
  }

  refetchTasks = async () => {
    const task = await this.props.taskService.all()
    this.setState({
      tasks: task.data.tasks,
    })
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
    refetchTasks: this.refetchTasks,
    filter: 'ALL',
    getFilteredTasks: this.getFilteredTasks,
    onRadioClick: this.onRadioClick,
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
