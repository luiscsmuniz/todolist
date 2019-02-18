import React, { Component } from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem, Button, ButtonGroup } from 'reactstrap'
import { Body, Filter, List } from './components/style'
import TaskTitle from './components/TaskTitle'
import EditMode from './components/EditMode'
import CreateMode from './components/CreateMode'
import DeleteMode from './components/DeleteMode'
import UpdateStatusMode from './components/UpdateStatusMode'
import withTaskService from './hoc/withTaskService'

class App extends Component {
  state = {
    tasks: [],
    filter: 'ALL',
  }

  componentDidMount() {
    this.getTask()
  }

  onRadioClick(filter) {
    this.setState({ filter })
  }

  getTask = async () => {
    const task = await this.props.taskService.all()
    this.setState({
      tasks: task.data.tasks,
    })
  }

  getFilteredTasks = () => (
    this.state.tasks.filter((task) => {
      if (this.state.filter === 'ALL') {
        return task
      }
      return this.state.filter === task.status
    })
  )

  render() {
    return (
      <Body color="282c34">
        <Container>
          <Row>
            <TaskTitle title="Todolist" fontSize="4" color="white" size="10" offset="1" />
          </Row>
          <Row>
            <CreateMode placeholder="Digite sua tarefa..." onCreate={this.getTask} />
          </Row>
          <Row>
            <Col md={{ size: 10, offset: 1 }}>
              <Filter marginTop="10">
                <ButtonGroup>
                  <Button color="info" onClick={() => this.onRadioClick('ALL')} active={this.state.filter === 'ALL'}>Todos</Button>
                  <Button color="info" onClick={() => this.onRadioClick('IN_PROGRESS')} active={this.state.filter === 'IN_PROGRESS'}>Em progresso</Button>
                  <Button color="info" onClick={() => this.onRadioClick('COMPLETED')} active={this.state.filter === 'COMPLETED'}>Finalizado</Button>
                </ButtonGroup>
              </Filter>
              <List marginTop="20">
                <ListGroup>
                  {
                  this.getFilteredTasks().map((task) => (
                    <ListGroupItem key={task.id}>
                      <EditMode
                        description={task.description}
                        id={task.id}
                        onUpdate={this.getTask}
                      />
                      <UpdateStatusMode
                        id={task.id}
                        onUpdate={this.getTask}
                        status={task.status}
                      />
                      <DeleteMode onDelete={this.getTask} id={task.id} />
                    </ListGroupItem>
                  ))
                  }
                </ListGroup>
              </List>
            </Col>
          </Row>
        </Container>
      </Body>
    )
  }
}

export default withTaskService(App)
