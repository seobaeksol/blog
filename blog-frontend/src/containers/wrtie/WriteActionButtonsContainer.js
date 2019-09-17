import React from 'react';
import { withRouter } from 'react-router-dom';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useDispatch, useSelector } from 'react-redux';

const WriteActionButtonsContainer = ({ history }) => {
  return <WriteActionButtons />;
};

export default withRouter(WriteActionButtonsContainer);
