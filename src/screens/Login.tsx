import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Input from "../components/auth/Input";
import {
  Title,
  AuthLabel,
  AuthPlaceholder,
  ErrorOutput,
} from "../components/shared";
import routes from "../routes";
import FormBox from "../components/auth/FormBox";
import { Button } from "../components/auth/Button";
import Seperator from "../components/auth/Seperator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import BottomBox from "../components/auth/BottomBox";
import StoreWrapper from "../components/auth/StoreWrapper";
import AuthLayout from "../components/auth/AuthLayout";
import PageTitle from "../components/PageTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { login, loginVariables } from "../__generated__/login";
import { logUserIn } from "../apollo";
import Notification from "../components/auth/Notification";

const FacebookLogin = styled.div`
  color: ${(props) => props.theme.facebookColor};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
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

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

interface ILoginFormProps {
  username: string;
  password: string;
  result?: string;
}

interface IuseLocationProps extends ILoginFormProps {
  message?: string;
}

const Login = () => {
  const location = useLocation<IuseLocationProps>();
  const { register, handleSubmit, formState, setError, clearErrors, watch } =
    useForm<ILoginFormProps>({
      mode: "onChange",
      defaultValues: {
        username: location?.state?.username || "",
        password: location?.state?.password || "",
      },
    });

  const onCompleted = (data: login) => {
    const {
      login: { error, token },
    } = data;
    if (error) {
      return setError("result", {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);
    }
  };

  const [login, { loading }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION,
    {
      onCompleted: onCompleted,
    }
  );

  const onValid: SubmitHandler<ILoginFormProps> = ({ username, password }) => {
    if (loading) {
      return;
    }
    login({
      variables: {
        username,
        password,
      },
    });
  };

  const clearLoginError = () => {
    if (formState.errors.result) {
      clearErrors("result");
    }
  };

  return (
    <AuthLayout>
      <PageTitle title="로그인" />
      <FormBox>
        <Title>Pharmstagram</Title>
        <Notification message={location?.state?.message} />
        <LoginForm onSubmit={handleSubmit(onValid)}>
          <AuthLabel>
            <AuthPlaceholder change={Boolean(watch("username"))}>
              사용자 이름
            </AuthPlaceholder>
            <Input
              type="text"
              {...register("username", {
                required: true,
              })}
              hasError={Boolean(formState.errors.username)}
              change={Boolean(watch("username"))}
              onKeyDown={clearLoginError}
            />
          </AuthLabel>
          <AuthLabel>
            <AuthPlaceholder change={Boolean(watch("password"))}>
              비밀번호
            </AuthPlaceholder>

            <Input
              type="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 4,
                  message: "비밀번호는 4글자 이상 입니다.",
                },
              })}
              hasError={Boolean(formState.errors.password)}
              change={Boolean(watch("password"))}
              onKeyDown={clearLoginError}
            />
          </AuthLabel>
          <Button
            canClick={!formState.isValid}
            loading={loading}
            actionText={"로그인"}
          />
        </LoginForm>
        <Seperator login={true} />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
          <span>Facebook으로 로그인</span>
        </FacebookLogin>
        <ErrorOutput>
          <FormError message={formState?.errors?.result?.message} />
        </ErrorOutput>
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
