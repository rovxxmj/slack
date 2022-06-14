import React, { FC, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import Modal from '@components/Modal';
import { IoCloseOutline } from 'react-icons/io5';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { IChannel, IUser } from '@typings/db';
import { useTheme } from '@emotion/react';
import {
  CloseButton,
  Header,
  Contents,
  Method,
  Methods,
  ModalContent,
  Phone,
  Star,
  Summary,
  Video,
} from '@layouts/Workspace/memberProfileModal';
import ProfileItemCard, { EditButton } from '@layouts/Workspace/ProfileItemCard';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import useInput from '@hooks/useInput';
import { useRecoilState } from 'recoil';
import { methodAtom } from '@recoil/atom';
import InfoMethod from '@components/ChannelProfileModal/InfoMethod';
import MembersMethod from '@components/ChannelProfileModal/MembersMethod';
interface IProps {
  show: boolean;
  onCloseModal(): void;
}
type TMethods = 'info' | 'members' | 'integrated' | 'settings';

const ChannelProfileModal: FC<IProps> = ({ show, onCloseModal }) => {
  const theme = useTheme();
  const { workspace, channel } = useParams<{ workspace?: string; channel?: string }>();
  const { data, mutate } = useSWR(`/api/workspaces/${workspace}/channels/${channel}`, fetcher);
  const { data: workspaceMemberData, mutate: workspaceMemberDataMutate } = useSWR<IUser[]>(
    `/api/workspaces/${workspace}/channels/${channel}/members`,
    fetcher,
  );
  const [activeStar, setActiveStar] = useState(false);
  const [method, setMethod] = useRecoilState(methodAtom);
  const onClickStar = useCallback(() => {
    setActiveStar((prev) => !prev);
  }, []);
  const changeMethod = useCallback((method: TMethods) => {
    setMethod(method);
  }, []);
  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <ModalContent>
        <CloseButton onClick={onCloseModal}>
          <IoCloseOutline />
        </CloseButton>
        <Summary>
          <h1># {data?.name}</h1>
        </Summary>
        <div className={'container'}>
          <Star active={activeStar} color={theme.colors.yellow[300]} onClick={onClickStar}>
            {activeStar ? <AiFillStar /> : <AiOutlineStar />}
          </Star>
          <Video color={theme.colors.gray[300]}>영상 시작</Video>
          <Phone color={theme.colors.gray[300]}>통화 시작</Phone>
        </div>
        <Methods bgColor={theme.colors.gray[100]}>
          <Header>
            <Method active={method === 'info'} color={theme.colors.blue[600]} onClick={() => changeMethod('info')}>
              정보
            </Method>
            <Method
              active={method === 'members'}
              color={theme.colors.blue[600]}
              onClick={() => changeMethod('members')}
            >
              멤버
            </Method>
            <Method
              active={method === 'integrated'}
              color={theme.colors.blue[600]}
              onClick={() => changeMethod('integrated')}
            >
              통합
            </Method>
            <Method
              active={method === 'settings'}
              color={theme.colors.blue[600]}
              onClick={() => changeMethod('settings')}
            >
              통합
            </Method>
          </Header>
          <Contents
            bgColor={theme.colors.gray[100]}
            style={method === 'members' ? { padding: '30px 0', backgroundColor: '#fff' } : { padding: '30px' }}
          >
            {method === 'info' && <InfoMethod data={data} />}
            {method === 'members' && <MembersMethod data={workspaceMemberData} />}
            {method === 'integrated' && <ProfileItemCard h={'채널 이름'} p={'오후 5:57 현지 시간'}></ProfileItemCard>}
          </Contents>
        </Methods>
      </ModalContent>
    </Modal>
  );
};

export default ChannelProfileModal;
