import { Link } from "react-router-dom";
import styled from "styled-components";
import Input from "../components/auth/Input";
import { Title } from "../components/shared";
import routes from "../routes";
import FormBox from "../components/auth/FormBox";
import Button from "../components/auth/Button";
import Seperator from "../components/auth/Seperator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import BottomBox from "../components/auth/BottomBox";
import StoreWrapper from "../components/auth/StoreWrapper";
import AuthLayout from "../components/auth/AuthLayout";

const FacebookLogin = styled.div`
  color: ${(props) => props.theme.facebookColor};
  font-size: 0.9rem;
  cursor: pointer;
  span {
    margin-left: 0.7rem;
    font-weight: 600;
  }
`;

const LoginForm = styled.form`
  margin-top: 2rem;
`;

const Password = styled(Link)`
  margin-top: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${(props) => props.theme.facebookColor};
`;

const Login = () => {
  return (
    <AuthLayout>
      <FormBox>
        <Title>Pharmstagram</Title>
        <LoginForm>
          <Input type="text" placeholder="사용자 이름" />
          <Input type="password" placeholder="비밀번호" />
          <Button type="submit" value={"로그인"} disabled={false} />
        </LoginForm>
        <Seperator login={true} />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
          <span>Facebook으로 로그인</span>
        </FacebookLogin>
        <Password to={routes.passwordForget}>비밀번호를 잊으셨나요?</Password>
      </FormBox>
      <BottomBox
        cta="계정이 없으신가요?"
        link={routes.signUp}
        linkText="가입하기"
      />
      <StoreWrapper />
    </AuthLayout>
  );
};

export default Login;
