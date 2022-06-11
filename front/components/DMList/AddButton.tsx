import React, { FC } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

interface IProps {
  title: string;
}

const Base = styled.button<{ hover: string; color: string }>`
  background: transparent;
  border: none;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 6px 20px;
  height: 32px;
  transition: 0.2s ease;
  color: ${({ color }) => color};
  > .icon {
    font-size: 18px;
    transition: 0.15s ease;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.1);
  }

  > .text {
    margin-left: 5px;
    font-size: 15px;
    font-weight: 400;
  }

  &:hover {
    background-color: ${({ hover }) => hover};
  }
`;
const AddButton: FC<IProps> = ({ title }) => {
  const theme = useTheme();
  return (
    <Base hover={theme.colors.white} color={theme.colors.gray[600]}>
      <span className={'icon'}>
        <IoAddOutline />
      </span>
      <span className={'text'}>{title} 추가</span>
    </Base>
  );
};

export default AddButton;
