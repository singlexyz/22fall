import React, { Suspense, lazy, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

const Home = lazy(() => import('./Home')) 
const QR = lazy(() => import('./QR'))
const Show = lazy(() => import('./Show'))
const Feedback = lazy(() => import('./Feedback'))

const StyledLoading = styled.div`
  position: fixed; display: flex; justify-content: center;
  align-items: center; width: 100%; height: 100%;
  left: 0; top: 0; bottom: 0; right: 0;
  z-index: 10086; background-color: white;
  text-transform: uppercase; font-size: 1.5rem;
`

const Loading = () => (<StyledLoading>Loading...</StyledLoading>)

import GlobalContext from './context/global'

function App() {
  const [data, setData] = useState(null)
  useEffect(() => {
    axios.post('/form/details', {
      uniqid: '22fallGroup'
    }, { headers: { authorization: '58b5cc72ae86e1b28c632fd4f9b4759f', } })
      .then(({ data }) => {
        setData(data.data)
      })
  }, [])
  return (
    <GlobalContext.Provider value={data}>
      <Router>
        <Switch location={location} key={location.key}>
          <Route path="/" exact>
            <Suspense fallback={<Loading />}><Home /></Suspense>
          </Route>
          <Route path="/qr" >
            <Suspense fallback={<Loading />}><QR /></Suspense>
          </Route>
          <Route path="/show">
            <Suspense fallback={<Loading />}><Show /></Suspense>
          </Route>
          <Route path="/feedback">
            <Suspense fallback={<Loading />}><Feedback /></Suspense>
          </Route>
        </Switch>
      </Router>
    </GlobalContext.Provider>
  )
}

export default App
