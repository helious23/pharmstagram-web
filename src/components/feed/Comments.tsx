import styled from "styled-components";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import Comment from "./Comment";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "../../hooks/useUser";
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
import PhotoCaption from "./PhotoCaption";

const CREATE_COMMENT = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
      id
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
  const { register, handleSubmit, watch, setValue, getValues } =
    useForm<ICommentFormProps>();
  const { data: userData } = useUser();

  const [createCommentMutation] = useMutation<
    createComment,
    createCommentVariables
  >(CREATE_COMMENT);
  const createCommentUpdate: MutationUpdaterFunction<
    createComment,
    createCommentVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, result) => {
    const payload = getValues("payload");
    setValue("payload", "");
    if (result.data) {
      const {
        data: {
          createComment: { ok, id },
        },
      } = result;
      if (ok && userData?.me) {
        const newComment = {
          __typename: "Comment",
          createdAt: Date.now() + "",
          id,
          isMine: true,
          payload,
          user: {
            ...userData.me,
          },
        };
        const newCacheComment = cache.writeFragment({
          fragment: gql`
            fragment CommentCache on Comment {
              id
              createdAt
              payload
              isMine
              user {
                username
                avatar
              }
            }
          `,
          data: newComment,
        });
        cache.modify({
          id: `Photo:${photoId}`,
          fields: {
            comments(prev) {
              return [newCacheComment, ...prev];
            },
            commentNumber(prev) {
              return prev + 1;
            },
          },
        });
      }
    }
  };
  const onValid: SubmitHandler<ICommentFormProps> = ({ payload }) => {
    createCommentMutation({
      variables: {
        photoId,
        payload,
      },
      update: createCommentUpdate,
    });
  };

  const commentCount = (commentNumber: number) => {
    if (commentNumber > 3) {
      return (
        <>
          <span>댓글 {commentNumber} 개 </span>
          <span>모두보기</span>
        </>
      );
    } else if (commentNumber > 0) {
      return <span>댓글 {commentNumber} 개 </span>;
    } else if (commentNumber === 0) {
      return "";
    }
  };

  return (
    <CommentsContainer>
      <CommentContents>
        <PhotoCaption user={user} caption={caption} />
        <CommentCount>{commentCount(commentNumber)}</CommentCount>
        {comments?.map(
          (comment) =>
            comment && (
              <Comment
                id={comment.id}
                isMine={comment.isMine}
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
