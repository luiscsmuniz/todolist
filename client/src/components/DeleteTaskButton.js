import React, { Component } from 'react'
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { FaTrash } from 'react-icons/fa'
import withTaskService from '../hoc/withTaskService'

class DeleteTaskButton extends Component {
  static defaultProps = {
    onDelete: () => {},
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
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
        <FaTrash />
      </Button>
    )
  }
}

export default withTaskService(DeleteTaskButton)

