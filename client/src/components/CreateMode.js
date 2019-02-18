import React, { Component } from 'react'
import { Input, Col } from 'reactstrap'
import withTaskService from '../hoc/withTaskService'

class CreateMode extends Component {
  state = {
    description: '',
  }

  static defaultProps = {
    placeholder: 'Digite a tarefa',
    onCreate: () => {},
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter' && this.state.description) {
      this.createTask({ description: this.state.description })
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

  createTask = async (input) => {
    const task = await this.props.taskService.create({ input })
    this.props.onCreate()
    return task
  }

  resetFieldTask() {
    this.setState({
      description: '',
    })
  }

  render() {
    return (
      <Col md={{ size: 10, offset: 1 }}>
        <Input
          type="text"
          value={this.state.description}
          onKeyPress={this.handleKeyPress}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
        />
      </Col>
    )
  }
}

export default withTaskService(CreateMode)
