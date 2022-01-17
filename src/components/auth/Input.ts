import styled from "styled-components";

interface IInputProps {
  hasError: Boolean;
  change?: Boolean;
}

const Input = styled.input.attrs({ require: true })<IInputProps>`
  width: 100%;
  border-radius: 3px;
  padding: ${(props) => (props.change ? "1rem 0 0.2rem 0.5rem" : "0.5rem")};
  background-color: ${(props) => props.theme.formBgColor};
  font-size: ${(props) => (props.change ? "0.8rem" : "1rem")};
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 0.6rem;
    color: ${(props) => props.theme.placeholderFontColor};
  }
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

export default Input;
