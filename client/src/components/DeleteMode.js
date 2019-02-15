import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import withTaskService from '../hoc/withTaskService'

class DeleteMode extends Component {
  static defaultProps = {
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
          onClick: () => this.deleteTask({ id: this.props.id }),
        },
        {
          label: 'Não',
          onClick: () => false,
        },
      ],
    })
  }

  deleteTask = async (input) => {
    const task = await this.props.taskService.delete(input)
    this.props.onDelete()
    return task
  }

  render() {
    return (
      <Button color="danger" value={this.props.id} onClick={this.handleDelete} className="float-right">Excluir</Button>
    )
  }
}

export default withTaskService(DeleteMode)

