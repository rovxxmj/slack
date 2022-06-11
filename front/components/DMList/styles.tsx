import styled from '@emotion/styled';

export const Base = styled.div`
  padding: 10px 0;
`;

export const CollapseButton = styled.button<{ isCollapsed: boolean }>`
  background: transparent;
  border: none;
  width: 100%;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  cursor: pointer;

  > svg {
    font-size: 20px;
    transition: 0.15s ease;
    transform: translateY(-1.5px) ${({ isCollapsed }) => (isCollapsed ? 'rotate(-90deg)' : '')};
  }

  > .title {
    margin-left: 5px;
    font-size: 15px;
    font-weight: 600;
  }
`;
