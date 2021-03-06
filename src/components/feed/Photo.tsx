import styled from "styled-components";
import { FatText } from "../shared";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
} from "@apollo/client";
import {
  toggleLike,
  toggleLikeVariables,
} from "../../__generated__/toggleLike";
import {
  faComment,
  faHeart,
  faPaperPlane,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import Comments from "./Comments";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: ${(props) => props.theme.boxBgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 1.5rem;
  border-radius: 4px;
  max-width: 65%;
`;

const PhotoHeader = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  margin: 0 0.5rem;
`;

const PhotoSection = styled.div`
  display: flex;
  justify-content: center;
`;

const PhotoFile = styled.img`
  width: 100%;
`;

const PhotoData = styled.div`
  /* padding: 1rem; */
`;

const PhotoActions = styled.div`
  padding: 1rem 1rem 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 1.5rem;
  }
`;

const PhotoAction = styled.div`
  margin-right: 1rem;
  cursor: pointer;
`;

const BookmarkContainer = styled.div`
  cursor: pointer;
`;

const LikeContainer = styled.div`
  margin: 1rem 1rem 0 1rem;
`;

const LikeCountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LikedUser = styled(FatText)`
  margin-left: 0.5rem;
`;

const LikeCounter = styled(FatText)``;

const Likes = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const Photo: React.FC<seeFeed_seeFeed> = ({
  id,
  user,
  file,
  isLiked,
  likedBy,
  likes,
  caption,
  commentNumber,
  comments,
}) => {
  const updateToggleLike: MutationUpdaterFunction<
    toggleLike,
    toggleLikeVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, result) => {
    if (result.data) {
      const {
        data: {
          toggleLike: { ok },
        },
      } = result;
      if (ok) {
        const photoId = `Photo:${id}`;
        cache.modify({
          id: photoId,
          fields: {
            isLiked(prev) {
              return !prev;
            },
            likes(prev, { readField }) {
              if (readField("isLiked")) {
                return prev - 1;
              } else {
                return prev + 1;
              }
            },
          },
        });
      }
    }
  };
  const [toggleLikeMutation] = useMutation<toggleLike, toggleLikeVariables>(
    TOGGLE_LIKE_MUTATION,
    {
      variables: {
        id,
      },
      update: updateToggleLike,
    }
  );

  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Link to={`/users/${user.username}`}>
          <Avatar url={user.avatar} large />
        </Link>
        <Link to={`/users/${user.username}`}>
          <Username>{user.username}</Username>
        </Link>
      </PhotoHeader>
      <PhotoSection>
        <PhotoFile src={file} />
      </PhotoSection>
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={() => toggleLikeMutation()}>
              <FontAwesomeIcon
                style={{ color: isLiked ? "tomato" : "inherit" }}
                icon={isLiked ? SolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <BookmarkContainer>
            <FontAwesomeIcon icon={faBookmark} />
          </BookmarkContainer>
        </PhotoActions>
        <LikeContainer>
          <Likes>
            {likedBy ? (
              likes === 1 ? (
                <LikeCountContainer>
                  <Link to={`/users/${likedBy.username}`}>
                    <Avatar url={likedBy?.avatar} large />
                  </Link>
                  <div>
                    <Link to={`/users/${likedBy.username}`}>
                      <LikedUser>{likedBy?.username}</LikedUser>
                    </Link>
                    <span>?????? ???????????????</span>
                  </div>
                </LikeCountContainer>
              ) : (
                <LikeCountContainer>
                  <Link to={`/users/${likedBy.username}`}>
                    <Avatar url={likedBy?.avatar} large />
                  </Link>
                  <div>
                    <Link to={`/users/${likedBy.username}`}>
                      <LikedUser>{likedBy?.username}</LikedUser>???
                    </Link>
                  </div>
                  <div style={{ marginLeft: 5 }}>
                    <LikeCounter> ??? {likes - 1}???</LikeCounter>??? ???????????????
                  </div>
                </LikeCountContainer>
              )
            ) : likes > 0 ? (
              <LikeCounter>????????? {likes}???</LikeCounter>
            ) : (
              ""
            )}
          </Likes>
        </LikeContainer>
        <Comments
          caption={caption}
          commentNumber={commentNumber}
          comments={comments}
          user={user}
          photoId={id}
        />
      </PhotoData>
    </PhotoContainer>
  );
};

export default Photo;
