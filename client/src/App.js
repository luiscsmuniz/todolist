import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'
import TaskTitle from './components/TaskTitle'
import CreateTaskInput from './components/CreateTaskInput'
import withTaskService from './hoc/withTaskService'
import FilterTask from './components/FilterTask'

const Body = styled.div`
  background-color: ${props => props.color};
  min-height: 100vh;
`

Body.defaultProps = {
  color: '#282c34',
}
class App extends Component {
  state = {
    tasks: [],
  }

  componentDidMount() {
    this.getTask()
  }

  getTask = async () => {
    const task = await this.props.taskService.all()
    this.setState({
      tasks: task.data.tasks,
    })
  }

  render() {
    return (
      <Body color="#282c34">
        <Container>
          <Row>
            <TaskTitle title="Todolist" fontSize={4} color="white" size={10} offset={1} />
          </Row>
          <Row>
            <CreateTaskInput placeholder="Digite sua tarefa..." onCreate={this.getTask} />
          </Row>
          <Row>
            <Col md={{ size: 10, offset: 1 }}>
              <FilterTask
                tasks={this.state.tasks}
                onSuccess={this.getTask}
              />
            </Col>
          </Row>
        </Container>
      </Body>
    )
  }
}

export default withTaskService(App)
