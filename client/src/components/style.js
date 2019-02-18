import React, { Component } from 'react'
import styled from 'styled-components'

const BodyApp = styled.body`
      background-color: #282c34;
      min-height: 100vh;
    `

export class Body extends Component {
  render() {
    return (
      <BodyApp>
        {this.props.children}
      </BodyApp>
    )
  }
}

const MarginTop10 = styled.div`
  margin-top: ${props => props.marginTop}px;
`

export const Filter = styled(MarginTop10)`
  text-align: center;
`
export const List = MarginTop10

export const Title = styled.h1`
  font-size: 4em;
  text-align: center;
  color: white;

  &:hover {
    color: rgba(200,200,200,1);
    transition: 0.5s;
  }
`
