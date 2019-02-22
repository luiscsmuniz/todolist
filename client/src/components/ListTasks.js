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
  render() {
    return (
      <TasksContext.Consumer>
        {({ tasks, refetchTasks, getFilteredTasks, hasNextPage, loadMore }) => (
          <List marginTop="20">
            <ListGroup>
              {
              getFilteredTasks(tasks).map((task) => (
                <ListGroupItem key={task.id}>
                  <UpdateTaskField
                    tasks={task}
                    onUpdate={() => refetchTasks({ after: 0, first: 5 })}
                  />
                  <UpdateStatus
                    tasks={task}
                    onUpdate={() => refetchTasks({ after: 0, first: 5 })}
                  />
                  <DeleteTaskButton
                    onDelete={() => refetchTasks({ after: 0, first: 5 })}
                    id={task.id}
                  />
                </ListGroupItem>
              ))
              }
              {hasNextPage ? (
                <ListGroupItem className="text-center">
                  <Button color="link" onClick={() => loadMore({ after: tasks.slice(-1)[0].id, first: 5 })}>Carregar mais</Button>
                </ListGroupItem>
              ) : false }
            </ListGroup>
          </List>
        )}
      </TasksContext.Consumer>
    )
  }
}
