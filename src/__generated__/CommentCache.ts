/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CommentCache
// ====================================================

export interface CommentCache_user {
  __typename: "User";
  username: string;
  avatar: string | null;
}

export interface CommentCache {
  __typename: "Comment";
  id: number;
  createdAt: string;
  payload: string;
  isMine: boolean;
  user: CommentCache_user;
}
