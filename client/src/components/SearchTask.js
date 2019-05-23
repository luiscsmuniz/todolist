import React, { Component } from 'react'
import { Input, InputGroup, InputGroupAddon, Button } from 'reactstrap'
import { FaSearch } from 'react-icons/fa'
import styled from 'styled-components'

const Search = styled.div`
  margin-top: ${props => props.marginTop}px;
`
Search.defaultProps = {
  marginTop: 10,
}

class SearchTasks extends Component {
  render() {
    return (
      <Search>
        <InputGroup>
          <Input placeholder="Pesquisar" />
          <InputGroupAddon addonType="prepend">
            <Button color="info">
              <FaSearch />
              {' '}
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Search>
    )
  }
}

export default SearchTasks
