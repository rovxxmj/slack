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
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import HoverMenu from '@layouts/Workspace/HoverMenu';
import { IUser, IWorkspace } from '@typings/db';
import MyWorkspaces from '@components/WorkspaceMenu/MyWorkspaces';
import CreateWorkspaceModal from '@layouts/Workspace/CreateWorkspaceModal';
import CreateChannelModal from '@layouts/Workspace/CreateChannelModal';
import InviteWorkspaceModal from '@layouts/Workspace/InviteWorkspaceModal';

const WorkspaceMenu: FC<IMenu> = ({ show, onCloseModal }) => {
  const { workspace } = useParams<{ workspace?: string }>();
  const theme = useTheme();
  const { data: userData, mutate } = useSWR<IUser>('/api/users', fetcher);

  const [active, setActive] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showInviteWorkspaceModal, setInviteWorkspaceModal] = useState(false);
  const onClickActive = useCallback(() => {
    setActive((prev) => !prev);
  }, []);
  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal((prev) => !prev);
  }, []);
  const onClickCreateChannel = useCallback(() => {
    setShowCreateChannelModal((prev) => !prev);
  }, []);
  const onClickInviteWorkspace = useCallback(() => {
    setInviteWorkspaceModal((prev) => !prev);
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
    setShowCreateChannelModal(false);
    setInviteWorkspaceModal(false);
  }, []);

  if (!userData) return <Redirect to={'/sign_in'} />;
  return (
    <>
      <Menu show={show} onCloseModal={onCloseModal}>
        <MenuContent gray={theme.colors.gray[100]} style={{ left: '60px', top: '85px' }}>
          <div>
            <HoverText text={'????????? ????????????'} style={{ right: '-100px', top: '50%', transform: 'translateY(-50%)' }}>
              <ProfileCard>
                <img src={gravatar.url(userData.nickname, { s: '36px', d: 'retro' })} alt={userData.nickname} />
                <div>
                  <span id="profile-name">{userData?.Workspaces.find((v) => v.url === workspace)?.name}</span>
                  <span id="profile-email"></span>
                </div>
              </ProfileCard>
            </HoverText>
            <MenuItems border={theme.colors.gray[100]}>
              <MenuItem hover={theme.colors.gray[100]} onClick={onClickInviteWorkspace}>
                <span>
                  <strong>{userData?.Workspaces.find((v) => v.url === workspace)?.name}</strong>??? ????????? ??????
                </span>
              </MenuItem>
              <MenuItem hover={theme.colors.gray[100]} onClick={onClickCreateChannel}>
                ?????? ??????
              </MenuItem>
            </MenuItems>
            <MenuItems border={theme.colors.gray[100]}>
              <MenuItem hover={theme.colors.gray[100]}>????????????</MenuItem>
              <MenuItem hover={theme.colors.gray[100]}>?????? ??? ??????</MenuItem>
            </MenuItems>
            <MenuItems border={theme.colors.gray[100]}>
              <MenuItem hover={theme.colors.gray[100]}>??????</MenuItem>
            </MenuItems>
            <MenuItems border={theme.colors.gray[100]}>
              <MenuItem hover={theme.colors.gray[100]} onClick={onClickCreateWorkspace}>
                ?????????????????? ??????
              </MenuItem>
              <HoverMenu menuChildren={<MyWorkspaces data={userData} />}>
                <MenuItem hover={theme.colors.gray[100]}>
                  <span>?????????????????? ??????</span>
                  <MdOutlineKeyboardArrowRight />
                </MenuItem>
              </HoverMenu>
            </MenuItems>
            <MenuItems border={theme.colors.gray[100]}>
              <MenuItem hover={theme.colors.gray[100]}>?????????</MenuItem>
              <MenuItem hover={theme.colors.gray[100]}>????????????</MenuItem>
            </MenuItems>
          </div>
          <LogOutButton
            onClick={onLogout}
            bgColor={theme.colors.gray[50]}
            color={theme.colors.gray[200]}
            hover={theme.colors.gray[400]}
          >
            <div>{userData.Workspaces.find((v) => v.url === workspace)?.name}?????? ????????????</div>
          </LogOutButton>
        </MenuContent>
      </Menu>
      <CreateWorkspaceModal show={showCreateWorkspaceModal} onCloseModal={onCloseAll} showPrev />
      <CreateChannelModal show={showCreateChannelModal} onCloseModal={onCloseAll} showPrev />
      <InviteWorkspaceModal show={showInviteWorkspaceModal} onCloseModal={onCloseAll} showPrev />
    </>
  );
};

export default WorkspaceMenu;
