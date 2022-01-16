import styled from "styled-components";
import Footer from "../../screens/Footer";

const Container = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-width: 45vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const AuthLayout: React.FC = ({ children }) => {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
      <Footer />
    </Container>
  );
};

export default AuthLayout;
