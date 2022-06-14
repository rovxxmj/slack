import ProfileItemCard, { EditButton } from '@layouts/Workspace/ProfileItemCard';
import React, { FC } from 'react';
import { IChannel } from '@typings/db';
import styled from '@emotion/styled';

interface IProps {
  data?: IChannel;
}

const Base = styled.div``;

const InfoMethod: FC<IProps> = ({ data }) => {
  return (
    <Base>
      <ProfileItemCard h={'채널 이름'} p={'# 일반'}>
        <EditButton />
      </ProfileItemCard>
      <ProfileItemCard h={'주제'} p={'주제 추가'}>
        <EditButton />
        <div className={'divider'}>
          <h2>설명</h2>
          <p>
            이것은 언제나 모두를 포함하게 될 단 하나의 채널로 공지를 올리고 팀 전체의 대화를 나누기에 적합한 공간입니다.
          </p>
          <EditButton />
        </div>
        <div className={'divider'}>
          <h2>만든 사람</h2>
          <p>작성자: ?? | 작성 날짜: {data?.createdAt}</p>
        </div>
      </ProfileItemCard>
    </Base>
  );
};

export default InfoMethod;
