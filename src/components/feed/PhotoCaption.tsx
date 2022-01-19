import { FatText } from "../shared";
import React from "react";
import { Link } from "react-router-dom";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import styled from "styled-components";

type IPhotoCaptionProps = Pick<seeFeed_seeFeed, "user" | "caption">;

const PhotoCaptionContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
`;

const CaptionContainer = styled.div`
  margin-left: 0.5rem;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
  }
`;

const PhotoCaption: React.FC<IPhotoCaptionProps> = ({ user, caption }) => {
  return (
    <PhotoCaptionContainer>
      <FatText>{user?.username}</FatText>
      <CaptionContainer>
        {caption &&
          caption.split(" ").map((word, index) =>
            /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/.test(word) ? (
              <React.Fragment key={index}>
                <Link to={`/hashtag/${word}`}>{word}</Link>{" "}
              </React.Fragment>
            ) : (
              <React.Fragment key={index}>{word} </React.Fragment>
            )
          )}
      </CaptionContainer>
    </PhotoCaptionContainer>
  );
};

export default PhotoCaption;
