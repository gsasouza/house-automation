import * as React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
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
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Preencha o campo de usuário'),
  password: Yup.string()
    .min(6, 'A senha deve ter no minímo 6 caracteres')
    .required('Preencha o campo de senha'),
});

const LoginForm = () => {

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
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
  return (
    <Formik onSubmit={handleSubmit} initialValues={{ username: '', password: '' }} validationSchema={LoginSchema}>
      {({ handleSubmit, values, errors, touched, handleChange }) => (
        <Form >
          <EuiPanel style={{ width: 400, maxHeight: 270 }}>
            <EuiSpacer size="s"/>
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
              <EuiSpacer size="s"/>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiButton type="submit" fill onClick={handleSubmit}>
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
        </Form>

      )}
    </Formik>
  )
}

export default LoginForm
