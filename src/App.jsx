import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'

import Home from './Home'
import QR from './QR'
import Second from './Second'

function App() {
  return (
    <Router>
      <Route render={({ location }) => (
        <AnimateSharedLayout>
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.key}>
              <Route path="/" exact component={Home}></Route>
              <Route path="/qr" exact component={QR}></Route>
              <Route path="/second" exact component={Second}></Route>
            </Switch>
          </AnimatePresence>
        </AnimateSharedLayout>
      )}>
      </Route>
    </Router>
  )
}

export default App
