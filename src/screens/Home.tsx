import { logUserOut } from "../apollo";
import { Link, useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { seeFeed, seeFeedVariables } from "../__generated__/seeFeed";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { FatText } from "../components/shared";
import PageTitle from "../components/PageTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";

const FEED_QUERY = gql`
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
      comments
      createdAt
      isMine
      likedBy {
        username
        avatar
      }
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

const Home = () => {
  const { data } = useQuery<seeFeed, seeFeedVariables>(FEED_QUERY, {
    // variables: {
    //   lastId: 15,
    // },
  });

  const history = useHistory();
  return (
    <div>
      <PageTitle title="Home" />
      {data?.seeFeed?.map((photo) => (
        <PhotoContainer key={photo?.id}>
          <PhotoHeader>
            <Link to={`/user/${photo?.user.username}`}>
              <Avatar url={photo?.user.avatar} large />
            </Link>
            <Username>{photo?.user.username}</Username>
          </PhotoHeader>
          <PhotoSection>
            <PhotoFile src={photo?.file} />
          </PhotoSection>
          <PhotoData>
            <PhotoActions>
              <div>
                <PhotoAction>
                  <FontAwesomeIcon icon={faHeart} />
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
                {photo?.likedBy ? (
                  photo.likes === 1 ? (
                    <LikeCountContainer>
                      <Avatar url={photo?.likedBy?.avatar} large />
                      <div>
                        <LikedUser>{photo?.likedBy?.username}</LikedUser>
                        님이 좋아합니다
                      </div>
                    </LikeCountContainer>
                  ) : (
                    <LikeCountContainer>
                      <Avatar url={photo?.likedBy?.avatar} />
                      <div>
                        <LikedUser>{photo?.likedBy?.username}</LikedUser>님
                      </div>
                      <div style={{ marginLeft: 5 }}>
                        <LikeCounter> 외 {photo?.likes - 1}명</LikeCounter>이
                        좋아합니다
                      </div>
                    </LikeCountContainer>
                  )
                ) : photo && photo?.likes > 0 ? (
                  <LikeCounter>좋아요 {photo.likes}개</LikeCounter>
                ) : (
                  ""
                )}
              </Likes>
            </LikeContainer>
          </PhotoData>
        </PhotoContainer>
      ))}
    </div>
  );
};

export default Home;
