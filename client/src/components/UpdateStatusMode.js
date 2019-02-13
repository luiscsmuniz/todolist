import React, { Component } from 'react'
import Switch from 'react-switch'

const status = {
  completed: 1,
  inProgress: 0,
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
    const response = await fetch(this.props.api + params.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ status: params.status }),
    })
    const json = await response.json()
    this.props.onUpdate()
    return json
  }

  render() {
    return (
      <Switch
        onChange={this.handleChecked}
        checked={this.props.status === 'completed'}
      />
    )
  }
}
