import React, { Component } from 'react'
import { Button, Container, Row, Col, Input, ListGroup, ListGroupItem } from 'reactstrap'
import Switch from 'react-switch'
import TaskTitle from './components/TaskTitle'
import EditMode from './components/EditMode'
import './App.css'

const API = 'http://localhost:3001/api/v1/tasks/'

class App extends Component {
  constructor(propos) {
    super(propos)
    this.state = {
      tasks: [],
      description: '',
    }
  }

  componentDidMount() {
    this.getTask()
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (this.state.description) {
        this.createTask()
        this.resetFieldTask()
      }
    }
  }

  handleChange = (event) => {
    this.setState(
      {
        description: event.target.value,
      },
    )
  }

  handleChecked = (checked, event, id) => {
    if (checked) {
      this.updateStatus(id, 1)
    } else {
      this.updateStatus(id, 0)
    }
  }

  handleDelete = (event) => {
    const confirm = window.confirm('Deseja excluir a tarefa?')
    if (confirm) {
      this.deleteTask(event.target.value)
    }
  }

  createTask = () => {
    const { description } = this.state
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ description, status: 0 }),
    }).then(response => response.json())
      .then(
        data => this.setState(prevState => ({
          tasks: [
            data,
            ...prevState.tasks,
          ],
        })),
      )
  }

  getTask = (idTask = '') => {
    fetch(API + idTask)
      .then(response => response.json())
      .then(data => this.setState({
        tasks: data,
      }))
  }

  deleteTask = (idTask) => {
    fetch(API + idTask, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(
        data => {
          if (data.status === 204) {
            this.getTask()
          }
        },
      )
  }

  updateStatus = (idTask, status) => {
    fetch(API + idTask, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
      .then(
        data => {
          if (data.status === 200) {
            this.getTask()
          }
        },
      )
  }

  resetFieldTask() {
    this.setState({
      description: '',
    })
  }

  renderInput = () => (
    <Col md={{ size: 6, offset: 3 }}>
      <Input type="text" value={this.state.description} onKeyPress={this.handleKeyPress} onChange={this.handleChange} placeholder="Digite a tarefa e pressione enter" />
    </Col>
  )

  renderButton = (id) => (
    <Button color="danger" value={id} onClick={this.handleDelete} className="float-right">Excluir</Button>
  )

  renderSwitch = (status, id) => (
    <Switch
      onChange={this.handleChecked}
      checked={status === 'completed'}
      id={String(id)}
    />
  )

  renderTask = (description, id) => (
    <EditMode description={description} id={id} api={API} onUpdate={this.getTask} />
  )

  renderList = () => (
    <ListGroup>
      { this.state.tasks.map((task) => (
        <ListGroupItem key={task.id}>
          {this.renderTask(task.description, task.id)}
          {this.renderSwitch(task.status, task.id)}
          {this.renderButton(task.id)}
        </ListGroupItem>
      ))}
    </ListGroup>
  )

  render() {
    return (
      <Container className="body-bg">
        <Row>
          <TaskTitle title="Todolist" size="10" offset="1" class="text-center" color="white" />
        </Row>
        <Row>
          {this.renderInput()}
        </Row>
        <Row>
          <Col md={{ size: 6, offset: 3 }} className="spacing-10">
            {this.renderList()}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
