import { gql, useQuery } from "@apollo/client";
import PageTitle from "../components/PageTitle";
import Photo from "../components/feed/Photo";
import { useState, useEffect } from "react";
import { seeFeed, seeFeedVariables } from "../__generated__/seeFeed";

export const FEED_QUERY = gql`
  query seeFeed($lastId: Int) {
    seeFeed(lastId: $lastId) {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      commentNumber
      comments {
        id
        createdAt
        payload
        isMine
        user {
          username
        }
      }
      createdAt
      isMine
      isLiked
      likedBy {
        username
        avatar
      }
    }
  }
`;

const Home = () => {
  const [lastId, setLastId] = useState<number | null | undefined>(0);
  const { data } = useQuery<seeFeed, seeFeedVariables>(FEED_QUERY, {
    variables: {
      lastId: lastId,
    },
  });

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
