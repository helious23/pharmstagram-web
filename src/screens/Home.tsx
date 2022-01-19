import { gql, useQuery } from "@apollo/client";
import PageTitle from "../components/PageTitle";
import Photo from "../components/feed/Photo";
import { useState, useEffect } from "react";
import { seeFeed, seeFeedVariables } from "../__generated__/seeFeed";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

export const FEED_QUERY = gql`
  query seeFeed($lastId: Int) {
    seeFeed(lastId: $lastId) {
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
      likedBy {
        username
        avatar
      }
      ...PhotoFragment
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const Home = () => {
  const [lastId, setLastId] = useState<number | null | undefined>(0);
  const { data } = useQuery<seeFeed, seeFeedVariables>(FEED_QUERY, {
    variables: {
      lastId: lastId,
    },
  });

  // useEffect(() => {
  //   if (data?.seeFeed) {
  //     setLastId(data?.seeFeed[data?.seeFeed?.length - 1]?.id);
  //   }
  // }, [lastId]);

  return (
    <div>
      <PageTitle title="Home" />
      {data?.seeFeed?.map((photo) =>
        photo ? <Photo key={photo.id} {...photo} /> : null
      )}
    </div>
  );
};

export default Home;
