import styled from "styled-components";

const SSeperator = styled.div<{ login: Boolean }>`
  margin: ${(props) => (props.login ? "2rem" : "1rem")} 0px;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 1rem;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.borderColor};
  }
  span {
    margin: 0px 1rem;
    width: 5rem;
    text-align: center;
    font-weight: 500;
    font-size: 0.85rem;
    color: #8e8e8e;
  }
`;

interface ISeperatorProps {
  login: boolean;
}
const Seperator: React.FC<ISeperatorProps> = ({ login }) => {
  return (
    <SSeperator login={login}>
      <div></div>
      <span>또는</span>
      <div></div>
    </SSeperator>
  );
};

export default Seperator;
