import React, { Component } from 'react'
import { Input, Col } from 'reactstrap'

export default class CreateMode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
    }
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

  createTask = () => {
    const { description } = this.state
    fetch(this.props.api, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ description, status: 0 }),
    }).then(response => response.json())
      .then(
        data => {
          if (data) {
            this.props.onCreate()
          }
        },
      )
  }

  resetFieldTask() {
    this.setState({
      description: '',
    })
  }

  render() {
    return (
      <Col md={{ size: 6, offset: 3 }}>
        <Input type="text" value={this.state.description} onKeyPress={this.handleKeyPress} onChange={this.handleChange} placeholder={this.props.placeholder} />
      </Col>
    )
  }
}

CreateMode.defaultProps = {
  placeholder: 'Digite a tarefa',
  onCreate: '',
  api: '',
}
