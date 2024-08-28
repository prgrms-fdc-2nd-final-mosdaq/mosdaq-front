import { Txt } from '@/components/common/Txt';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import colors from '@/constants/colors';
import profileDefault from '@/assets/images/profile/profile-defaut.webp';
import LogoutButton from './LogoutButton';
import useAuthStore from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import useGetUserProfile from '@/hooks/api/auth/useGetUserInfo';

export default function Profile() {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const { userProfile } = useGetUserProfile();

  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
    }
  }, [isLoggedIn]);

  return (
    userProfile && (
      <StyledProfile>
        <StyledProfileImg src={userProfile.picture || profileDefault} alt="" />
        <Txt typography="Pretendard24bold">{userProfile.name}</Txt>
        <Txt typography="Pretendard24bold" color="watcha">
          총 {userProfile.point}포인트
        </Txt>
        <LogoutButton />
      </StyledProfile>
    )
  );
}

const StyledProfile = styled.section`
  padding: 24px 8px;
  position: relative;
  width: 290px;
  height: 452px;
  border: 1px solid ${colors.greyscale6};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
const StyledProfileImg = styled.img`
  width: 266px;
  height: 266px;
  border-radius: 50%;
  margin-bottom: 10px;
`;
