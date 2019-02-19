import React, { Component } from 'react'
import { Input } from 'reactstrap'
import PropTypes from 'prop-types'

import withTaskService from '../hoc/withTaskService'

class UpdateTaskField extends Component {
  static defaultProps = {
    onUpdate: () => {},
  }

  static propTypes = {
    onUpdate: PropTypes.func,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }

  state = {
    editing: false,
  }

  handleEditMode = () => {
    this.setState({
      editing: true,
    })
  }

  handleKeyDownTask = (event) => {
    if (event.key === 'Enter') {
      this.updateTask({
        id: this.props.id,
        description: event.target.value,
      })
    } else if (event.key === 'Escape') {
      this.setState({
        editing: false,
      })
    }
  }

  updateTask = async (input) => {
    const task = await this.props.taskService.update({ input })

    this.props.onUpdate()

    this.setState({
      editing: false,
    })

    return task
  }

  render() {
    if (this.state.editing) {
      return (
        <Input
          type="text"
          autoFocus
          onKeyDown={this.handleKeyDownTask}
          defaultValue={this.props.description}
        />
      )
    }

    return (
      <div onDoubleClick={this.handleEditMode}>
        {this.props.description}
      </div>
    )
  }
}

export default withTaskService(UpdateTaskField)
