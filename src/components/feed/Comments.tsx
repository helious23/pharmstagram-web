import styled from "styled-components";
import { FatText } from "../shared";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import Comment from "./Comment";

const CommentsContainer = styled.div`
  margin-top: 1rem;
`;

const CommentCount = styled.div`
  opacity: 0.7;
  font-size: 0.9rem;
  margin: 0.5rem 0;
  font-weight: 400;
`;

type CommentsProps = Pick<
  seeFeed_seeFeed,
  "user" | "caption" | "commentNumber" | "comments"
>;

interface ICommentsProps extends CommentsProps {
  photoId: number;
}

const Comments: React.FC<ICommentsProps> = ({
  user,
  caption,
  commentNumber,
  comments,
  photoId,
}) => {
  return (
    <CommentsContainer>
      {caption && <Comment user={user} payload={caption} />}
      {commentNumber > 1 ? (
        <CommentCount>댓글 {commentNumber} 개 모두보기</CommentCount>
      ) : (
        ""
      )}
      {comments?.map(
        (comment) =>
          comment && (
            <Comment
              key={comment.id}
              photoId={photoId}
              user={comment.user}
              payload={comment.payload}
            />
          )
      )}
    </CommentsContainer>
  );
};

export default Comments;
