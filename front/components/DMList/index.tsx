// import useSocket from '@hooks/useSocket';
import { Base, CollapseButton, Container } from '@components/DMList/styles';
// import useSocket from '@hooks/useSocket';
import { IUser, IUserWithOnline } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import useSWR from 'swr';
import { TiArrowSortedDown } from 'react-icons/ti';
import { useTheme } from '@emotion/react';
import { IoAddOutline } from 'react-icons/io5';
import AddButton from '@components/DMList/AddButton';
import EachMember from '@components/DMList/EachMember';
import InviteChannelModal from '@layouts/Workspace/InviteChannelModal';
import InviteWorkspaceModal from '@layouts/Workspace/InviteWorkspaceModal';

const DMList: FC = () => {
  const theme = useTheme();
  const { workspace, dm } = useParams<{ workspace?: string; dm?: string }>();
  const {
    data: userData,
    error,
    mutate,
  } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 2000, // 2초
  });
  const { data: memberData } = useSWR<IUser[]>(userData ? `/api/workspaces/${workspace}/members` : null, fetcher);
  const [collapse, setCollapse] = useState(false);
  const [onlineList, setOnlineList] = useState<number[]>([]);
  const [showInviteMemberModal, setShowInviteMemberModal] = useState(false);
  const toggleChannelCollapse = useCallback(() => {
    setCollapse((prev) => !prev);
  }, []);
  const onClickInviteMember = useCallback(() => {
    setShowInviteMemberModal(true);
  }, []);
  const onCloseModal = useCallback(() => {
    setShowInviteMemberModal(false);
  }, []);
  return (
    <Base>
      <CollapseButton isCollapsed={collapse} onClick={toggleChannelCollapse}>
        <TiArrowSortedDown />
        <span className={'title'}>다이렉트 메시지</span>
      </CollapseButton>
      {!collapse && (
        <Container>
          {memberData?.map((member) => {
            // const isOnline = onlineList.includes(member.id);
            return (
              // <NavLink key={member.id} activeClassName="selected" to={`/workspace/${workspace}/dm/${member.id}`}>
              //   <span>{member.nickname}</span>
              //   {member.id === userData?.id && <span> (나)</span>}
              // </NavLink>
              <EachMember key={member.id} data={member} isOnline={true} />
            );
          })}
          <AddButton title={'맴버'} onClick={onClickInviteMember} />
        </Container>
      )}
      <InviteWorkspaceModal show={showInviteMemberModal} onCloseModal={onCloseModal} />
    </Base>
  );
};

export default DMList;
