import styled from "styled-components";
import { BaseBox } from "../shared";

const Container = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem 2.2rem 1.2rem 2.2rem;
  margin-bottom: 0.6rem;
  form {
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
  }
`;

const FormBox: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default FormBox;
