import styled from "styled-components";
import spinner from "../../static/loading.svg";

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Svg = styled.img`
  width: 1.2rem;
`;

const Loading = () => {
  return (
    <Loader>
      <Svg src={spinner}></Svg>
    </Loader>
  );
};

export default Loading;
