import React, { Component } from 'react'
import { Button, ButtonGroup } from 'reactstrap'
import styled from 'styled-components'
import ListTask from './ListTasks'
import TasksContext from './TasksContext'

const Filter = styled.div`
  text-align: center;
  margin-top: ${props => props.marginTop}px;
`

Filter.defaultProps = {
  marginTop: 10,
}

export default class FilterTask extends Component {
  render() {
    return (
      <TasksContext.Consumer>
        {({ filter, onRadioClick }) => (
          <div>
            <Filter marginTop="10">
              <ButtonGroup>
                <Button color="info" onClick={() => onRadioClick('ALL')} active={filter === 'ALL'}>Todos</Button>
                <Button color="info" onClick={() => onRadioClick('IN_PROGRESS')} active={filter === 'IN_PROGRESS'}>Em progresso</Button>
                <Button color="info" onClick={() => onRadioClick('COMPLETED')} active={filter === 'COMPLETED'}>Finalizado</Button>
              </ButtonGroup>
            </Filter>
            <ListTask />
          </div>
        )}
      </TasksContext.Consumer>
    )
  }
}
