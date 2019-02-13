import React, { Component } from 'react'
import { Input } from 'reactstrap'

export default class EditMode extends Component {
  state = {
    editMode: false,
  }

  handleEditMode = () => {
    this.setState({
      editMode: true,
    })
  }

  handleKeyDownTask = (event) => {
    if (event.key === 'Enter') {
      const params = {
        id: event.target.id,
        description: event.target.value,
      }
      this.updateTask(params)
    } else if (event.key === 'Escape') {
      this.setState({
        editMode: false,
      })
    }
  }

  updateTask = async (params) => {
    const response = await fetch(this.props.api + params.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ description: params.description }),
    })
    const json = await response.json()
    if (json) {
      this.props.onUpdate()
      this.setState({
        editMode: false,
      })
    }
  }

  renderTask = () => {
    if (this.state.editMode) {
      return <Input type="text" id={this.props.id} autoFocus onKeyDown={this.handleKeyDownTask} defaultValue={this.props.description} />
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

EditMode.defaultProps = {
  id: '',
  description: '',
  onUpdate: '',
}
