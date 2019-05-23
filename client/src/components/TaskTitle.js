import React, { Component } from 'react'
import { Col } from 'reactstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FaTasks } from 'react-icons/fa'

const Title = styled.h1`
  font-size: ${props => props.fontSize}em;
  text-align: center;
  color: ${props => props.color};
  &:hover {
    color: rgba(200,200,200,1);
    transition: 0.5s;
  }
`

Title.defaultProps = {
  fontSize: 3,
  color: 'white',
}

export default class TaskTitle extends Component {
  static defaultProps = {
    title: 'Todolist',
    fontSize: 3,
    color: 'white',
  }

  static propTypes = {
    title: PropTypes.string,
    fontSize: PropTypes.number,
    color: PropTypes.string,
    size: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
  }

  render() {
    return (
      <Col md={{ size: this.props.size, offset: this.props.offset }}>
        <Title
          fontSize={this.props.fontSize}
          color={this.props.color}
        >
          <FaTasks />
          {' '}
          {this.props.title}
        </Title>
      </Col>
    )
  }
}
