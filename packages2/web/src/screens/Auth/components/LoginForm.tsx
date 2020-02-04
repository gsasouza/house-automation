import { Card, CardHeader, TextInput, Checkbox, RoundedButton } from '../../../components';

import { login } from '../../../utils/security';
import { UserLoginMutation } from './mutations/UserLoginMutation';

import { useFormik } from 'formik';

import * as React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useMutation } from 'relay-hooks';
import { UserLoginMutationResponse } from './mutations/__generated__/UserLoginMutation.graphql';

const Wrapper = styled.div`
  margin: auto;
`;

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Preencha o campo de usuário'),
  password: Yup.string()
    .min(6, 'A senha deve ter no minímo 6 caracteres')
    .required('Preencha o campo de senha'),
});

type Values = {
  username: string;
  password: string;
};

const initialValues = {
  username: '',
  password: '',
  remember: false,
};

const LoginInnerForm = () => {
  const { getFieldProps, getFieldMeta, values, setFieldValue, handleSubmit } = useFormik<Values>({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: () => mutate({ variables: { input: { username: values.username, password: values.password } } }),
  });
  const [mutate] = useMutation(UserLoginMutation, {
    onCompleted: ({ UserLogin }: UserLoginMutationResponse) => login(UserLogin && UserLogin.token, values.remember),
  });

  return (
    <Wrapper>
      <Card width="25rem">
        <CardHeader>Faça login para continuar</CardHeader>
        <TextInput label="Usuário" name="username" {...getFieldProps('username')} {...getFieldMeta('username')} />
        <TextInput
          label="Senha"
          name="password"
          {...getFieldProps('password')}
          {...getFieldMeta('password')}
          type="password"
        />
        <Checkbox
          {...getFieldProps('remember')}
          onChange={e => setFieldValue('remember', e.target.checked)}
          name="remeber"
          label="Lembrar de mim"
        />
        <RoundedButton color="accent" fullWidth onClick={handleSubmit}>
          Entrar
        </RoundedButton>
      </Card>
    </Wrapper>
  );
};

export default LoginInnerForm;
