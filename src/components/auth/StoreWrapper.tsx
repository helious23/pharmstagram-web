import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons";

const AppNotice = styled.div`
  margin: 1.5rem 0;
`;

const AppContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StoreBox = styled.div`
  background-color: black;
  padding: 0.3rem 0.9rem;
  display: flex;
  justify-content: center;
  color: white;
  border-radius: 0.3rem;
  margin: 0 0.3rem;
`;

const StoreIcon = styled.div`
  margin-right: 0.5rem;
`;

const AppStoreTextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  font-size: 0.8rem;
  span {
    &:last-child {
      margin-top: 0.2rem;
      font-size: 0.7rem;
    }
  }
`;

const GoogleStoreTextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  span {
    &:first-child {
      font-size: 0.6rem;
    }
    &:last-child {
    }
  }
`;

const StoreWrapper = () => {
  return (
    <>
      <AppNotice>앱을 다운로드하세요.</AppNotice>
      <AppContainer>
        <StoreBox>
          <StoreIcon>
            <FontAwesomeIcon icon={faApple} size="2x" />
          </StoreIcon>
          <AppStoreTextBox>
            <span>App Store에서</span>
            <span>다운로드 하기</span>
          </AppStoreTextBox>
        </StoreBox>
        <StoreBox>
          <StoreIcon>
            <FontAwesomeIcon icon={faGooglePlay} size="2x" />
          </StoreIcon>
          <GoogleStoreTextBox>
            <span>다운로드 하기</span>
            <span>Google Play</span>
          </GoogleStoreTextBox>
        </StoreBox>
      </AppContainer>
    </>
  );
};

export default StoreWrapper;
