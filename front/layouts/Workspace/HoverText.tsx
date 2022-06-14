import React, { CSSProperties, FC } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface IProps {
  text: string;
  children: React.ReactNode;
  style?: CSSProperties;
}

const Base = styled.div<{ bgColor: string }>`
  position: relative;

  & .text {
    visibility: hidden;
    position: absolute;
    z-index: 3000;
    padding: 0 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    background-color: ${({ bgColor }) => bgColor};
    color: #fff;
    font-size: 12px;
    font-weight: 800;
    border-radius: 5px;
  }

  & .component:hover {
    ~ .text {
      visibility: visible;
    }
  }
`;

const HoverText: FC<IProps> = ({ text, children, style }) => {
  const theme = useTheme();
  return (
    <Base bgColor={theme.colors.gray[900]}>
      <div className={'component'}>{children}</div>
      <span className={'text'} style={style}>
        {text}
      </span>
    </Base>
  );
};

export default HoverText;
