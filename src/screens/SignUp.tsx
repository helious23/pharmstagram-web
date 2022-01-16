import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import { Title, FatLink } from "../components/shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import Seperator from "../components/auth/Seperator";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import BottomBox from "../components/auth/BottomBox";
import routes from "../routes";
import StoreWrapper from "../components/auth/StoreWrapper";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  margin-top: 1.2rem;
`;

const FacebookLogin = styled(Link)`
  margin-top: 1.2rem;
  border-radius: 0.2rem;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 0.2rem 0px;
  font-weight: 600;
  width: 100%;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  padding: 0.5rem 0px;
  span {
    margin-left: 0.3rem;
  }
`;

const SignUpForm = styled.form`
  margin-bottom: 0.8rem;
`;

const SignUp = () => {
  return (
    <AuthLayout>
      <FormBox>
        <HeaderContainer>
          <Title>Pharmstagram</Title>
          <Subtitle>친구들의 사진과 동영상을 보려면 가입하세요.</Subtitle>
        </HeaderContainer>
        <FacebookLogin to={routes.home}>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Facebook으로 로그인</span>
        </FacebookLogin>
        <Seperator login={false} />
        <SignUpForm>
          <Input type="email" placeholder="이메일 주소" />
          <Input type="text" placeholder="성명" />
          <Input type="text" placeholder="사용자 이름" />
          <Input type="password" placeholder="비밀번호" />
          <Button type="submit" value={"가입 하기"} />
        </SignUpForm>
      </FormBox>
      <BottomBox
        cta="계정이 있으신가요?"
        linkText="로그인"
        link={routes.home}
      />
      <StoreWrapper />
    </AuthLayout>
  );
};

export default SignUp;
