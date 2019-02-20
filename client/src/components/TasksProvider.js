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
  state = {
    tasks: [],
  }

  componentDidMount() {
    this.refetchTasks()
  }

  refetchTasks = async () => {
    const task = await this.props.taskService.all()
    this.setState({
      tasks: task.data.tasks,
    })
  }

  render() {
    const { refetchTasks } = this
    const value = {
      ...this.state,
      refetchTasks,
    }

    return (
      <TasksContext.Provider value={value}>
        {this.props.children}
      </TasksContext.Provider>
    )
  }
}

export default withTaskService(TasksProvider)
