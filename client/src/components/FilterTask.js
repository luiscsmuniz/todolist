import React, { Component } from 'react'
import { Button, ButtonGroup } from 'reactstrap'
import styled from 'styled-components'
import ListTask from './ListTask'
import TasksContext from './TasksContext'

const Filter = styled.div`
  text-align: center;
  margin-top: ${props => props.marginTop}px;
`

Filter.defaultProps = {
  marginTop: 10,
}

export default class FilterTask extends Component {
  state = {
    filter: 'ALL',
  }

  onRadioClick(filter) {
    this.setState({ filter })
  }

  render() {
    return (
      <TasksContext.Consumer>
        {
          ({ tasks, getTask }) => (
            <div>
              <Filter marginTop="10">
                <ButtonGroup>
                  <Button color="info" onClick={() => this.onRadioClick('ALL')} active={this.state.filter === 'ALL'}>Todos</Button>
                  <Button color="info" onClick={() => this.onRadioClick('IN_PROGRESS')} active={this.state.filter === 'IN_PROGRESS'}>Em progresso</Button>
                  <Button color="info" onClick={() => this.onRadioClick('COMPLETED')} active={this.state.filter === 'COMPLETED'}>Finalizado</Button>
                </ButtonGroup>
              </Filter>
              <ListTask
                filter={this.state.filter}
                tasks={tasks}
                onSuccess={getTask}
              />
            </div>
          )
        }
      </TasksContext.Consumer>
    )
  }
}
