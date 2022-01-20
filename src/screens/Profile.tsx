import { useParams } from "react-router-dom";
import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useApolloClient,
  useMutation,
  useQuery,
} from "@apollo/client";
import { PHOTO_FRAGMENT } from "../fragments";
import {
  seeProfile,
  seeProfileVariables,
  seeProfile_seeProfile,
} from "../__generated__/seeProfile";
import { useState } from "react";
import PageTitle from "../components/PageTitle";
import styled from "styled-components";
import { FatText } from "../components/shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { SButton } from "../components/auth/Button";
import { followUser, followUserVariables } from "../__generated__/followUser";
import {
  unfollowUser,
  unfollowUserVariables,
} from "../__generated__/unfollowUser";
import { FEED_QUERY } from "./Home";
import { useUser } from "../hooks/useUser";
import { seeFeed } from "../__generated__/seeFeed";
import { LargeNumberLike } from "crypto";

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
    }
  }
`;

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!, $page: Int!) {
    seeProfile(username: $username) {
      id
      firstName
      lastName
      username
      bio
      avatar
      totalPosts
      totalFollowing
      totalFollowers
      isFollowing
      isMe
      photos(page: $page) {
        ok
        error
        totalPages
        results {
          ...PhotoFragment
        }
      }
    }
  }
  ${PHOTO_FRAGMENT}
`;

const Header = styled.div`
  display: flex;
`;
const Avatar = styled.img`
  margin-left: 50px;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-right: 150px;
`;

const AvatarContainer = styled(Avatar).attrs({ as: "div" })`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.fontColor};
  svg {
    font-size: 6rem;
    color: ${(props) => props.theme.fontColor};
  }
`;
const Column = styled.div``;
const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;
const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  display: flex;
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;
const Value = styled(FatText)`
  font-size: 18px;
`;
const Name = styled(FatText)`
  font-size: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div<{ bg: string }>`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  position: relative;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const ProfileBtn = styled(SButton)`
  margin-left: 10px;
  margin-top: 0px;
  cursor: pointer;
`;

interface IParams {
  username: string;
}

const Profile = () => {
  const client = useApolloClient();
  const { username } = useParams<IParams>();
  const [page, setPage] = useState(1);
  const { data: userData } = useUser();

  const unfollowUserCompletd = (data: unfollowUser) => {
    const {
      unfollowUser: { ok },
    } = data;
    if (!ok) {
      return;
    }
    if (ok) {
      const { cache } = client;
      cache.modify({
        id: `User:${username}`,
        fields: {
          isFollowing() {
            return false;
          },
          totalFollowers(prev) {
            return prev - 1;
          },
        },
      });
      if (userData?.me) {
        const { me } = userData;
        cache.modify({
          id: `User:${me.username}`,
          fields: {
            totalFollowing(prev) {
              return prev - 1;
            },
          },
        });
      }
    }
  };

  const updateFollowCache: MutationUpdaterFunction<
    followUser,
    followUserVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, result) => {
    if (result.data) {
      const {
        data: {
          followUser: { ok },
        },
      } = result;
      if (!ok) {
        return;
      }
      if (ok) {
        cache.modify({
          id: `User:${username}`,
          fields: {
            isFollowing() {
              return true;
            },
            totalFollowers(prev) {
              return prev + 1;
            },
          },
        });
        if (userData?.me) {
          const { me } = userData;
          cache.modify({
            id: `User:${me.username}`,
            fields: {
              totalFollowing(prev) {
                return prev + 1;
              },
            },
          });
        }
      }
    }
  };

  const [followUser] = useMutation<followUser, followUserVariables>(
    FOLLOW_USER_MUTATION,
    {
      variables: {
        username: username,
      },
      update: updateFollowCache,
      refetchQueries: [{ query: FEED_QUERY }],
    }
  );

  const [unfollowUser] = useMutation<unfollowUser, unfollowUserVariables>(
    UNFOLLOW_USER_MUTATION,
    {
      variables: {
        username,
      },
      onCompleted: unfollowUserCompletd,
    }
  );

  const { data, loading } = useQuery<seeProfile, seeProfileVariables>(
    SEE_PROFILE_QUERY,
    {
      variables: {
        username,
        page,
      },
    }
  );
  const getButton = (seeProfile: seeProfile_seeProfile) => {
    const { isMe, isFollowing } = seeProfile;
    if (isMe) {
      return <ProfileBtn>Edit Profile</ProfileBtn>;
    }
    if (isFollowing) {
      return (
        <ProfileBtn onClick={() => unfollowUser()}>팔로우 취소</ProfileBtn>
      );
    } else {
      return <ProfileBtn onClick={() => followUser()}>팔로우</ProfileBtn>;
    }
  };
  return (
    <div>
      <PageTitle
        title={
          loading ? "Loading..." : `${data?.seeProfile?.username}'s Profile`
        }
      />
      <Header>
        {data?.seeProfile?.avatar ? (
          <Avatar src={data?.seeProfile?.avatar} />
        ) : (
          <AvatarContainer>
            <FontAwesomeIcon icon={faUser} />
          </AvatarContainer>
        )}
        <Column>
          <Row>
            <Username>{data?.seeProfile?.username}</Username>
            {data?.seeProfile ? getButton(data?.seeProfile) : null}
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  게시물 <Value>{data?.seeProfile?.totalPosts}</Value>
                </span>
              </Item>
              <Item>
                <span>
                  팔로워 <Value>{data?.seeProfile?.totalFollowers}</Value>
                </span>
              </Item>
              <Item>
                <span>
                  팔로우 <Value>{data?.seeProfile?.totalFollowing}</Value>
                </span>
              </Item>
            </List>
          </Row>
          <Row>
            <Name>
              {data?.seeProfile?.firstName}
              {"  "}
              {data?.seeProfile?.lastName}
            </Name>
          </Row>
          <Row>{data?.seeProfile?.bio}</Row>
        </Column>
      </Header>
      <Grid>
        {data?.seeProfile?.photos.results &&
          data?.seeProfile?.photos?.results
            .map(
              (photo) =>
                photo && (
                  <Photo key={photo.id} bg={photo.file}>
                    <Icons>
                      <Icon>
                        <FontAwesomeIcon icon={faHeart} />
                        {photo.likes}
                      </Icon>
                      <Icon>
                        <FontAwesomeIcon icon={faComment} />
                        {photo.commentNumber}
                      </Icon>
                    </Icons>
                  </Photo>
                )
            )
            .reverse()}
      </Grid>
    </div>
  );
};

export default Profile;
