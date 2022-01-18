import styled from "styled-components";
import sanitizeHtml from "sanitize-html";
import { FatText } from "../shared";
import { seeFeed_seeFeed_comments } from "../../__generated__/seeFeed";

const CommentContainer = styled.div`
  margin-top: 0.5rem;
`;

const CommentCaption = styled.span`
  margin-left: 0.5rem;
  mark {
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
  const cleanedPayload = sanitizeHtml(
    payload.replace(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|w]+/g, "<mark>$&</mark>"),
    {
      allowedTags: ["mark"],
    }
  );

  return (
    <CommentContainer>
      <FatText>{user?.username}</FatText>
      <CommentCaption
        dangerouslySetInnerHTML={{
          __html: cleanedPayload,
        }}
      />
    </CommentContainer>
  );
};

export default Comment;
