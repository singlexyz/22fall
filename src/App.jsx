import React, { Suspense, lazy, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

const Home = lazy(() => import('./Home')) 
const QR = lazy(() => import('./QR'))
const Group = lazy(() => import('./Group'))
const Feedback = lazy(() => import('./Feedback'))
const Success = lazy(() => import('./Success'))

const StyledLoading = styled.div`
  position: fixed; display: flex; justify-content: center;
  align-items: center; width: 100%; height: 100%;
  left: 0; top: 0; bottom: 0; right: 0;
  z-index: 10086; background-color: white;
  text-transform: uppercase; font-size: 1.5rem;
`

const Loading = () => (<></>)

function App() {
  return (
    <Router>
      <Switch location={location} key={location.key}>
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
    </Router>
  )
}

export default App
