import React, { useCallback, useState } from 'react';
import { Base, Header } from '@pages/Channel/styles';
import { useTheme } from '@emotion/react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IUser } from '@typings/db';
import { RiArrowDownSLine } from 'react-icons/ri';
import MemberProfileModal from '@layouts/Workspace/memberProfileModal';
import ChatList from '@components/ChatList';
import ChatBox from '@components/ChatBox';

const DM = () => {
  const theme = useTheme();
  const { workspace, channel, id } = useParams<{ workspace?: string; channel?: string; id?: string }>();
  const { data: myData, mutate: myDataMutate } = useSWR<IUser>('/api/users', fetcher);
  const { data: memberData, mutate } = useSWR<IUser>(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const [showMemberProfile, setShowMemberProfile] = useState(false);
  const onClickMemberProfile = useCallback(() => {
    setShowMemberProfile((prev) => !prev);
  }, []);
  const onCloseModal = useCallback(() => {
    setShowMemberProfile(false);
  }, []);

  if (myData === undefined || memberData === undefined) return <div>로딩중...</div>;

  return (
    <>
      <Base>
        <Header border={theme.colors.gray[100]}>
          <div className={'header-left'} onClick={onClickMemberProfile}>
            <div className={'img'}>
              <img />
              <div className={true ? 'isOnline' : ''}>
                <div />
              </div>
            </div>
            <span className={'nickname'}>{memberData?.nickname}</span>
            <span className={'arrow'}>
              <RiArrowDownSLine />
            </span>
          </div>
        </Header>
        <ChatList />
        <ChatBox />
      </Base>
      <MemberProfileModal show={showMemberProfile} onCloseModal={onCloseModal} />
    </>
  );
};

export default DM;
