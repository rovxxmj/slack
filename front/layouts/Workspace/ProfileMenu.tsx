import React, { CSSProperties, FC, useCallback, useState } from 'react';
import Menu from '@components/Menu';
import styled from '@emotion/styled';
import gravatar from 'gravatar';
import { useTheme } from '@emotion/react';
import axios from 'axios';
import { Redirect } from 'react-router';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import HoverText from '@layouts/Workspace/HoverText';
export interface IMenu {
  show: boolean;
  style?: CSSProperties;
  onCloseModal(): void;
}

export const MenuContent = styled.div<{ gray: string }>`
  position: absolute;
  top: 36px;
  right: 16px;
  background-color: #fff;
  color: #000;
  width: 280px;
  border: 1px solid ${({ gray }) => gray};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

export const ProfileCard = styled.div`
  display: flex;
  padding: 20px;
  cursor: pointer;
  & img {
    display: flex;
    border-radius: 4px;
  }
  & > div {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
  & #profile-name {
    font-weight: bold;
    display: inline-flex;
  }
  & #profile-active,
  #profile-email {
    font-size: 13px;
    display: inline-flex;
  }
`;

export const MenuItems = styled.div<{ border: string }>`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${({ border }) => border};
  padding: 5px 0;
`;
export const MenuItem = styled.span<{ hover: string }>`
  padding: 6px 20px;
  height: 32px;
  color: #000;
  width: 100%;
  text-align: start;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background-color: ${({ hover }) => hover};
  }
`;
export const WorkspaceMenuItems = styled.div`
  overflow-y: scroll;
`;
export const WorkspaceMenuItem = styled(MenuItem)`
  justify-content: flex-start;
  & img,
  .img {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background-color: gray;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 800;
    font-size: 14px;
    color: #fff;
  }

  & .workspace-name {
    margin-left: 10px;
    font-size: 15px;
    font-weight: 600;
  }
`;

export const LogOutButton = styled.button<{ bgColor: string; color: string; hover: string }>`
  border: none;
  width: 100%;
  border-top: 1px solid ${({ color }) => color};
  background: ${({ bgColor }) => bgColor};
  display: block;
  height: 60px;
  padding: 5px 20px 5px;
  outline: none;
  cursor: pointer;

  > div {
    border: 1px solid ${({ color }) => color};
    padding: 7px 0;
    border-radius: 5px;
    transition: 0.2s ease;
    color: gray;

    &:hover {
      border: 1px solid ${({ hover }) => hover};
      color: #000;
    }
  }
`;

export const Title = styled.span`
  padding: 16px 20px 10px;
  color: #000;
  width: 100%;
  text-align: start;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 600;
`;

const ProfileMenu: FC<IMenu> = ({ show, onCloseModal, style }) => {
  const workspace = '29cm';
  const theme = useTheme();
  const { data: userData, mutate } = useSWR('/api/users', fetcher);
  const [active, setActive] = useState(true);
  const onClickActive = useCallback(() => {
    setActive((prev) => !prev);
  }, []);
  const onLogout = useCallback(() => {
    axios
      .post('api/users/logout', { withCredentials: true })
      .then((res) => {
        mutate();
      })
      .catch((error) => console.error(error));
  }, []);

  if (!userData) return <Redirect to={'/sign_in'} />;
  return (
    <Menu show={show} onCloseModal={onCloseModal}>
      <MenuContent gray={theme.colors.gray[100]}>
        <div>
          <HoverText text={'프로필 편집하기'} style={{ left: '-100px', top: '50%', transform: 'translateY(-50%)' }}>
            <ProfileCard>
              <img src={gravatar.url(userData.nickname, { s: '36px', d: 'retro' })} alt={userData.nickname} />
              <div>
                <span id="profile-name">{userData.nickname}</span>
                <span id="profile-active">Active</span>
              </div>
            </ProfileCard>
          </HoverText>
          <MenuItems border={theme.colors.gray[100]}>
            <MenuItem hover={theme.colors.gray[100]}>상태 업데이트</MenuItem>
          </MenuItems>
          <MenuItems border={theme.colors.gray[100]}>
            <MenuItem hover={theme.colors.gray[100]} onClick={onClickActive}>
              <span>
                자신을 <strong>{active ? '자리 비움' : '활성'}</strong>(으)로 설정
              </span>
            </MenuItem>
            <MenuItem hover={theme.colors.gray[100]}>알림 일시 중지</MenuItem>
          </MenuItems>
          <MenuItems border={theme.colors.gray[100]}>
            <MenuItem hover={theme.colors.gray[100]}>프로필</MenuItem>
            <MenuItem hover={theme.colors.gray[100]}>환경설정</MenuItem>
          </MenuItems>
        </div>
        <LogOutButton
          onClick={onLogout}
          bgColor={theme.colors.gray[50]}
          color={theme.colors.gray[200]}
          hover={theme.colors.gray[400]}
        >
          <div>로그아웃</div>
        </LogOutButton>
      </MenuContent>
    </Menu>
  );
};

export default ProfileMenu;
