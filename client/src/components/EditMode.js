import React, { Component } from 'react'
import { Input } from 'reactstrap'

import withTaskService from '../hoc/withTaskService'

class EditMode extends Component {
  state = {
    editMode: false,
  }

  static defaultProps = {
    id: '',
    description: '',
    onUpdate: () => {},
  }

  handleEditMode = () => {
    this.setState({
      editMode: true,
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
        editMode: false,
      })
    }
  }

  updateTask = async (input) => {
    const task = await this.props.taskService.update({ input })

    this.props.onUpdate()

    this.setState({
      editMode: false,
    })

    return task
  }

  renderTask = () => {
    if (this.state.editMode) {
      return <Input type="text" autoFocus onKeyDown={this.handleKeyDownTask} defaultValue={this.props.description} />
    }
    return (
      <div onDoubleClick={this.handleEditMode} id={String(this.props.id)}>
        { this.props.description }
      </div>
    )
  }

  render() {
    return this.renderTask()
  }
}

export default withTaskService(EditMode)
