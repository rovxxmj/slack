import React, { FC } from 'react';
import styled from '@emotion/styled';
import Modal from '@components/Modal';

interface IProps {
  show: boolean;
  onCloseModal(): void;
}

const Base = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  min-height: 300px;
  background-color: #fff;
`;

const AddMessageModal: FC<IProps> = ({ show, onCloseModal }) => {
  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <ModalContent>
        <div>zzzzz</div>
      </ModalContent>
    </Modal>
  );
};

export default AddMessageModal;
