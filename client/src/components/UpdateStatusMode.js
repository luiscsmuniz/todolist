import React, { Component } from 'react'
import Switch from 'react-switch'

import withTaskService from '../hoc/withTaskService'

const status = {
  completed: 'COMPLETED',
  inProgress: 'IN_PROGRESS',
}
class UpdateStatusMode extends Component {
  static defaultProps = {
    api: '',
    status: '',
    id: '',
    onUpdate: () => {},
  }

  handleChecked = (checked) => {
    this.updateStatus({
      id: this.props.id,
      status: checked ? status.completed : status.inProgress,
    })
  }

  updateStatus = async (input) => {
    const task = await this.props.taskService.update({ input })

    this.props.onUpdate()

    return task
  }

  render() {
    return (
      <Switch
        onChange={this.handleChecked}
        checked={this.props.status === status.completed}
      />
    )
  }
}

export default withTaskService(UpdateStatusMode)
