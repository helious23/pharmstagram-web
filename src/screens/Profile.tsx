import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { PHOTO_FRAGMENT } from "../fragments";
import { seeProfile, seeProfileVariables } from "../__generated__/seeProfile";
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
import Button from "../components/auth/Button";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!, $page: Int!) {
    seeProfile(username: $username) {
      id
      firstName
      lastName
      username
      bio
      avatar
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

const ProfileBtn = styled(Button).attrs({
  as: "span",
})`
  margin-left: 10px;
  margin-top: 0px;
  cursor: pointer;
`;

interface IParams {
  username: string;
}

const Profile = () => {
  const { username } = useParams<IParams>();
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<seeProfile, seeProfileVariables>(
    SEE_PROFILE_QUERY,
    {
      variables: {
        username,
        page,
      },
    }
  );
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
            {/* {data?.seeProfile ? getButton(data.seeProfile) : null} */}
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowing}</Value> following
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
