import React, { Component } from 'react'
import { Button, Container, Row, Col, Input, ListGroup, ListGroupItem } from 'reactstrap'
import Switch from 'react-switch'
import './App.css'

const API = 'http://localhost:3001/api/v1/tasks/'

class App extends Component {
  constructor(propos) {
    super(propos)
    this.state = {
      editMode: false,
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

  handleKeyDownTask = (event) => {
    if (event.key === 'Enter') {
      this.updateTask(event.target.id, event.target.value)
    } else if (event.key === 'Escape') {
      this.setState({
        editMode: false,
      })
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

  handleEditMode = () => {
    this.setState({
      editMode: true,
    })
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

  updateTask = (idTask, description) => {
    fetch(API + idTask, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    })
      .then(
        data => {
          if (data.status === 200) {
            this.setState({
              editMode: false,
            })
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

  renderTitle = () => (
    <Col md={{ size: 6, offset: 3 }}>
      <h1 className="text-center" style={{ color: 'white' }}>Todolist</h1>
    </Col>
  )

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

  renderTask = (description, id) => {
    if (this.state.editMode) {
      return <Input type="text" id={id} onKeyDown={this.handleKeyDownTask} defaultValue={description} />
    }
    return <div onDoubleClick={this.handleEditMode} id={String(id)}>{ description }</div>
  }

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
          {this.renderTitle()}
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
