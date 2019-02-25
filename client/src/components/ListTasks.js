import React, { Component } from 'react'
import styled from 'styled-components'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
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
  last = (task) => task.slice(-1)[0].id

  render() {
    return (
      <TasksContext.Consumer>
        {({ tasks, getFilteredTasks, hasNextPage, loadMore, updateTask, deleteTask }) => (
          <List marginTop="20">
            <ListGroup>
              {
              getFilteredTasks(tasks).map((task) => (
                <ListGroupItem key={task.id}>
                  <UpdateTaskField
                    tasks={task}
                    onUpdate={updateTask}
                  />
                  <UpdateStatus
                    tasks={task}
                    onUpdate={updateTask}
                  />
                  <DeleteTaskButton
                    onDelete={deleteTask}
                    id={task.id}
                  />
                </ListGroupItem>
              ))
              }
              {hasNextPage ? (
                <ListGroupItem className="text-center">
                  <Button color="link" onClick={() => loadMore({ after: this.last(tasks), first: 5 })}>Carregar mais</Button>
                </ListGroupItem>
              ) : false }
            </ListGroup>
          </List>
        )}
      </TasksContext.Consumer>
    )
  }
}
