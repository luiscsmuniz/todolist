import React, { Component } from 'react'
import { Container, Row, Col, Input, ListGroup, ListGroupItem } from 'reactstrap'
import shortid from 'shortid'
import './App.css'

class App extends Component {
  constructor(propos) {
    super(propos)
    this.state = {
      newTask: '',
      id: 1,
      tasks: [],
    }
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (this.state.newTask) {
        this.save()
      }
    }
  }

  handleChange = (event) => {
    this.setState(
      {
        newTask: event.target.value,
        id: shortid.generate(),
      },
    )
  }

  resetFieldTask() {
    this.setState({
      newTask: '',
    })
  }

  save() {
    const { id, newTask } = this.state

    this.setState(prevState => ({
      tasks: [
        { id, newTask },
        ...prevState.tasks,
      ],
    }))

    this.resetFieldTask()
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
            <Input type="text" value={this.state.newTask} onKeyPress={this.handleKeyPress} onChange={this.handleChange} placeholder="Digite a tarefa e pressione enter" />
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 6, offset: 3 }} className="spacing-10">
            <ListGroup>
              { this.state.tasks.map((task) => <ListGroupItem className="ListGroupItens" key={task.id}>{ task.newTask }</ListGroupItem>)}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
