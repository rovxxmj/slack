import React, { CSSProperties, FC, useCallback } from 'react';
import styled from '@emotion/styled';

interface IProps {
  children: React.ReactNode;
  show: boolean;
  style?: CSSProperties;
  onCloseModal(): void;
}

const Base = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
`;

const Menu: FC<IProps> = ({ children, show, style, onCloseModal }) => {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
    onCloseModal();
  }, []);

  if (!show) return null;

  return (
    <Base onClick={onCloseModal}>
      <div onClick={stopPropagation} style={style}>
        {children}
      </div>
    </Base>
  );
};

export default Menu;
