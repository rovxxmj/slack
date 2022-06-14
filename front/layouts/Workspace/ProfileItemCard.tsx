import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface IProps {
  children?: React.ReactNode;
  h: string;
  p: string;
}

const Base = styled.div<{ border: string; hover: string }>`
  border: 1px solid ${({ border }) => border};
  border-bottom: none;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #fff;
  position: relative;
  overflow: hidden;

  & h2 {
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  & p,
  span {
    font-size: 15px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.7);
  }

  & .divider {
    width: 100%;
    padding: 16px 20px;
    border-bottom: 1px solid ${({ border }) => border};
    position: relative;
    cursor: pointer;

    &:hover {
      background-color: ${({ hover }) => hover};
    }
  }
`;
const Edit = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 13px;
  font-weight: 800;
  position: absolute;
  top: 13px;
  right: 20px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
export const EditButton = () => {
  const theme = useTheme();
  return <Edit color={theme.colors.blue[600]}>편집</Edit>;
};

const ProfileItemCard: FC<IProps> = ({ h, p, children }) => {
  const theme = useTheme();
  return (
    <Base border={theme.colors.gray[100]} hover={theme.colors.gray[50]}>
      <div className={'divider'}>
        <h2>{h}</h2>
        <p>{p}</p>
      </div>
      {children}
    </Base>
  );
};

export default ProfileItemCard;
