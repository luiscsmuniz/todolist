import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import withTaskService from '../hoc/withTaskService'

class DeleteMode extends Component {
  static defaultProps = {
    onDelete: () => {},
  }

  handleDelete = () => {
    confirmAlert({
      title: 'Excluir tarefa',
      message: 'Deseja excluir a tarefa?',
      buttons: [
        {
          label: 'Sim',
          onClick: this.deleteTask,
        },
        {
          label: 'Não',
        },
      ],
    })
  }

  deleteTask = async () => {
    const task = await this.props.taskService.delete({
      id: this.props.id,
    })

    this.props.onDelete(task)

    return task
  }

  render() {
    return (
      <Button
        className="float-right"
        color="danger"
        value={this.props.id}
        onClick={this.handleDelete}
      >
        Excluir
      </Button>
    )
  }
}

export default withTaskService(DeleteMode)

