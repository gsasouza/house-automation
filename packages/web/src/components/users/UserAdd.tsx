import * as React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiSuperSelect,
} from '@elastic/eui';
import UserAddMutation from './mutation/UserAddMutation'
const UserAddSchema = Yup.object().shape({
  name: Yup.string().required(),
  host: Yup.string(),
  port: Yup.string(),
  type: Yup.string().required(),
});


const UserAdd = ({ setOpenModal, handleSubmit, values, errors, handleChange, setFieldValue, query }) => {
  const typeOptions = [
    {
      value: 'ARDUINO',
      inputDisplay: 'Arduino',
    },
    {
      value: 'ESP8266',
      inputDisplay: 'ESP8266',
    }
  ]
  return (
    <EuiOverlayMask>
      <EuiModal onClose={() => setOpenModal(false)}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>Nova placa</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          <EuiForm>
            <EuiFormRow
              label="Qual o nome do usuário?"
            >
              <EuiFieldText
                value={values.name}
                onChange={handleChange}
                name="name"
              />
            </EuiFormRow>
            <EuiFormRow label="Qual será o usuário?">
              <EuiFieldText
                value={values.username}
                onChange={handleChange}
                name="name"
              />
            </EuiFormRow>
          </EuiForm>

        </EuiModalBody>
        <EuiModalFooter>
          <EuiButtonEmpty onClick={() => setOpenModal(false)}>Cancelar</EuiButtonEmpty>

          <EuiButton onClick={handleSubmit} fill>
            Salvar
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    </EuiOverlayMask>
  )
}

const UserForm = withFormik({
  validationSchema: UserAddSchema,
  mapPropsToValues: () => ({ name: '', username: '' }),
  handleSubmit: async (values, { setSubmitting, setStatus, props }) => {

    const onCompleted = ({ AddUser: { error } }) => {
      if (error) setStatus(error);
      setSubmitting(false);
      props.setOpenModal(false);
    }
    const onError = (error) => {
      setStatus(error);
      setSubmitting(false);
    }
    UserAddMutation.commit(values, onCompleted, onError);
  }
})(UserAdd);

export default UserForm
