import React, { Component } from 'react'
import { Input } from 'reactstrap'
import PropTypes from 'prop-types'

import withTaskService from '../hoc/withTaskService'

class UpdateTaskField extends Component {
  static propTypes = {
    tasks: PropTypes.objectOf(Object).isRequired,
  }

  state = {
    editing: false,
    inputText: this.props.tasks.description,
  }

  handleEditMode = () => {
    this.setState({
      editing: true,
    })
  }

  handleKeyDownTask = (event) => {
    if (event.key === 'Enter') {
      this.updateTask({
        id: this.props.tasks.id,
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
    this.setState({
      editing: false,
      inputText: input.description,
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
          defaultValue={this.state.inputText}
        />
      )
    }

    return (
      <div onDoubleClick={this.handleEditMode}>
        {this.state.inputText}
      </div>
    )
  }
}

export default withTaskService(UpdateTaskField)
