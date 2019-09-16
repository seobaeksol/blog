import React, { useEffect } from 'react';
import AuthForm from '../../components/auth/AuthForm';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm } from '../../modules/auth';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { form } = useSelector(({ auth }) => ({
    form: auth.register,
  }));
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(changeField({ form: 'register', key: name, value }));
  };

  const onSubmit = e => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterForm;
