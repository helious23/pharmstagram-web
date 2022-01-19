import React, { useState } from "react";
import styled from "styled-components";
import { FatText } from "../shared";
import { seeFeed_seeFeed_comments } from "../../__generated__/seeFeed";
import { Link } from "react-router-dom";
import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  Reference,
  useMutation,
} from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faTimes } from "@fortawesome/free-solid-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "../../hooks/useUser";
import {
  editComment,
  editCommentVariables,
} from "../../__generated__/editComment";
import {
  deleteComment,
  deleteCommentVariables,
} from "../../__generated__/deleteComment";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
      error
    }
  }
`;

const EDIT_COMMENT_MUTATION = gql`
  mutation editComment($payload: String!, $id: Int!) {
    editComment(id: $id, payload: $payload) {
      ok
      error
    }
  }
`;

const CommentContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
`;

const CaptionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentCaption = styled.span`
  margin-left: 0.5rem;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const EditForm = styled.form`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  width: 100%;
`;

const EditInput = styled.input`
  width: 100%;
  height: 1rem;
`;

const EditButton = styled.button`
  all: unset;
  font-size: 0.7rem;
  opacity: 0.3;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const EditedBtn = styled.button<{ valid: Boolean }>`
  width: 3rem;
  border: none;
  background-color: inherit;
  font-size: 0.9rem;
  color: ${(props) => props.theme.accent};
  opacity: ${(props) => (props.valid ? "0.3" : "1")};
  cursor: ${(props) => (props.valid ? "" : "pointer")};
`;

const DeleteButton = styled.button`
  all: unset;
  font-size: 0.7rem;
  opacity: 0.3;
  margin-left: 0.5rem;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

type CommentProps = Pick<
  seeFeed_seeFeed_comments,
  "user" | "payload" | "id" | "isMine"
>;

interface ICommentProps extends CommentProps {
  photoId: number;
}

interface IEditFormProps {
  edit: string;
}

const Comment: React.FC<ICommentProps> = ({
  user,
  payload,
  id,
  isMine,
  photoId,
}) => {
  const [onEditing, setOnEditing] = useState(false);
  const { data: userData } = useUser();
  const { register, handleSubmit, getValues, watch, setValue } =
    useForm<IEditFormProps>({
      defaultValues: {
        edit: payload,
      },
    });
  const editedPayload = getValues("edit");
  const deleteCommentUpdate: MutationUpdaterFunction<
    deleteComment,
    deleteCommentVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, result) => {
    if (result.data) {
      const {
        data: {
          deleteComment: { ok },
        },
      } = result;
      if (ok) {
        cache.evict({ id: `Comment:${id}` });
        cache.modify({
          id: `Photo:${photoId}`,
          fields: {
            commentNumber(prev, { readField }) {
              if (readField("commentNumber")) {
                return prev - 1;
              }
            },
          },
        });
      }
    }
  };

  const editCommentUpdate: MutationUpdaterFunction<
    editComment,
    editCommentVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, result) => {
    if (result.data) {
      const {
        data: {
          editComment: { ok },
        },
      } = result;
      if (ok && userData?.me) {
        const editedComment = {
          __typename: "Comment",
          createdAt: Date.now() + "",
          id,
          isMine: true,
          payload: editedPayload,
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
          data: editedComment,
        });
        cache.modify({
          id: `Photo:${photoId}`,
          fields: {
            comments: (prev: Reference[]) => {
              const remain = prev.filter(
                (comment) => comment.__ref !== `Comment:${id}`
              );
              return [newCacheComment, ...remain];
            },
          },
        });
        setOnEditing(false);
      }
    }
  };

  const [deleteCommentMutation] = useMutation<
    deleteComment,
    deleteCommentVariables
  >(DELETE_COMMENT_MUTATION, {
    variables: {
      id: id,
    },
    update: deleteCommentUpdate,
  });

  const [editCommentMutation] = useMutation<editComment, editCommentVariables>(
    EDIT_COMMENT_MUTATION,
    {
      variables: {
        id,
        payload: editedPayload,
      },
      update: editCommentUpdate,
    }
  );

  const onEditClick = () => {
    setOnEditing(true);
    // setFocus("edit"); // error
  };

  const cancleEditing = () => {
    setOnEditing(false);
    setValue("edit", payload);
  };

  const onDeleteClick = () => {
    deleteCommentMutation();
  };

  const onEditValid: SubmitHandler<IEditFormProps> = () => {
    editCommentMutation();
  };

  return (
    <CommentContainer>
      <Link to={`/users/${user.username}`}>
        <FatText>{user.username}</FatText>
      </Link>
      <CaptionContainer>
        {isMine &&
          (onEditing ? (
            <EditForm onSubmit={handleSubmit(onEditValid)}>
              <EditInput
                type="text"
                {...register("edit", { required: true })}
              />
              <EditedBtn valid={!Boolean(watch("edit"))}>수정</EditedBtn>
            </EditForm>
          ) : (
            ""
          ))}
        {onEditing ? (
          ""
        ) : (
          <CommentCaption>
            {payload &&
              payload.split(" ").map((word, index) =>
                /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/.test(word) ? (
                  <React.Fragment key={index}>
                    <Link to={`/hashtag/${word}`}>{word}</Link>{" "}
                  </React.Fragment>
                ) : (
                  <React.Fragment key={index}>{word} </React.Fragment>
                )
              )}
          </CommentCaption>
        )}
        {isMine ? (
          <>
            {onEditing ? (
              <ButtonContainer>
                <EditButton onClick={cancleEditing}>
                  <FontAwesomeIcon icon={faTimes} />
                </EditButton>
              </ButtonContainer>
            ) : (
              <ButtonContainer>
                <EditButton onClick={onEditClick}>
                  <FontAwesomeIcon icon={faPen} />
                </EditButton>
                <DeleteButton onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} />
                </DeleteButton>
              </ButtonContainer>
            )}
          </>
        ) : null}
      </CaptionContainer>
    </CommentContainer>
  );
};

export default Comment;
