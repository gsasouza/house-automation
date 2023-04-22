import {
  graphql,
  requestSubscription
} from 'react-relay'
import environment from '../../../relay/environment';

const boardIoSubscription = graphql`
  subscription BoardIoChangedSubscription{
    BoardIoChanged {
      boardIoEdge {
        node {
          connected
          state
          id
        }
      }
    }
  }
`

export default () => {

  const subscriptionConfig = {
    subscription: boardIoSubscription,
    variables: {},
    updater: store => {
      const rootField = store.getRootField('BoardIoChanged')
      const boardIoEdge = rootField.getLinkedRecord('boardIoEdge')
      const node = boardIoEdge.getLinkedRecord('node')
      const nodeId = node.getValue('id')
      const newState = node.getValue('state')
      const newConnected = node.getValue('connected')

      const nodeProxy = store.get(nodeId);
      nodeProxy.setValue(newState, 'state');
      nodeProxy.setValue(newConnected, 'connected');
    },
    onError: error => console.log(`An error occured:`, error)
  }

  requestSubscription(
    environment,
    subscriptionConfig
  )

}
