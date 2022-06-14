import React, { FC, useCallback, useState } from 'react';
import { IChannel, IDM, IUser } from '@typings/db';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoTrashOutline } from 'react-icons/io5';
import HoverText from '@layouts/Workspace/HoverText';
import { Base } from '@components/ChannelList/EachChannel';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import MemberProfileModal from '@layouts/Workspace/memberProfileModal';
interface IProps {
  data: IUser;
  isOnline: boolean;
}

const EachMember: FC<IProps> = ({ data, isOnline }) => {
  const theme = useTheme();
  const [showMemberProfile, setShowMemberProfile] = useState(false);
  const { workspace, channel, id } = useParams<{ workspace?: string; channel?: string; id?: string }>();
  const { data: userData, mutate } = useSWR('/api/users', fetcher);
  const { data: memberData, mutate: memberDataMutate } = useSWR<IUser>(`/api/workspaces/${workspace}/users/${id}`);
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
    console.log('active');
  }, []);

  const onCloseModal = useCallback(() => {
    setShowMemberProfile(false);
  }, []);

  const onClickDelete = useCallback((e: any) => {
    e.preventDefault();
  }, []);

  const onClickMore = useCallback((e: any) => {
    e.preventDefault();
    setShowMemberProfile((prev) => !prev);
  }, []);
  return (
    <Base
      hover={theme.colors.white}
      color={theme.colors.gray[600]}
      active={data.id === Number(id)}
      activeColor={theme.colors.blue[500]}
    >
      <Link to={`/workspace/${workspace}/dm/${data.id}`}>
        <div className={'img'}>
          <img />
          <div className={isOnline ? 'isOnline' : ''}>
            <div />
          </div>
        </div>
        <span className={'nickname'}>
          {data.nickname}
          <span className={'me'}>{data.id === userData.id && '(나)'}</span>
        </span>
        <div className={'tools'}>
          <div className={'delete'} onClick={onClickDelete}>
            <HoverText text={'삭제'} style={{ top: '21px', left: '-18px', minWidth: '50px' }}>
              <IoTrashOutline />
            </HoverText>
          </div>
          <div className={'more'} onClick={onClickMore}>
            <HoverText text={'더보기'} style={{ top: '21px', left: '-23px', minWidth: '58px' }}>
              <span className={'more'}>
                <BsThreeDotsVertical />
              </span>
            </HoverText>
          </div>
        </div>
      </Link>
      <MemberProfileModal show={showMemberProfile} onCloseModal={onCloseModal} />
    </Base>
  );
};

export default EachMember;
