import React from "react";
import styled from "styled-components";
import sanitizeHtml from "sanitize-html";
import { FatText } from "../shared";
import { seeFeed_seeFeed_comments } from "../../__generated__/seeFeed";
import { Link } from "react-router-dom";

const CommentContainer = styled.div`
  margin-top: 0.5rem;
`;

const CommentCaption = styled.span`
  margin-left: 0.5rem;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
  }
`;

type CommentProps = Pick<seeFeed_seeFeed_comments, "user" | "payload">;

interface ICommentProps extends CommentProps {
  photoId?: number;
}

const Comment: React.FC<ICommentProps> = ({ user, payload }) => {
  return (
    <CommentContainer>
      <FatText>{user?.username}</FatText>
      <CommentCaption>
        {payload.split(" ").map((word, index) =>
          /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/.test(word) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtag/${word}`}>{word}</Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
    </CommentContainer>
  );
};

export default Comment;
