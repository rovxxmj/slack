import React, { FC, useCallback, useState } from 'react';
import { useTheme } from '@emotion/react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import Menu from '@components/Menu';
import gravatar from 'gravatar';
import {
  IMenu,
  LogOutButton,
  MenuContent,
  MenuItem,
  MenuItems,
  ProfileCard,
  Title,
  WorkspaceMenuItem,
  WorkspaceMenuItems,
} from '@layouts/Workspace/ProfileMenu';
import HoverText from '@layouts/Workspace/HoverText';
import CreateWorkspaceModal from '@layouts/Workspace/CreateWorkspaceModal';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import HoverMenu from '@layouts/Workspace/HoverMenu';
import { IUser, IWorkspace } from '@typings/db';
import MyWorkspaces from '@layouts/Workspace/WorkspaceMenu/MyWorkspaces';

const WorkspaceMenu: FC<IMenu> = ({ show, onCloseModal }) => {
  const { workspace } = useParams<{ workspace?: string }>();
  const theme = useTheme();
  const { data: userData, mutate } = useSWR<IUser>('/api/users', fetcher);

  const [active, setActive] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const onClickActive = useCallback(() => {
    setActive((prev) => !prev);
  }, []);
  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal((prev) => !prev);
  }, []);

  const onLogout = useCallback(() => {
    axios
      .post('api/users/logout', { withCredentials: true })
      .then((res) => {
        mutate();
      })
      .catch((error) => console.error(error));
  }, []);

  const onCloseAll = useCallback(() => {
    onCloseModal();
    setShowCreateWorkspaceModal(false);
  }, []);

  if (!userData) return <Redirect to={'/sign_in'} />;
  return (
    <>
      <Menu show={show} onCloseModal={onCloseModal}>
        <MenuContent gray={theme.colors.gray[100]} style={{ left: '60px', top: '85px' }}>
          <div>
            <HoverText text={'프로필 편집하기'} style={{ right: '-100px', top: '50%', transform: 'translateY(-50%)' }}>
              <ProfileCard>
                <img src={gravatar.url(userData.nickname, { s: '36px', d: 'retro' })} alt={userData.nickname} />
                <div>
                  <span id="profile-name">{userData?.Workspaces.find((v) => v.url === workspace)?.name}</span>
                  <span id="profile-email"></span>
                </div>
              </ProfileCard>
            </HoverText>
            <MenuItems border={theme.colors.gray[100]}>
              <MenuItem hover={theme.colors.gray[100]}>
                <span>
                  <strong>{userData?.Workspaces.find((v) => v.url === workspace)?.name}</strong>에 사용자 초대
                </span>
              </MenuItem>
              <MenuItem hover={theme.colors.gray[100]}>채널 생성</MenuItem>
            </MenuItems>
            <MenuItems border={theme.colors.gray[100]}>
              <MenuItem hover={theme.colors.gray[100]}>환경설정</MenuItem>
              <MenuItem hover={theme.colors.gray[100]}>설정 및 관리</MenuItem>
            </MenuItems>
            <MenuItems border={theme.colors.gray[100]}>
              <MenuItem hover={theme.colors.gray[100]}>도구</MenuItem>
            </MenuItems>
            <MenuItems border={theme.colors.gray[100]}>
              <MenuItem hover={theme.colors.gray[100]} onClick={onClickCreateWorkspace}>
                워크스페이스 추가
              </MenuItem>
              <HoverMenu menuChildren={<MyWorkspaces data={userData} />}>
                <MenuItem hover={theme.colors.gray[100]}>
                  <span>워크스페이스 전환</span>
                  <MdOutlineKeyboardArrowRight />
                </MenuItem>
              </HoverMenu>
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
            <div>{userData.Workspaces.find((v) => v.url === workspace)?.name}에서 로그아웃</div>
          </LogOutButton>
        </MenuContent>
      </Menu>
      <CreateWorkspaceModal show={showCreateWorkspaceModal} onCloseModal={onCloseAll} showPrev />
    </>
  );
};

export default WorkspaceMenu;
