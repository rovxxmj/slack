import React, { FC, useCallback } from 'react';
import styled from '@emotion/styled';
import Modal from '@components/Modal';
import { useRecoilState } from 'recoil';
import { isWorkspaceMenuShow } from '@recoil/atom';
import { useParams } from 'react-router-dom';
import CustomLabel from '@pages/SignUp/CustomLabel';
import { useForm } from 'react-hook-form';
import { Button } from '@pages/SignUp/styles';
import axios from 'axios';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';

export interface IModal {
  show: boolean;
  onCloseModal(): void;
  showPrev?: boolean;
}

export const Base = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;

  > h1 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
  }
`;
interface IForm {
  workspace: string;
  url: string;
}
const CreateWorkspaceModal: FC<IModal> = ({ show, onCloseModal, showPrev }) => {
  const { workspace: workspaceParams } = useParams<{ workspace?: string }>();
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useRecoilState(isWorkspaceMenuShow);
  const { data: userData, mutate } = useSWR<IUser>('/api/users', fetcher, { dedupingInterval: 2000 });
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
    reset,
  } = useForm<IForm>({ defaultValues: { workspace: '', url: '' }, mode: 'onChange' });

  const { workspace, url } = watch();

  const onClose = useCallback(() => {
    onCloseModal();
    if (showPrev) setShowWorkspaceMenu((prev) => !prev);
  }, []);
  const onSubmit = useCallback((data: IForm) => {
    axios
      .post('/api/workspaces', data, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        mutate();
        reset();
        onCloseModal();
      })
      .catch((error) => {
        setError('workspace', { message: '이미 존재하는 워크스페이스 이름 또는 url 입니다.' });
        console.error(error);
      });
  }, []);
  return (
    <Modal show={show} onCloseModal={onClose}>
      <ModalContent>
        <h1>워크스페이스 만들기</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomLabel label={'워크스페이스 이름'} isValue={Boolean(name)} isInValid={Boolean(errors?.workspace)}>
            <input type={'text'} {...register('workspace', { required: true, minLength: { value: 1, message: '' } })} />
          </CustomLabel>
          <CustomLabel label={'워크스페이스 url'} isValue={Boolean(url)} isInValid={Boolean(errors?.url)}>
            <input type={'text'} {...register('url', { required: true, minLength: { value: 1, message: '' } })} />
          </CustomLabel>
          <Button type={'submit'}>만들기</Button>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateWorkspaceModal;
