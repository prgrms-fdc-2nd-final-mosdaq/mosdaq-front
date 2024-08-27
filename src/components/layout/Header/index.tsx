import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../../constants/colors';
import { Txt } from '../../common/Txt';
import { Button } from '../../common/Button';
import mainLogo from '../../../assets/images/main/mainLogo.png';
import mypageLogo from '../../../assets/images/main/mypageLogo.png';
import useAuthStore from '@/store/authStore';
import useGetUserProfile from '@/hooks/api/auth/useGetUserInfo';

interface IHeaderProps {
  preloadQuizPage: () => void;
  preloadMyPage: () => void;
  preloadLoginPage: () => void;
}

export default function Header({
  preloadQuizPage,
  preloadMyPage,
  preloadLoginPage,
}: IHeaderProps) {
  const { isLoggedIn } = useAuthStore();
  const { userProfile } = useGetUserProfile();
  const matchMovieList = useMatch('/movie-list');
  const matchQuiz = useMatch('/quiz');

  return (
    <StyledHeaderContainer>
      <StyledHeaderContent>
        <StyledLeftSection>
          <Link to="/">
            <StyledMainLogo src={mainLogo} alt="Main Logo" />
          </Link>
          <StyledNav>
            <Button size="small">
              <Txt typography={matchMovieList ? 'Pretendard24bold' : 'p'}>
                <Link to="/movie-list">영화 목록</Link>
              </Txt>
            </Button>
            <Button size="small">
              <Txt typography={matchQuiz ? 'Pretendard24bold' : 'p'}>
                <Link to="/quiz" onMouseEnter={preloadQuizPage}>
                  영화 퀴즈
                </Link>
              </Txt>
            </Button>
          </StyledNav>
        </StyledLeftSection>
        <StyledRightSection>
          {isLoggedIn ? (
            <Link to="/mypage" onMouseEnter={preloadMyPage}>
              <StyledMypageLogo
                src={
                  isLoggedIn && userProfile && userProfile.picture
                    ? userProfile.picture
                    : mypageLogo
                }
                alt="profile img"
              />
            </Link>
          ) : (
            <Button size="small" variant="secondary">
              <Txt color="white">
                <Link to="/login" onMouseEnter={preloadLoginPage}>
                  로그인
                </Link>
              </Txt>
            </Button>
          )}
        </StyledRightSection>
      </StyledHeaderContent>
    </StyledHeaderContainer>
  );
}

const StyledHeaderContainer = styled.section`
  width: 100%;
  padding: 0.25rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${colors.greyscale2};
  position: relative;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const StyledHeaderContent = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1920px;
  height: 100%;
  max-height: 68px;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const StyledLeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const StyledRightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  height: 100%;
  max-height: 68px;

  a {
    height: inherit;
    max-height: inherit;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 0.5rem;
  margin-left: 0.5rem;
`;

const StyledMainLogo = styled.img`
  width: 150px;
`;

const StyledMypageLogo = styled.img`
  width: 75%;
  height: 75%;
  max-height: inherit;
  border-radius: 50%;
`;
