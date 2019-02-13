import React, { Component } from 'react'
import { Input, Col } from 'reactstrap'

export default class CreateMode extends Component {
  state = {
    description: '',
  }

  static defaultProps = {
    placeholder: 'Digite a tarefa',
    onCreate: () => {},
    api: '',
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter' && this.state.description) {
      this.createTask()
      this.resetFieldTask()
    }
  }

  handleChange = (event) => {
    this.setState(
      {
        description: event.target.value,
      },
    )
  }

  createTask = async () => {
    const { description } = this.state
    const response = await fetch(this.props.api, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ description }),
    })
    const json = await response.json()
    this.props.onCreate()
    return json
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