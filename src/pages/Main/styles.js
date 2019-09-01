import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #12b886;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #0d805d;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      button {
        background: #ff1919;
        border: 0;
        padding: 4px;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;

        &:hover {
          background: #cc1414;
        }
      }
    }
    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #12b886;
      font-weight: bold;
      text-decoration: none;

      &:hover {
        color: #0d805d;
      }
    }
  }
`;

export const Error = styled.h1`
  font-size: 18px !important;
  margin-top: 20px;
  color: #cc1414;
`;
