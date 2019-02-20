import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'
import TaskTitle from './components/TaskTitle'
import CreateTaskInput from './components/CreateTaskInput'
import withTaskService from './hoc/withTaskService'
import FilterTask from './components/FilterTask'
import TasksContext from './components/TasksContext'
import TasksProvider from './components/TasksProvider'

const Body = styled.div`
  background-color: ${props => props.color};
  min-height: 100vh;
`

Body.defaultProps = {
  color: '#282c34',
}

const App = () => (
  <TasksProvider>
    <Body color="#282c34">
      <Container>
        <Row>
          <TaskTitle title="Todolist" fontSize={4} color="white" size={10} offset={1} />
        </Row>
        <Row>
          <TasksContext.Consumer>
            {({ refetchTasks }) => (
              <CreateTaskInput placeholder="Digite sua tarefa..." onCreate={refetchTasks} />
            )}
          </TasksContext.Consumer>
        </Row>
        <Row>
          <Col md={{ size: 10, offset: 1 }}>
            <FilterTask />
          </Col>
        </Row>
      </Container>
    </Body>
  </TasksProvider>
)

export default withTaskService(App)
