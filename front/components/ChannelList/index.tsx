// import useSocket from '@hooks/useSocket';
import { Base, CollapseButton, Container } from '@components/DMList/styles';
// import useSocket from '@hooks/useSocket';
import { IChannel, IUser, IUserWithOnline } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import useSWR from 'swr';
import { TiArrowSortedDown } from 'react-icons/ti';
import { IoAddOutline } from 'react-icons/io5';

import { useTheme } from '@emotion/react';
import AddButton from '@components/DMList/AddButton';
import EachChannel from '@components/ChannelList/EachChannel';
import CreateChannelModal from '@layouts/Workspace/CreateChannelModal';

const DMList: FC = () => {
  const theme = useTheme();
  const { workspace } = useParams<{ workspace?: string }>();
  const {
    data: userData,
    error,
    mutate,
  } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 2000, // 2초
  });

  const { data: channelData } = useSWR<IChannel[]>(userData ? `/api/workspaces/${workspace}/channels` : null, fetcher);

  const [collapse, setCollapse] = useState(false);
  const [onlineList, setOnlineList] = useState<number[]>([]);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const toggleChannelCollapse = useCallback(() => {
    setCollapse((prev) => !prev);
  }, []);
  const onClickCreateChannel = useCallback(() => {
    setShowCreateChannelModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowCreateChannelModal(false);
  }, []);
  return (
    <>
      <Base>
        <CollapseButton isCollapsed={collapse} onClick={toggleChannelCollapse}>
          <TiArrowSortedDown />
          <span className={'title'}>채널</span>
        </CollapseButton>
        {!collapse && (
          <Container>
            {channelData?.map((channel) => {
              return <EachChannel key={channel.id} data={channel} />;
            })}
            <AddButton title={'채널'} onClick={onClickCreateChannel} />
          </Container>
        )}
      </Base>
      <CreateChannelModal show={showCreateChannelModal} onCloseModal={onCloseModal} />
    </>
  );
};

export default DMList;
