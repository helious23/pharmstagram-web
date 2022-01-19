/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeFeed
// ====================================================

export interface seeFeed_seeFeed_user {
  __typename: "User";
  username: string;
  avatar: string | null;
}

export interface seeFeed_seeFeed_comments_user {
  __typename: "User";
  username: string;
}

export interface seeFeed_seeFeed_comments {
  __typename: "Comment";
  id: number;
  createdAt: string;
  payload: string;
  isMine: boolean;
  user: seeFeed_seeFeed_comments_user;
}

export interface seeFeed_seeFeed_likedBy {
  __typename: "User";
  username: string;
  avatar: string | null;
}

export interface seeFeed_seeFeed {
  __typename: "Photo";
  user: seeFeed_seeFeed_user;
  caption: string | null;
  comments: (seeFeed_seeFeed_comments | null)[] | null;
  createdAt: string;
  isMine: boolean;
  likedBy: seeFeed_seeFeed_likedBy | null;
  id: number;
  file: string;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
}

export interface seeFeed {
  seeFeed: (seeFeed_seeFeed | null)[] | null;
}

export interface seeFeedVariables {
  lastId?: number | null;
}
