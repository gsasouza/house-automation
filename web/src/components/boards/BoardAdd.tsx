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
import BoardAddMutation from './mutation/BoardAddMutation'
const BoardAddSchema = Yup.object().shape({
  name: Yup.string().required(),
  host: Yup.string(),
  port: Yup.string(),
  type: Yup.string().required(),
});


const BoardAdd = ({ setOpenModal, handleSubmit, values, errors, handleChange, setFieldValue, query }) => {
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
              label="Como vai chamar a placa?"
            >
              <EuiFieldText
                value={values.name}
                onChange={handleChange}
                name="name"
              />
            </EuiFormRow>
            <EuiFormRow label="Qual o tipo de placa?">
              <EuiSuperSelect
                options={typeOptions}
                valueOfSelected={values.type}
                onChange={value => setFieldValue('type', value)}
                name="type"
              />
            </EuiFormRow>
            {values.type === 'ARDUINO' && (
              <EuiFormRow
                label="Em qual porta está conectada?"
              >
                <EuiFieldText
                  value={values.port}
                  onChange={handleChange}
                  name="port"
                />
              </EuiFormRow>
            )}
            {values.type === 'ESP8266' && (
              <EuiFormRow
                label="Em qual endereço está conectada?"
              >
                <EuiFieldText
                  value={values.host}
                  onChange={handleChange}
                  name="host"
                />
              </EuiFormRow>
            )}
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

const BoardForm = withFormik({
  validationSchema: BoardAddSchema,
  mapPropsToValues: () => ({ name: '', type: '', port: '', host: '' }),
  handleSubmit: async ({ name, type, port, host }, { setSubmitting, setStatus, props }) => {
    let values = {};
    if (type === 'ARDUINO') values = { name, type, port };
    if (type === 'ESP8266') values = { name, type, host };

    const onCompleted = ({ AddBoard: { error } }) => {
      if (error) setStatus(error);
      setSubmitting(false);
      props.setOpenModal(false);
    }
    const onError = (error) => {
      setStatus(error);
      setSubmitting(false);
    }
    BoardAddMutation.commit(values, onCompleted, onError);
  }
})(BoardAdd);

export default BoardForm
