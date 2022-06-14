import React, { useCallback, useState } from 'react';
import { Base, Header } from '@pages/Channel/styles';
import { useTheme } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { RiArrowDownSLine } from 'react-icons/ri';
import { set, useWatch } from 'react-hook-form';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IChannel, IUser } from '@typings/db';
import ChannelProfileModal from '@components/ChannelProfileModal';
import useInput from '@hooks/useInput';
import { useRecoilState } from 'recoil';
import { methodAtom } from '@recoil/atom';

type TMethods = 'info' | 'members' | 'integrated' | 'settings';

const Channel = () => {
  const theme = useTheme();
  const [showChannelProfile, setShowChannelProfile] = useState(false);
  const [method, setMethod] = useRecoilState(methodAtom);
  const { workspace, channel, id } = useParams<{ workspace?: string; channel?: string; id?: string }>();
  const { data: channelData, mutate: channelMutate } = useSWR<IChannel>(
    `/api/workspaces/${workspace}/channels/${channel}`,
    fetcher,
  );
  const { data: channelMemberData, mutate: channelMemberMutate } = useSWR<IUser[]>(
    `/api/workspaces/${workspace}/channels/${channel}/members`,
    fetcher,
  );
  const onClickChannelProfile = useCallback((method: string) => {
    setShowChannelProfile((prev) => !prev);
    setMethod(method);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowChannelProfile(false);
  }, []);

  if (channelData === undefined || channelMemberData === undefined) return <div>로딩중...</div>;

  return (
    <>
      <Base>
        {/*<Header border={theme.colors.gray[100]}>Channel</Header>*/}
        <Header border={theme.colors.gray[100]}>
          <div className={'header-left'} onClick={() => onClickChannelProfile('info')}>
            <span className={'name'}># {channelData?.name}</span>
            <span className={'arrow'}>
              <RiArrowDownSLine />
            </span>
          </div>
          <div className={'header-right'} onClick={() => onClickChannelProfile('members')}>
            <div className={'img'}></div>
            <span className={'counts'}>{channelMemberData?.length}</span>
          </div>
        </Header>
      </Base>
      <ChannelProfileModal show={showChannelProfile} onCloseModal={onCloseModal} />
    </>
  );
};

export default Channel;
