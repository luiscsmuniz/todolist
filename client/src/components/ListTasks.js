import React, { Component } from 'react'
import styled from 'styled-components'
import { ListGroup, ListGroupItem } from 'reactstrap'
import UpdateTaskField from './UpdateTaskField'
import UpdateStatus from './UpdateStatus'
import DeleteTaskButton from './DeleteTaskButton'
import TasksContext from './TasksContext'

const List = styled.div`
  margin-top: ${props => props.marginTop}px;
`

List.defaultProps = {
  marginTop: 10,
}

export default class ListTask extends Component {
  render() {
    return (
      <TasksContext.Consumer>
        {({ tasks, refetchTasks, getFilteredTasks }) => (
          <List marginTop="20">
            <ListGroup>
              {
              getFilteredTasks(tasks).map((task) => (
                <ListGroupItem key={task.id}>
                  <UpdateTaskField
                    tasks={task}
                    onUpdate={refetchTasks}
                  />
                  <UpdateStatus
                    tasks={task}
                    onUpdate={refetchTasks}
                  />
                  <DeleteTaskButton onDelete={refetchTasks} id={task.id} />
                </ListGroupItem>
              ))
              }
            </ListGroup>
          </List>
        )}
      </TasksContext.Consumer>
    )
  }
}
