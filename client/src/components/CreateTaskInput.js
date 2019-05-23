import React, { PureComponent } from 'react'
import { Input, Col } from 'reactstrap'
import PropTypes from 'prop-types'
import withTaskService from '../hoc/withTaskService'

class CreateTaskInput extends PureComponent {
  static defaultProps = {
    placeholder: 'Digite a tarefa',
  }

  static propTypes = {
    placeholder: PropTypes.string,
    onCreate: PropTypes.func.isRequired,
  }

  state = {
    description: '',
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter' && this.state.description) {
      this.createTask({ description: this.state.description })
      this.resetFieldTask()
    }
  }

  handleChange = (event) => {
    this.setState({
      description: event.target.value,
    })
  }

  createTask = async (input) => {
    const task = await this.props.taskService.create({ input })

    this.props.onCreate(task)

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

export default withTaskService(CreateTaskInput)
