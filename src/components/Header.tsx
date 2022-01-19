import { useReactiveVar } from "@apollo/client";
import {
  faCompass,
  faHome,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar, logUserOut } from "../apollo";
import routes from "../routes";
import { Subtitle } from "./shared";
import { useUser } from "../hooks/useUser";
import Avatar from "./Avatar";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 1rem 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 60vw;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
  margin-left: 1rem;
  cursor: pointer;
`;

const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 0.4rem 1rem;
  color: white;
  font-weight: 600;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  svg {
    font-size: 1.2rem;
  }
`;

const Header = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <Subtitle>Pharmstagram</Subtitle>
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconsContainer>
              <Icon>
                <Link to={routes.home}>
                  <FontAwesomeIcon icon={faHome} />
                </Link>
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faCompass} />
              </Icon>
              <Icon>
                <Link to={`/users/${data?.me?.username}`}>
                  <Avatar url={data?.me?.avatar} />
                </Link>
              </Icon>
              <Icon onClick={() => logUserOut()}>
                <FontAwesomeIcon icon={faSignOutAlt} />
              </Icon>
            </IconsContainer>
          ) : (
            <Link to={routes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
};

export default Header;
