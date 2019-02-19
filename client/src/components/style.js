import styled from 'styled-components/macro'

export const Body = styled.div`
  background-color: ${props => props.color};
  min-height: 100vh;
`

Body.defaultProps = {
  color: '#282c34',
}

export const Filter = styled.div`
  text-align: center;
  margin-top: ${props => props.marginTop}px;
`

Filter.defaultProps = {
  marginTop: 10,
}

export const List = styled.div`
  margin-top: ${props => props.marginTop}px;
`

List.defaultProps = {
  marginTop: 10,
}

export const Title = styled.h1`
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
