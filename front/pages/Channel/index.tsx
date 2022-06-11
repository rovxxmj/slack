import React from 'react';
import { Base, Header } from '@pages/Channel/styles';
import { useTheme } from '@emotion/react';

const Channel = () => {
  const theme = useTheme();
  return (
    <Base>
      <Header border={theme.colors.gray[100]}>Channel</Header>
    </Base>
  );
};

export default Channel;
