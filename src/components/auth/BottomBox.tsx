import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../shared";

const SBottomBox = styled(BaseBox)`
  padding: 1.4rem 0px;
  text-align: center;
  a {
    margin-left: 0.5rem;
    color: ${(props) => props.theme.accent};
  }
`;

interface IBottomBoxProps {
  cta: string;
  link: string;
  linkText: string;
}

const BottomBox: React.FC<IBottomBoxProps> = ({ cta, link, linkText }) => {
  return (
    <SBottomBox>
      <span>{cta}</span>
      <Link to={link}>{linkText}</Link>
    </SBottomBox>
  );
};

export default BottomBox;
