import * as React from 'react';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import { navigate } from '@reach/router'
import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldPassword,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiPanel,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';

import LoginMutation from './mutation/LoginMutation'
import { login } from '../../helpers/auth'

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Preencha o campo de usuário'),
  password: Yup.string()
    .min(6, 'A senha deve ter no minímo 6 caracteres')
    .required('Preencha o campo de senha'),
});

const LoginInnerForm = ({ handleSubmit, values, handleChange }) => {
  return (
    <EuiPanel style={{ width: 400, maxHeight: 270 }}>
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
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiButton type="submit" fill onClick={handleSubmit} >
              Login
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiButtonEmpty>
              Esqueceu a Senha?
            </EuiButtonEmpty>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiForm>
    </EuiPanel>
  )
}

export default withFormik({
  mapPropsToValues: () => ({ username: '', password: '' }),
  validationSchema: LoginSchema,
  handleSubmit: async (values, { setSubmitting, setStatus }) => {
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
