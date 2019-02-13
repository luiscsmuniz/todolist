import React, { Component } from 'react'
import { Button } from 'reactstrap'

export default class DeleteMode extends Component {
  handleDelete = (event) => {
    const confirm = window.confirm('Deseja excluir a tarefa?')
    if (confirm) {
      this.deleteTask(event.target.value)
    }
  }

  deleteTask = async (task) => {
    const response = fetch(this.props.api + task, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response
    if (data.status === 204) {
      this.props.onDelete()
    }
  }

  render() {
    return (
      <Button color="danger" value={this.props.id} onClick={this.handleDelete} className="float-right">Excluir</Button>
    )
  }
}

DeleteMode.defaultProps = {
  api: '',
  id: '',
  onDelete: '',
}
