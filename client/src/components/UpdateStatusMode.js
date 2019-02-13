import React, { Component } from 'react'
import Switch from 'react-switch'

const status = {
  completed: 1,
  in_progress: 0,
}
export default class UpdateStatusMode extends Component {
  handleChecked = (checked, event, id) => {
    const params = {
      id,
      status: checked === true ? status.completed : status.in_progress,
    }
    this.updateStatus(params)
  }

  updateStatus = async (params) => {
    const response = await fetch(this.props.api + params.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ status: params.status }),
    })
    const json = await response.json()
    if (json) {
      this.props.onUpdate()
    }
  }

  render() {
    return (
      <Switch
        onChange={this.handleChecked}
        checked={this.props.status === 'completed'}
        id={String(this.props.id)}
      />
    )
  }
}

UpdateStatusMode.defaultProps = {
  api: '',
  status: '',
  id: '',
  onUpdate: '',
}
