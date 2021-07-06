import React, { Suspense, lazy } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

const Home = lazy(() => import('./Home'))
const QR = lazy(() => import('./QR'))
const Group = lazy(() => import('./Group'))
const Feedback = lazy(() => import('./Feedback'))
const Success = lazy(() => import('./Success'))

const Loading = () => (<></>)

function App() {
  return (
    <Router>
      <Route
        render={({location}) => (
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
              <Route path="/" exact>
                <Suspense fallback={<Loading />}><Home /></Suspense>
              </Route>
              <Route path="/group">
                <Suspense fallback={<Loading />}><Group /></Suspense>
              </Route>
              <Route path="/qr" >
                <Suspense fallback={<Loading />}><QR /></Suspense>
              </Route>
              <Route path="/success" >
                <Suspense fallback={<Loading />}><Success /></Suspense>
              </Route>
              <Route path="/feedback">
                <Suspense fallback={<Loading />}><Feedback /></Suspense>
              </Route>
            </Switch>
          </AnimatePresence>
        )}
      >
      </Route>
    </Router>
  )
}

export default App
