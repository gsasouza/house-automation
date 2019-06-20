import * as React from 'react';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import { navigate } from '@reach/router'
import {
  EuiButton,
  EuiFieldPassword,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiPanel,
  EuiTitle,
  EuiSpacer,
} from '@elastic/eui';

import LoginMutation from './mutation/LoginMutation'
import { login } from '../../helpers/auth'

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Preencha o campo de e-mail'),
  password: Yup.string()
    .min(6, 'A senha deve ter no minímo 6 caracteres')
    .required('Preencha o campo de senha'),
});

const LoginInnerForm = ({ handleSubmit, values, handleChange, isValid, errors }) => {
  console.log(isValid, errors)
  return (
    <EuiPanel style={{ width: 300, maxHeight: 300 }}>
      <EuiTitle>
        <h2> Login </h2>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiForm>
        <EuiFormRow
          label="Usuário"
        >
          <EuiFieldText
            value={values.username}
            onChange={handleChange}
            icon="user"
            name="username"
          />
        </EuiFormRow>
        <EuiFormRow label="Senha">
          <EuiFieldPassword
            value={values.password}
            onChange={handleChange}
            name="password"
          />
        </EuiFormRow>
        <EuiSpacer size="s" />
        <EuiButton type="submit" fill onClick={e => {
          console.log('here', e)
          handleSubmit(e)
        }}>
          Login
        </EuiButton>
      </EuiForm>
    </EuiPanel>
  )
}

export default withFormik({
  mapPropsToValues: () => ({ username: '', password: '' }),
  validationSchema: LoginSchema,
  handleSubmit: async (values, { setSubmitting, setStatus }) => {
    console.log('heeere');
    const onCompleted = ({ Login: { token } }) => {
      navigate('/dashboard');
      login(token, true);
      setSubmitting(false);
    }
    const onError = (error) => {
      setStatus(error);
      setSubmitting(false);
    }
    LoginMutation.commit(values, onCompleted, onError);
  }
})(LoginInnerForm);
