import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const SAvatar = styled.div<{ large: Boolean }>`
  width: ${(props) => (props.large ? "2rem" : "1.5rem")};
  height: ${(props) => (props.large ? "2rem" : "1.5rem")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.bgColor};
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const Img = styled.img`
  max-width: 100%;
`;

interface IAvatarProps {
  url: string | undefined | null;
  large?: Boolean;
}

const Avatar: React.FC<IAvatarProps> = ({ url = "", large = false }) => {
  return (
    <SAvatar large={large}>
      {url ? (
        <Img src={url} alt={"avatar"} />
      ) : (
        <FontAwesomeIcon icon={faUser} />
      )}
    </SAvatar>
  );
};

export default Avatar;
