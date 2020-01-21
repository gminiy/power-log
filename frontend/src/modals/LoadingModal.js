import React from 'react';
import { ActivityIndicator } from 'react-native';

import Modal from 'react-native-modal';

const LoadingModal = ({ isVisible }) => {
  return (
    <Modal
      isVisible={isVisible}
    >
      <ActivityIndicator size="large" color="#7B6E66" style={{ flex: 1 }}/>
    </Modal>
  )
};

export default LoadingModal;