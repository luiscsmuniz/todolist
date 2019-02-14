import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

export default class DeleteMode extends Component {
  static defaultProps = {
    api: '',
    id: '',
    onDelete: () => {},
  }

  handleDelete = () => {
    confirmAlert({
      title: 'Excluir tarefa',
      message: 'Deseja excluir a tarefa?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => this.deleteTask(),
        },
        {
          label: 'Não',
          onClick: () => false,
        },
      ],
    })
  }

  deleteTask = async () => {
    const response = fetch(this.props.api + this.props.id, {
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

