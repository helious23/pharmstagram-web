import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.boxBgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`;

export const FatLink = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: rgb(142, 142, 142);
`;

export const Title = styled.div`
  font-family: "Playball", cursive, sans-serif;
  font-size: 40px;
`;

export const Subtitle = styled.div`
  font-family: "Playball", cursive, sans-serif;
  font-size: 30px;
`;

export const FatText = styled.span`
  font-weight: 600;
`;

export const AuthLabel = styled.label`
  width: 100%;
  position: relative;
`;

export const AuthPlaceholder = styled.span<{ change: Boolean }>`
  position: absolute;
  top: ${(props) => (props.change ? "0.8rem" : "1.2rem")};
  left: 0.6rem;
  transition: all 0.1s ease-in-out;
  font-size: ${(props) => (props.change ? "0.6rem" : "0.8rem")};
  color: ${(props) => props.theme.placeholderFontColor};
`;

export const ErrorOutput = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
