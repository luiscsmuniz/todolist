import React, { Component } from 'react'
import { Input } from 'reactstrap'

export default class EditMode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false,
    }
  }

  handleEditMode = () => {
    this.setState({
      editMode: true,
    })
  }

  handleKeyDownTask = (event) => {
    if (event.key === 'Enter') {
      this.updateTask(event.target.id, event.target.value)
    } else if (event.key === 'Escape') {
      this.setState({
        editMode: false,
      })
    }
  }

  updateTask = (idTask, description) => {
    fetch(this.props.api + idTask, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    })
      .then(
        data => {
          if (data.status === 200) {
            this.setState({
              editMode: false,
            })
            this.props.onUpdate()
          }
        },
      )
  }

  renderTask = () => {
    if (this.state.editMode) {
      return <Input type="text" id={this.props.id} autoFocus="true" onKeyDown={this.handleKeyDownTask} defaultValue={this.props.description} />
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
