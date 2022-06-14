import { IUser } from '@typings/db';
import React, { FC } from 'react';
import { useTheme } from '@emotion/react';
import { Link, useParams } from 'react-router-dom';
import { Title, WorkspaceMenuItem, WorkspaceMenuItems } from '@layouts/Workspace/ProfileMenu';
import gravatar from 'gravatar';

interface IProps {
  data: IUser;
}

const MyWorkspaces: FC<IProps> = ({ data }) => {
  const theme = useTheme();
  const { workspace } = useParams<{ workspace?: string }>();
  return (
    <>
      <Title>내 다른 워크스페이스</Title>
      <WorkspaceMenuItems>
        {data?.Workspaces.filter((v) => v.url !== workspace).map((v) => (
          <Link to={`/workspace/${v.url}/channels/일반`}>
            <WorkspaceMenuItem hover={theme.colors.gray[100]}>
              <div className={'img'}>{v.name.slice(0, 1).toUpperCase()}</div>
              <span className={'workspace-name'}>{v.name}</span>
            </WorkspaceMenuItem>
          </Link>
        ))}
      </WorkspaceMenuItems>
    </>
  );
};

export default MyWorkspaces;
