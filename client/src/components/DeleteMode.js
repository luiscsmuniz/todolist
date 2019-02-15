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
    const query = JSON.stringify({
      query: `mutation {
        deleteTask(
          id: "${this.props.id}"
        ){
          id
          description
          status
        }
      }`,
    })
    const response = fetch(this.props.api, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: query,
    })
    const data = await response
    this.props.onDelete()
    return data
  }

  render() {
    return (
      <Button color="danger" value={this.props.id} onClick={this.handleDelete} className="float-right">Excluir</Button>
    )
  }
}

