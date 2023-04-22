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
  EuiFieldNumber,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiSuperSelect,
} from '@elastic/eui';
import BoardIoAddMutation from './mutation/BoardIoAddMutation'
import {createFragmentContainer, graphql} from 'react-relay'

const BoardIoAddSchema = Yup.object().shape({
  name: Yup.string().required(),
  board: Yup.string().required(),
  room: Yup.string().required(),
  type: Yup.string().required(),
  pin: Yup.number().required(),
});


const BoardIoAdd = ({ setOpenModal, handleSubmit, values, errors, handleChange, setFieldValue, query }) => {
  const typeOptions = [
    {
      value: 'RELAY',
      inputDisplay: 'Relé',
    }
  ]
  return (
    <EuiOverlayMask>
      <EuiModal onClose={() => setOpenModal(false)}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>Novo dispositivo</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          <EuiForm>
            <EuiFormRow
              label="Como vai chamar o dispositivo?"
            >
              <EuiFieldText
                value={values.name}
                onChange={handleChange}
                name="name"
              />
            </EuiFormRow>
            <EuiFormRow label="Em qual cômodo está?">
              <EuiSuperSelect
                options={query.rooms.edges.map(({ node: { id, name } }) => ({ value: id, inputDisplay: name }))}
                valueOfSelected={values.room}
                onChange={value => setFieldValue('room', value)}
              />
            </EuiFormRow>
            <EuiFormRow label="Em qual placa está conectado?">
              <EuiSuperSelect
                options={query.boards.edges.map(({ node: { id, name } }) => ({ value: id, inputDisplay: name }))}
                valueOfSelected={values.board}
                onChange={value => setFieldValue('board', value)}
              />
            </EuiFormRow>
            <EuiFormRow label="Qual o tipo de dispositivo?">
              <EuiSuperSelect
                options={typeOptions}
                valueOfSelected={values.type}
                onChange={value => setFieldValue('type', value)}
              />
            </EuiFormRow>
            <EuiFormRow label="A qual pino está conectado">
              <EuiFieldNumber min={0} name="pin" onChange={handleChange}/>
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

const BoardIoForm = withFormik({
  validationSchema: BoardIoAddSchema,
  mapPropsToValues: () => ({ name: '', board: '', room: '', pin: 0, type: '' }),
  handleSubmit: async (values, { setSubmitting, setStatus, props }) => {
    const onCompleted = ({ AddBoardIo: { error } }) => {
      if (error) setStatus(error);
      setSubmitting(false);
      props.setOpenModal(false);
    }
    const onError = (error) => {
      setStatus(error);
      setSubmitting(false);
    }
    BoardIoAddMutation.commit(values, onCompleted, onError);
  }
})(BoardIoAdd);

export default createFragmentContainer(BoardIoForm, {
  query: graphql`
    fragment BoardIoAdd_query on Query {
      rooms(first: 1000) {
        edges {
          node {
            id
            name
          }
        }
      }
      boards(first: 1000) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `
})
