import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

const Base = styled.div<{ bgColor: string; grayLight: string }>`
  border-top: 1px solid ${({ grayLight }) => grayLight};
  position: relative;
  margin-top: 30px;
  > span {
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    padding: 0 20px;
    background-color:${({ bgColor }) => bgColor};
    font-size: 12px;
    font-weight: 400;
    color: gray;
  }

  > div {
    display: flex;
    margin-top: 30px;
    }
  }
`;

const Social = styled.div`
  width: 40px;
  height: 40px;
  background-color: gray;
  border-radius: 50%;
  margin-right: 10px;
  font-size: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Socials = () => {
  const theme = useTheme();
  return (
    <Base bgColor={theme.colors.white} grayLight={theme.colors.gray[100]}>
      <span>OR</span>
      <div>
        <Social>카카오</Social>
        <Social>깃헙</Social>
        <Social>페이스북</Social>
      </div>
    </Base>
  );
};

export default Socials;
