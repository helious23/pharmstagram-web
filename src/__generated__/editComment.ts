/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editComment
// ====================================================

export interface editComment_editComment {
  __typename: "CoreResponse";
  ok: boolean;
  error: string | null;
}

export interface editComment {
  editComment: editComment_editComment;
}

export interface editCommentVariables {
  payload: string;
  id: number;
}
