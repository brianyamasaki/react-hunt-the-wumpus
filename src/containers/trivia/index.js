import React from 'react';
import { Modal } from 'react-bootstrap';
import DisplayQuestion from '../../components/trivia/displayQuestion';

export default () => (
  <div>
    <Modal show={true} closeButton>
      <DisplayQuestion />
    </Modal>
  </div>
);