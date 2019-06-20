import * as React from 'react'
import { Router, Location } from '@reach/router'
import posed, { PoseGroup } from 'react-pose'

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 200 },
  exit: { opacity: 0 },
})

const PosedRouter: React.FC = ({ children }) => (
  <Location>
    {({ location }) => (
      <PoseGroup>
        <RouteContainer key={location.key}>
          <Router location={location}>{children}</Router>
        </RouteContainer>
      </PoseGroup>
    )}
  </Location>
)

export default PosedRouter
