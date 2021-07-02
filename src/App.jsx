import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'

import Home from './Home'
import QR from './QR'
import Show from './Second'
import Feedback from './Feedback'

function App() {
  return (
    <Router>
      <Switch location={location} key={location.key}>
        <Route path="/" exact component={Home}></Route>
        <Route path="/qr" exact component={QR}></Route>
        <Route path="/show" exact component={Show}></Route>
        <Route path="/feedback" exact component={Feedback}></Route>
      </Switch>
    </Router>
  )
}

export default App
