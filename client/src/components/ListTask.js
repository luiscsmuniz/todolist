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
  static propTypes = {
    tasks: PropTypes.instanceOf(Array).isRequired,
    filter: PropTypes.string.isRequired,
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
                description={task.description}
                id={task.id}
                onUpdate={this.props.getTask}
              />
              <UpdateStatus
                id={task.id}
                onUpdate={this.props.getTask}
                status={task.status}
              />
              <DeleteTaskButton onDelete={this.props.getTask} id={task.id} />
            </ListGroupItem>
          ))
          }
        </ListGroup>
      </List>
    )
  }
}
