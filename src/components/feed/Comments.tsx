import styled from "styled-components";
import { FatText } from "../shared";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import Comment from "./Comment";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
} from "@apollo/client";
import {
  createComment,
  createCommentVariables,
} from "../../__generated__/createComment";

const CREATE_COMMENT = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
    }
  }
`;

const CommentsContainer = styled.div`
  margin-top: 1rem;
`;

const CommentCount = styled.div`
  opacity: 0.7;
  font-size: 0.9rem;
  margin: 0.5rem 0;
  font-weight: 400;
`;

const CommentContents = styled.div`
  margin: 0 1rem;
`;

const CommentInputContainer = styled.div`
  margin-top: 1rem;

  border-top: 1px solid ${(props) => props.theme.borderColor};
  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 1rem;
  &::placeholder {
    font-size: 0.9rem;
  }
`;

const CommentButton = styled.button<{ valid: Boolean }>`
  width: 4rem;
  border: none;
  background-color: inherit;
  font-size: 0.9rem;
  color: ${(props) => props.theme.accent};
  opacity: ${(props) => (props.valid ? "0.3" : "1")};
  cursor: ${(props) => (props.valid ? "" : "pointer")};
`;

type CommentsProps = Pick<
  seeFeed_seeFeed,
  "user" | "caption" | "commentNumber" | "comments"
>;

interface ICommentsProps extends CommentsProps {
  photoId: number;
}

interface ICommentFormProps {
  payload: string;
}

const Comments: React.FC<ICommentsProps> = ({
  user,
  caption,
  commentNumber,
  comments,
  photoId,
}) => {
  const { register, handleSubmit, watch, setValue } =
    useForm<ICommentFormProps>();
  const [createCommentMutation] = useMutation<
    createComment,
    createCommentVariables
  >(CREATE_COMMENT);
  const createCommentUpdate: MutationUpdaterFunction<
    createComment,
    createCommentVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, result) => {};
  const onValid: SubmitHandler<ICommentFormProps> = ({ payload }) => {
    createCommentMutation({
      variables: {
        photoId,
        payload,
      },
      update: createCommentUpdate,
    });
    setValue("payload", "");
  };

  return (
    <CommentsContainer>
      <CommentContents>
        {caption && <Comment user={user} payload={caption} />}
        {commentNumber > 0 ? (
          <CommentCount>
            <span>댓글 {commentNumber} 개 </span>
            {commentNumber > 1 ? <span>모두보기</span> : ""}
          </CommentCount>
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
      </CommentContents>
      <CommentInputContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <CommentInput
            {...register("payload", {
              required: true,
            })}
            type="text"
            placeholder="댓글 달기..."
          />
          <CommentButton valid={!Boolean(watch("payload"))}>게시</CommentButton>
        </form>
      </CommentInputContainer>
    </CommentsContainer>
  );
};

export default Comments;
