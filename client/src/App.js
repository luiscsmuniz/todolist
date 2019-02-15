import React, { Component } from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem, Button, ButtonGroup } from 'reactstrap'
import TaskTitle from './components/TaskTitle'
import EditMode from './components/EditMode'
import CreateMode from './components/CreateMode'
import DeleteMode from './components/DeleteMode'
import UpdateStatusMode from './components/UpdateStatusMode'
import './App.css'
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
      <Container className="body-bg">
        <Row>
          <TaskTitle title="Todolist" size="10" offset="1" className="text-center" color="white" />
        </Row>
        <Row>
          <CreateMode placeholder="Digite sua tarefa..." onCreate={this.getTask} />
        </Row>
        <Row>
          <Col md={{ size: 10, offset: 1 }} className="spacing-10">
            <div className="text-center">
              <ButtonGroup className="align-center">
                <Button color="info" onClick={() => this.onRadioClick('ALL')} active={this.state.filter === 'ALL'}>Todos</Button>
                <Button color="info" onClick={() => this.onRadioClick('IN_PROGRESS')} active={this.state.filter === 'IN_PROGRESS'}>Em progresso</Button>
                <Button color="info" onClick={() => this.onRadioClick('COMPLETED')} active={this.state.filter === 'COMPLETED'}>Finalizado</Button>
              </ButtonGroup>
            </div>
            <ListGroup className="spacing-10">
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
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withTaskService(App)
