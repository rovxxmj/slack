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
  email: string;
}
const InviteChannelModal: FC<IModal> = ({ show, onCloseModal, showPrev }) => {
  const { workspace, channel } = useParams<{ workspace?: string; channel?: string }>();
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useRecoilState(isWorkspaceMenuShow);
  const { data: userData, mutate } = useSWR<IUser>('/api/users', fetcher, { dedupingInterval: 2000 });

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
    reset,
  } = useForm<IForm>({ defaultValues: { email: '' }, mode: 'onChange' });

  const { email } = watch();

  const onClose = useCallback(() => {
    onCloseModal();
    if (showPrev) setShowWorkspaceMenu((prev) => !prev);
  }, []);
  const onSubmit = useCallback((data: IForm) => {
    axios
      .post(`/api/workspaces/${workspace}/channels/${channel}/members`, data, { withCredentials: true })
      .then((res) => {
        mutate();
        reset();
        onCloseModal();
      });
  }, []);
  return (
    <Modal show={show} onCloseModal={onClose}>
      <ModalContent>
        <h1># {channel}(으)로 사용자 초대</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomLabel label={'받는 사람:'} isValue={Boolean(email)} isInValid={Boolean(errors?.email)}>
            <input type={'text'} {...register('email', { required: true, minLength: { value: 1, message: '' } })} />
          </CustomLabel>
          <Button type={'submit'}>보내기</Button>
          <span>초대 링크 복사</span>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default InviteChannelModal;
