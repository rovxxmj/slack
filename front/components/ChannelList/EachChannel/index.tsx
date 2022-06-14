import React, { FC, useCallback } from 'react';
import { IChannel, IDM } from '@typings/db';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoTrashOutline } from 'react-icons/io5';
import HoverText from '@layouts/Workspace/HoverText';
interface IProps {
  data: IChannel;
}

export const Base = styled.div<{ hover: string; color: string; active: boolean; activeColor: string }>`
  border: none;
  width: 100%;
  cursor: pointer;
  height: 32px;
  transition: 0.2s ease;
  color: ${({ active, color }) => (active ? '#fff' : color)};
  font-weight: 600;
  font-size: 15px;
  background-color: ${({ active, activeColor }) => (active ? activeColor : 'transparent')};
  &:hover {
    background-color: ${({ active, hover, activeColor }) => (active ? activeColor : hover)};
    & .tools {
      visibility: visible;
    }
  }

  > a {
    text-align: start;
    display: flex;
    align-items: center;
    padding: 6px 34px 3px;
    position: relative;

    & .img {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      background-color: lightgray;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 800;
      font-size: 14px;
      color: #fff;
      position: relative;

      > img {
        width: 100%;
        height: 100%;
      }

      > .isOnline {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translate(2px, 1px);
        background-color: ${({ active, activeColor }) => (active ? activeColor : '#fff')};

        > div {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: red;
        }
      }
    }

    & .name,
    .nickname {
      margin-left: 6px;
    }
    & .me {
      font-size: 12px;
      margin-left: 4px;
      color: ${({ active, color }) => (active ? '#fff' : 'rgba(0, 0, 0, 0.5)')};
    }

    & .tools {
      position: absolute;
      right: 10px;
      display: flex;
      visibility: hidden;
      > div {
        padding: 5px;
        color: ${({ active, color }) => (active ? '#fff' : color)};
      }

      & .delete {
        margin-right: 4px;
      }
    }
  }
`;

const Index: FC<IProps> = ({ data }) => {
  const theme = useTheme();
  const { workspace, channel } = useParams<{ workspace?: string; channel?: string }>();
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
    console.log('active');
  }, []);

  const onClickDelete = useCallback((e: any) => {
    e.preventDefault();
  }, []);

  const onClickMore = useCallback((e: any) => {
    e.preventDefault();
  }, []);

  return (
    <Base
      hover={theme.colors.white}
      color={theme.colors.gray[600]}
      active={data.name === channel}
      activeColor={theme.colors.blue[500]}
    >
      <Link to={`/workspace/${workspace}/channel/${data.name}`}>
        <span className={'name'}># {data.name}</span>
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
    </Base>
  );
};

export default Index;
