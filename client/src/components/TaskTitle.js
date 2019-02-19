import React, { Component } from 'react'
import { Col } from 'reactstrap'
import { Title } from './style'

export default class TaskTitle extends Component {
  render() {
    return (
      <Col md={{ size: this.props.size, offset: this.props.offset }}>
        <Title fontSize={this.props.fontSize} color={this.props.color}>{this.props.title}</Title>
      </Col>
    )
  }
}

TaskTitle.defaultProps = {
  title: 'Todolist',
  fontSize: 3,
  color: 'white',
}
