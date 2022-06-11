// import useSocket from '@hooks/useSocket';
import { Base, CollapseButton } from '@components/DMList/styles';
// import useSocket from '@hooks/useSocket';
import { IUser, IUserWithOnline } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import useSWR from 'swr';
import { TiArrowSortedDown } from 'react-icons/ti';
import { IoAddOutline } from 'react-icons/io5';

import { useTheme } from '@emotion/react';
import AddButton from '@components/DMList/AddButton';

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
  // const { data: memberData } = useSWR<IUserWithOnline[]>(
  //   userData ? `/api/workspaces/${workspace}/members` : null,
  //   fetcher,
  // );
  const [collapse, setCollapse] = useState(false);
  const [onlineList, setOnlineList] = useState<number[]>([]);

  const toggleChannelCollapse = useCallback(() => {
    setCollapse((prev) => !prev);
  }, []);

  return (
    <Base>
      <CollapseButton isCollapsed={collapse} onClick={toggleChannelCollapse}>
        <TiArrowSortedDown />
        <span className={'title'}>채널</span>
      </CollapseButton>
      {!collapse && (
        <div>
          {/*{memberData?.map((member) => {*/}
          {/*  const isOnline = onlineList.includes(member.id);*/}
          {/*  return (*/}
          {/*    <NavLink key={member.id} activeClassName="selected" to={`/workspace/${workspace}/dm/${member.id}`}>*/}
          {/*      <span>{member.nickname}</span>*/}
          {/*      {member.id === userData?.id && <span> (나)</span>}*/}
          {/*    </NavLink>*/}
          {/*  );*/}
          {/*})}*/}
          <AddButton title={'채널'} />
        </div>
      )}
    </Base>
  );
};

export default DMList;
