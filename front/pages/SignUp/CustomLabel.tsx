import React, { FC } from 'react';
import styled from '@emotion/styled';
import { IoIosCloseCircleOutline, IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { useTheme } from '@emotion/react';
interface IProps {
  label: string;
  children: React.ReactNode;
  isValue: boolean;
  isInValid: boolean;
  alarm?: boolean;
}
const Base = styled.div`
  width: 100%;
  position: relative;
`;
const Label = styled.label<{ isValue: boolean; bgColor: string; border: string; blue: string; blueDeep: string }>`
  & .label {
    display: block;
    font-weight: 700;
    font-size: 14px;
    padding-bottom: 6px;
  }

  & input {
    padding: 8px 12px;
    border-radius: 3px;
    --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
    border: 1px solid ${({ border }) => border};
    transition: border 80ms ease-out, box-shadow 80ms ease-out;
    box-sizing: border-box;
    margin: 0 0 10px;
    width: 100%;
    font-size: 15px;
    font-weight: 600;
    color: #000;
    background-color: ${({ bgColor }) => bgColor};

    &:focus {
      outline: none;
      border: 1px solid ${({ blueDeep }) => blueDeep};
      box-shadow: 0 0 0 2.5px ${({ blue }) => blue}};
      background-color: transparent;
    }
  }
`;

const Alarm = styled.span<{ color: string }>`
  position: absolute;
  right: 12px;
  bottom: 15.5px;
  font-size: 24px;
  color: ${({ color }) => color};
`;

const CustomLabel: FC<IProps> = ({ label, children, isValue, isInValid, alarm }) => {
  const theme = useTheme();
  return (
    <Base>
      <Label
        isValue={isValue}
        bgColor={theme.colors.gray[50]}
        border={theme.colors.gray[200]}
        blue={theme.colors.blue[200]}
        blueDeep={theme.colors.blue[500]}
      >
        <span className={'label'}>{label}</span>
        {children}
        {alarm && isValue && !isInValid && (
          <Alarm color={theme.colors.blue[500]}>
            <IoIosCheckmarkCircleOutline />
          </Alarm>
        )}
        {alarm && isValue && isInValid && (
          <Alarm color={theme.colors.red[500]}>
            <IoIosCloseCircleOutline />
          </Alarm>
        )}
      </Label>
    </Base>
  );
};

export default CustomLabel;
