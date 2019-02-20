import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Switch from 'react-switch'

import withTaskService from '../hoc/withTaskService'

const status = {
  completed: 'COMPLETED',
  inProgress: 'IN_PROGRESS',
}
class UpdateStatus extends Component {
  static defaultProps = {
    onUpdate: () => {},
  }

  static propTypes = {
    tasks: PropTypes.objectOf(Object).isRequired,
    onUpdate: PropTypes.func,
  }

  handleChecked = (checked) => {
    this.updateStatus({
      id: this.props.tasks.id,
      status: checked ? status.completed : status.inProgress,
    })
  }

  updateStatus = async (input) => {
    const task = await this.props.taskService.update({ input })

    this.props.onUpdate(task)

    return task
  }

  render() {
    return (
      <Switch
        onChange={this.handleChecked}
        checked={this.props.tasks.status === status.completed}
      />
    )
  }
}

export default withTaskService(UpdateStatus)
