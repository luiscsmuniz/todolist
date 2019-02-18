import React, { Component } from 'react'
import styled from 'styled-components'

const BodyApp = styled.body`
      background-color: #${props => props.color};
      min-height: 100vh;
    `
export class Body extends Component {
  render() {
    return (
      <BodyApp color={this.props.color}>
        {this.props.children}
      </BodyApp>
    )
  }
}

const FilterApp = styled.div`
    text-align: center;
    margin-top: ${props => props.marginTop}px;
  `

export class Filter extends Component {
  render() {
    return (
      <FilterApp marginTop="10">{this.props.children}</FilterApp>
    )
  }
}
Filter.defaultProps = {
  marginTop: 10,
}

const ListApp = styled.div`
  margin-top: ${props => props.marginTop || 10}px;
`
export class List extends Component {
  render() {
    return (
      <ListApp marginTop={this.props.marginTop}>{this.props.children}</ListApp>
    )
  }
}

List.defaultProps = {
  marginTop: 10,
}

const TitleApp = styled.h1`
  font-size: ${props => props.fontSize || 3}em;
  text-align: center;
  color: ${props => props.color};

  &:hover {
    color: rgba(200,200,200,1);
    transition: 0.5s;
  }
`
export class Title extends Component {
  render() {
    return (
      <TitleApp
        fontSize={this.props.fontSize}
        color={this.props.color}
      >
        {this.props.children}
      </TitleApp>
    )
  }
}

Title.defaultProps = {
  fontSize: 3,
  color: 'white',
}
