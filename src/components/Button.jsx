import styled from 'styled-components'

const Button = styled.button`
  height: 46px; line-height: 46px;
  border-radius: 23px;
  font-size: .9375rem;
  width: 100%; text-align: center; border: 0;
  cursor: pointer;
  user-select: none;
  &:active {
    transform: translate(1px, 1px);
  }
  .icon { margin-right: .35em; }
  ${props => props.primary && ` background-color: #4a66fa; color: white; `}
  ${props => props.add && ` background-color: #E9FBF5; color: #26d79f; `}
  ${props => props.invalid && ` background-color: #f5f5f5; color: #000000; `}
`

export default Button
