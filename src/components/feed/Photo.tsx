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
import { FEED_QUERY } from "../../screens/Home";
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
  padding: 1rem;
`;

const PhotoActions = styled.div`
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
  margin-top: 1rem;
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
        <Link to={`/user/${user.username}`}>
          <Avatar url={user.avatar} large />
        </Link>
        <Username>{user.username}</Username>
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
                  <Avatar url={likedBy?.avatar} large />
                  <div>
                    <LikedUser>{likedBy?.username}</LikedUser>
                    님이 좋아합니다
                  </div>
                </LikeCountContainer>
              ) : (
                <LikeCountContainer>
                  <Avatar url={likedBy?.avatar} />
                  <div>
                    <LikedUser>{likedBy?.username}</LikedUser>님
                  </div>
                  <div style={{ marginLeft: 5 }}>
                    <LikeCounter> 외 {likes - 1}명</LikeCounter>이 좋아합니다
                  </div>
                </LikeCountContainer>
              )
            ) : likes > 0 ? (
              <LikeCounter>좋아요 {likes}개</LikeCounter>
            ) : (
              ""
            )}
          </Likes>
          <Comments
            caption={caption}
            commentNumber={commentNumber}
            comments={comments}
            user={user}
            photoId={id}
          />
        </LikeContainer>
      </PhotoData>
    </PhotoContainer>
  );
};

export default Photo;
