import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import {
  Title,
  FatLink,
  AuthLabel,
  AuthPlaceholder,
  ErrorOutput,
} from "../components/shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { Link, useHistory } from "react-router-dom";
import Seperator from "../components/auth/Seperator";
import Input from "../components/auth/Input";
import { Button } from "../components/auth/Button";
import BottomBox from "../components/auth/BottomBox";
import routes from "../routes";
import StoreWrapper from "../components/auth/StoreWrapper";
import PageTitle from "../components/PageTitle";
import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import {
  createAccount,
  createAccountVariables,
} from "../__generated__/createAccount";

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

const SIGN_UP_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

interface ISignUpProps {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  result?: string;
}

interface IHistoryProps {
  message?: string;
  username?: string;
  password?: string;
}

const SignUp = () => {
  const history = useHistory<IHistoryProps>();
  const {
    register,
    handleSubmit,
    formState,
    setError,
    getValues,
    clearErrors,
    watch,
  } = useForm<ISignUpProps>({
    mode: "all",
  });

  const onCompleted = (data: createAccount) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (error) {
      return setError("result", {
        message: error,
      });
    }
    if (ok) {
      history.push(routes.home, {
        message: "?????? ????????? ?????????????????????. ????????? ?????????.",
        username,
        password,
      });
    }
  };

  const [createAccount, { loading }] = useMutation<
    createAccount,
    createAccountVariables
  >(SIGN_UP_MUTATION, {
    onCompleted,
  });

  const onSignUpValid: SubmitHandler<ISignUpProps> = ({
    firstName,
    lastName,
    username,
    password,
    email,
  }) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        firstName,
        lastName,
        username,
        password,
        email,
      },
    });
  };

  const clearCreateError = () => {
    if (formState.errors.result) {
      clearErrors("result");
    }
  };

  return (
    <AuthLayout>
      <PageTitle title="????????????" />
      <FormBox>
        <HeaderContainer>
          <Title>Pharmstagram</Title>
          <Subtitle>???????????? ????????? ???????????? ????????? ???????????????.</Subtitle>
        </HeaderContainer>
        <FacebookLogin to={routes.home}>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Facebook?????? ?????????</span>
        </FacebookLogin>
        <Seperator login={false} />
        <SignUpForm onSubmit={handleSubmit(onSignUpValid)}>
          <AuthLabel>
            <AuthPlaceholder change={Boolean(watch("email"))}>
              ????????? ??????
            </AuthPlaceholder>
            <Input
              type="email"
              {...register("email", {
                required: true,
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "????????? ????????? ????????? ????????????.",
                },
              })}
              hasError={Boolean(formState?.errors?.email)}
              onKeyDown={clearCreateError}
              change={Boolean(watch("email"))}
            />
          </AuthLabel>
          <AuthLabel>
            <AuthPlaceholder change={Boolean(watch("firstName"))}>
              ??????
            </AuthPlaceholder>
            <Input
              type="text"
              {...register("firstName", {
                required: true,
              })}
              hasError={Boolean(formState?.errors?.firstName)}
              onKeyDown={clearCreateError}
              change={Boolean(watch("firstName"))}
            />
          </AuthLabel>
          <AuthLabel>
            <AuthPlaceholder change={Boolean(watch("username"))}>
              ????????? ??????
            </AuthPlaceholder>
            <Input
              type="text"
              {...register("username", {
                required: true,
              })}
              hasError={Boolean(formState?.errors?.username)}
              onKeyDown={clearCreateError}
              change={Boolean(watch("username"))}
            />
          </AuthLabel>
          <AuthLabel>
            <AuthPlaceholder change={Boolean(watch("password"))}>
              ????????????
            </AuthPlaceholder>
            <Input
              type="password"
              {...register("password", {
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[0-9])(?=.*[`~!@#$%^&*,.<>/?(){};:'"|_+=-])(?=.{6})/,
                  message: `??????????????? ?????????, ??????, ???????????? ?????? 6??? ???????????????.`,
                },
              })}
              hasError={Boolean(formState?.errors?.password)}
              onKeyDown={clearCreateError}
              change={Boolean(watch("password"))}
            />
          </AuthLabel>
          <Button
            canClick={!formState.isValid}
            loading={loading}
            actionText={"?????? ??????"}
          />
          <ErrorOutput>
            <FormError message={formState?.errors?.email?.message} />
            <FormError message={formState?.errors?.password?.message} />
            <FormError message={formState?.errors?.result?.message} />
          </ErrorOutput>
        </SignUpForm>
      </FormBox>
      <BottomBox
        cta="????????? ????????????????"
        linkText="?????????"
        link={routes.home}
      />
      <StoreWrapper />
    </AuthLayout>
  );
};

export default SignUp;
