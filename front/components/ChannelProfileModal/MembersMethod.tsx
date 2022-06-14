import { IUser } from '@typings/db';
import React, { FC, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { IoPersonAddOutline } from 'react-icons/io5';
import { useTheme } from '@emotion/react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import InviteChannelModal from '@layouts/Workspace/InviteChannelModal';
interface IProps {
  data?: IUser[];
}

const Base = styled.div``;
const Members = styled.ul`
  display: flex;
  flex-direction: column;
`;
const AddMember = styled.div<{ hover: string; bgColor?: string }>`
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 30px;
  background-color: #fff;
  transition: 0.2s ease;

  > img,
  .img {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    background-color: ${({ bgColor }) => (bgColor ? bgColor : 'lightgray')};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    color: #fff;

    > svg {
      color: gray;
    }
  }

  > .name,
  .nickname {
    margin-left: 10px;
    font-size: 16px;
    font-weight: 700;
  }

  &:hover {
    background-color: ${({ hover }) => hover};
  }
`;
const Member = styled(AddMember)`
  & .name,
  .nickname {
    font-weight: 600;

    > .me {
      font-size: 14px;
      color: gray;
    }
  }
`;

const MembersMethod: FC<IProps> = ({ data }) => {
  const theme = useTheme();
  const { data: userData, mutate } = useSWR<IUser>('/api/users', fetcher);
  const [showInviteMemberModal, setShowInViteMemberModal] = useState(false);
  const onClickInviteMember = useCallback(() => {
    setShowInViteMemberModal(true);
  }, []);
  const onCloseModal = useCallback(() => {
    setShowInViteMemberModal(false);
  }, []);
  return (
    <Base>
      <Members>
        <AddMember bgColor={theme.colors.blue[100]} hover={theme.colors.gray[50]} onClick={onClickInviteMember}>
          <div className={'img'}>
            <IoPersonAddOutline />
          </div>
          <span className={'name'}>사용자 추가</span>
        </AddMember>
        {data?.map((v) => (
          <Member key={v.id} hover={theme.colors.gray[50]}>
            <div className={'img'}>{v.nickname.slice(0, 1).toUpperCase()}</div>
            <span className={'nickname'}>
              {v.nickname}&nbsp;
              {userData?.id === v.id && <span className={'me'}>(나)</span>}
            </span>
          </Member>
        ))}
      </Members>
      <InviteChannelModal show={showInviteMemberModal} onCloseModal={onCloseModal} />
    </Base>
  );
};

export default MembersMethod;
