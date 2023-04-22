import * as React from 'react';
import {
  EuiEmptyPrompt,
  EuiPageBody,
  EuiPageSection,
  EuiPageContent,
  EuiFlexGroup,
  EuiFlexItem,
  EuiCard,
  EuiIcon,
  EuiButton,
  EuiSpacer,
} from '@elastic/eui';
import { createFragmentContainer, graphql } from 'react-relay'

import { createQueryRenderer } from '../../relay/createQueryRenderer'
import { useNavigate } from "react-router-dom";

const Dashboard = ({ query }) => {
  const navigate = useNavigate();
  const { me } = query;

  return (
    <EuiPageBody>
      <EuiSpacer size={'m'}/>
      <EuiPageContent>
        <EuiEmptyPrompt
          iconType="watchesApp"
          title={<h2>{`Bem vindo, ${me.name}`}</h2>}
          body={
            <>
              <p>
                O que deseja fazer ?
              </p>
            </>
          }
        />
        <EuiSpacer size="l"/>
        <EuiFlexGroup gutterSize="l">
          <EuiFlexItem>
            <EuiCard
              onClick={() => {
              }}
              icon={<EuiIcon size="xxl" type="spacesApp"/>}
              title="Gerenciar Cômodos"
              description="Interaja com os dispositivos da sua casa"
              footer={<EuiButton onClick={() => navigate('/dashboard/rooms')}>Ir</EuiButton>}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              onClick={() => {
              }}
              icon={<EuiIcon size="xxl" type="managementApp"/>}
              title="Gerenciar Placas"
              description="Adicione novas placas e cuide das placas antigas."
              footer={<EuiButton onClick={() => navigate('/dashboard/boards')}>Ir</EuiButton>}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              onClick={() => {
              }}
              icon={<EuiIcon size="xxl" type="graphApp"/>}
              title="Gerenciar Dispositivos"
              description="Tem um novo dispositivo? Adicione-o e comece a interagir com ele!"
              footer={<EuiButton onClick={() => navigate('/dashboard/boardIos')}> Ir </EuiButton>}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageContent>
    </EuiPageBody>
  )
}

const fragment = createFragmentContainer(Dashboard, {
  query: graphql`
      fragment Dashboard_query on Query {
          me {
              name
              username
          }
      }
  `
})

export default createQueryRenderer(fragment, {
  query: graphql`
      query DashboardQuery {
          ...Dashboard_query
      }
  `
})
