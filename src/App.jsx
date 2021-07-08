import React, { Suspense, lazy } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

const Home = lazy(() => import('./Home'))
const QR = lazy(() => import('./QR'))
const Group = lazy(() => import('./Group'))
const Feedback = lazy(() => import('./Feedback'))
const Success = lazy(() => import('./Success'))

import LoadingScreen from './view/LoadingScreen'

const LoadingRoute = ({ children, ...rest }) => (
  <Route {...rest}>
    <AnimatePresence>
      <Suspense fallback={<LoadingScreen />}>
        {children}
      </Suspense>
    </AnimatePresence>
  </Route>
)

function App() {
  return (
    <Router>
      <Route
        render={({ location }) => (
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
              <LoadingRoute path="/" exact><Home /></LoadingRoute>
              <LoadingRoute path="/group"><Group /></LoadingRoute>
              <LoadingRoute path="/qr"><QR /></LoadingRoute>
              <LoadingRoute path="/success"><Success /></LoadingRoute>
              <LoadingRoute path="/feedback"><Feedback /></LoadingRoute>
            </Switch>
          </AnimatePresence>
        )}
      >
      </Route>
    </Router>
  )
}

export default App
