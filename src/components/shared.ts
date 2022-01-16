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
