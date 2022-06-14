import React, { FC, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import Modal from '@components/Modal';
import { IoCloseOutline } from 'react-icons/io5';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { IUser } from '@typings/db';
import { useTheme } from '@emotion/react';
import ProfileItemCard from '@layouts/Workspace/ProfileItemCard';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import fetcher from '@utils/fetcher';
interface IProps {
  show: boolean;
  onCloseModal(): void;
}

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 580px;
  border-radius: 6px;
  background-color: #fff;
  color: #000;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: start;
  overflow: hidden;

  & .container {
    display: flex;
    padding: 0 30px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  font-size: 22px;
  background-color: transparent;
  cursor: pointer;
`;

export const Summary = styled.div`
  display: flex;
  align-items: center;
  padding: 30px 30px 10px;

  > h1 {
    font-size: 24px;
  }

  > img,
  .img {
    width: 74px;
    height: 74px;
    border-radius: 6px;
    background-color: gray;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    color: #fff;
  }

  > .nickname,
  .name {
    margin-left: 20px;
    font-size: 24px;
    font-weight: 700;
  }
`;

export const Star = styled.div<{ active: boolean; color: string }>`
  padding: 4px 12px;
  height: 30px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 20px;
  border-radius: 6px;
  color: ${({ active, color }) => (active ? color : 'gray')};
  cursor: pointer;
`;

export const Video = styled.div<{ color: string }>`
  padding: 4px 12px;
  height: 30px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 13px;
  font-weight: 700;
  border-radius: 6px;
  //color: ${({ color }) => color};
  color: #000;
  margin-left: 10px;
  cursor: pointer;
`;
export const Phone = styled.div<{ color: string }>`
  padding: 4px 12px;
  height: 30px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 13px;
  font-weight: 700;
  border-radius: 6px;
  // color: ${({ color }) => color};
  color: #000;
  margin-left: 10px;
  cursor: pointer;
`;

export const Methods = styled.div<{ bgColor: string }>`
  margin-top: 30px;
  width: 100%;
  height: 100%;
`;

export const Header = styled.div`
  padding: 0 30px;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
`;

export const Contents = styled.div<{ bgColor: string }>`
  padding: 30px;
  height: 100%;
  width: 100%;
  background-color: ${({ bgColor }) => bgColor};
`;

export const Method = styled.div<{ active: boolean; color: string }>`
  padding: 5px 0;
  margin-right: 24px;
  font-weight: 700;
  border-bottom: 2px solid ${({ active, color }) => (active ? color : 'transparent')};
  transform: translateY(1px);
  cursor: pointer;
`;

const MemberProfileModal: FC<IProps> = ({ show, onCloseModal }) => {
  const theme = useTheme();
  const { workspace, channel, id } = useParams<{ workspace?: string; channel?: string; id?: string }>();
  const [activeStar, setActiveStar] = useState(false);
  const [method, setMethod] = useState<'info' | 'integrated'>('info');
  const { data, mutate } = useSWR<IUser>(`/api/workspaces/${workspace}/users/${id}`, fetcher);

  const onClickStar = useCallback(() => {
    setActiveStar((prev) => !prev);
  }, []);
  const changeMethod = useCallback((method: 'info' | 'integrated') => {
    setMethod(method);
  }, []);

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <ModalContent>
        <CloseButton onClick={onCloseModal}>
          <IoCloseOutline />
        </CloseButton>
        <Summary>
          <div className={'img'}>{data?.nickname.slice(0, 1).toUpperCase()}</div>
          <span className={'nickname'}>{data?.nickname}</span>
        </Summary>
        <div className={'container'}>
          <Star active={activeStar} color={theme.colors.yellow[300]} onClick={onClickStar}>
            {activeStar ? <AiFillStar /> : <AiOutlineStar />}
          </Star>
        </div>
        <Methods bgColor={theme.colors.blue[400]}>
          <Header>
            <Method active={method === 'info'} color={theme.colors.blue[600]} onClick={() => changeMethod('info')}>
              정보
            </Method>
            <Method
              active={method === 'integrated'}
              color={theme.colors.blue[600]}
              onClick={() => changeMethod('integrated')}
            >
              통합
            </Method>
          </Header>
          <Contents bgColor={theme.colors.gray[100]}>
            {method === 'info' && (
              <>
                <ProfileItemCard
                  h={'파일'}
                  p={
                    '현재 여기에는 표시할 파일이 없습니다! 하지만 메시지 창에 파일을 끌어다 놓아서 이 대화에 추가할 수 있습니다.'
                  }
                ></ProfileItemCard>
              </>
            )}
            {method === 'integrated' && (
              <ProfileItemCard
                h={'파일'}
                p={
                  '현재 여기에는 표시할 파일이 없습니다! 하지만 메시지 창에 파일을 끌어다 놓아서 이 대화에 추가할 수 있습니다.'
                }
              ></ProfileItemCard>
            )}
          </Contents>
        </Methods>
      </ModalContent>
    </Modal>
  );
};

export default MemberProfileModal;
