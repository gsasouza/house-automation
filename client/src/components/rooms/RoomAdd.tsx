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
import RoomAddMutation from './mutation/RoomAddMutation'

const RoomAddSchema = Yup.object().shape({
  name: Yup.string().required('Preencha o campo de nome'),
  type: Yup.string().required(),
});


const RoomAdd = ({ setOpenModal, handleSubmit, values, handleChange, setFieldValue }) => {
  const typeOptions = [
    {
      value: 'BEDROOM',
      inputDisplay: 'Quarto',
    },
    {
      value: 'BATHROOM',
      inputDisplay: 'Banheiro',
    },
    {
      value: 'KITCHEN',
      inputDisplay: 'Cozinha',
    },
    {
      value: 'LIVING_ROOM',
      inputDisplay: 'Sala',
    }
  ]
  return (
    <EuiOverlayMask>
      <EuiModal onClose={() => setOpenModal(false)}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>Adicionar Cômodo</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          <EuiForm>
            <EuiFormRow
              label="Nome do Cômodo"
            >
              <EuiFieldText
                value={values.name}
                onChange={handleChange}
                name="name"
              />
            </EuiFormRow>
            <EuiFormRow label="Tipo de Cômodo">
              <EuiSuperSelect
                options={typeOptions}
                valueOfSelected={values.type}
                onChange={value => setFieldValue('type', value)}
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

export default withFormik({
  validationSchema: RoomAddSchema,
  mapPropsToValues: () => ({ name: '', type: 'LIVING_ROOM' }),
  handleSubmit: async (values, { setSubmitting, setStatus, props }) => {
    const onCompleted = ({ AddRoom: { error } }) => {
      if (error) setStatus(error);
      setSubmitting(false);
      props.setOpenModal(false);
    }
    const onError = (error) => {
      setStatus(error);
      setSubmitting(false);
    }
    RoomAddMutation.commit(values, onCompleted, onError);
  }
})(RoomAdd);
