import React, { Component } from 'react'
import { Input } from 'reactstrap'

export default class EditMode extends Component {
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
      const params = {
        id: this.props.id,
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
    const query = JSON.stringify({
      query: `mutation {
        updateTask(
          id: ${params.id}
          description: "${params.description}"
        ){
          id
          description
          status
        }
      }`,
    })
    const response = await fetch(this.props.api, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: query,
    })
    const json = await response.json()
    this.props.onUpdate()
    this.setState({
      editMode: false,
    })
    return json
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

