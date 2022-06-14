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

const FavoritesList: FC = () => {
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

  const toggleChannelCollapse = useCallback(() => {
    setCollapse((prev) => !prev);
  }, []);

  return (
    <Base>
      <CollapseButton isCollapsed={collapse} onClick={toggleChannelCollapse}>
        <TiArrowSortedDown />
        <span className={'title'}>즐겨찾기</span>
      </CollapseButton>
      {!collapse && (
        <Container>
          {/*{memberData?.map((member) => {*/}
          {/*  // const isOnline = onlineList.includes(member.id);*/}
          {/*  return (*/}
          {/*    // <NavLink key={member.id} activeClassName="selected" to={`/workspace/${workspace}/dm/${member.id}`}>*/}
          {/*    //   <span>{member.nickname}</span>*/}
          {/*    //   {member.id === userData?.id && <span> (나)</span>}*/}
          {/*    // </NavLink>*/}
          {/*    <EachMember key={member.id} data={member} />*/}
          {/*  );*/}
          {/*})}*/}
        </Container>
      )}
    </Base>
  );
};

export default FavoritesList;
