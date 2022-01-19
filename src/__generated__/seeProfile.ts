/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeProfile
// ====================================================

export interface seeProfile_seeProfile_photos_results {
  __typename: "Photo";
  id: number;
  file: string;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
}

export interface seeProfile_seeProfile_photos {
  __typename: "MyPhotosResults";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  results: (seeProfile_seeProfile_photos_results | null)[] | null;
}

export interface seeProfile_seeProfile {
  __typename: "User";
  id: number;
  firstName: string;
  lastName: string | null;
  username: string;
  bio: string | null;
  avatar: string | null;
  totalFollowing: number;
  totalFollowers: number;
  isFollowing: boolean;
  isMe: boolean;
  photos: seeProfile_seeProfile_photos;
}

export interface seeProfile {
  seeProfile: seeProfile_seeProfile | null;
}

export interface seeProfileVariables {
  username: string;
  page: number;
}
