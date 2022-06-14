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
import { IModal, ModalContent } from '@layouts/Workspace/CreateWorkspaceModal';

interface IForm {
  name: string;
}
const CreateChannelModal: FC<IModal> = ({ show, onCloseModal, showPrev }) => {
  const { workspace: workspaceParams } = useParams<{ workspace?: string }>();
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useRecoilState(isWorkspaceMenuShow);
  const { data: userData, mutate: userDataMutate } = useSWR<IUser>('/api/users', fetcher, { dedupingInterval: 2000 });
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
    reset,
  } = useForm<IForm>({ defaultValues: { name: '' }, mode: 'onChange' });

  const { name } = watch();

  const onClose = useCallback(() => {
    onCloseModal();
    if (showPrev) setShowWorkspaceMenu((prev) => !prev);
  }, []);
  const onSubmit = useCallback((data: IForm) => {
    axios
      .post(`/api/workspaces/${workspaceParams}/channels`, data, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        userDataMutate();
        onCloseModal();
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <Modal show={show} onCloseModal={onClose}>
      <ModalContent>
        <h1>{userData?.Workspaces.find((v) => v.url === workspaceParams)?.name}에 채널 만들기</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomLabel label={'채널 이름'} isValue={Boolean(name)} isInValid={Boolean(errors?.name)}>
            <input type={'text'} {...register('name', { required: true, minLength: { value: 1, message: '' } })} />
          </CustomLabel>
          <Button type={'submit'}>만들기</Button>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateChannelModal;
