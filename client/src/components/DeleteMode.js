import React, { Component } from 'react'
import { Button } from 'reactstrap'

export default class DeleteMode extends Component {
  handleDelete = (event) => {
    const confirm = window.confirm('Deseja excluir a tarefa?')
    if (confirm) {
      this.deleteTask(event.target.value)
    }
  }

  deleteTask = (idTask) => {
    fetch(this.props.api + idTask, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(
        data => {
          if (data.status === 204) {
            this.props.onDelete()
          }
        },
      )
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
