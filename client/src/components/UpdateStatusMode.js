import React, { Component } from 'react'
import Switch from 'react-switch'

export default class UpdateStatusMode extends Component {
  handleChecked = (checked, event, id) => {
    if (checked) {
      this.updateStatus(id, 1)
    } else {
      this.updateStatus(id, 0)
    }
  }

  updateStatus = (idTask, status) => {
    fetch(this.props.api + idTask, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
      .then(
        data => {
          if (data.status === 200) {
            this.props.onUpdate()
          }
        },
      )
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
