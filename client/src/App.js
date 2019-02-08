import React, { Component } from 'react'
import { Button, Container, Row, Col, Input, ListGroup, ListGroupItem } from 'reactstrap'
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
      .then(data => this.setState(prevState => ({
        tasks: [
          data,
          ...prevState.tasks,
        ],
      })))
  }

  getTask = (idTask = '') => {
    fetch(API + idTask)
      .then(response => response.json())
      .then(data => this.setState({
        tasks: data,
      }))
  }

  deleteTask = (idTask) => {
    // let deleteTask
    fetch(API + idTask, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(
        // Terminar o delete
      )
  }

  resetFieldTask() {
    this.setState({
      description: '',
    })
  }

  render() {
    return (
      <Container className="body-bg">
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <h1 className="text-center" style={{ color: 'white' }}>Todolist</h1>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <Input type="text" value={this.state.description} onKeyPress={this.handleKeyPress} onChange={this.handleChange} placeholder="Digite a tarefa e pressione enter" />
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 6, offset: 3 }} className="spacing-10">
            <ListGroup>
              { this.state.tasks.map((task) => (
                <ListGroupItem className="ListGroupItens" key={task.id}>
                  { task.description }
                  <Button color="danger" value={task.id} onClick={this.handleDelete} className="float-right">x</Button>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
