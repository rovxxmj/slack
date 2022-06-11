// import {
//   AddButton,
//   Channels,
//   Chats,
//   Header,
//   LogOutButton,
//   MenuScroll,
//   ProfileImg,
//   ProfileModal,
//   RightMenu,
//   WorkspaceButton,
//   WorkspaceModal,
//   WorkspaceName,
//   Workspaces,
//   WorkspaceWrapper,
// } from '@layouts/Workspace/styles';
import { IChannel, IUser, IWorkspace } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { VFC, useCallback, useState, useEffect } from 'react';
import { Link, Route, Switch, Redirect, useParams } from 'react-router-dom';
import useSWR from 'swr';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { BsPencilSquare } from 'react-icons/bs';
import { IoAddOutline } from 'react-icons/io5';
import HoverText from '@layouts/Workspace/HoverText';
import gravatar from 'gravatar';
import ProfileMenu from '@layouts/Workspace/ProfileMenu';
import loadable from '@loadable/component';
import ChannelList from '@components/ChannelList';
import DMList from '@components/DMList';
import WorkspaceMenu from '@layouts/Workspace/WorkspaceMenu';
import AddMessageModal from '@layouts/Workspace/AddMessageModal';
import { useRecoilState } from 'recoil';
import { isWorkspaceMenuShow } from '@recoil/atom';
import CreateWorkspaceModal from '@layouts/Workspace/CreateWorkspaceModal';

export const Header = styled.header<{ bgColor: string; border: string }>`
  height: 40px;
  background-color: ${({ bgColor }) => bgColor};
  border-bottom: 1px solid ${({ border }) => border};
  color: #ffffff;
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.1);
  padding: 5px;
  text-align: center;
`;
export const RightMenu = styled.div`
  float: right;
`;

export const ProfileImg = styled.div`
  width: 28px;
  height: 28px;
  position: absolute;
  top: 5px;
  right: 16px;
  border-radius: 4px;
  overflow: hidden;
  > img {
  }
`;

export const WorkspaceWrapper = styled.div`
  display: flex;
  flex: 1;
`;

export const Workspaces = styled.div<{ bgColor: string; border: string }>`
  width: 60px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  border-top: 1px solid ${({ border }) => border};
  border-right: 1px solid ${({ border }) => border};
  vertical-align: top;
  text-align: center;
  padding: 15px 0 0;
`;

export const AddButton = styled.button<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  transition: 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const Channels = styled.nav<{ bgColor: string; border: string }>`
  width: 260px;
  display: inline-flex;
  flex-direction: column;
  background: ${({ bgColor }) => bgColor};
  border-right: 1px solid ${({ border }) => border};
  vertical-align: top;
  & a {
    padding-left: 36px;
    color: inherit;
    text-decoration: none;
    height: 28px;
    line-height: 28px;
    display: flex;
    align-items: center;
    &.selected {
      color: white;
    }
  }
  & .bold {
    color: white;
    font-weight: bold;
  }
  & .count {
    margin-left: auto;
    background: #cd2553;
    border-radius: 16px;
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    height: 18px;
    line-height: 18px;
    padding: 0 9px;
    color: white;
    margin-right: 16px;
  }
  & h2 {
    height: 36px;
    line-height: 36px;
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 15px;
  }
`;

export const WorkspaceName = styled.div<{ bgColor: string; color: string; border: string }>`
  height: 50px;
  border: none;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ border }) => border};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  font-weight: 800;
  font-size: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 16px;
  margin: 0;
  cursor: pointer;
  position: relative;
  transition: 0.2s ease;
  &:hover {
    background-color: #fff;
  }
`;

export const AddMessage = styled.button<{ bgColor: string; hover: string }>`
  font-size: 15px;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 16px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background-color: ${({ bgColor }) => bgColor};
  color: #fff;
  transition: 0.2s ease;

  &:hover {
    background-color: ${({ hover }) => hover};
  }
`;

export const MenuScroll = styled.div`
  height: calc(100vh - 102px);
  overflow-y: auto;
`;

export const WorkspaceModal = styled.div`
  padding: 10px 0 0;
  & h2 {
    padding-left: 20px;
  }
  & > button {
    width: 100%;
    height: 28px;
    padding: 4px;
    border: none;
    background: transparent;
    border-top: 1px solid rgb(28, 29, 28);
    cursor: pointer;
    &:last-of-type {
      border-bottom: 1px solid rgb(28, 29, 28);
    }
  }
`;

export const Chats = styled.div`
  flex: 1;
`;

export const WorkspaceButton = styled.button<{ bgColor: string; border: string; hover: string }>`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ bgColor }) => bgColor};
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  border: 3px solid ${({ border }) => border};
  transition: 0.2s ease;

  &:hover {
    border: 3px solid ${({ hover }) => hover};
  }
`;

const Workspace: VFC = () => {
  const theme = useTheme();
  const { data: userData, mutate } = useSWR<IUser | false>('/api/users', fetcher, { dedupingInterval: 2000 });
  const { data: workspacesData, mutate: workspacesMutate } = useSWR<IWorkspace[]>(
    userData ? `/api/workspaces` : null,
    fetcher,
  );
  const { workspace } = useParams<{ workspace?: string }>();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useRecoilState(isWorkspaceMenuShow);
  const [showAddMessage, setShowAddMessage] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);
  const onClickWorkspaceName = useCallback(() => {
    setShowWorkspaceMenu((prev) => !prev);
  }, []);
  const onClickAddMessage = useCallback((e: any) => {
    e.stopPropagation();
    setShowAddMessage((prev) => !prev);
  }, []);

  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal((prev) => !prev);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowUserMenu(false);
    setShowWorkspaceMenu(false);
    setShowAddMessage(false);
    setShowCreateWorkspaceModal(false);
  }, []);

  if (userData === undefined) return <div>로딩중...</div>;
  if (!userData) {
    return <Redirect to={'/sign_up'} />;
  }
  return (
    <>
      <Header bgColor={theme.colors.gray[50]} border={theme.colors.gray[100]}>
        <RightMenu>
          {userData && (
            <ProfileImg onClick={onClickUserProfile}>
              <img src={gravatar.url(userData.email, { s: '28px', d: 'retro' })} alt={userData.nickname} />
            </ProfileImg>
          )}
          <ProfileMenu show={showUserMenu} onCloseModal={onCloseModal} />
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces bgColor={theme.colors.gray[50]} border={theme.colors.gray[100]}>
          {userData?.Workspaces?.map((ws) => {
            return (
              <Link key={ws.id} to={`/workspace/${ws.url}/channel/일반`}>
                <HoverText
                  text={ws.name}
                  style={{
                    left: '45',
                    top: 0,
                    minWidth: `${
                      ws.name.replace(/[0-9]/g, '').length >= 5
                        ? ws.name.replace(/[0-9]/g, '').length * 16
                        : ws.name.replace(/[0-9]/g, '').length * 18 + 10
                    }px`,
                  }}
                >
                  <WorkspaceButton
                    bgColor={theme.colors.gray[600]}
                    border={theme.colors.gray[50]}
                    hover={theme.colors.gray[300]}
                  >
                    {ws.name.slice(0, 1).toUpperCase()}
                  </WorkspaceButton>
                </HoverText>
              </Link>
            );
          })}
          <HoverText text={'워크스페이스 추가'} style={{ left: '42px', top: 0, minWidth: '120px' }}>
            <AddButton color={theme.colors.black} onClick={onClickCreateWorkspace}>
              <div>
                <IoAddOutline />
              </div>
            </AddButton>
          </HoverText>
        </Workspaces>
        <Channels bgColor={theme.colors.gray[50]} border={theme.colors.gray[100]}>
          <WorkspaceName
            onClick={onClickWorkspaceName}
            bgColor={theme.colors.gray[50]}
            border={theme.colors.gray[100]}
            color={theme.colors.black}
          >
            <span>{workspacesData?.find((v) => v.url === workspace)?.name}</span>
            <AddMessage onClick={onClickAddMessage} bgColor={theme.colors.blue[600]} hover={theme.colors.blue[500]}>
              <HoverText text={'새 메시지'} style={{ top: '28px', left: '50%', transform: 'translateX(-50%)' }}>
                <BsPencilSquare />
              </HoverText>
            </AddMessage>
          </WorkspaceName>
          <MenuScroll>
            {/*<Menu show={showWorkspaceModal} onCloseModal={toggleWorkspaceModal} style={{ top: 95, left: 80 }}>*/}
            {/*  <WorkspaceModal>*/}
            {/*    <h2>Sleact</h2>*/}
            {/*    <button onClick={onClickInviteWorkspace}>워크스페이스에 사용자 초대</button>*/}
            {/*    <button onClick={onClickAddChannel}>채널 만들기</button>*/}
            {/*    <button onClick={onLogout}>로그아웃</button>*/}
            {/*  </WorkspaceModal>*/}
            {/*</Menu>*/}
            <ChannelList />
            <DMList />
          </MenuScroll>
        </Channels>

        {/* 페이지 전환 */}
        <Chats>
          <Switch>
            <Route path="/workspace/:workspace/channel/:channel" component={Channel} />
            <Route path="/workspace/:workspace/dm/:id" component={DirectMessage} />
          </Switch>
        </Chats>
      </WorkspaceWrapper>
      <WorkspaceMenu show={showWorkspaceMenu} onCloseModal={onCloseModal} style={{ left: '100px' }} />
      <AddMessageModal show={showAddMessage} onCloseModal={onCloseModal} />
      <CreateWorkspaceModal show={showCreateWorkspaceModal} onCloseModal={onCloseModal} />
      {/*<Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>*/}
      {/*  <form onSubmit={onCreateWorkspace}>*/}
      {/*    <Label id="workspace-label">*/}
      {/*      <span>워크스페이스 이름</span>*/}
      {/*      <Input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace} />*/}
      {/*    </Label>*/}
      {/*    <Label id="workspace-url-label">*/}
      {/*      <span>워크스페이스 url</span>*/}
      {/*      <Input id="workspace" value={newUrl} onChange={onChangeNewUrl} />*/}
      {/*    </Label>*/}
      {/*    <Button type="submit">생성하기</Button>*/}
      {/*  </form>*/}
      {/*</Modal>*/}
      {/*<CreateChannelModal*/}
      {/*  show={showCreateChannelModal}*/}
      {/*  onCloseModal={onCloseModal}*/}
      {/*  setShowCreateChannelModal={setShowCreateChannelModal}*/}
      {/*/>*/}
      {/*<InviteWorkspaceModal*/}
      {/*  show={showInviteWorkspaceModal}*/}
      {/*  onCloseModal={onCloseModal}*/}
      {/*  setShowInviteWorkspaceModal={setShowInviteWorkspaceModal}*/}
      {/*/>*/}
      {/*<InviteChannelModal*/}
      {/*  show={showInviteChannelModal}*/}
      {/*  onCloseModal={onCloseModal}*/}
      {/*  setShowInviteChannelModal={setShowInviteChannelModal}*/}
      {/*/>*/}
    </>
  );
};

export default Workspace;
function isWorkspaceMenuShowAtom(isWorkspaceMenuShowAtom: any): any[] {
  throw new Error('Function not implemented.');
}
