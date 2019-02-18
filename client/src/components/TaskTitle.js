import React, { Component } from 'react'
import { Col } from 'reactstrap'

export default class TaskTitle extends Component {
  render() {
    return (
      <Col md={{ size: this.props.size, offset: this.props.offset }}>
        <h1 className={this.props.className} style={{ color: this.props.color }}>
          {this.props.title}
        </h1>
      </Col>
    )
  }
}

TaskTitle.defaultProps = {
  className: '',
  size: '',
  offset: '',
  title: 'Todolist',
  color: 'white',
}
