import styled from "styled-components";

const Container = styled.footer`
  width: 100%;
  margin-top: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 0.8rem;
  color: #8e8e8e;
  margin-bottom: 4rem;
  &:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &:last-child {
  }
`;

const FooterContents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
  div {
    margin: 0 0.5rem;
  }
`;

const FooterEndContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  div {
    margin: 0 0.5rem;
  }
`;

const Footer = () => {
  return (
    <Container>
      <FooterContents>
        <div>Meta</div>
        <div>소개</div>
        <div>블로그</div>
        <div>채용 정보</div>
        <div>도움말</div>
        <div>API</div>
        <div>개인정보처리방침</div>
        <div>약관</div>
        <div>인기 계정</div>
        <div>해시태그</div>
        <div>위치</div>
        <div>Instagram Lite</div>
      </FooterContents>
      <FooterEndContainer>
        <div>한국어</div>
        <div>&copy; {new Date().getFullYear()} Pharmstagram from Max</div>
      </FooterEndContainer>
    </Container>
  );
};

export default Footer;
