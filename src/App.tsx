import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { gql, useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { darkModeVar } from "./apollo";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import { login, loginVariables } from "./__generated__/login";
import { seeFeed } from "./__generated__/seeFeed";

interface IContainerProps {
  shadow: Boolean;
}

const Container = styled.div<IContainerProps>`
  color: ${(props) => props.theme.fontColor};
  display: ${(props) => (props.shadow ? "display" : "hidden")};
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      comments
      createdAt
      isMine
      isLike
    }
  }
`;

function App() {
  const darkMode = useReactiveVar(darkModeVar);
  const { data } = useQuery<seeFeed>(FEED_QUERY);
  console.log(data?.seeFeed?.map((photo) => photo?.user.avatar));

  const [loginMutation] = useMutation<login, loginVariables>(LOGIN_MUTATION, {
    variables: {
      username: "true",
      password: "123",
    },
  });
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Container shadow={true}>App</Container>
    </ThemeProvider>
  );
}

export default App;
