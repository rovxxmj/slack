import styled from '@emotion/styled';

export const Base = styled.div`
  padding: 10px 0;
`;

export const CollapseButton = styled.button<{ isCollapsed: boolean }>`
  background: transparent;
  border: none;
  width: 100%;
  padding: 10px 16px 8px;
  display: flex;
  align-items: center;
  cursor: pointer;

  > svg {
    font-size: 20px;
    transition: 0.15s ease;
    transform: translateY(-1.5px) ${({ isCollapsed }) => (isCollapsed ? 'rotate(-90deg)' : '')};
  }

  > .title {
    margin-left: 6px;
    font-size: 14px;
    font-weight: 600;
  }
`;

export const Container = styled.div`
  //padding: 0 20px;
`;
