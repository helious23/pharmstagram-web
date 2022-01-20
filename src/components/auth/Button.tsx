import styled from "styled-components";
import Loading from "./Loading";

export const SButton = styled.button<{ valid?: Boolean }>`
  border: none;
  margin-top: 12px;
  border-radius: 3px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  opacity: ${(props) => (props.valid ? "0.3" : "1")};
`;

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => {
  return (
    <SButton disabled={loading ? true : false} valid={Boolean(canClick)}>
      {loading ? <Loading /> : actionText}
    </SButton>
  );
};
