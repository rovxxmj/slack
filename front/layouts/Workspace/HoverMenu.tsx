import Reect, { FC } from 'react';
import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
interface IProps {
  children: React.ReactNode;
  menuChildren: React.ReactNode;
}

const Base = styled.div<{ border: string }>`
  position: relative;

  &:hover {
    > .menu-items {
      opacity: 1;
    }
  }

  > .menu-items {
    position: absolute;
    right: -300px;
    top: -12px;
    background-color: gray;
    width: 300px;
    min-height: 200px;
    background-color: #fff;
    transition: 0.2s;
    border: 1px solid ${({ border }) => border};
    box-shadow: rgba(0, 0, 0, 0.05) 0px 4px 8px;
    border-radius: 4px;
    opacity: 0;
  }
`;

const HoverMenu: FC<IProps> = ({ children, menuChildren }) => {
  const theme = useTheme();
  return (
    <Base border={theme.colors.gray[100]}>
      <div className={'component'}>{children}</div>
      <div className={'menu-items'}>{menuChildren}</div>
    </Base>
  );
};

export default HoverMenu;
