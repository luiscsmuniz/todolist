import React, { Component } from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem, Button, ButtonGroup } from 'reactstrap'
import TaskTitle from './components/TaskTitle'
import EditMode from './components/EditMode'
import CreateMode from './components/CreateMode'
import DeleteMode from './components/DeleteMode'
import UpdateStatusMode from './components/UpdateStatusMode'
import './App.css'

const API = 'http://localhost:3001/api/v1/tasks/'

class App extends Component {
  constructor(propos) {
    super(propos)
    this.state = {
      tasks: [],
      filter: 'all',
    }
  }

  componentDidMount() {
    this.getTask()
  }

  onRadioBtnClick(filter) {
    this.setState({ filter })
  }

  getTask = (idTask = '') => {
    fetch(API + idTask)
      .then(response => response.json())
      .then(data => this.setState({
        tasks: data,
      }))
  }

  list = () => (
    this.state.tasks.filter((task) => {
      if (this.state.filter === 'all') {
        return task
      }
      return this.state.filter === task.status
    }).map((task) => (
      <ListGroupItem key={task.id}>
        <EditMode
          description={task.description}
          id={task.id}
          api={API}
          onUpdate={this.getTask}
        />
        <UpdateStatusMode id={task.id} onUpdate={this.getTask} status={task.status} api={API} />
        <DeleteMode api={API} onDelete={this.getTask} id={task.id} />
      </ListGroupItem>
    ))
  )

  render() {
    return (
      <Container className="body-bg">
        <Row>
          <TaskTitle title="Todolist" size="10" offset="1" class="text-center" color="white" />
        </Row>
        <Row>
          <CreateMode placeholder="Digite sua tarefa..." onCreate={this.getTask} api={API} />
        </Row>
        <Row>
          <Col md={{ size: 6, offset: 3 }} className="spacing-10">
            <div className="text-center">
              <ButtonGroup className="align-center">
                <Button color="info" onClick={() => this.onRadioBtnClick('all')} active={this.state.filter === 'all'}>Todos</Button>
                <Button color="info" onClick={() => this.onRadioBtnClick('in_progress')} active={this.state.filter === 'in_progress'}>Em progresso</Button>
                <Button color="info" onClick={() => this.onRadioBtnClick('completed')} active={this.state.filter === 'completed'}>Finalizado</Button>
              </ButtonGroup>
            </div>
            <ListGroup className="spacing-10">
              {this.list()}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
