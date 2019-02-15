import React, { Component } from 'react'
import Switch from 'react-switch'

const status = {
  completed: 'COMPLETED',
  inProgress: 'IN_PROGRESS',
}
export default class UpdateStatusMode extends Component {
  static defaultProps = {
    api: '',
    status: '',
    id: '',
    onUpdate: () => {},
  }

  handleChecked = (checked) => {
    const params = {
      id: this.props.id,
      status: checked === true ? status.completed : status.inProgress,
    }
    this.updateStatus(params)
  }

  updateStatus = async (params) => {
    const query = JSON.stringify({
      query: `mutation {
        updateTask(
          input: {
            id: ${params.id}
            status: ${params.status}
          }
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
    return json
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

