import React, { Component } from 'react'
import styled from 'styled-components'
import { ListGroup, ListGroupItem } from 'reactstrap'
import PropTypes from 'prop-types'
import UpdateTaskField from './UpdateTaskField'
import UpdateStatus from './UpdateStatus'
import DeleteTaskButton from './DeleteTaskButton'

const List = styled.div`
  margin-top: ${props => props.marginTop}px;
`

List.defaultProps = {
  marginTop: 10,
}

export default class ListTask extends Component {
  static defaultProps ={
    onSuccess: () => {},
  }

  static propTypes = {
    tasks: PropTypes.arrayOf(Array).isRequired,
    filter: PropTypes.string.isRequired,
    onSuccess: PropTypes.func,
  }

  getFilteredTasks = () => (
    this.props.tasks.filter((task) => {
      if (this.props.filter === 'ALL') {
        return task
      }
      return this.props.filter === task.status
    })
  )

  render() {
    return (
      <List marginTop="20">
        <ListGroup>
          {
          this.getFilteredTasks().map((task) => (
            <ListGroupItem key={task.id}>
              <UpdateTaskField
                tasks={task}
                onUpdate={this.props.onSuccess}
              />
              <UpdateStatus
                tasks={task}
                onUpdate={this.props.onSuccess}
              />
              <DeleteTaskButton onDelete={this.props.onSuccess} id={task.id} />
            </ListGroupItem>
          ))
          }
        </ListGroup>
      </List>
    )
  }
}
